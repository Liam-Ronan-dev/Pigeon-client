import { View, Text, TouchableOpacity } from "react-native";
import ArrowSVG from "@/assets/images/Arrow.svg";
import { useRouter } from "expo-router";

const LinkComponent = ({ item, type }) => {
  const router = useRouter();

  return (
    <View className="flex-row">
      <TouchableOpacity
        className="flex-row justify-between mt-6"
        onPress={() =>
          router.push({ pathname: `/details/[id]`, params: { id: item._id, type: type } })
        }>
        <Text className="text-white text-sm font-semibold">More Info</Text>
        <ArrowSVG className="mx-2 pt-1" />
      </TouchableOpacity>
    </View>
  );
};

export default LinkComponent;
