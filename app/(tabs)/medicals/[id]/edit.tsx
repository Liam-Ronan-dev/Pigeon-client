import React, { useEffect, useState, useContext } from "react";
import { View, Text, TextInput, ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import useAPI from "@/hooks/useAPI";
import CustomButton from "@/components/CustomButton";
import { AuthContext } from "@/contexts/AuthContext";

const EditRace = () => {
  const { id } = useLocalSearchParams(); // Get race ID from URL
  const router = useRouter();
  const { token } = useContext(AuthContext);

  const { getRequest, putRequest, data, loading, error } = useAPI<{ data: any }>();
  const [form, setForm] = useState({
    treatmentName: "",
    description: "",
    dateAdministered: "",
    treatmentDuration: "",
    administeredBy: "",
  });

  useEffect(() => {
    if (id) {
      getRequest(
        `https://pigeon-api-ca-1.vercel.app/api/medicalTreatment/${id}`,
        {},
        (response) => {
          // Populate form state with API response
          setForm({
            treatmentName: response.data.treatmentName || "",
            description: response.data.description || "",
            dateAdministered: response.data.dateAdministered?.split("T")[0] || "", // Extract date without time
            treatmentDuration: response.data.treatmentDuration || "",
            administeredBy: response.data.administeredBy || "",
          });
        },
      );
    }
  }, [id]);

  const handleInputChange = (field: string, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const handleSubmit = () => {
    if (!id || !token) {
      console.error("Missing ID or token for edit.");
      return;
    }

    // Send PUT request
    putRequest(`https://pigeon-api-ca-1.vercel.app/api/medicalTreatment/${id}`, form, token, () => {
      console.log("medical Treatment edited successfully");
      router.push("/medicals");
    });
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="text-lg font-semibold text-gray-700 mt-2">Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 text-lg font-medium">Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="bg-[#171622]">
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 justify-center p-4">
          <Text className="text-2xl font-bold mb-5 mt-5 text-white">Edit Treatment</Text>

          <TextInput
            className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
            placeholder="Treatment name"
            value={form.treatmentName}
            onChangeText={(value) => handleInputChange("treatmentName", value)}
          />
          <TextInput
            className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
            placeholder="description"
            value={form.description}
            onChangeText={(value) => handleInputChange("description", value)}
          />
          <TextInput
            className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
            placeholder="date Administered"
            value={form.dateAdministered}
            onChangeText={(value) => handleInputChange("dateAdministered", value)}
          />
          <TextInput
            className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
            placeholder="treatment Duration"
            value={form.treatmentDuration}
            onChangeText={(value) => handleInputChange("treatmentDuration", value)}
          />
          <TextInput
            className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
            placeholder="administered By"
            value={form.administeredBy}
            onChangeText={(value) => handleInputChange("administeredBy", value)}
          />

          <CustomButton
            onPress={handleSubmit}
            title="Save changes"
            containerStyles="bg-[#FF9B00] mb-5 mt-5 p-2"
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </ScrollView>
  );
};

export default EditRace;
