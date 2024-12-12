import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // General styles for all tabs
        tabBarActiveTintColor: "#FF9B00",
        tabBarInactiveTintColor: "#ffffff",
        tabBarStyle: {
          backgroundColor: "#171622",
          borderTopWidth: 1,
          borderTopColor: "#424148",
        },
        headerStyle: {
          backgroundColor: "#171622",
          borderBottomColor: "#171622",
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
          tabBarIcon: ({ color }) => <FontAwesome size={20} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="pigeons/index"
        options={{
          title: "Pigeons",
          tabBarIcon: ({ color }) => <FontAwesome size={20} name="heart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="races/index"
        options={{
          title: "Races",
          tabBarIcon: ({ color }) => <FontAwesome size={20} name="flag-checkered" color={color} />,
        }}
      />
      <Tabs.Screen
        name="medicals/index"
        options={{
          title: "Medicals",
          tabBarIcon: ({ color }) => <FontAwesome size={20} name="stethoscope" color={color} />,
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
      <Tabs.Screen
        name="details/[id]/index"
        options={{
          title: 'Details',
          href: null,
        }}
      />
    </Tabs>
  );
}
