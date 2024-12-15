import { View, Text, TouchableOpacity } from "react-native";
import ArrowSVG from "@/assets/images/Arrow.svg";
import { useRouter } from "expo-router";

interface LinkComponentProps {
  item: { _id: string };
  type: string; // Accept the type as a string
}

const LinkComponent: React.FC<LinkComponentProps> = ({ item, type }) => {
  const router = useRouter();

  return (
    <View className="flex-row">
      <TouchableOpacity
        className="flex-row justify-between mt-6"
        onPress={() => router.push({ pathname: `/details/[id]`, params: { id: item._id, type } })}>
        <Text className="text-white text-base font-semibold mr-2">More Info</Text>
        <ArrowSVG />
      </TouchableOpacity>
    </View>
  );
};

export default LinkComponent;
