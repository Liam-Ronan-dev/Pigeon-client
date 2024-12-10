import { Text, Pressable, Image, ImageSourcePropType, View } from "react-native";

interface LargeCardProps {
  onPress: () => void;
  title: string;
  imageUri: ImageSourcePropType;
  textStyles?: string;
  containerStyles?: string;
  imageStyles?: string
}

const LargeCard: React.FC<LargeCardProps> = ({
  onPress,
  title,
  containerStyles = "",
  textStyles = "",
  imageStyles = "",
  imageUri,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-lg shadow-lg ${containerStyles}`}>
      <Image source={imageUri} className={imageStyles}/>
      <View className="absolute inset-0 justify-start items-start px-5 pt-5">
        <Text className={`text-white font-bold text-4xl ${textStyles}`}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default LargeCard;
