import { View, Text, TextInput } from "react-native";
import { useState } from "react";
import CustomButton from "./CustomButton";

const LoginForm = () => {
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

  return (
    <View className="flex-1 justify-center items-center mb-8">
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

      {error ? <Text className="text-red-500 text-center mb-4">{error}</Text> : null}

      <CustomButton
        title="Log in"
        textStyles="text-[#2852B6]"
        onPress={() => console.log("Login clicked")}
        containerStyles="w-3/4 mb-10 mt-8"
      />
    </View>
  );
};

export default LoginForm;
