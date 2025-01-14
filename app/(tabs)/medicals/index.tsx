import React, { useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Image, TextInput } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useAPI from "@/hooks/useAPI";
import { Link, router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import LinkComponent from "@/components/LinkComponent";
import Profile from "@/components/Profile";
import SearchSVG from "@/assets/images/Search.svg";

interface MedicalTreatment {
  _id: string;
  treatmentName: string;
  description: string;
  administeredBy: string;
}

export default function Tab() {
  const { getRequest, data, loading, error } = useAPI<{ data: MedicalTreatment[] }>(); // Use the correct response type

  useEffect(() => {
    getRequest("https://pigeon-api-ca-1.vercel.app/api/medicalTreatments");
  }, []);

  if (loading || error) {
    return (
      <View className="flex-1 justify-center items-center">
        {loading && (
          <>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text className="text-lg font-semibold text-gray-700 mt-2">
              Loading Medical Treatments...
            </Text>
          </>
        )}
        {error && <Text className="text-red-500 text-lg font-medium">Error: {error}</Text>}
      </View>
    );
  }

  const medicals = data?.data || [];

  if (!medicals || medicals.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-700 font-medium">
          No medical Treatments found. Add a new medical Treatment to get started!
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-[#171622]">
        {/* Header */}
        <View className="flex-row justify-between items-center mt-4 mb-2 mx-5">
          <Text className="text-2xl font-bold text-white">Your Treatments</Text>
          <Profile />
        </View>

        {/* Add Button */}
        <View className="flex-row justify-between items-center mx-5 mt-5 mb-3">
          <CustomButton
            title="Add treatment"
            containerStyles="bg-[#FF9B00] w-full rounded-lg px-4 py-2"
            textStyles="text-white"
            onPress={() => router.push("/medicals/create")}
          />
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-[#1E1E2E] rounded-md px-4 mx-5 py-2 mt-5 mb-5 shadow-md">
          <TextInput
            placeholder="Search"
            placeholderTextColor="#9CA3AF"
            className="flex-1 text-white text-base p-3"
          />
          <SearchSVG />
        </View>

        {/* Pigeon List */}

        <FlatList
          className="px-4"
          data={medicals}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View className="flex-row bg-[#292C40] rounded-lg mb-3 shadow-md overflow-hidden h-36 mt-5">
              {/* Left Half: Image */}
              <View className="w-1/2">
                <Image
                  source={require("@/assets/images/unsplash_5WWgv98ijbs.jpg")}
                  style={{ width: "100%", height: "100%", resizeMode: "cover" }}
                />
              </View>

              {/* Right Half: Details */}
              <View className="w-1/2 p-3 px-5 justify-between">
                {/* Name */}
                <Text className="text-xl font-bold text-white">{item.treatmentName}</Text>
                {/* Sex and Breed */}
                <View>
                  <Text className="text-sm text-[#FF9B00]">{item.administeredBy}</Text>
                </View>
                <LinkComponent type="medicals" item={item} />
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
