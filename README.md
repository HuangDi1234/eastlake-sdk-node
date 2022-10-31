# EastLake SDK Node.js

## Quick Start

### 读取环境变量，生成日志路径

环境变量优先级从高到低：

- EVENT_OUTPUT_PATH
- NOMAD_ALLOC_DIR + /data/ + NOMAD_JOB_NAME

```js
const eastlake = require("eastlake-sdk-node");

let analytics = new eastlake.AnalyticsBuilder().sharedProperty(Property.EVENT_NAME, 'login').build();
let event = new eastlake.EventBuilder().customProperty('product_id', '1001').accountId('123456789').build();
analytics.collect(event);
```

### 自定义日志文件目录

```js
const eastlake = require("eastlake-sdk-node");

let analytics = new eastlake.AnalyticsBuilder().eventPath('/data/logs').sharedProperty(Property.EVENT_NAME, 'login').build();
let event = new eastlake.EventBuilder().customProperty('product_id', '1001').accountId('123456789').build();
analytics.collect(event);
```
