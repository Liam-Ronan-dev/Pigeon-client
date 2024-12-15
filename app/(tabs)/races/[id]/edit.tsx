import React, { useEffect, useState, useContext } from "react";
import { View, Text, TextInput, ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import useAPI from "@/hooks/useAPI";
import CustomButton from "@/components/CustomButton";
import { AuthContext } from "@/contexts/AuthContext";

const EditRace = () => {
  const { id } = useLocalSearchParams(); // Get race ID from URL
  const router = useRouter();
  const { token } = useContext(AuthContext);

  const { getRequest, putRequest, data, loading, error } = useAPI<{ data: any }>();
  const [form, setForm] = useState({
    raceName: "",
    date: "",
    distance: "",
    positions: "",
    totalParticipants: "",
    windSpeed: "",
    windDirection: "",
    notes: "",
  });

  useEffect(() => {
    if (id) {
      getRequest(`https://pigeon-api-ca-1.vercel.app/api/raceHistory/${id}`, {}, (response) => {
        // Populate form state with API response
        setForm({
          raceName: response.data.raceName || "",
          date: response.data.date?.split("T")[0] || "", // Extract date without time
          distance: response.data.distance || "",
          positions: response.data.positions?.join(", ") || "", // Convert array to comma-separated string
          totalParticipants: response.data.totalParticipants?.toString() || "",
          windSpeed: response.data.windSpeed || "",
          windDirection: response.data.windDirection || "",
          notes: response.data.notes || "",
        });
      });
    }
  }, [id]);

  const handleInputChange = (field: string, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const handleSubmit = () => {
    if (!id || !token) {
      console.error("Missing ID or token for edit.");
      return;
    }

    // Convert positions from comma-separated string to array
    const formattedPositions = form.positions.split(",").map((pos) => pos.trim());

    const formattedForm = {
      ...form,
      positions: formattedPositions, // Update positions field to be an array
      totalParticipants: parseInt(form.totalParticipants, 10), // Ensure this is a number
    };

    // Send PUT request
    putRequest(
      `https://pigeon-api-ca-1.vercel.app/api/raceHistory/${id}`,
      formattedForm,
      token,
      () => {
        console.log("Race edited successfully");
        router.push("/races");
      },
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="text-lg font-semibold text-gray-700 mt-2">Loading...</Text>
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

  return (
    <ScrollView className="bg-[#171622]">
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 justify-center p-4">
          <Text className="text-2xl font-bold mb-5 mt-5 text-white">Edit Race</Text>

          <TextInput
            className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
            placeholder="Race name"
            value={form.raceName}
            onChangeText={(value) => handleInputChange("raceName", value)}
          />
          <TextInput
            className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
            placeholder="Date (YYYY-MM-DD)"
            value={form.date}
            onChangeText={(value) => handleInputChange("date", value)}
          />
          <TextInput
            className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
            placeholder="Distance"
            value={form.distance}
            onChangeText={(value) => handleInputChange("distance", value)}
          />
          <TextInput
            className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
            placeholder="Positions (comma-separated)"
            value={form.positions}
            onChangeText={(value) => handleInputChange("positions", value)}
          />
          <TextInput
            className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
            placeholder="Total Participants"
            value={form.totalParticipants}
            onChangeText={(value) => handleInputChange("totalParticipants", value)}
          />
          <TextInput
            className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
            placeholder="Wind Speed"
            value={form.windSpeed}
            onChangeText={(value) => handleInputChange("windSpeed", value)}
          />
          <TextInput
            className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
            placeholder="Wind Direction"
            value={form.windDirection}
            onChangeText={(value) => handleInputChange("windDirection", value)}
          />
          <TextInput
            className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
            placeholder="Notes"
            value={form.notes}
            onChangeText={(value) => handleInputChange("notes", value)}
          />

          <CustomButton
            onPress={handleSubmit}
            title="Save changes"
            containerStyles="bg-[#FF9B00] mb-5 mt-5 p-2"
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </ScrollView>
  );
};

export default EditRace;
