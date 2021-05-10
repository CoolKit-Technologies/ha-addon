# Home-Assistant-AddOn

## 通过 Add-on 安装

-   参考[Wiki](https://gitee.com/eWeLink/Home-Assistant-AddOn/wikis/%E4%BD%BF%E7%94%A8%E7%AE%80%E4%BB%8B?sort_id=3862199)

## 通过 Docker 安装

-   **使用 host 网络用于发现和控制 DIY 和局域网设备**
-   **暂不支持端口映射，请确保宿主机的 3000 端口处于空闲状态**

1. `git clone https://gitee.com/eWeLink/Home-Assistant-AddOn.git`
2. `cd Home-Assistant-AddOn/eWeLink_Smart_Home/`
3. `docker build . -t ewelink_smart_home`
4. 运行以下代码，将`yourHomeAssistantUrl`替换成当前网络下的 HomeAssistant 地址，将`yourHomeAssistantAuth`替换成您在 HA 里创建的长期令牌(长期令牌的获取请参考[Wiki](https://gitee.com/eWeLink/Home-Assistant-AddOn/wikis/%E4%BD%BF%E7%94%A8%E7%AE%80%E4%BB%8B?sort_id=3862199))

```
docker run -d \
    --restart=always \
    --network host \
    -e HA_URL=yourHomeAssistantUrl \
    -e AUTH=yourHomeAssistantAuth \
    ewelink_smart_home
```

-   示例

```
  docker run -d \
  --restart=always \
  --network host \
  -e HA_URL=http://192.168.1.100:8123 \
  -e AUTH=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI5MmVkZGZmMTJmMTc0MjQ4OWE1M2Y2ODVjODJlY2VlOSIsImlhdCI6MTYyMDI5NDQyOCwiZXhwIjoxOTM1NjU0NDI4fQ.pxKG_279342fHVPd4F1IvsYgZLHlkVINoFyWgcNDwaQ \
  ewelink_smart_home
```

5. 访问`3000`端口
