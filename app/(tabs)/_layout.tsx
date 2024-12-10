import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import raceSVG from "@/assets/images/race.svg";
import pigeonSVG from "@/assets/images/pigeon.svg";
import medicalSVG from "@/assets/images/medical.svg";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // These options apply to all tabs in this Tabs component
        tabBarActiveTintColor: "#FC814A",
        tabBarInactiveTintColor: "#ffffff",
        tabBarStyle: {
          backgroundColor: "#27282E",
          borderTopWidth: 1,
          borderTopColor: "#313E6D",
          paddingTop: 10
        },
        headerStyle: {
          backgroundColor: "#27282E",
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "bold",
          color: "#ffffff",
        },
      }}
    >
      <Tabs.Screen
        name="main"
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
