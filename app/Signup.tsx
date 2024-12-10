import { View, Text, SafeAreaView } from "react-native";
import RegisterVectorSVG from "../assets/images/registerVector.svg";
import RegisterForm from "@/components/RegisterForm";

const Signup = () => {
  return (
    <View className="flex-1 bg-[#313E6D]">
      <SafeAreaView className="flex-1 px-1">
        <View>
          <Text className="text-center text-white text-4xl mt-10 font-bold">Register</Text>
          <Text className="text-center text-white text-2xl mt-5 p-2 font-light">
            Create your account
          </Text>
        </View>
        <View className="flex-1 justify-center items-center mb-6">
          <RegisterVectorSVG />
        </View>
        <RegisterForm />
      </SafeAreaView>
    </View>
  );
};

export default Signup;
