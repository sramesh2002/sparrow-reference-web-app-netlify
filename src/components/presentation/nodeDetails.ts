import {
  GATEWAY_MESSAGE,
  SENSOR_MESSAGE,
  NODE_MESSAGE,
} from "../../constants/ui";
import NodeDetailViewModel from "../../models/NodeDetailViewModel";
import {
  getFormattedChartData,
  getFormattedHumidityData,
  getFormattedLastSeen,
  getFormattedPressureData,
  getFormattedTemperatureData,
  getFormattedSalinityData,
  getFormattedVoltageData,
  getFormattedCountData,
  getFormattedTotalData,
  calculateLoraSignalStrength,
  calculateSignalTooltip,
} from "./uiHelpers";
import Node from "../../services/alpha-models/Node";
import Gateway from "../../services/alpha-models/Gateway";
import Reading from "../../services/alpha-models/readings/Reading";
import TemperatureSensorSchema from "../../services/alpha-models/readings/TemperatureSensorSchema";
import HumiditySensorSchema from "../../services/alpha-models/readings/HumiditySensorSchema";
import PressureSensorSchema from "../../services/alpha-models/readings/PressureSensorSchema";
import VoltageSensorSchema from "../../services/alpha-models/readings/VoltageSensorSchema";
import SalinitySensorSchema from "../../services/alpha-models/readings/SalinitySensorSchema";
import CountSensorSchema from "../../services/alpha-models/readings/CountSensorSchema";
import TotalSensorSchema from "../../services/alpha-models/readings/TotalSensorSchema";
import Config from "../../../config";

// eslint-disable-next-line import/prefer-default-export
export function getNodeDetailsPresentation(
  node?: Node,
  gateway?: Gateway,
  readings?: Reading<unknown>[]
): NodeDetailViewModel {
  return {
    gateway: {
      name: gateway?.name || GATEWAY_MESSAGE.NO_NAME,
    },
    node: node
      ? {
          name: node.name || NODE_MESSAGE.NO_NAME,
          lastActivity: getFormattedLastSeen(node.lastActivity),
          location: node?.location || NODE_MESSAGE.NO_LOCATION,
          temperature:
            getFormattedTemperatureData(node.temperature) ||
            SENSOR_MESSAGE.NO_TEMPERATURE,
          humidity:
            getFormattedHumidityData(node.humidity) ||
            SENSOR_MESSAGE.NO_HUMIDITY,
          pressure:
            getFormattedPressureData(node.pressure) ||
            SENSOR_MESSAGE.NO_PRESSURE,
          salinity:
            getFormattedSalinityData(node.salinity) ||
            SENSOR_MESSAGE.NO_SALINITY,
          voltage:
            getFormattedVoltageData(node.voltage) || SENSOR_MESSAGE.NO_VOLTAGE,
          count: getFormattedCountData(node.count) || SENSOR_MESSAGE.NO_COUNT,
          total: getFormattedTotalData(node.total) || SENSOR_MESSAGE.NO_TOTAL,
          bars: node.bars || "0",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          barsIconPath: calculateLoraSignalStrength(node.bars || "0"),
          barsTooltip: calculateSignalTooltip(node.bars || "0"),
        }
      : undefined,
    readings: readings
      ? {
          temperature: getFormattedChartData(readings, TemperatureSensorSchema),
          humidity: getFormattedChartData(readings, HumiditySensorSchema),
          pressure: getFormattedChartData(readings, PressureSensorSchema),
          salinity: getFormattedChartData(readings, SalinitySensorSchema),
          voltage: getFormattedChartData(readings, VoltageSensorSchema),
          count: getFormattedChartData(readings, CountSensorSchema),
          total: getFormattedChartData(readings, TotalSensorSchema),
        }
      : undefined,
    readOnly: Config.readOnly,
  };
}
