import { useState, useContext } from "react";
import { View, Text, TextInput, Button, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import useAPI from "@/hooks/useAPI";
import { AuthContext } from "@/contexts/AuthContext";

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
    <View className="flex-1 justify-center p-4">
      <Text className="text-2xl font-bold mb-4">Create a New Race</Text>
      {error && <Text className="text-red-500 mb-4">Error: {error}</Text>}

      <TextInput
        className="border p-2 mb-4"
        placeholder="Race name"
        value={form.raceName}
        onChangeText={(value) => handleChange("raceName", value)}
      />
      <TextInput
        className="border p-2 mb-4"
        placeholder="Date (YYYY-MM-DD)"
        value={form.date}
        onChangeText={(value) => handleChange("date", value)}
      />
      <TextInput
        className="border p-2 mb-4"
        placeholder="Distance"
        value={form.distance}
        onChangeText={(value) => handleChange("distance", value)}
      />
      <TextInput
        className="border p-2 mb-4"
        placeholder="Positions (comma-separated)"
        value={form.positions}
        onChangeText={(value) => handleChange("positions", value)}
      />
      <TextInput
        className="border p-2 mb-4"
        placeholder="Total Participants"
        value={form.totalParticipants}
        onChangeText={(value) => handleChange("totalParticipants", value)}
      />
      <TextInput
        className="border p-2 mb-4"
        placeholder="Wind Speed"
        value={form.windSpeed}
        onChangeText={(value) => handleChange("windSpeed", value)}
      />
      <TextInput
        className="border p-2 mb-4"
        placeholder="Wind Direction"
        value={form.windDirection}
        onChangeText={(value) => handleChange("windDirection", value)}
      />
      <TextInput
        className="border p-2 mb-4"
        placeholder="Notes"
        value={form.notes}
        onChangeText={(value) => handleChange("notes", value)}
      />

      <Button title="Create Race" onPress={handleSubmit} disabled={loading} />

      {loading && (
        <View className="mt-4">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text className="text-lg font-semibold text-gray-700 mt-2">Creating Race...</Text>
        </View>
      )}
    </View>
  );
}
