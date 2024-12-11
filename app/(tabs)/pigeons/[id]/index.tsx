import React, { useEffect, useContext } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import useAPI from "@/hooks/useAPI";
import CustomButton from "@/components/CustomButton";
import { AuthContext } from "@/contexts/AuthContext";

interface Pigeon {
  _id: string;
  name: string;
  breed: string;
  colour: string;
  imageUrl?: string;
  ringNumber?: string;
  sex?: string;
  hatchDate?: string;
  diet?: string;
}

export default function Tab() {
  const { getRequest, deleteRequest, data, loading, error } = useAPI<{ data: Pigeon }>(); // Type for single pigeon
  const { id } = useLocalSearchParams(); // Get the pigeon ID from the route params
  const router = useRouter();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (id) {
      getRequest(`https://pigeon-api-ca-1.vercel.app/api/pigeon/${id}`);
    }
  }, [id]);

  const handleDelete = () => {
    if (!token || !id) {
      console.error("Token or ID is missing. Cannot delete.");
      return;
    }

    try {
      console.log(`Attempting to delete pigeon with ID: ${id}`);
      deleteRequest(`https://pigeon-api-ca-1.vercel.app/api/pigeon/${id}`, token);
      console.log("Pigeon deleted successfully!");
      router.push("/pigeons"); // Navigate back to the pigeons list
    } catch (err) {
      console.error("Error deleting pigeon:", err);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="text-lg font-semibold text-gray-700 mt-2">Loading Pigeon Details...</Text>
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

  const pigeon = data?.data;

  if (!pigeon) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-700 font-medium">Pigeon not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <View className="p-4">
          {pigeon.imageUrl && (
            <Image
              source={{ uri: pigeon.imageUrl }}
              style={{ height: 200, borderRadius: 8, marginBottom: 16 }}
            />
          )}
          <Text className="text-2xl font-bold text-gray-800 mb-2">{pigeon.name}</Text>
          <Text className="text-lg text-gray-600">Breed: {pigeon.breed}</Text>
          <Text className="text-lg text-gray-600">Colour: {pigeon.colour}</Text>
          <Text className="text-lg text-gray-600">Sex: {pigeon.sex}</Text>
          <Text className="text-lg text-gray-600">Ring Number: {pigeon.ringNumber}</Text>
          <Text className="text-lg text-gray-600">
            Hatch Date: {new Date(pigeon.hatchDate || "").toLocaleDateString()}
          </Text>
          <Text className="text-lg text-gray-600">Diet: {pigeon.diet}</Text>
        </View>
        <CustomButton
          title="Edit Pigeon"
          onPress={() =>
            router.push({ pathname: "/pigeons/[id]/edit", params: { id: pigeon._id } })
          }
          containerStyles="mt-3 bg-blue-500"
          textStyles="text-white font-medium"
        />
        {/* Delete Button */}
        <CustomButton
          title="Delete Pigeon"
          onPress={handleDelete}
          containerStyles="bg-red-500"
          textStyles="text-white"
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
