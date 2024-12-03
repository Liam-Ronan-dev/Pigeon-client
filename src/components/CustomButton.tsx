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
    <Pressable
      className={`bg-white rounded-xl mx-5 mb-5 min-h-[62px] justify-center items-center ${containerStyles}`}
      onPress={onPress}>
      <Text className={`font-medium text-3xl p-2 ${textStyles}`}>{title}</Text>
    </Pressable>
  );
};

export default CustomButton;
