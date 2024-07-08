import { StatRange, StatSum } from "@/types/fitness";

const heartRateAttributeName = "HKQuantityTypeIdentifierHeartRate";
const distanceAttributeName = "HKQuantityTypeIdentifierDistanceWalkingRunning";
const basalEnergyAttributeName = "HKQuantityTypeIdentifierBasalEnergyBurned";
const activeEnergyAttributeName = "HKQuantityTypeIdentifierActiveEnergyBurned";
const runningSpeedAttributeName = "HKQuantityTypeIdentifierRunningSpeed";
const stepCountAttributeName = "HKQuantityTypeIdentifierStepCount";

export const attributes = {
  heartRateAttributeName,
  distanceAttributeName,
  basalEnergyAttributeName,
  activeEnergyAttributeName,
  runningSpeedAttributeName,
  stepCountAttributeName,
};

const findElementByType = (type: string, elements: Element[]) => {
  return elements.find((el) => el.getAttribute("type") === type);
};

export const mapToStatRange = (el: Element) => {
  const statRange: StatRange = {
    average: getAttributeOrEmpty(el, "average"),
    minimun: getAttributeOrEmpty(el, "minimun"),
    maximum: getAttributeOrEmpty(el, "maximum"),
    unit: getAttributeOrEmpty(el, "unit"),
  };
  return statRange;
};

export const mapToStatSum = (el: Element) => {
  const statSum: StatSum = {
    sum: getAttributeOrEmpty(el, "sum"),
    unit: getAttributeOrEmpty(el, "unit"),
  };
  return statSum;
};

type StatMappingFunc =
  | ((el: Element) => StatRange)
  | ((el: Element) => StatSum);

export const getStatsFromElement = (
  type: string,
  elements: Element[],
  mappingFunc: StatMappingFunc
) => {
  const el = findElementByType(type, elements);

  if (!el) {
    return;
  }

  return mappingFunc(el);
};

const getAttributeOrEmpty = (element: Element, attribute: string) =>
  element.getAttribute(attribute) ?? "";
