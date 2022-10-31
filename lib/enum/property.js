class Property {
    // 毫秒级时间戳，表示事件发生的时间点
    static TIME_MS = new Property('TIME_MS', '#time_ms');
    // 登录之后可以获得的用于追踪用户的全局唯一标识
    static ACCOUNT_ID = new Property('ACCOUNT_ID', '#account_id');
    // 事件名称，每个事件都需要包含一个名称
    static EVENT_NAME = new Property('EVENT_NAME', '#event_name');
    // 数据来自客户端或是服务端
    static DATASOURCE = new Property('DATASOURCE', '#datasource');
    // 用户的来源 IP 地址
    static IP = new Property('IP', '#ip');
    // 用于将事件分组的字段，如果事件没有分组可以不填。 event_group 和 event_name 共同组成了事件的二级结构，每个 event_group
    // 可以对应多个 event_name。
    static EVENT_GROUP = new Property('EVENT_GROUP', '#event_group');
    // 用于事件全局去重
    static EVENT_UUID = new Property('EVENT_UUID', '#event_uuid');
    // 用户设备的系统语言(ISO 639-1，即两位小写英文字母)，如 zh, en 等,
    // https://zh.wikipedia.org/wiki/ISO_639-1%E4%BB%A3%E7%A0%81%E8%A1%A8
    static SYSTEM_LANGUAGE = new Property('SYSTEM_LANGUAGE', '#system_language');
    // 该事件属于哪个项目（如果埋点没有填写该字段，则在日志消费者处填写）
    static PROJECT_ID = new Property('PROJECT_ID', '#project_id');
    // 在同一个项目下的分组，比如国内渠道服，比如海外不同地区的不互通的分组
    static SERVICE_GROUP = new Property('SERVICE_GROUP', '#service_group');
    // 用于描述进行操作的用户属于哪个渠道
    static CHANNEL = new Property('CHANNEL', '#channel');
    // 用户设备的制造商，如 Apple，vivo 等
    static VENDOR = new Property('VENDOR', '#vendor');
    // 用户的设备 ID，iOS 取用户的 IDFV 或 UUID，Android 取 androidID
    static DEVICE_ID = new Property('DEVICE_ID', '#device_id');
    // 用户设备的屏幕高度，如 1920 等
    static SCREEN_HEIGHT = new Property('SCREEN_HEIGHT', '#screen_height');
    // 用户设备的屏幕高度，如 1080 等
    static SCREEN_WIDTH = new Property('SCREEN_WIDTH', '#screen_width');
    // 用户设备的型号，如 iPhone 8 等
    static DEVICE_MODEL = new Property('DEVICE_MODEL', '#device_model');
    // iOS 11.2.2、Android 8.0.0 等
    static OS_VERSION = new Property('OS_VERSION', '#os_version');
    // 如 Android、iOS 等
    static OS = new Property('OS', '#os');
    // 您的 APP 的版本
    static APP_VERSION = new Property('APP_VERSION', '#app_version');
    // 对应 Android 的 applicationId，Apple 的 Bundle Identifier 或进程名
    static APP_ID = new Property('APP_ID', '#app_id');
    // 您接入 SDK 的类型，如 OmniSDK, XGSDK 等
    static SDK = new Property('SDK', '#sdk');
    // 您接入 SDK 的版本
    static SDK_VERSION = new Property('SDK_VERSION', '#sdk_version');
    // 上传事件时的网络状态，如 WIFI、3G、4G 等
    static NETWORK_TYPE = new Property('NETWORK_TYPE', '#network_type');
    // 用户设备的网络运营商，如中国移动，中国电信等
    static CARRIER = new Property('CARRIER', '#carrier');
    // 数据时间相对 UTC 时间的偏移小时数
    static ZONE_OFFSET = new Property('ZONE_OFFSET', '#zone_offset');
    // 对应同一个账号下拥有多个角色的场景，如 MMO
    static ROLE_ID = new Property('ROLE_ID', '#role_id');
    // GPS信息: 纬度*106
    static LATITUDE = new Property('LATITUDE', '#latitude');
    // GPS信息: 经度*106
    static LONGITUDE = new Property('LONGITUDE', '#longitude');
    // 服务器 ID
    static SERVER_ID = new Property('SERVER_ID', '#server_id');
    // 手机号
    static PHONE_NUM = new Property('PHONE_NUM', '#phone_num');
    // Nomad Region
    static NOMAD_REGION = new Property('NOMAD_REGION', 'nomad_region');
    // NomadDc Nomad Datacenter
    static NOMAD_DC = new Property('NOMAD_DC', 'nomad_dc');
    // Nomad Namespace
    static NOMAD_NAMESPACE = new Property('NOMAD_NAMESPACE', 'nomad_namespace');
    // Nomad Job Name
    static NOMAD_JOB_NAME = new Property('NOMAD_JOB_NAME', 'nomad_job_name');
    // Nomad Job Id
    static NOMAD_JOB_ID = new Property('NOMAD_JOB_ID', 'nomad_job_id');
    // Nomad Group Name 参考
    static NOMAD_GROUP_NAME = new Property('NOMAD_GROUP_NAME', 'nomad_group_name');
    // Nomad Task Name
    static NOMAD_TASK_NAME = new Property('NOMAD_TASK_NAME', 'nomad_task_name');
    // NomadAllocId nomad alloc id
    static NOMAD_ALLOC_ID = new Property('NOMAD_ALLOC_ID', 'nomad_alloc_id');
    static UNKNOWN = new Property('UNKNOWN', 'unknown');

    #name;
    #value;

    constructor(name, value) {
        this.#name = name;
        this.#value = value;
    }

    getName() {
        return this.#name;
    }

    getValue() {
        return this.#value;
    }
}

Object.freeze(Property)

module.exports = Property;
