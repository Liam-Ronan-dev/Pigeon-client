import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useAPI from "@/hooks/useAPI";
import { useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import LinkComponent from "@/components/LinkComponent";
import Profile from "@/components/Profile";
import SearchSVG from "@/assets/images/Search.svg";

interface Pigeon {
  _id: string;
  name: string;
  breed: string;
  colour: string;
  sex: string;
  imageUrl?: string;
}

export default function PigeonsIndex() {
  const { getRequest, data, loading, error } = useAPI<{ data: Pigeon[] }>();
  const router = useRouter();

  useEffect(() => {
    getRequest("https://pigeon-api-ca-1.vercel.app/api/pigeons");
  }, []);

  if (loading || error) {
    return (
      <View className="flex-1 justify-center items-center bg-[#171622]">
        {loading && (
          <>
            <ActivityIndicator size="large" color="#FF9B00" />
            <Text className="text-lg font-semibold text-gray-300 mt-2">Loading Pigeons...</Text>
          </>
        )}
        {error && <Text className="text-red-500 text-lg font-medium">Error: {error}</Text>}
      </View>
    );
  }

  const pigeons = data?.data || [];

  if (!pigeons || pigeons.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-[#171622]">
        <Text className="text-lg text-gray-300 font-medium">
          No pigeons found. Add a new pigeon to get started!
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-[#171622]">
        {/* Header */}
        <View className="flex-row justify-between items-center mt-4 mb-2 mx-5">
          <Text className="text-2xl font-bold text-white">Your Pigeons</Text>
          <Profile />
        </View>

        {/* Add Button */}
        <View className="flex-row justify-between items-center mx-5 mt-5 mb-3">
          <CustomButton
            title="Add pigeon"
            containerStyles="bg-[#FF9B00] w-full rounded-lg px-4 py-2"
            textStyles="text-white"
            onPress={() => router.push("/pigeons/create")}
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
          data={pigeons}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View className="flex-row bg-[#292C40] rounded-lg mb-3 shadow-md overflow-hidden h-36 mt-5">
              {/* Left Half: Image */}
              <View className="w-1/2">
                <Image
                  source={
                    item.imageUrl
                      ? { uri: item.imageUrl }
                      : require("@/assets/images/unsplash_5WWgv98ijbs.jpg")
                  }
                  style={{ width: "100%", height: "100%", resizeMode: "cover" }}
                />
              </View>

              {/* Right Half: Details */}
              <View className="w-1/2 p-3 px-5 justify-between">
                {/* Name */}
                <Text className="text-xl font-bold text-white">{item.name}</Text>
                {/* Sex and Breed */}
                <View>
                  <Text className="text-sm text-[#FF9B00]">{item.sex}</Text>
                  <Text className="text-sm text-[#FF9B00]">{item.colour}</Text>
                </View>
                <LinkComponent type="pigeons" item={item} />
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
