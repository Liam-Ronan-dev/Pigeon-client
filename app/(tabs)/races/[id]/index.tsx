import React, { useEffect, useContext } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import useAPI from "@/hooks/useAPI";
import CustomButton from "@/components/CustomButton";
import { AuthContext } from "@/contexts/AuthContext";

interface Race {
  _id: string;
  raceName: string;
  date: string;
  distance: string;
  positions: string;
  totalParticipants?: number;
  windSpeed?: string;
  windDirection?: string;
  notes?: string;
}

export default function Tab() {
  const { getRequest, deleteRequest, data, loading, error } = useAPI<{ data: Race }>(); // Type for single pigeon
  const { id } = useLocalSearchParams(); // Get the pigeon ID from the route params
  const router = useRouter();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (id) {
      getRequest(`https://pigeon-api-ca-1.vercel.app/api/raceHistory/${id}`);
    }
  }, [id]);

  const handleDelete = () => {
    if (!token || !id) {
      console.error("Token or ID is missing. Cannot delete.");
      return;
    }

    try {
      console.log(`Attempting to delete race with ID: ${id}`);
      deleteRequest(`https://pigeon-api-ca-1.vercel.app/api/raceHistory/${id}`, token);
      console.log("Race deleted successfully!");
      router.push("/races"); // Navigate back to the pigeons list
    } catch (err) {
      console.error("Error deleting race:", err);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="text-lg font-semibold text-gray-700 mt-2">Loading Race Details...</Text>
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

  const race = data?.data;

  if (!race) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-700 font-medium">Race not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <View className="p-4">
          <Text className="text-2xl font-bold text-gray-800 mb-2">{race.raceName}</Text>
          <Text className="text-lg text-gray-600">Date: {race.date}</Text>
          <Text className="text-lg text-gray-600">Distance: {race.distance}</Text>
          <Text className="text-lg text-gray-600">Positions: {race.positions + ', '}</Text>
          <Text className="text-lg text-gray-600">total Participants: {race.totalParticipants}</Text>
          <Text className="text-lg text-gray-600">wind Speed: {race.windSpeed}</Text>
          <Text className="text-lg text-gray-600">wind direction: {race.windDirection}</Text>
          <Text className="text-lg text-gray-600">notes: {race.notes}</Text>
        </View>
        <CustomButton
          title="Edit Race"
          onPress={() =>
            router.push({ pathname: "/races/[id]/edit", params: { id: race._id } })
          }
          containerStyles="mt-3"
          textStyles="text-black"
        />
        {/* Delete Button */}
        <CustomButton
          title="Delete Race"
          onPress={handleDelete}
          containerStyles="mt-3"
          textStyles="text-black"
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
