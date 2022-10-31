const LocalLogAppender = require("../../lib/appender/local-log-appender");
const rimraf = require('rimraf');
const crypto = require('crypto');
const fs = require('fs')
const path = require('path')

describe('test logger', () => {
    let logger;
    let logDir = '/tmp/ll-1';
    let extension = '.event.log';
    let dt;
    let dateString = new Date((dt = new Date()).getTime() - dt.getTimezoneOffset() * 60000)
        .toISOString()
        .replace('T', '-').slice(0, 13);
    let filename;
    beforeAll(() => {
        filename = dateString + extension
        let config = {
            dirname: logDir,
        }
        logger = new LocalLogAppender(config)
    });

    test('init',  async function () {
        for (let i = 0; i < 2000; i++) {
            let event = {
                accountId: i,
                event: 'test_event',
                time: new Date(),
                ip: '202.38.64.1',
                randomString: crypto.randomBytes(1024).toString('hex'),
            }
            logger.append(JSON.stringify(event));
        }
        await wait(2000);
        expect(fs.existsSync(path.join(logDir, filename))).toEqual(true);
        expect(fs.statSync(path.join(logDir, filename)).size).toBeGreaterThan(0);
    });

    afterAll(() => {
        logger.close()
        rimraf(logDir, function () {
        });
    });
});

describe('test logger rolling', () => {
    let logger;
    let logDir = '/tmp/ll-2';
    let extension = '.event.log';
    let dt;
    let dateString = new Date((dt = new Date()).getTime() - dt.getTimezoneOffset() * 60000)
        .toISOString()
        .replace('T', '-').slice(0, 13);
    let filename;
    beforeAll(() => {
        filename = dateString + extension
        let config = {
            dirname: logDir,
            maxSize: '50k'
        }
        logger = new LocalLogAppender(config)
    });

    test('rolling',  async function () {
        for (let i = 0; i < 2000; i++) {
            let event = {
                accountId: i,
                event: 'test_event',
                time: new Date(),
                ip: '202.38.64.1',
                randomString: crypto.randomBytes(1024).toString('hex'),
            }
            logger.append(JSON.stringify(event));
        }
        await wait(2000);
        expect(fs.existsSync(path.join(logDir, filename))).toEqual(true);
        let files = fs.readdirSync(logDir)
        let size = files.length
        for (let i = 1; i < size; i++) {
            expect(fs.existsSync(path.join(logDir, dateString +"."+i+ extension))).toEqual(true);
        }
    });

    afterAll(() => {
        logger.close()
        rimraf(logDir, function () {
        });
    });
});

function wait (ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms))
}
