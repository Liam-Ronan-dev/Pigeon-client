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
    treatmentName: "",
    description: "",
    dateAdministered: "",
    treatmentDuration: "", // Will be converted to an array
    administeredBy: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = () => {
    if (!token) {
      alert("You must be logged in to create a Treatment.");
      return;
    }

    try {
      postRequest(
        "https://pigeon-api-ca-1.vercel.app/api/medicalTreatments",
        form, // Send the updated form object
        token,
        () => {
          console.log("medical Treatment created successfully");
          router.push("/medicals");
        },
      );
    } catch (e) {
      console.error(e);
      alert("Something went wrong while creating the medical Treatments.");
    }
  };

  return (
    <ScrollView className="bg-[#171622]">
      <View className="flex-1 justify-center p-4">
        <Text className="text-2xl font-bold mb-5 mt-5 text-white">Create a Medical Treatment</Text>
        {error && <Text className="text-red-500 mb-4">Error: {error}</Text>}

        <TextInput
          className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
          placeholder="Treatment name"
          value={form.treatmentName}
          onChangeText={(value) => handleChange("treatmentName", value)}
        />
        <TextInput
          className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
          placeholder="description"
          value={form.description}
          onChangeText={(value) => handleChange("description", value)}
        />
        <TextInput
          className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
          placeholder="date Administered"
          value={form.dateAdministered}
          onChangeText={(value) => handleChange("dateAdministered", value)}
        />
        <TextInput
          className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
          placeholder="treatment Duration"
          value={form.treatmentDuration}
          onChangeText={(value) => handleChange("treatmentDuration", value)}
        />
        <TextInput
          className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
          placeholder="administered By"
          value={form.administeredBy}
          onChangeText={(value) => handleChange("administeredBy", value)}
        />

        <CustomButton
          onPress={handleSubmit}
          title="Create treatment"
          containerStyles="bg-[#FF9B00] mb-5 mt-5 p-2"
        />

        {loading && (
          <View className="mt-4">
            <ActivityIndicator size="large" color="#0000ff" />
            <Text className="text-lg font-semibold text-gray-700 mt-2">
              Creating Medical Treatment...
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
