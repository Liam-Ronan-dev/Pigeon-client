import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useAPI from "@/hooks/useAPI"; // Custom API hook
import CardComponent from "@/components/cardComponent"; // Card component for rendering items
import SearchSVG from "@/assets/images/Search.svg";
import ProfileSVG from "@/assets/images/Profile.svg";

const Home = () => {
  const [activePill, setActivePill] = useState("Pigeons");
  const [data, setData] = useState([]); // Data for the active pill
  const { getRequest, loading, error } = useAPI<{ data: any[] }>(); // Custom hook for API requests

  // Define pills with endpoints and type mappings
  const pills = [
    {
      name: "Pigeons",
      endpoint: "https://pigeon-api-ca-1.vercel.app/api/pigeons",
      type: "pigeons",
      fields: {
        heading: "name", // Field to use as heading
        details: ["breed", "colour", "sex"], // Fields to include as details
      },
    },
    {
      name: "Treatments",
      endpoint: "https://pigeon-api-ca-1.vercel.app/api/medicaltreatments",
      type: "medicals",
      fields: {
        heading: "treatmentName",
        details: ["dateAdministered", "duration"],
      },
    },
    {
      name: "Races",
      endpoint: "https://pigeon-api-ca-1.vercel.app/api/raceHistories",
      type: "races",
      fields: {
        heading: "raceName",
        details: ["date", "distance"],
      },
    },
  ];

  // Fetch data whenever the active pill changes
  useEffect(() => {
    const selectedPill = pills.find((pill) => pill.name === activePill);
    if (selectedPill) {
      getRequest(selectedPill.endpoint, {}, (response) => {
        setData(response.data); // Set data for the active pill
      });
    }
  }, [activePill]);

  const renderDetails = (item, fields) => {
    return fields.details.map((field) => (
      <Text key={field} className="text-sm text-[#9CA3AF]">
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
            <Text className="text-white text-lg">Welcome back</Text>
            <Text className="text-xl text-white font-bold">Liam</Text>
          </View>
          <ProfileSVG />
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-[#1E1E2E] rounded-md px-4 mx-5 py-2 mt-5 mb-4 shadow-md">
          <TextInput
            placeholder="Search"
            placeholderTextColor="#9CA3AF"
            className="flex-1 text-white text-base"
          />
          <SearchSVG />
        </View>

        {/* Pills */}
        <View className="flex-row justify-between mb-4 mt-5 mx-5">
          {pills.map((pill) => (
            <TouchableOpacity
              key={pill.name}
              onPress={() => setActivePill(pill.name)}
              className={`px-4 py-2 rounded-full ${
                activePill === pill.name ? "bg-[#FF9B00]" : "bg-[#292C40]"
              }`}>
              <Text
                className={`text-sm ${
                  activePill === pill.name ? "text-white" : "text-[#9CA3AF]"
                } font-semibold`}>
                {pill.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Horizontal Card List */}
        {loading ? (
          <Text className="text-white text-center">Loading...</Text>
        ) : error ? (
          <Text className="text-red-500 text-center">Error: {error}</Text>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data.map((item) => {
              // Get the current pill's fields mapping
              const currentPill = pills.find((pill) => pill.name === activePill);
              const fields = currentPill?.fields;

              return (
                <CardComponent
                  type={currentPill?.type}
                  item={item}
                  heading={item[fields?.heading || "name"]}
                  details={renderDetails(item, fields || { details: [] })}
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
