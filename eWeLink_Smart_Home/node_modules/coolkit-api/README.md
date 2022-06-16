# Coolkit API

Coolkit API 模块

## API 分布

```
src/
    device/ - 设备相关接口
    open-platform/ - 开放平台接口
```

## 使用方法

```ts
// 1. 导入 coolkit-api 的包
import CkApi from 'coolkit-api';

// 2. 初始化一些参数
CkApi.init({
    appId: 'your-appId',
    appSecret: 'your-appSecret'
});

// 3. 调用接口（要先调用登录接口，才能调其它的接口）
await CkApi.user.login(params);

// 4. 在登录成功后，调用其它的接口
await CkApi.device.getThingList(params);
```

根据[酷宅开放平台](https://coolkit-carl.gitee.io/apidocs/#/)的文档规范，接口被分成了五个部分：

* 用户 - `CkApi.user`

* 设备 - `CkApi.device`

* 家庭和房间 - `CkApi.family`

* 首页 - `CkApi.home`

* 消息 - `CkApi.message`

使用 debug 模式：

```js
CkApi.init({
    appId: 'your-appid',
    appSecret: 'your-appSecret',
    debug: true,        // 开启调试模式
    useTestEnv: true,   // 使用测试环境
    at: 'your-at',
    rt: 'your-rt',
    domain: 'your-domain',
})
```

## 错误码列表

| 错误码 | 错误消息 |
| - | - |
| `91001` | 无效的国家码 |

## 上传代码

1. `$ npm run build`

2. `$ npm login --registry=http://172.20.1.22:4873/`

3. `$ npm publish --registry=http://172.20.1.22:4873/`
