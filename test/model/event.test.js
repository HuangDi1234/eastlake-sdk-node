const {Event, EventBuilder} = require('../../lib/model/event')
const Property = require("../../lib/enum/property");
const Environment = require("../../lib/enum/environment");

describe('test event', () => {
    test('private constructor', function () {
        try {
            let event = new Event();
            console.log(event)
        } catch (e) {
            expect(e.message).toBe('private constructor!');
        }
    });

    test('event build', function () {
        let event = new EventBuilder().eventUUID('1111').build();
        expect(event instanceof Event).toEqual(true);
        expect(event[Property.EVENT_UUID.getValue()]).toEqual('1111');
        expect(event[Property.TIME_MS.getValue()]).toBeGreaterThan(0);

        let event1 = new EventBuilder().eventUUID(1111).build();
        expect(event1.hasOwnProperty(Property.EVENT_NAME)).toEqual(false)
    });

    test('event build all', function () {
        process.env[Environment.NOMAD_NAMESPACE.getName()] = 'data'

        let event = new EventBuilder()
            .eventUUID('1111')
            .ip('0.0.0.0')
            .property(Property.NOMAD_REGION, "cn-north-1")
            .accountId('123456')
            .eventName('login')
            .datasource('server')
            .eventGroup('user')
            .systemLanguage('zh')
            .projectId('data')
            .serviceGroup('mi')
            .channel('mi')
            .vendor('apple')
            .deviceId('654321')
            .screenHeight(1600)
            .screenWidth(1900)
            .deviceModel('iPhone 8')
            .os('iOS')
            .osVersion('13.1')
            .appVersion('2.3.4')
            .appId('11')
            .sdk('XGSDK')
            .sdkVersion('5.3.2')
            .networkType('WIFI')
            .carrier('中国移动')
            .zoneOffset(8)
            .roleId('MMO')
            .latitude('32.5')
            .longitude('108.1')
            .serverId('11')
            .phoneNum('133')
            .envProperty(Environment.NOMAD_NAMESPACE)
            .customProperty('custom','ccc')
            .build();
        expect(Object.keys(event).length).toEqual(33)
        delete process.env[Environment.NOMAD_NAMESPACE.getName()] ;
    });


    test('event build all wrong', function () {
        let event = new EventBuilder()
            .eventUUID(1)
            .ip(1)
            .property(111, "cn-north-1")
            .accountId(111)
            .eventName(11)
            .datasource(11)
            .eventGroup(11)
            .systemLanguage(11)
            .projectId(111)
            .serviceGroup(11)
            .channel(11)
            .vendor(111)
            .deviceId(111)
            .screenHeight('1600')
            .screenWidth('1900')
            .deviceModel(11)
            .os(11)
            .osVersion(11)
            .appVersion(11)
            .appId(11)
            .sdk(11)
            .sdkVersion(111)
            .networkType(11)
            .carrier(11)
            .zoneOffset('8')
            .roleId(1)
            .latitude(11)
            .longitude(11)
            .serverId(1)
            .phoneNum(1)
            .envProperty(11)
            .customProperty(11,'ccc')
            .build();
        expect(Object.keys(event).length).toEqual(1)
    });
});
