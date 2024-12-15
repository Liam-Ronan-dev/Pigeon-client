import React, { useEffect, useState, useContext } from "react";
import { View, Text, TextInput, Alert, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import useAPI from "@/hooks/useAPI";
import { AuthContext } from "@/contexts/AuthContext";
import CustomButton from "@/components/CustomButton";
import { FIELD_MAPPINGS } from "@/config/detailsMappings"; // Import FIELD_MAPPINGS

const EditDetails = () => {
  const { id, type } = useLocalSearchParams<{ id: string; type: string }>(); // Extract `id` and `type`
  const router = useRouter();
  const { token } = useContext(AuthContext);

  const { getRequest, putRequest, data, loading, error } = useAPI<{ data: any }>();
  const [form, setForm] = useState<any>({});
  const [fields, setFields] = useState<any>([]);

  useEffect(() => {
    if (id && type) {
      const endpoint = `https://pigeon-api-ca-1.vercel.app/api/${type}/${id}`;
      
      // Fetch the resource details for editing
      getRequest(endpoint, {}, (response) => {
        setForm(response.data); // Populate the form state with the API response
        const fieldMapping = FIELD_MAPPINGS[type as keyof typeof FIELD_MAPPINGS]; // Get fields for this type
        setFields(fieldMapping?.fields || []); // Set fields dynamically
      });
    }
  }, [id, type]);

  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value })); // Update the form state
  };

  const handleSubmit = () => {
    if (id && type) {
      const endpoint = `https://pigeon-api-ca-1.vercel.app/api/${type}/${id}`;
      console.log(endpoint);
      
      putRequest(endpoint, form, token, () => {
        Alert.alert("Success", "Updated successfully!");
        router.push(`/details/${id}?type=${type}`); // Redirect back to the details page
      });
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
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
    <View className="flex-1 p-4 bg-gray-100">
      <Text className="text-2xl font-bold text-gray-900 mb-4">Edit Details</Text>
      
      {fields.map((field: any) => (
        <View key={field.field} className="mb-4">
          <Text className="text-gray-600 mb-2">{field.label}</Text>
          <TextInput
            className="border p-2 rounded"
            placeholder={`Enter ${field.label}`}
            value={form[field.field] || ""}
            onChangeText={(value) => handleInputChange(field.field, value)}
          />
        </View>
      ))}

      <CustomButton
        title="Save Changes"
        onPress={handleSubmit}
        containerStyles="mt-3 bg-blue-500"
        textStyles="text-white"
      />
    </View>
  );
};

export default EditDetails;
