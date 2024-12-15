// config/detailsMappings.ts
export const FIELD_MAPPINGS = {
  pigeon: {
    titleField: "name",
    fields: [
      { label: "Breed", field: "breed" },
      { label: "Sex", field: "sex" },
      { label: "Body Type", field: "bodyType" },
      { label: "Colour", field: "colour" },
      { label: "Eye Colour", field: "eyeColour" },
      { label: "Diet", field: "diet" },
      { label: "Hatch Date", field: "hatchDate" },
    ],
  },
  raceHistory: {
    titleField: "raceName",
    fields: [
      { label: "Date", field: "date" },
      { label: "Distance", field: "distance" },
      { label: "Positions", field: "positions" },
      { label: "Total Participants", field: "totalParticipants" },
      { label: "Wind Speed", field: "windSpeed" },
      { label: "Wind Direction", field: "windDirection" },
      { label: "Notes", field: "notes" },
    ],
  },
  medicalTreatment: {
    titleField: "treatmentName",
    fields: [
      { label: "Treatment Name", field: "treatmentName" },
      { label: "Description", field: "description" },
      { label: "Date Administered", field: "dateAdministered" },
      { label: "Treatment Duration", field: "treatmentDuration" },
      { label: "Administered By", field: "administeredBy" },
    ],
  },
};

export const TYPE_MAPPINGS = {
  pigeons: "pigeon",
  races: "raceHistory",
  medicals: "medicalTreatment",
};


