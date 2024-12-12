import React, { useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useAPI from "@/hooks/useAPI";
import { Link, router } from "expo-router";
import CustomButton from "@/components/CustomButton";


interface Pigeon {
  _id: string;
  name: string;
  breed: string;
  colour: string;
  imageUrl?: string;
}

export default function Tab() {
  const { getRequest, data, loading, error } = useAPI<{ data: Pigeon[] }>(); // Use the correct response type

  useEffect(() => {
    getRequest("https://pigeon-api-ca-1.vercel.app/api/pigeons");
  }, []);

  if (loading || error) {
    return (
      <View className="flex-1 justify-center items-center">
        {loading && (
          <>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text className="text-lg font-semibold text-gray-700 mt-2">Loading Pigeons...</Text>
          </>
        )}
        {error && <Text className="text-red-500 text-lg font-medium">Error: {error}</Text>}
      </View>
    );
  }

  const pigeons = data?.data || []; // Extract the pigeons array from the nested response

  if (!pigeons || pigeons.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-700 font-medium">
          No pigeons found. Add a new pigeon to get started!
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <CustomButton
          title="Create Pigeon"
          containerStyles="mt-3"
          onPress={() => router.push("/pigeons/create")}
        />
        <FlatList
          data={pigeons}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View className="p-4 mb-4 bg-white rounded-lg shadow-md">
              {item.imageUrl ? ( // Check if imageUrl exists
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{ height: 150, borderRadius: 8, marginBottom: 8 }}
                />
              ) : (
                <Text className="text-gray-600 mb-2">No image available</Text>
              )}
              <Link href={{ pathname: "/pigeons/[id]", params: { id: item._id } }}>
                <Text className="text-xl font-bold text-gray-800">{item.name}</Text>
                <Text className="text-base text-gray-600">Breed: {item.breed}</Text>
                <Text className="text-base text-gray-600">Colour: {item.colour}</Text>
              </Link>
            </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
