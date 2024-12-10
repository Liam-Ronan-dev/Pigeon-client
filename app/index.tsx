import { View, Text, SafeAreaView } from "react-native";
import { Link, useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import WelcomeSVG from "@/assets/images/Welcome.svg";

const Index = () => {
  const router = useRouter();
  return (
    <View className="flex-1 bg-[#313E6D]">
      <SafeAreaView className="flex-1 px-1 justify-between">
        <View>
          <Text className="text-center text-white text-4xl mt-10 font-bold">SkySprint</Text>
          <Text className="text-center text-white text-2xl mt-5 p-2 font-light">
            SkySprint is a modern app for pigeon enthusiasts and racers. Track race history, manage
            medical treatments, and stay organized
          </Text>
        </View>
        <View className="flex-1 justify-center items-center mb-5">
          <WelcomeSVG />
        </View>
        <View className="mb-12 items-center">
          <CustomButton
            title="Login"
            textStyles="text-[#154ed4]"
            onPress={() => router.push("/Login")}
            containerStyles="w-3/4"
          />
        </View>
        <View>
          <Text className="text-center text-white text-2xl font-light mb-12">
            Don’t have an account?{" "}
            <Link href="/Signup" className="text-[#FC814A] underline font-semibold">
              Sign Up
            </Link>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Index;
