import { View, Text, TextInput } from "react-native";
import { useContext, useState } from "react";
import CustomButton from "./CustomButton";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";

const RegisterForm = () => {
  const { register } = useContext(AuthContext);
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleRegister = async () => {
    setError("");
    try {
      await register(form.username, form.email, form.password);
      router.push("/main");
    } catch (error: any) {
      setError(error.message);
      console.log(`Error: ${error}`);
    }
  };

  return (
    <View className="flex-1 justify-center items-center mb-8 mt-8">
      {/* Form Container */}
      {/* Username Field */}
      <View className="w-3/4 mb-6">
        <Text className="text-white font-medium mb-2">Username</Text>
        <TextInput
          className="w-full bg-white rounded-md p-5 text-black"
          placeholder="Username"
          placeholderTextColor="#9CA3AF"
          value={form.username}
          onChangeText={(value) => handleChange("username", value)}
        />
      </View>

      {/* Email Field */}
      <View className="w-3/4 mb-6">
        <Text className="text-white font-medium mb-2">Email</Text>
        <TextInput
          className="w-full bg-white rounded-md p-5 text-black"
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          value={form.email}
          onChangeText={(value) => handleChange("email", value)}
        />
      </View>

      {/* Password Field */}
      <View className="w-3/4 mb-6">
        <Text className="text-white font-medium mb-2">Password</Text>
        <TextInput
          className="w-full bg-white rounded-md p-5 text-black"
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          value={form.password}
          onChangeText={(value) => handleChange("password", value)}
          secureTextEntry
        />
      </View>

      {/* Error Message */}
      {error ? (
        <Text className="text-red-500 text-center text-sm font-semibold mb-2">{error}</Text>
      ) : null}

      {/* Submit Button */}
      <CustomButton
        title="Create an account"
        textStyles="text-[#2852B6]"
        onPress={handleRegister}
        containerStyles="w-3/4 mb-2 mt-3"
      />
    </View>
  );
};

export default RegisterForm;
