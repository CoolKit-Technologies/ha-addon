# eWeLink Smart Home

---

## Troubleshooting

-   To solve `Failed to call service switch/turn_on. Service not found.` issue, use`File editor` to edit `configuration.yaml`. Append the following info to end of file:

```
switch:
  - platform: template
    switches:
      ewelink_virtual_switch:
        turn_on:
          service: switch.turn_on
        turn_off:
          service: switch.turn_off

```
