import { View, Text, SafeAreaView } from "react-native";
import LoginVectorSVG from "@/assets/images/loginVector.svg";
import LoginForm from "../components/LoginForm";

const Signup = () => {
  return (
    <View className="flex-1 bg-[#154ed4]">
      <SafeAreaView className="flex-1 px-1">
        <View>
          <Text className="text-center text-white text-4xl mt-10 font-bold">Login</Text>
          <Text className="text-center text-white text-2xl mt-5 p-2 font-light">
            Enter your email and password
          </Text>
        </View>
        <View className="flex-1 justify-center items-center mb-6">
          <LoginVectorSVG />
        </View>
        <LoginForm />
      </SafeAreaView>
    </View>
  );
};

export default Signup;
