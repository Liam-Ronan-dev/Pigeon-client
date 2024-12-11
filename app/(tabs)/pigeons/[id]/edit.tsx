import React, { useEffect, useState, useContext } from "react";
import { View, Text, TextInput, Alert, ActivityIndicator } from "react-native";
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
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 p-4 bg-gray-100">
        <Text className="text-2xl font-bold text-gray-900 mb-4">Edit Pigeon</Text>

        <TextInput
          className="border p-2 rounded mb-4"
          placeholder="Name"
          value={form.name}
          onChangeText={(value) => handleInputChange("name", value)}
        />
        <TextInput
          className="border p-2 rounded mb-4"
          placeholder="Breed"
          value={form.breed}
          onChangeText={(value) => handleInputChange("breed", value)}
        />
        <TextInput
          className="border p-2 rounded mb-4"
          placeholder="Colour"
          value={form.colour}
          onChangeText={(value) => handleInputChange("colour", value)}
        />
        <TextInput
          className="border p-2 rounded mb-4"
          placeholder="Ring Number"
          value={form.ringNumber}
          onChangeText={(value) => handleInputChange("ringNumber", value)}
        />
        <TextInput
          className="border p-2 rounded mb-4"
          placeholder="Sex (Cock/Hen)"
          value={form.sex}
          onChangeText={(value) => handleInputChange("sex", value)}
        />
        <TextInput
          className="border p-2 rounded mb-4"
          placeholder="Hatch Date (YYYY-MM-DD)"
          value={form.hatchDate}
          onChangeText={(value) => handleInputChange("hatchDate", value)}
        />
        <TextInput
          className="border p-2 rounded mb-4"
          placeholder="Diet"
          value={form.diet}
          onChangeText={(value) => handleInputChange("diet", value)}
        />

        <CustomButton
          title="Save Changes"
          onPress={handleSubmit}
          containerStyles="mt-3 bg-blue-500"
          textStyles="text-white"
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default EditPigeon;
