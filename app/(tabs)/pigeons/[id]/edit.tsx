import React, { useEffect, useState, useContext } from "react";
import { View, Text, TextInput, Alert, ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import useAPI from "@/hooks/useAPI";
import CustomButton from "@/components/CustomButton";
import { AuthContext } from "@/contexts/AuthContext";

const EditPigeon = () => {
  const { id } = useLocalSearchParams(); // Get pigeon ID from URL
  const router = useRouter();
  const { token } = useContext(AuthContext);

  const { getRequest, putRequest, data, loading, error } = useAPI<{ data: any }>();
  const [form, setForm] = useState({
    name: "",
    breed: "",
    colour: "",
    ringNumber: "",
    sex: "",
    hatchDate: "",
    diet: "",
  });

  useEffect(() => {
    if (id) {
      getRequest(`https://pigeon-api-ca-1.vercel.app/api/pigeon/${id}`, {}, (response) => {
        setForm({
          name: response.data.name || "",
          breed: response.data.breed || "",
          colour: response.data.colour || "",
          ringNumber: response.data.ringNumber || "",
          sex: response.data.sex || "",
          hatchDate: response.data.hatchDate.split("T")[0] || "",
          diet: response.data.diet || "",
        });
      });
    }
  }, [id]);

  const handleInputChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    if (id) {
      putRequest(`https://pigeon-api-ca-1.vercel.app/api/pigeon/${id}`, form, token, () => {
        Alert.alert("Success", "Pigeon updated successfully!");
        router.push("/pigeons");
      });
    }
  };

  if (!token) {
    Alert.alert("Authentication Error", "You must be logged in to create a pigeon.");
    return;
  }

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
          <Text className="text-2xl font-bold mb-5 mt-5 text-white">Edit Pigeon</Text>

          <TextInput
            className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
            placeholder="Name"
            value={form.name}
            onChangeText={(value) => handleInputChange("name", value)}
          />
          <TextInput
            className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
            placeholder="Breed"
            value={form.breed}
            onChangeText={(value) => handleInputChange("breed", value)}
          />
          <TextInput
            className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
            placeholder="Colour"
            value={form.colour}
            onChangeText={(value) => handleInputChange("colour", value)}
          />
          <TextInput
            className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
            placeholder="Ring Number"
            value={form.ringNumber}
            onChangeText={(value) => handleInputChange("ringNumber", value)}
          />
          <TextInput
            className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
            placeholder="Sex (Cock/Hen)"
            value={form.sex}
            onChangeText={(value) => handleInputChange("sex", value)}
          />
          <TextInput
            className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
            placeholder="Hatch Date (YYYY-MM-DD)"
            value={form.hatchDate}
            onChangeText={(value) => handleInputChange("hatchDate", value)}
          />
          <TextInput
            className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-5"
            placeholder="Diet"
            value={form.diet}
            onChangeText={(value) => handleInputChange("diet", value)}
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

export default EditPigeon;
