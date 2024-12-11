import React, { useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useAPI from "@/hooks/useAPI";
import { Link, router } from "expo-router";
import CustomButton from "@/components/CustomButton";

interface Race {
  _id: string;
  raceName: string;
  date: string;
  totalParticipants: number;
}

export default function Tab() {
  const { getRequest, data, loading, error } = useAPI<{ data: Race[] }>(); // Use the correct response type

  useEffect(() => {
    getRequest("https://pigeon-api-ca-1.vercel.app/api/raceHistories");
  }, []);

  if (loading || error) {
    return (
      <View className="flex-1 justify-center items-center">
        {loading && (
          <>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text className="text-lg font-semibold text-gray-700 mt-2">Loading Races...</Text>
          </>
        )}
        {error && <Text className="text-red-500 text-lg font-medium">Error: {error}</Text>}
      </View>
    );
  }

  const races = data?.data || []; 

  if (!races || races.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-700 font-medium">
          No Races found. Add a new race to get started!
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <CustomButton
          title="Create Race"
          containerStyles="mt-3 bg-blue-500"
          textStyles="text-black"
          onPress={() => router.push("/races/create")}
        />
        <FlatList
          data={races}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View className="p-4 mb-4 bg-white rounded-lg shadow-md">
              <Link href={{ pathname: "/races/[id]", params: { id: item._id } }}>
                <Text className="text-xl font-bold text-gray-800">{item.raceName}</Text>
                <Text className="text-base text-gray-600">Date: {item.date}</Text>
                <Text className="text-base text-gray-600">
                  total Participants: {item.totalParticipants}
                </Text>
              </Link>
            </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
