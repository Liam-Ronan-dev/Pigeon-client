import { useEffect, useCallback, useReducer } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

// The state is a tuple: [boolean, T | null], where boolean indicates loading state and T | null is the stored value.
type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

// A custom hook that abstracts asynchronous storage into a simple useState-like interface.
function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null], // Default initial state: loading = true, value = null
): UseStateHook<T> {
  // useReducer is used here to handle asynchronous updates more gracefully.
  return useReducer(
    // When this reducer is called, we consider loading done (false) and the action as the new value.
    (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
    initialValue,
  ) as UseStateHook<T>;
}

// A helper function for setting an item in secure/native or web storage.
export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === "web") {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

// The main hook for interacting with either SecureStore (native) or localStorage (web).
// It returns a state tuple that includes loading and the current value, plus a setter function.
export function useStorageState(key: string): UseStateHook<string> {
  // Initialize asynchronous state with loading = true and value = null.
  const [state, setState] = useAsyncState<string>();

  // On initial mount (and whenever the key changes), retrieve the stored value.
  useEffect(() => {
    if (Platform.OS === "web") {
      // On the web, read from localStorage if available
      try {
        if (typeof localStorage !== "undefined") {
          setState(localStorage.getItem(key)); // Immediately set the state with the retrieved value
        }
      } catch (e) {
        console.error("Local storage is unavailable:", e);
      }
    } else {
      // On native platforms, use SecureStore to get the item.
      SecureStore.getItemAsync(key).then((value) => {
        setState(value); // Once the value is retrieved, update the state
      });
    }
  }, [key]);

  // The setter function, when called, updates the state and also persists the change to storage.
  const setValue = useCallback(
    (value: string | null) => {
      setState(value); // Update the in-memory state
      setStorageItemAsync(key, value); // Persist the value to underlying storage
    },
    [key],
  );

  // Return the current state tuple and the setter function.
  return [state, setValue];
}
