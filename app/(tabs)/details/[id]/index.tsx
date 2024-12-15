import React, { useEffect, useContext, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import useAPI from "@/hooks/useAPI";
import { AuthContext } from "@/contexts/AuthContext";
import CustomButton from "@/components/CustomButton";
import { FIELD_MAPPINGS, TYPE_MAPPINGS } from "@/config/detailsMappings";
import { ValidType } from "@/types";

const DynamicDetails = () => {
  const { id, type } = useLocalSearchParams<{ id: string; type: ValidType }>(); // Get ID and type dynamically from the URL
  const router = useRouter();
  const { token } = useContext(AuthContext);
  const { getRequest, deleteRequest, data, loading, error } = useAPI<{ data: any }>();

  const [details, setDetails] = useState<any>(null);

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

  const { titleField, fields } = FIELD_MAPPINGS[TYPE_MAPPINGS[type] as keyof typeof FIELD_MAPPINGS];

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-[#171622]">
        <ScrollView>
          {/* Image */}
          <Image
            source={
              details.imageUrl
                ? { uri: details.imageUrl }
                : require("@/assets/images/unsplash_5WWgv98ijbs.jpg")
            }
            style={{ width: "100%", height: 300, resizeMode: "cover" }} // Adjust height here (300px example)
            className="rounded-b-lg"
          />

          {/* Title Section */}
          <View className="bg-[#292C40] p-5 shadow-md">
            <Text className="text-white text-2xl font-bold">
              {details[titleField] || "Untitled"}
            </Text>
          </View>

          {/* Dynamic Fields */}
          <View className="bg-[#1E1E2E] px-5 py-6 h-full">
            {fields.map((field) => (
              <View key={field.field} className="flex-row justify-between my-2">
                <Text className="text-[#9CA3AF]">{field.label}</Text>
                <Text className="text-[#FF9B00]">
                  {Array.isArray(details[field.field])
                    ? details[field.field].join(", ") // Handle arrays like `positions`
                    : details[field.field] || "N/A"}
                </Text>
              </View>
            ))}
            {/* Action Buttons */}
            <View className="flex-row justify-between mt-10 gap-5">
              <CustomButton
                title="Edit"
                containerStyles="bg-[#FF9B00] flex-1 p-3"
                textStyles="text-white"
                onPress={() =>
                  router.push({
                    pathname: "/details/[id]/edit",
                    params: { id, type: TYPE_MAPPINGS[type] },
                  })
                }
              />
              <CustomButton
                title="Delete"
                containerStyles="bg-[#DE4A4A] flex-1 p-3"
                textStyles="text-white"
                onPress={handleDelete}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default DynamicDetails;
