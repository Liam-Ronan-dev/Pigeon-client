import { View, Text, TextInput } from "react-native";
import { useContext, useState } from "react";
import CustomButton from "./CustomButton";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const [form, setForm] = useState({
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

  const handleLogin = async () => {
    setError("");
    try {
      await login(form.email, form.password);
      router.push("/main");
    } catch (error: any) {
      setError(error.message);
      console.log(`Error: ${error}`);
    }
  };

  return (
    <View className="flex-1 justify-center items-center mb-8">
      <View className="w-3/4 mb-6">
        <Text className="text-white font-medium mb-2">Email</Text>
        <TextInput
          className="w-full bg-[#1E1E2E] rounded-md p-5 text-white border-solid border-white"
          placeholder="Email"
          placeholderTextColor="#94A3B8"
          value={form.email}
          onChangeText={(value) => handleChange("email", value)}
        />
      </View>

      <View className="w-3/4 mb-6">
        <Text className="text-white font-medium mb-2">Password</Text>
        <TextInput
          className="w-full bg-[#1E1E2E] rounded-md p-5 text-white border-solid border-white"
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          value={form.password}
          onChangeText={(value) => handleChange("password", value)}
          secureTextEntry
        />
      </View>

      {error ? (
        <Text className="text-red-500 text-center text-sm font-semibold mb-2">{error}</Text>
      ) : null}

      <CustomButton
        title="Login"
        textStyles="text-xl"
        onPress={handleLogin}
        containerStyles="bg-[#FF9B00] w-3/4 mb-10 mt-8 p-2"
      />
    </View>
  );
};

export default LoginForm;
