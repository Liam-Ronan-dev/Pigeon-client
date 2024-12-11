import React, { useEffect, useState, useContext } from "react";
import { View, Text, TextInput, ActivityIndicator } from "react-native";
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
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 p-4 bg-gray-100">
        <Text className="text-2xl font-bold text-gray-900 mb-4">Edit Race</Text>

        <TextInput
          className="border p-2 mb-4"
          placeholder="Treatment name"
          value={form.treatmentName}
          onChangeText={(value) => handleInputChange("treatmentName", value)}
        />
        <TextInput
          className="border p-2 mb-4"
          placeholder="description"
          value={form.description}
          onChangeText={(value) => handleInputChange("description", value)}
        />
        <TextInput
          className="border p-2 mb-4"
          placeholder="date Administered"
          value={form.dateAdministered}
          onChangeText={(value) => handleInputChange("dateAdministered", value)}
        />
        <TextInput
          className="border p-2 mb-4"
          placeholder="treatment Duration"
          value={form.treatmentDuration}
          onChangeText={(value) => handleInputChange("treatmentDuration", value)}
        />
        <TextInput
          className="border p-2 mb-4"
          placeholder="administered By"
          value={form.administeredBy}
          onChangeText={(value) => handleInputChange("administeredBy", value)}
        />

        <CustomButton
          title="Save Changes"
          onPress={handleSubmit}
          containerStyles="mt-3"
          textStyles="text-black"
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default EditRace;
