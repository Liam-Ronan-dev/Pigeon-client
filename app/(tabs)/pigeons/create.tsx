import { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import useAPI from "@/hooks/useAPI";
import { AuthContext } from "@/contexts/AuthContext";
import CustomButton from "@/components/CustomButton";

export default function Page() {
  const { postRequest, loading, error } = useAPI();
  const { token } = useContext(AuthContext); // Access token from AuthContext
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    breed: "",
    colour: "",
    eyeColour: "",
    bodyType: "",
    ringNumber: "",
    sex: "",
    hatchDate: "",
    diet: "",
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null); // For image selection

  const handleChange = (field: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleImageUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "You need to grant permission to upload an image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // Save selected image URI
    }
  };

  const handleSubmit = () => {
    if (
      !form.name ||
      !form.breed ||
      !form.colour ||
      !form.ringNumber ||
      !form.sex ||
      !form.eyeColour ||
      !form.bodyType ||
      !form.hatchDate
    ) {
      Alert.alert("Validation Error", "Please fill in all required fields.");
      return;
    }

    if (!token) {
      Alert.alert("Authentication Error", "You must be logged in to create a pigeon.");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("breed", form.breed);
    formData.append("colour", form.colour);
    formData.append("eyeColour", form.eyeColour);
    formData.append("bodyType", form.bodyType);
    formData.append("ringNumber", form.ringNumber);
    formData.append("sex", form.sex);
    formData.append("hatchDate", form.hatchDate);
    formData.append("diet", form.diet);

    if (selectedImage) {
      const filename = selectedImage.split("/").pop();
      const fileType = filename?.split(".").pop();

      formData.append("image", {
        uri: selectedImage,
        name: filename,
        type: `image/${fileType}`,
      } as any);
    }

    try {
      postRequest(
        "https://pigeon-api-ca-1.vercel.app/api/pigeon",
        formData,
        token, // Include the token for authentication
        () => {
          Alert.alert("Success", "Pigeon created successfully!");
          console.log("success, pigeon created");
          router.push("/pigeons"); // Redirect to pigeon list
        },
      );
    } catch (e) {
      Alert.alert("Error", error || "Something went wrong while creating the pigeon.");
      console.log(e);
    }
  };

  return (
    <ScrollView className="bg-[#171622]">
      <View className="flex-1 justify-center p-4">
        <Text className="text-2xl font-bold mb-5 mt-5 text-white">Create a New Pigeon</Text>
        {error && <Text className="text-red-500 mb-4">Error: {error}</Text>}

        <TextInput
          className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-3"
          placeholder="Name"
          value={form.name}
          onChangeText={(value) => handleChange("name", value)}
        />
        <TextInput
          className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-3"
          placeholder="Breed"
          value={form.breed}
          onChangeText={(value) => handleChange("breed", value)}
        />
        <TextInput
          className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-3"
          placeholder="Colour"
          value={form.colour}
          onChangeText={(value) => handleChange("colour", value)}
        />
        <TextInput
          className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-3"
          placeholder="Eye Colour"
          value={form.eyeColour}
          onChangeText={(value) => handleChange("eyeColour", value)}
        />
        <TextInput
          className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-3"
          placeholder="Body Type"
          value={form.bodyType}
          onChangeText={(value) => handleChange("bodyType", value)}
        />
        <TextInput
          className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-3"
          placeholder="Ring Number"
          value={form.ringNumber}
          onChangeText={(value) => handleChange("ringNumber", value)}
        />
        <TextInput
          className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-3"
          placeholder="Sex (Cock/Hen)"
          value={form.sex}
          onChangeText={(value) => handleChange("sex", value)}
        />
        <TextInput
          className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-3"
          placeholder="Hatch Date (YYYY-MM-DD)"
          value={form.hatchDate}
          onChangeText={(value) => handleChange("hatchDate", value)}
        />
        <TextInput
          className="w-full bg-[#1E1E2E] rounded-md p-5 text-white mb-3"
          placeholder="Diet"
          value={form.diet}
          onChangeText={(value) => handleChange("diet", value)}
        />

        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={{ width: "100%", height: 200, marginBottom: 8 }}
          />
        )}

        <CustomButton
          onPress={handleImageUpload}
          title="Upload Image"
          containerStyles="bg-[#1E1E2E] mb-5 mt-5 p-2"
          textStyles="text-[#468FB0]"
        />
        <CustomButton
          onPress={handleSubmit}
          title="Create pigeon"
          containerStyles="bg-[#FF9B00] mb-5 mt-5 p-2"
        />
        {loading && (
          <View className="mt-4">
            <ActivityIndicator size="large" color="#0000ff" />
            <Text className="text-lg font-semibold text-gray-700 mt-2">Creating Pigeon...</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
