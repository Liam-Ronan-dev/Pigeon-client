import { View, Text, TouchableOpacity, Pressable, TouchableWithoutFeedback } from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import ProfileSVG from "@/assets/images/Profile.svg";

const Profile = () => {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const { logout } = useContext(AuthContext);

  return (
    <View>
      {/* Profile Dropdown */}
      <Pressable onPress={() => setDropdownVisible((prev) => !prev)} className="relative">
        <ProfileSVG />
      </Pressable>

      {/* Dropdown Menu */}
      {dropdownVisible && (
        <View className="absolute top-10 right-0 bg-[#1E1E2E] py-2 px-4 rounded-lg shadow-lg z-10">
          <TouchableOpacity onPress={() => logout()}>
            <Text className="text-[#FF9B00] font-bold text-center">Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Profile;
