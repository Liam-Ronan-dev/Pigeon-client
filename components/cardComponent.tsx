import React from "react";
import { View, Text, Image } from "react-native";
import LinkComponent from "./LinkComponent";
import CustomButton from "./CustomButton";
import { useRouter } from "expo-router";
import { Item } from "@/types";

interface CardComponentProps {
  item: Item;
  type: string;
  heading: string;
  details: string[];
}

const CardComponent: React.FC<CardComponentProps> = ({ item, type, heading, details }) => {
  const router = useRouter();

  return (
    <View className="w-64 h-auto bg-[#1E1E2E] rounded-lg shadow-lg mx-5 mt-10 mb-5">
      {/* Display image or placeholder */}
      <Image
        source={
          item.imageUrl
            ? { uri: item.imageUrl }
            : require("@/assets/images/unsplash_5WWgv98ijbs.jpg")
        }
        style={{ width: "100%", height: 200, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
      />
      <View className="p-5">
        {/* Heading */}
        <Text className="text-white text-xl font-semibold mb-2">
          {heading || item.name || "Untitled"}
        </Text>

        {/* Dynamically Render Details */}
        {details && details.length > 0 ? (
          details.map((detail, index) => (
            <Text key={index} className="text-xl text-[#9CA3AF] pt-1">
              {detail}
            </Text>
          ))
        ) : (
          <Text className="text-sm text-[#9CA3AF] mb-4">No details available</Text>
        )}

        <View className="flex-row justify-between mt-3">
          <CustomButton
            onPress={() =>
              router.push({ pathname: `/${type}/[id]/edit`, params: { id: item._id } })
            }
            title="Edit"
            containerStyles="mt-5 px-5 bg-[#FF9B00]"
          />
          <LinkComponent type={type} item={item} />
        </View>
      </View>
    </View>
  );
};

export default CardComponent;
