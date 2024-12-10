import { View, Text } from "react-native";
import LargeCard from "@/components/LargeCard";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();

  const handlePress = (resource: string) => {
    if(resource === 'pigeons') {
      router.push('/(tabs)/pigeons')
    }
    else if(resource === 'races') {
      router.push('/(tabs)/races')
    }
    else {
      router.push('/(tabs)/medicals')
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#313E6D] gap-12">
      <LargeCard
        onPress={() => handlePress('pigeons')}
        title="Pigeons"
        imageUri={require("@/assets/images/Pigeons.png")}
      />
      <LargeCard
        onPress={() => handlePress('races')}
        title="Races"
        imageUri={require("@/assets/images/Races.png")}
      />
      <LargeCard
        onPress={() => handlePress('medicals')}
        title="Medicals"
        imageUri={require("@/assets/images/Medicals.png")}
      />
    </View>
  );
};

export default index;
