const fs = require('fs');
const path = require('path');

class Logger {
    constructor() {
        this.logFile = path.join(__dirname, '../../logs/app.txt');
        fs.mkdirSync(path.dirname(this.logFile), { recursive: true });
    }

    log(level, message) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${level}: ${message}\n`;
        fs.appendFileSync(this.logFile, logMessage, 'utf8');
    }

    info(message) {
        this.log('INFO', message);
    }

    error(message) {
        this.log('ERROR', message);
    }
}

module.exports = new Logger();