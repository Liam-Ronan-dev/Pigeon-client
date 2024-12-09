import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import raceSVG from "@/assets/images/race.svg";
import pigeonSVG from "@/assets/images/pigeon.svg";
import medicalSVG from "@/assets/images/medical.svg";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="pigeons/index"
        options={{
          title: "Pigeons",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="races/index"
        options={{
          title: "Races",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="bed" color={color} />,
        }}
      />
      <Tabs.Screen
        name="medicals/index"
        options={{
          title: "Medicals",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="beer" color={color} />,
        }}
      />
    </Tabs>
  );
}
