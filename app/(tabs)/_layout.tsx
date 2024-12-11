import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // General styles for all tabs
        tabBarActiveTintColor: "#FC814A",
        tabBarInactiveTintColor: "#ffffff",
        tabBarStyle: {
          backgroundColor: "#27282E",
          borderTopWidth: 1,
          borderTopColor: "#313E6D",
          paddingTop: 10,
        },
        headerStyle: {
          backgroundColor: "#27282E",
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "bold",
          color: "#ffffff",
        },
      }}>
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
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="flag-checkered" color={color} />,
        }}
      />
      <Tabs.Screen
        name="medicals/index"
        options={{
          title: "Medicals",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="stethoscope" color={color} />,
        }}
      />
      <Tabs.Screen
        name="pigeons/[id]/index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="pigeons/[id]/edit"
        options={{
          title: "Edit Pigeon",
          href: null,
        }}
      />
      <Tabs.Screen
        name="pigeons/create"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="races/[id]/index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="races/create"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="races/[id]/edit"
        options={{
          title: "Edit Race",
          href: null,
        }}
      />
      <Tabs.Screen
        name="medicals/[id]/index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="medicals/create"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="medicals/[id]/edit"
        options={{
          title: "Edit Medical Treatment",
          href: null,
        }}
      />
    </Tabs>
  );
}
