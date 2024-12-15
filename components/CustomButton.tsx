import { Text, Pressable } from "react-native";

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  textStyles?: string;
  containerStyles?: string;
}

const CustomButton = ({
  onPress,
  title,
  textStyles = "",
  containerStyles = "",
}: CustomButtonProps) => {
  return (
    <Pressable className={`rounded-xl ${containerStyles}`} onPress={onPress}>
      <Text className={`text-white text-center font-semibold p-2 ${textStyles}`}>{title}</Text>
    </Pressable>
  );
};

export default CustomButton;
