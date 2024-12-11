import React, { useEffect, useContext } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import useAPI from "@/hooks/useAPI";
import CustomButton from "@/components/CustomButton";
import { AuthContext } from "@/contexts/AuthContext";

interface MedicalTreatment {
  _id: string;
  treatmentName: string;
  description: string;
  dateAdministered: string;
  treatmentDuration: string;
  administeredBy?: number;
}

export default function Tab() {
  const { getRequest, deleteRequest, data, loading, error } = useAPI<{ data: MedicalTreatment }>(); // Type for single pigeon
  const { id } = useLocalSearchParams(); // Get the pigeon ID from the route params
  const router = useRouter();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (id) {
      getRequest(`https://pigeon-api-ca-1.vercel.app/api/medicalTreatment/${id}`);
    }
  }, [id]);

  const handleDelete = () => {
    if (!token || !id) {
      console.error("Token or ID is missing. Cannot delete.");
      return;
    }

    try {
      console.log(`Attempting to delete Medical Treatment with ID: ${id}`);
      deleteRequest(`https://pigeon-api-ca-1.vercel.app/api/medicalTreatment/${id}`, token);
      console.log("Medical Treatment deleted successfully!");
      router.push("/medicals"); // Navigate back to the pigeons list
    } catch (err) {
      console.error("Error deleting Medical Treatment:", err);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="text-lg font-semibold text-gray-700 mt-2">
          Loading Medical Treatment Details...
        </Text>
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

  const medical = data?.data;

  if (!medical) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-700 font-medium">Medical Treatment not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <View className="p-4">
          <Text className="text-2xl font-bold text-gray-800 mb-2">{medical.treatmentName}</Text>
          <Text className="text-lg text-gray-600">description: {medical.description}</Text>
          <Text className="text-lg text-gray-600">
            Date Administered: {medical.dateAdministered}
          </Text>
          <Text className="text-lg text-gray-600">
            treatment duration: {medical.treatmentDuration}
          </Text>
          <Text className="text-lg text-gray-600">administered By: {medical.administeredBy}</Text>
        </View>
        <CustomButton
          title="Edit Medical Treatment"
          onPress={() =>
            router.push({ pathname: "/medicals/[id]/edit", params: { id: medical._id } })
          }
          containerStyles="mt-3"
          textStyles="text-black"
        />
        {/* Delete Button */}
        <CustomButton
          title="Delete Medical Treatment"
          onPress={handleDelete}
          containerStyles="mt-3"
          textStyles="text-black"
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
