const util = require("../util/util");
const Property = require("../enum/property");
const Environment = require("../enum/environment");

class Event {
    constructor(privateEventParam) {
        if (!privateEventParam || !(privateEventParam instanceof PrivateEventParam)) {
            throw new Error("private constructor!")
        }
    }
}

class PrivateEventParam {
}

class EventBuilder {
    #properties

    constructor() {
        this.#properties = new Event(new PrivateEventParam())
    }

    build() {
        // 如果事件中不包含 TIME_MS 字段，则将当前时间作为 TIME_MS 的取值
        if (!this.#properties.hasOwnProperty(Property.TIME_MS.getValue()) || !util.check.isNumber(this.#properties[Property.TIME_MS.getValue()])) {
            this.#properties[Property.TIME_MS.getValue()] = new Date().getTime();
        }
        return Object.freeze(this.#properties);
    }

    /**
     * 添加公共属性
     *
     * @param property 属性枚举 see {@link Property}
     * @param value    属性值
     */
    property(property, value) {
        if (property instanceof Property && Property.hasOwnProperty(property.getName())) {
            this.#properties[property.getValue()] = value;
        }
        return this;
    }


    /**
     * 添加自定义属性
     *
     * @param name 属性枚举 String
     * @param value    属性值
     */
    customProperty(name, value) {
        if (util.check.isString(name)) {
            this.#properties[name] = value;
        }
        return this;
    }

    /**
     * 表示事件发生的时间
     *
     * @param timeMillis 毫秒级时间戳 Number
     */
    timeMillis(timeMillis) {
        if (util.check.isNumber(timeMillis)) {
            this.#properties[Property.TIME_MS.getValue()] = timeMillis;
        }
        return this;
    }

    /**
     * 登录之后可以获得的用于追踪用户的标识
     *
     * @param accountId 用户全局唯一 ID String
     */
    accountId(accountId) {
        if (util.check.isString(accountId)) {
            this.#properties[Property.ACCOUNT_ID.getValue()] = accountId;
        }
        return this;
    }

    /**
     * 每个事件必须对应一个 event_name，内容可以自定义
     *
     * @param eventName 事件名称 Sting
     */
    eventName(eventName) {
        if (util.check.isString(eventName)) {
            this.#properties[Property.EVENT_NAME.getValue()] = eventName;
        }
        return this;
    }

    /**
     * 数据来自客户端或是服务端
     *
     * @param datasource 数据源 Sting
     */
    datasource(datasource) {
        if (util.check.isString(datasource)) {
            this.#properties[Property.DATASOURCE.getValue()] = datasource;
        }
        return this;
    }

    /**
     * 用户的来源 IP 地址
     *
     * @param ip 用户 IP Sting
     */
    ip(ip) {
        if (util.check.isString(ip)) {
            this.#properties[Property.IP.getValue()] = ip;
        }
        return this;
    }

    /**
     * 用于将事件分组的字段，如果事件没有分组可以不填。
     * event_group 和 event_name 共同组成了事件的二级结构，每个 event_group 可以对应多个 event_name。
     *
     * @param eventGroup 事件组 String
     */
    eventGroup(eventGroup) {
        if (util.check.isString(eventGroup)) {
            this.#properties[Property.EVENT_GROUP.getValue()] = eventGroup;
        }
        return this;
    }

    /**
     * 用于事件全局去重
     *
     * @param uuid 事件全局唯一 ID String
     */
    eventUUID(uuid) {
        if (util.check.isString(uuid)) {
            this.#properties[Property.EVENT_UUID.getValue()] = uuid;
        }
        return this;
    }

    /**
     * 用户设备的系统语言(ISO 639-1，即两位小写英文字母)，如 zh, en 等
     * https://zh.wikipedia.org/wiki/ISO_639-1%E4%BB%A3%E7%A0%81%E8%A1%A8
     *
     * @param systemLanguage 用户设备的系统语言 String
     */
    systemLanguage(systemLanguage) {
        if (util.check.isString(systemLanguage)) {
            this.#properties[Property.SYSTEM_LANGUAGE.getValue()] = systemLanguage;
        }
        return this;
    }

    /**
     * 该事件属于哪个项目
     *
     * @param projectId 项目 ID String
     */
    projectId(projectId) {
        if (util.check.isString(projectId)) {
            this.#properties[Property.PROJECT_ID.getValue()] = projectId;
        }
        return this;
    }

    /**
     * 在同一个项目下的分组，比如国内渠道服，比如海外不同地区的不互通的分组
     *
     * @param serviceGroup 所属的服务组 String
     */
    serviceGroup(serviceGroup) {
        if (util.check.isString(serviceGroup)) {
            this.#properties[Property.SERVICE_GROUP.getValue()] = serviceGroup;
        }
        return this;
    }

    /**
     * 用于描述进行操作的用户属于哪个渠道
     *
     * @param channel 渠道名称 String
     */
    channel(channel) {
        if (util.check.isString(channel)) {
            this.#properties[Property.CHANNEL.getValue()] = channel;
        }
        return this;
    }

    /**
     * 用户设备的制造商，如 Apple，vivo 等
     *
     * @param vendor 设备制造商 String
     */
    vendor(vendor) {
        if (util.check.isString(vendor)) {
            this.#properties[Property.VENDOR.getValue()] = vendor;
        }
        return this;
    }

    /**
     * 用户的设备 ID，iOS 取用户的 IDFV 或 UUID，Android 取 androidID
     *
     * @param deviceId 设备 ID String
     */
    deviceId(deviceId) {
        if (util.check.isString(deviceId)) {
            this.#properties[Property.DEVICE_ID.getValue()] = deviceId;
        }
        return this;
    }

    /**
     * 用户设备的屏幕高度，如 1920 等
     *
     * @param screenHeight 屏幕高度 Number
     */
    screenHeight(screenHeight) {
        if (util.check.isNumber(screenHeight)) {
            this.#properties[Property.SCREEN_HEIGHT.getValue()] = screenHeight;
        }
        return this;
    }

    /**
     * 用户设备的屏幕高度，如 1080 等
     *
     * @param screenWidth 屏幕宽度 Number
     */
    screenWidth(screenWidth) {
        if (util.check.isNumber(screenWidth)) {
            this.#properties[Property.SCREEN_WIDTH.getValue()] = screenWidth;
        }
        return this;
    }

    /**
     * 用户设备的型号，如 iPhone 8 等
     *
     * @param deviceModel 设备型号 String
     */
    deviceModel(deviceModel) {
        if (util.check.isString(deviceModel)) {
            this.#properties[Property.DEVICE_MODEL.getValue()] = deviceModel;
        }
        return this;
    }

    /**
     * iOS 11.2.2、Android 8.0.0 等
     *
     * @param osVersion 操作系统版本
     */
    osVersion(osVersion) {
        if (util.check.isString(osVersion)) {
            this.#properties[Property.OS_VERSION.getValue()] = osVersion;
        }
        return this;
    }

    /**
     * 如 Android、iOS 等
     *
     * @param os 操作系统 String
     */
    os(os) {
        if (util.check.isString(os)) {
            this.#properties[Property.OS.getValue()] = os;
        }
        return this;
    }

    /**
     * 您的 APP 的版本
     *
     * @param appVersion APP 版本 String
     */
    appVersion(appVersion) {
        if (util.check.isString(appVersion)) {
            this.#properties[Property.APP_VERSION.getValue()] = appVersion;
        }
        return this;
    }

    /**
     * 对应 Android 的 applicationId，Apple 的 Bundle Identifier 或进程名
     *
     * @param appId APP 名称 String
     */
    appId(appId) {
        if (util.check.isString(appId)) {
            this.#properties[Property.APP_ID.getValue()] = appId;
        }
        return this;
    }

    /**
     * 您接入 SDK 的类型，如 OmniSDK, XGSDK 等
     *
     * @param sdk SDK 类型 String
     */
    sdk(sdk) {
        if (util.check.isString(sdk)) {
            this.#properties[Property.SDK.getValue()] = sdk;
        }
        return this;
    }

    /**
     * 您接入 SDK 的版本
     *
     * @param sdkVersion SDK 版本 String
     */
    sdkVersion(sdkVersion) {
        if (util.check.isString(sdkVersion)) {
            this.#properties[Property.SDK_VERSION.getValue()] = sdkVersion;
        }
        return this;
    }

    /**
     * 上传事件时的网络状态，如 WIFI、3G、4G 等
     *
     * @param networkType 网络状态 String
     */
    networkType(networkType) {
        if (util.check.isString(networkType)) {
            this.#properties[Property.NETWORK_TYPE.getValue()] = networkType;
        }
        return this;
    }

    /**
     * 用户设备的网络运营商，如中国移动，中国电信等
     *
     * @param carrier 网络运营商 String
     */
    carrier(carrier) {
        if (util.check.isString(carrier)) {
            this.#properties[Property.CARRIER.getValue()] = carrier;
        }
        return this;
    }

    /**
     * 数据时间相对 UTC 时间的偏移小时数
     *
     * @param zoneOffset 时区偏移小时数 Number
     */
    zoneOffset(zoneOffset) {
        if (util.check.isNumber(zoneOffset)) {
            this.#properties[Property.ZONE_OFFSET.getValue()] = zoneOffset;
        }
        return this;
    }

    /**
     * 对应同一个账号下拥有多个角色的场景，如 MMO
     *
     * @param roleId 角色 ID String
     */
    roleId(roleId) {
        if (util.check.isString(roleId)) {
            this.#properties[Property.ROLE_ID.getValue()] = roleId;
        }
        return this;
    }

    /**
     * GPS信息: 纬度*106
     *
     * @param latitude GPS 纬度信息 String
     */
    latitude(latitude) {
        if (util.check.isString(latitude)) {
            this.#properties[Property.LATITUDE.getValue()] = latitude;
        }
        return this;
    }

    /**
     * GPS信息: 经度*106
     *
     * @param longitude GPS 经度信息 String
     */
    longitude(longitude) {
        if (util.check.isString(longitude)) {
            this.#properties[Property.LONGITUDE.getValue()] = longitude;
        }
        return this;
    }

    /**
     * 服务器 ID
     *
     * @param serverId 服务器 ID String
     */
    serverId(serverId) {
        if (util.check.isString(serverId)) {
            this.#properties[Property.SERVER_ID.getValue()] = serverId;
        }
        return this;
    }

    /**
     * 手机号
     *
     * @param phoneNum 手机号 String
     */
    phoneNum(phoneNum) {
        if (util.check.isString(phoneNum)) {
            this.#properties[Property.PHONE_NUM.getValue()] = phoneNum;
        }
        return this;
    }

    /**
     * 从环境变量中采集信息
     *
     * @param environment 需要被采集的环境变量 {@link Environment}
     * @return 返回本身用于 fluent builder pattern
     */
    envProperty(environment) {
        if (environment instanceof Environment && Environment.hasOwnProperty(environment.getName()) && environment.hasProperty()) {
            this.#properties[environment.getProperty().getValue()] = environment.getValue();
        }
        return this;
    }
}

module.exports = {
    EventBuilder: EventBuilder,
    Event: Event
};
