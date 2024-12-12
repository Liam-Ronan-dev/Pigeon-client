import React, { useEffect, useContext, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import useAPI from "@/hooks/useAPI";
import { AuthContext } from "@/contexts/AuthContext";
import PlaceholderImage from "@/assets/images/unsplash_5WWgv98ijbs.jpg";
import CustomButton from "@/components/CustomButton";

const FIELD_MAPPINGS = {
  pigeon: {
    titleField: "name", // Use "name" for pigeons
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
    titleField: "raceName", // Use "raceName" for races
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
    titleField: "treatmentName", // Use "treatmentName" for medical treatments
    fields: [
      { label: "Treatment Name", field: "treatmentName" },
      { label: "Description", field: "description" },
      { label: "Date Administered", field: "dateAdministered" },
      { label: "treatment Duration", field: "treatmentDuration" },
      { label: "administered By", field: "administeredBy" },
    ],
  },
};

const TYPE_MAPPINGS = {
  pigeons: "pigeon",
  races: "raceHistory", // Explicitly map to `raceHistory`
  medicals: "medicalTreatment",
};

const DynamicDetails = () => {
  const { id, type } = useLocalSearchParams(); // Get ID and type dynamically from the URL
  const router = useRouter();
  const { token } = useContext(AuthContext);
  const { getRequest, deleteRequest, data, loading, error } = useAPI<{ data: any }>();

  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (id && type) {
      // Ensure we get the correct singular type for the endpoint
      const singularType = TYPE_MAPPINGS[type];

      if (!singularType) {
        console.error(`Invalid type: ${type}`);
        return;
      }

      // Fetch details from the API
      const endpoint = `https://pigeon-api-ca-1.vercel.app/api/${singularType}/${id}`;
      console.log(`Fetching details from: ${endpoint}`); // Debug log
      getRequest(endpoint, {}, (response) => {
        setDetails(response.data);
      });
    }
  }, [id, type]);

  const handleDelete = () => {
    if (token) {
      const singularType = TYPE_MAPPINGS[type];

      if (!singularType) {
        console.error(`Invalid type for deletion: ${type}`);
        return;
      }

      const endpoint = `https://pigeon-api-ca-1.vercel.app/api/${singularType}/${id}`;
      deleteRequest(endpoint, token, () => {
        router.push(`/${type}`); // Navigate back to the original list
      });
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-white">Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Error: {error}</Text>
      </View>
    );
  }

  if (!details) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-white">Details not found.</Text>
      </View>
    );
  }

  const { titleField, fields } = FIELD_MAPPINGS[TYPE_MAPPINGS[type] || type] || {};

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-[#171622]">
        <ScrollView>
          {/* Image */}
          <Image
            source={details.imageUrl ? { uri: details.imageUrl } : PlaceholderImage}
            style={{ width: "100%", height: 300 }}
          />

          {/* Title Section */}
          <View className="bg-[#292C40] p-4 -mt-6 rounded-t-lg shadow-md">
            <Text className="text-white text-lg font-bold">
              {details[titleField] || "Untitled"}
            </Text>
          </View>

          {/* Dynamic Fields */}
          <View className="bg-[#1E1E2E] px-5 py-6">
            {fields.map((field) => (
              <View key={field.field} className="flex-row justify-between my-2">
                <Text className="text-[#9CA3AF]">{field.label}</Text>
                <Text className="text-white">
                  {Array.isArray(details[field.field])
                    ? details[field.field].join(", ") // Handle arrays like `positions`
                    : details[field.field] || "N/A"}
                </Text>
              </View>
            ))}
          </View>

          {/* Action Buttons */}
          <View className="flex-row justify-between px-5 py-4">
            <CustomButton
              title="Edit"
              containerStyles="bg-[#FF9B00] flex-1 mr-2"
              textStyles="text-white"
              onPress={() =>
                router.push({
                  pathname: `/${TYPE_MAPPINGS[type] || type}/[id]/edit`,
                  params: { id },
                })
              }
            />
            <CustomButton
              title="Delete"
              containerStyles="bg-[#DE4A4A] flex-1 ml-2"
              textStyles="text-white"
              onPress={handleDelete}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default DynamicDetails;
