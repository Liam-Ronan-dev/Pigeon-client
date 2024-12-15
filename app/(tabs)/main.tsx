import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useAPI from "@/hooks/useAPI"; // Custom API hook
import CardComponent from "@/components/cardComponent"; // Card component for rendering items
import SearchSVG from "@/assets/images/Search.svg";
import ProfileSVG from "@/assets/images/Profile.svg";
import { PILLS } from "@/config/pills";

const Home = () => {
  const [activePill, setActivePill] = useState("Pigeons");
  const [data, setData] = useState<any>([]); // Data for the active pill
  const { getRequest, loading, error } = useAPI<{ data: any[] }>(); // Custom hook for API requests

  // Fetch data whenever the active pill changes
  useEffect(() => {
    const selectedPill = PILLS.find((pill) => pill.name === activePill);
    if (selectedPill) {
      getRequest(selectedPill.endpoint, {}, (response) => {
        setData(response.data); // Set data for the active pill
      });
    }
  }, [activePill]);

  const renderDetails = (item: any, fields: string[]): JSX.Element[] => {
    return fields.map((field) => (
      <Text key={field} className="text-sm text-[#c7ccd3]">
        {`${field.charAt(0).toUpperCase() + field.slice(1)}: ${item[field] || "N/A"}`}
      </Text>
    ));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-[#171622]">
        {/* Header */}
        <View className="flex-row justify-between items-center mt-4 mb-2 mx-5">
          <View>
            <Text className="text-white text-lg font-light">Welcome back</Text>
            <Text className="text-2xl text-white font-bold">Liam</Text>
          </View>
          <ProfileSVG />
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-[#1E1E2E] rounded-md px-4 mx-5 py-2 mt-5 mb-4 shadow-md">
          <TextInput
            placeholder="Search"
            placeholderTextColor="#9CA3AF"
            className="flex-1 text-white text-base p-3"
          />
          <SearchSVG />
        </View>

        {/* Pills */}
        <View className="flex-row justify-between mb-4 mt-5 mx-5">
          {PILLS.map((pill) => (
            <TouchableOpacity
              key={pill.name}
              onPress={() => setActivePill(pill.name)}
              className={`px-4 py-2 mt-2 rounded-full ${
                activePill === pill.name ? "bg-[#FF9B00]" : "bg-[#292C40]"
              }`}>
              <Text
                className={`text-sm p-2 ${
                  activePill === pill.name ? "text-white" : "text-[#9CA3AF]"
                } font-semibold`}>
                {pill.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Horizontal Card List */}
        {loading ? (
          <Text className="text-white text-center text-2xl mt-5">Loading...</Text>
        ) : error ? (
          <Text className="text-red-500 text-center text-2xl mt-5">Error: {error}</Text>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data.map((item: any) => {
              const currentPill = PILLS.find((pill) => pill.name === activePill);
              const fields = currentPill?.fields;

              const details =
                fields?.details.map((field) => `${field}: ${item[field] || "N/A"}`) || [];

              return (
                <CardComponent
                  key={item._id}
                  type={currentPill?.type || ""}
                  item={item}
                  heading={item[fields?.heading || "name"]}
                  details={details} // Pass details as a string array
                />
              );
            })}
          </ScrollView>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;
