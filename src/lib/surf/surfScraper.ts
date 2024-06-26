"use server";

import { SurfForecastData } from "./types";

type Section = {
  title: string;
  data: string[];
};

export const scrapeForSurf = async () => {
  const siteData = await fetchSite();
  const section = getSection({ siteData, sectionName: "ottawa" });

  if (!section) return;

  const data = extractSurfData(section);

  return data;
};

const surfForecastUrl =
  "https://forecast.weather.gov/product.php?site=GRR&issuedby=GRR&product=SRF&format=CI&version=1&glossary=1";

const fetchSite = async () => {
  const siteData = await fetch(surfForecastUrl).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.text();
  });
  return siteData;
};

const sectionNames = {
  ottawa: "Ottawa",
  muskegon: "Muskegon",
};

type GetSectionParams = {
  siteData: string;
  sectionName: keyof typeof sectionNames;
};

const getSection = (params: GetSectionParams) => {
  const { siteData, sectionName } = params;
  const presplit = siteData.split("glossaryProduct");
  const sectionData = presplit[1]
    .split("$$")
    .find((sect) => sect.includes(sectionNames[sectionName]));
  return sectionData;
};

const extractSurfData = (sectionData: string) => {
  let lines = sectionData
    .split("\n")
    .filter((l) => l != "")
    .map((l) => removeCarrotedText(l).trim());

  const sections = splitOnSection(lines);

  const today = sections[1];

  return createSurfData(today);
};

const removeCarrotedText = (text: string): string => {
  const chars: string[] = [];
  let addFlag = true;
  Array.from(text).forEach((c) => {
    if (c === "<") {
      addFlag = false;
      return;
    }
    if (c === ">") {
      addFlag = true;
      return;
    }
    if (addFlag) {
      chars.push(c);
    }
  });
  return chars.join("");
};

const splitOnSection = (lines: string[]) => {
  const sections: Section[] = [];

  const titleSection: Section = {
    title: "title",
    data: [],
  };
  let runningSection: Section = titleSection;

  lines.forEach((li) => {
    if (li.startsWith(".")) {
      sections.push({ ...runningSection });
      runningSection = {
        title: li,
        data: [],
      };
    } else {
      runningSection.data.push(li);
    }
  });

  return sections;
};

const createSurfData = (section: Section) => {
  const surfData: SurfForecastData = {
    swimRisk: undefined,
    waveHeight: undefined,
    wavePeriod: undefined,

    uvIndex: undefined,
    waterTemp: undefined,

    weather: undefined,

    highTemp: undefined,
    winds: undefined,

    sunrise: undefined,
    sunset: undefined,
  } as SurfForecastData;

  const data = section.data;
  const surfDataKeys = Object.keys(surfData);
  const dotRegex = /\.{2,}/;

  for (let i = 0; i < data.length; i++) {
    const line = data[i];
    const normalLine = line.replaceAll(" ", "").toLowerCase();

    surfDataKeys.forEach((key) => {
      const keyAsSurfKey = key as keyof typeof surfData;
      const normalKey = key.toLowerCase();
      //Check if field already has data
      if (!!surfData[keyAsSurfKey]) return;

      if (normalLine.includes(normalKey)) {
        //Add current line
        const lineParts = line.split(".").filter((p) => p != "");
        surfData[keyAsSurfKey] = lineParts[1];

        //check lines ahead

        while (i < data.length - 1 && !data[i + 1].match(dotRegex)) {
          surfData[keyAsSurfKey] += ` ${data[++i]}`;
        }
      }
    });
  }

  return surfData;
};
