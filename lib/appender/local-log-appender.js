'use strict';

const winston = require("winston");
require("winston-daily-rotate-file")

class LocalLogAppender {
    constructor(config) {
        if (!config || !config.dirname) {
            throw new Error('empty config or dirname');
        }
        this.#init(config);
    }

    #init(config) {
        const myFormat = winston.format.printf(({message}) => message);
        const logConfiguration = {
            transports: [
                new winston.transports.DailyRotateFile({
                    dirname: config.dirname,
                    filename: config.filename ? config.filename : '%DATE%',
                    datePattern: config.datePattern ? config.datePattern : 'YYYY-MM-DD-HH',
                    format: myFormat,
                    maxSize: config.maxSize ? config.maxSize : '4g',
                    level: "info",
                    zippedArchive: false,
                    extension: config.extension ? config.extension : '.event.log',
                }),
            ],
        };
        this.logger = winston.createLogger(logConfiguration);
    }

    flush() {
        // This is intentional
    }

    append(msg) {
        try {
            this.logger.info(msg);
        } catch (e) {
            console.error(e)
        }
    }

    close() {
        try {
            this.logger.close();
        } catch (e) {
            console.error(e)
        }
    }
}

module.exports = LocalLogAppender;
