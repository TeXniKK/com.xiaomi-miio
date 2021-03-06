const Homey = require("homey");
const model = ["sensor_switch.aq3"];

class AqaraButtonAdvanced extends Homey.Driver {
  onInit() {
    this.triggers = {
      button_click: new Homey.FlowCardTriggerDevice("button_click").register(),
      button_double_click: new Homey.FlowCardTriggerDevice("button_double_click").register(),
      button_long_click: new Homey.FlowCardTriggerDevice("button_long_click").register(),
      button_long_click_release: new Homey.FlowCardTriggerDevice("button_long_click_release").register(),
      button_shake: new Homey.FlowCardTriggerDevice("button_shake").register()
    };
  }

  onPairListDevices(data, callback) {
    if (Homey.app.gatewaysList.length > 0) {
      Homey.app.mihub
        .getDevicesByModel(model)
        .then(devices =>
          callback(
            null,
            devices.map(device => {
              return {
                name: device.modelInfo.name + " | " + device.sid,
                data: {
                  sid: device.sid
                },
                settings: {
                  deviceSid: device.sid,
                  gatewaySid: device.gatewaySid,
                  model: device.model,
                  modelCode: device.modelInfo.modelCode
                }
              };
            })
          )
        )
        .catch(() => callback(new Error(Homey.__("pair.no_devices_found"))));
    } else {
      callback(new Error(Homey.__("pair.no_gateways")));
    }
  }
}

module.exports = AqaraButtonAdvanced;
