const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors()); 

const videoPath = 'D:/ULTRAMAN ORB ORIGIN THE FIRST.mp4';
const outputDir = 'D:/video/output';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

app.use('/videos', express.static(outputDir));

app.get('/stream', (req, res) => {
    const outputPath = path.join(outputDir, 'output.m3u8');

    if (fs.existsSync(outputPath)) {
        console.log('HLS is ready');
        return res.json({ url: '/videos/output.m3u8' });
    }

    console.log('Start.....');
    ffmpeg(videoPath)
        .outputOptions([
            '-hls_time 10',
            '-hls_list_size 0',
            '-hls_segment_filename', path.join(outputDir, 'segment%d.ts')
        ])
        .output(outputPath)
        .on('start', cmd => console.log('FFmpeg command:', cmd))
        .on('progress', p => {
            process.stdout.write(`${Math.floor(p.percent)}% done\r`);
        })
        .on('end', () => {
            console.log('\nConversion completed');
            res.json({ url: '/videos/output.m3u8' });
        })
        .on('error', (err) => {
            console.error('Error:', err);
            res.status(500).send('Error processing video');
        })
        .run();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
