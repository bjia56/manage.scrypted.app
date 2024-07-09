import { DeviceCreator, DeviceCreatorSettings, Setting } from "@scrypted/types";
import { useRouter } from "vue-router";
import { connectedClient } from "./common/client";
import { goDeviceId } from "./id-device";

export async function createDevice(router: ReturnType<typeof useRouter>, id: string, settings: Setting[]) {
  const device = connectedClient.value.systemManager.getDeviceById<DeviceCreator>(id);
  const deviceCreatorSettings: DeviceCreatorSettings = {};
  for (const setting of settings) {
    deviceCreatorSettings[setting.key] = setting.value;
  }
  const newId = await device.createDevice(deviceCreatorSettings);
  goDeviceId(router, newId);
}