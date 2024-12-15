import { ImageSourcePropType } from "react-native";
import { TYPE_MAPPINGS } from "@/config/detailsMappings";

export type AuthContextType = {
  token: undefined;
  register: (username: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export interface Pill {
  name: string; // Display name
  endpoint: string; // API endpoint
  type: string; // Type for routing
  fields: {
    heading: string; // Field to use for the heading
    details: string[]; // Fields to include as details
  };
}

export interface Item {
  _id: string;
  name?: string;
  imageUrl?: string;
  [key: string]: any;
}

export type ValidType = "pigeon" | "raceHistory" | "medicalTreatment";
 