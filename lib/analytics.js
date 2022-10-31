'use strict'

const path = require("path");

const util = require("./util/util");
const Property = require("./enum/property");
const Environment = require("./enum/environment");
const LocalLogAppender = require("./appender/local-log-appender");
const {Event} = require('./model/event')

function basicCheckForEvent(event) {
    if (!(event instanceof Event)) {
        return new Error("params for collect must be Event");
    }
    return undefined;
}

function basicCheckForRaw(event) {
    if (!util.check.isString(event) || util.check.isEmptyString(event)) {
        return new Error("params for collectRaw must be a string or params not empty");
    }
    return undefined;
}

class Analytics {
    #appender
    #sharedProperties

    constructor(appender, sharedProperties) {
        this.#appender = appender;
        this.#sharedProperties = sharedProperties;
    }

    collect(event) {
        let err = basicCheckForEvent(event);
        if (err) {
            console.error(err);
            return;
        }
        let msg = util.extend({}, event, this.#sharedProperties);
        this.#appender.append(JSON.stringify(msg));
    }

    collectRaw(event) {
        let err = basicCheckForRaw(event);
        if (err) {
            console.error(err);
            return;
        }
        this.#appender.append(event);
    }

    shutdown() {
        this.#appender.close();
    }
}

class AnalyticsBuilder {
    #sharedProperties;
    #enableEnvProperties;
    #eventOutputPath;

    constructor() {
        this.#sharedProperties = {}
        this.#enableEnvProperties = true
        this.#eventOutputPath = null
    }

    eventPath(eventPath) {
        if (util.check.isString(eventPath)) {
            this.#eventOutputPath = eventPath
        }
        return this
    }

    sharedProperty(property, value) {
        if (property instanceof Property && Property.hasOwnProperty(property.getName())) {
            this.#sharedProperties[property.getValue()] = value
        }
        return this
    }

    customSharedProperty(name, value) {
        if (util.check.isString(name)) {
            this.#sharedProperties[name] = value
        }
        return this
    }

    enableAutoEnvProperty(enable) {
        if (util.check.isBoolean(enable)) {
            this.#enableEnvProperties = enable
        }
        return this
    }

    envProperty(environment) {
        if (environment instanceof Environment && Environment.hasOwnProperty(environment.getName()) && environment.hasProperty()) {
            this.sharedProperty(environment.getProperty(), environment.getValue())
        }
        return this
    }

    #addEnvironmentPropertyToSharedProperties() {
        if (this.#enableEnvProperties) {
            // 如果用户设置了任何一个环境变量字段，则不添加默认的字段
            let keys = Object.keys(Environment)
            for (let i = 0, len = keys.length; i < len; i++) {
                let e = Environment[keys[i]];
                if (e.hasProperty() && this.#sharedProperties.hasOwnProperty(e.getProperty().getValue())) {
                    return;
                }
            }

            if (Environment.NOMAD_NAMESPACE.isExist()) {
                this.envProperty(Environment.NOMAD_NAMESPACE)
            }
            if (Environment.NOMAD_JOB_NAME.isExist()) {
                this.envProperty(Environment.NOMAD_JOB_NAME)
            }
        }
    }

    /**
     * fillConfigFilePath 填充 eventOutputPath
     * 如果 eventOutputPath 为空，则按照规则自动填充，规则如下：
     * 1.如果用户配置了 EVENT_OUTPUT_PATH 的环境变量，就按环境变量的取值，否则往下走
     * 2.如果 NOMAD_ALLOC_DIR 和 NOMAD_JOB_NAME 均配置了，说明在 Nomad 环境中，返回根据 Nomad 环境拼接的路径
     */
    #fillEventOutputPath() {
        if (Environment.EVENT_OUTPUT_PATH.isExist()) {
            this.#eventOutputPath = Environment.EVENT_OUTPUT_PATH.getValue();
            return
        }
        if (Environment.NOMAD_ALLOC_DIR.isExist() && Environment.NOMAD_JOB_NAME.isExist()) {
            this.#eventOutputPath = path.join(Environment.NOMAD_ALLOC_DIR.getValue(), 'data', Environment.NOMAD_JOB_NAME.getValue())
        }
    }

    build() {
        if (!this.#eventOutputPath) {
            this.#fillEventOutputPath();
        }
        this.#addEnvironmentPropertyToSharedProperties();
        let appender = new LocalLogAppender({dirname: this.#eventOutputPath})
        return new Analytics(appender, this.#sharedProperties)
    }
}

module.exports = AnalyticsBuilder;
