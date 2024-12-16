import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Pressable } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useAPI from "@/hooks/useAPI"; // Custom API hook
import CardComponent from "@/components/cardComponent"; // Card component for rendering items
import { PILLS } from "@/config/pills";
import Profile from "@/components/Profile";
import Search from "@/components/Search";
import { AuthContext } from "@/contexts/AuthContext";

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

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-[#171622]">
        {/* Header */}
        <View className="flex-row justify-between items-center mt-4 mb-2 mx-5">
          <View>
            <Text className="text-white text-lg font-light">Welcome back</Text>
            <Text className="text-2xl text-white font-bold">Guest</Text>
          </View>
          <Profile />
        </View>

        {/* Search Bar */}
        <Search />

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
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
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
