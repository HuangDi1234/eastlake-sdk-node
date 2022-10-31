const path = require("path");
const fs = require("fs");
const rimraf = require("rimraf");
const Property = require("../lib/enum/property");
const AnalyticsBuilder = require('../lib/analytics')
const Environment = require("../lib/enum/environment");
const {EventBuilder} = require("../lib/model/event");

describe('test analytics build', () => {

    test('analytics builder error', function () {
        let builder = new AnalyticsBuilder();
        try {
            builder.build();
        } catch (e) {
            expect(e.message).toBe('empty config or dirname');
        }
    });
});

describe('test analytics event path', () => {
    let logDir = '/tmp/output';
    let extension = '.event.log';
    let dt;
    let dateString = new Date((dt = new Date()).getTime() - dt.getTimezoneOffset() * 60000)
        .toISOString()
        .replace('T', '-').slice(0, 13);
    let filename;

    beforeAll(() => {
        filename = dateString + extension
    });

    test('eventPath', async function () {
        let analytics = new AnalyticsBuilder().eventPath(logDir).build();
        analytics.collectRaw("test");
        await wait(2000);
        expect(fs.existsSync(path.join(logDir, filename))).toEqual(true);
        expect(fs.statSync(path.join(logDir, filename)).size).toBeGreaterThan(0);
        analytics.shutdown();
    });

    afterAll(() => {
        rimraf(logDir, function () {
        });
    });
});

describe('test analytics env EVENT_OUTPUT_PATH', () => {
    let logDir = '/tmp/output-env';
    let extension = '.event.log';
    let dt;
    let dateString = new Date((dt = new Date()).getTime() - dt.getTimezoneOffset() * 60000)
        .toISOString()
        .replace('T', '-').slice(0, 13);
    let filename;

    beforeAll(() => {
        process.env[Environment.EVENT_OUTPUT_PATH.getName()] = logDir
        process.env[Environment.NOMAD_ALLOC_DIR.getName()] = '/tmp'
        process.env[Environment.NOMAD_JOB_NAME.getName()] = 'job-1'
        filename = dateString + extension
    });

    test('EVENT_OUTPUT_PATH', async function () {
        let analytics = new AnalyticsBuilder().build();
        analytics.collectRaw("test");
        await wait(2000);
        expect(fs.existsSync(path.join(logDir, filename))).toEqual(true);
        expect(fs.statSync(path.join(logDir, filename)).size).toBeGreaterThan(0);
        analytics.shutdown();
    });

    afterAll(() => {
        delete process.env[Environment.EVENT_OUTPUT_PATH.getName()];
        delete process.env[Environment.NOMAD_ALLOC_DIR.getName()];
        delete process.env[Environment.NOMAD_JOB_NAME.getName()];
        rimraf(logDir, function () {
        });
    });
});

describe('test analytics env NOMAD_ALLOC_DIR', () => {
    let logDir = '/tmp/data';
    let extension = '.event.log';
    let dt;
    let dateString = new Date((dt = new Date()).getTime() - dt.getTimezoneOffset() * 60000)
        .toISOString()
        .replace('T', '-').slice(0, 13);
    let filename;
    beforeAll(() => {
        process.env[Environment.NOMAD_ALLOC_DIR.getName()] = '/tmp'
        process.env[Environment.NOMAD_JOB_NAME.getName()] = 'job-1'
        filename = dateString + extension
    });

    test('NOMAD_ALLOC_DIR', async function () {
        let analytics = new AnalyticsBuilder().build();
        analytics.collectRaw("test");
        await wait(2000);
        let logPath = path.join(process.env[Environment.NOMAD_ALLOC_DIR.getName()], 'data', process.env[Environment.NOMAD_JOB_NAME.getName()]);
        expect(fs.existsSync(logPath)).toEqual(true);
        expect(fs.statSync(path.join(logPath, filename)).size).toBeGreaterThan(0);
        analytics.shutdown();
    });

    afterAll(() => {
        delete process.env[Environment.NOMAD_ALLOC_DIR.getName()];
        delete process.env[Environment.NOMAD_JOB_NAME.getName()];
        rimraf(logDir, function () {
        });
    });
});

describe('test analytics event', () => {
    let logDir = '/tmp/output-event';
    let extension = '.event.log';
    let dt;
    let dateString = new Date((dt = new Date()).getTime() - dt.getTimezoneOffset() * 60000)
        .toISOString()
        .replace('T', '-').slice(0, 13);
    let filename;

    beforeAll(() => {
        filename = dateString + extension
    });

    test('event', async function () {
        let analytics = new AnalyticsBuilder()
            .eventPath(logDir)
            .sharedProperty(Property.PROJECT_ID, 'project-1')
            .sharedProperty(Property.NOMAD_REGION, 'cn-north-1')
            .customSharedProperty('custom-shared-1', 'custom-shared-1')
            .customSharedProperty('custom-shared-2', 'custom-shared-2')
            .build();
        let event = new EventBuilder().eventName('login').build();
        await wait(2000);
        analytics.collect(event);
        expect(fs.existsSync(path.join(logDir, filename))).toEqual(true);
        expect(fs.statSync(path.join(logDir, filename)).size).toBeGreaterThan(0);
        analytics.shutdown();
    });

    afterAll(() => {
        rimraf(logDir, function () {
        });
    });
});

describe('test analytics shared property', () => {
    let logDir = '/tmp/output-shared-1';
    let extension = '.event.log';
    let dt;
    let dateString = new Date((dt = new Date()).getTime() - dt.getTimezoneOffset() * 60000)
        .toISOString()
        .replace('T', '-').slice(0, 13);
    let filename;

    beforeAll(() => {
        filename = dateString + extension
        process.env[Environment.NOMAD_NAMESPACE.getName()] = 'test-data'
        process.env[Environment.NOMAD_JOB_NAME.getName()] = 'test-job-name'
    });

    test('shared property', async function () {
        let analytics = new AnalyticsBuilder()
            .eventPath(logDir)
            .sharedProperty(Property.PROJECT_ID, 'project-1')
            .sharedProperty(Property.NOMAD_REGION, 'cn-north-1')
            .customSharedProperty('custom-shared-1', 'custom-shared-1')
            .customSharedProperty('custom-shared-2', 'custom-shared-2')
            .build();
        let event = new EventBuilder().eventName('login').build();
        analytics.collect(event);
        analytics.shutdown();


        analytics = new AnalyticsBuilder()
            .eventPath(logDir)
            .sharedProperty(Property.PROJECT_ID, 'project-1')
            .customSharedProperty('custom-shared-1', 'custom-shared-1')
            .customSharedProperty('custom-shared-2', 'custom-shared-2')
            .build();
        event = new EventBuilder().eventName('login').build();
        analytics.collect(event);
        analytics.shutdown();

        analytics = new AnalyticsBuilder()
            .eventPath(logDir)
            .enableAutoEnvProperty(false)
            .sharedProperty(Property.PROJECT_ID, 'project-1')
            .customSharedProperty('custom-shared-1', 'custom-shared-1')
            .customSharedProperty('custom-shared-2', 'custom-shared-2')
            .build();
        event = new EventBuilder().eventName('login').build();
        analytics.collect(event);
        await wait(2000);
        expect(fs.existsSync(path.join(logDir, filename))).toEqual(true);
        expect(fs.statSync(path.join(logDir, filename)).size).toBeGreaterThan(0);
        analytics.shutdown();
    });

    afterAll(() => {
        rimraf(logDir, function () {
        });
    });
});

function wait(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms))
}

