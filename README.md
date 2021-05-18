# Source Code Link

-   [FrontEnd](https://github.com/CoolKit-Technologies/ha-addon-frontEnd)
-   [BackEnd](https://github.com/CoolKit-Technologies/ha-addon-backEnd)

# Home-Assistant-AddOn

## ADD-ON:

-   Refer to [Wiki](https://bit.ly/eWeLinkaddon)

## DOCKER:

-   **Use host network to discover and control DIY and LAN devices.**
-   **Currently, port forwarding is not supported, please make sure that port 3000 is idle.**

1. `git clone https://github.com/CoolKit-Technologies/ha-addon.git`
2. `cd Home-Assistant-AddOn/eWeLink_Smart_Home/`
3. `docker build . -t ewelink_smart_home`
4. Run the code below. Replace `yourHomeAssistantUrl` with your current Home Assisant URL. Replace `yourHomeAssistantAuth` with a long lived access token.(How to create Long Lived Access Tokens [Wiki](https://bit.ly/eWeLinkaddon))

```
docker run -d \
    --restart=always \
    --network host \
    -e HA_URL=yourHomeAssistantUrl \
    -e AUTH=yourHomeAssistantAuth \
    ewelink_smart_home
```

-   Example:

```
  docker run -d \
  --restart=always \
  --network host \
  -e HA_URL=http://192.168.1.100:8123 \
  -e AUTH=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI5MmVkZGZmMTJmMTc0MjQ4OWE1M2Y2ODVjODJlY2VlOSIsImlhdCI6MTYyMDI5NDQyOCwiZXhwIjoxOTM1NjU0NDI4fQ.pxKG_279342fHVPd4F1IvsYgZLHlkVINoFyWgcNDwaQ \
  ewelink_smart_home
```

5. Access port `3000`.
