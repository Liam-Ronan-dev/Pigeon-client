import { View, TextInput } from "react-native";
import React from "react";
import SearchSVG from "@/assets/images/Search.svg";

const Search = () => {
  return (
    <View className="flex-row items-center bg-[#1E1E2E] rounded-md px-4 mx-5 py-2 mt-5 mb-4 shadow-md">
      <TextInput
        placeholder="Search"
        placeholderTextColor="#9CA3AF"
        className="flex-1 text-white text-base p-3"
      />
      <SearchSVG />
    </View>
  );
};

export default Search;
