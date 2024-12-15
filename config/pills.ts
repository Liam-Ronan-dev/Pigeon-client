import { Pill } from "@/types";

export const PILLS: Pill[] = [
  {
    name: "Pigeons",
    endpoint: "https://pigeon-api-ca-1.vercel.app/api/pigeons",
    type: "pigeons",
    fields: {
      heading: "name",
      details: ["breed", "colour", "sex"],
    },
  },
  {
    name: "Treatments",
    endpoint: "https://pigeon-api-ca-1.vercel.app/api/medicaltreatments",
    type: "medicals",
    fields: {
      heading: "treatmentName",
      details: ["administeredBy", "treatmentDuration"],
    },
  },
  {
    name: "Races",
    endpoint: "https://pigeon-api-ca-1.vercel.app/api/raceHistories",
    type: "races",
    fields: {
      heading: "raceName",
      details: ["date", "distance"],
    },
  },
];
