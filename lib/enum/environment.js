const Property = require("./property");

class Environment {

    // 用于配置日志输出路径的环境变量，不需要作为埋点事件的字段被采集
    static EVENT_OUTPUT_PATH = new Environment('EVENT_OUTPUT_PATH', null);
    //  Nomad 所属的 Region
    static NOMAD_REGION = new Environment('NOMAD_REGION', Property.NOMAD_REGION);
    // Nomad 所属的 datacenter
    static NOMAD_DC = new Environment('NOMAD_DC', Property.NOMAD_DC);
    // Nomad Job 所属的 namespace
    static NOMAD_NAMESPACE = new Environment('NOMAD_NAMESPACE', Property.NOMAD_NAMESPACE);
    // Nomad Job 的名字
    static NOMAD_JOB_NAME = new Environment('NOMAD_JOB_NAME', Property.NOMAD_JOB_NAME);
    // Nomad Job 的 ID
    static NOMAD_JOB_ID = new Environment('NOMAD_JOB_ID', Property.NOMAD_JOB_ID);
    // Nomad Group 的名字
    static NOMAD_GROUP_NAME = new Environment('NOMAD_GROUP_NAME', Property.NOMAD_GROUP_NAME);
    // Nomad Task 的名字
    static NOMAD_TASK_NAME = new Environment('NOMAD_TASK_NAME', Property.NOMAD_TASK_NAME);
    // Nomad Alloc 路径，不需要作为 property 被采集
    static NOMAD_ALLOC_DIR = new Environment('NOMAD_ALLOC_DIR', null);
    // Nomad Alloc ID
    static NOMAD_ALLOC_ID = new Environment('NOMAD_ALLOC_ID', Property.NOMAD_ALLOC_ID);

    #name;
    #property;

    constructor(name, property) {
        this.#name = name;
        this.#property = property;
    }

    getName() {
        return this.#name;
    }

    getProperty() {
        return this.#property;
    }

    hasProperty() {
        return this.#property !== null
    }

    isExist() {
        return process.env.hasOwnProperty(this.#name) && process.env[this.#name] !== ''
    }

    getValue() {
        return process.env[this.#name];
    }

}

Object.freeze(Environment);

module.exports = Environment;
