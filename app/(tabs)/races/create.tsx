import { useState, useContext } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import useAPI from "@/hooks/useAPI";
import { AuthContext } from "@/contexts/AuthContext";
import CustomButton from "@/components/CustomButton";

export default function Page() {
  const { postRequest, loading, error } = useAPI();
  const { token } = useContext(AuthContext); // Access token from AuthContext
  const router = useRouter();

  const [form, setForm] = useState({
    raceName: "",
    date: "",
    distance: "",
    positions: "", // Will be converted to an array
    totalParticipants: "",
    windSpeed: "",
    windDirection: "",
    notes: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = () => {
    if (!token) {
      alert("You must be logged in to create a race.");
      return;
    }

    // Convert positions from string to array
    const formattedPositions = form.positions.split(",").map((pos) => pos.trim());

    const formattedForm = {
      ...form,
      positions: formattedPositions, // Replace the string with the array
    };

    try {
      postRequest(
        "https://pigeon-api-ca-1.vercel.app/api/raceHistory",
        formattedForm, // Send the updated form object
        token,
        () => {
          console.log("race created successfully");
          router.push("/races");
        },
      );
    } catch (e) {
      console.error(e);
      alert("Something went wrong while creating the race.");
    }
  };

  return (
    <ScrollView className="bg-[#171622]">
      <View className="flex-1 justify-center p-4">
        <Text className="text-2xl font-bold mb-5 mt-5 text-white">Create a Race</Text>
        {error && <Text className="text-red-500 mb-4">Error: {error}</Text>}

        <TextInput
          className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
          placeholder="Race name"
          value={form.raceName}
          onChangeText={(value) => handleChange("raceName", value)}
        />
        <TextInput
          className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
          placeholder="Date (YYYY-MM-DD)"
          value={form.date}
          onChangeText={(value) => handleChange("date", value)}
        />
        <TextInput
          className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
          placeholder="Distance"
          value={form.distance}
          onChangeText={(value) => handleChange("distance", value)}
        />
        <TextInput
          className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
          placeholder="Positions (comma-separated)"
          value={form.positions}
          onChangeText={(value) => handleChange("positions", value)}
        />
        <TextInput
          className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
          placeholder="Total Participants"
          value={form.totalParticipants}
          onChangeText={(value) => handleChange("totalParticipants", value)}
        />
        <TextInput
          className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
          placeholder="Wind Speed"
          value={form.windSpeed}
          onChangeText={(value) => handleChange("windSpeed", value)}
        />
        <TextInput
          className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
          placeholder="Wind Direction"
          value={form.windDirection}
          onChangeText={(value) => handleChange("windDirection", value)}
        />
        <TextInput
          className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
          placeholder="Notes"
          value={form.notes}
          onChangeText={(value) => handleChange("notes", value)}
        />

        <CustomButton
          onPress={handleSubmit}
          title="Create race"
          containerStyles="bg-[#FF9B00] mb-5 mt-5 p-2"
        />

        {loading && (
          <View className="mt-4">
            <ActivityIndicator size="large" color="#0000ff" />
            <Text className="text-lg font-semibold text-gray-700 mt-2">Creating Race...</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
