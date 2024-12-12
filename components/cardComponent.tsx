import React from "react";
import { View, Text, Image } from "react-native";
import PlaceholderImage from "@/assets/images/unsplash_5WWgv98ijbs.jpg";
import LinkComponent from "./LinkComponent";
import CustomButton from "./CustomButton";
import { useRouter } from "expo-router";

const CardComponent = ({ item, type, heading, details }) => {
  const router = useRouter();

  return (
    <View className="w-64 bg-[#1E1E2E] rounded-lg mr-4 shadow-lg mx-5 mb-10 mt-5">
      {/* Display image or placeholder */}
      <Image
        source={item.imageUrl ? { uri: item.imageUrl } : PlaceholderImage}
        style={{ width: "100%", height: 200, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
      />
      <View className="p-5">
        {/* Heading */}
        <Text className="text-white text-lg font-semibold mb-2">
          {heading || item.name || "Untitled"}
        </Text>

        {/* Dynamically Render Details */}
        {details && details.length > 0 ? (
          details.map((detail, index) => (
            <Text key={index} className="text-sm text-[#9CA3AF] pt-1">
              {detail}
            </Text>
          ))
        ) : (
          <Text className="text-sm text-[#9CA3AF] mb-4">No details available</Text>
        )}

        {/* More Info Link */}
        <View className="flex-row justify-between">
          <CustomButton
            onPress={() =>
              router.push({ pathname: `/${type}/[id]/edit`, params: { id: item._id } })
            }
            title="Edit"
            containerStyles="mt-5 px-5"
          />
          <LinkComponent type={type} item={item} />
        </View>
      </View>
    </View>
  );
};

export default CardComponent;
