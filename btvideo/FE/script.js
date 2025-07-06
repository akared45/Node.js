document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');

    fetch('http://localhost:3000/stream') 
        .then(response => {
            if (!response.ok) throw new Error('HTTP status ' + response.status);
            return response.json();
        })
        .then(data => {
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource('http://localhost:3000' + data.url);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    video.play();
                });
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = 'http://localhost:3000' + data.url;
                video.addEventListener('loadedmetadata', () => {
                    video.play();
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
