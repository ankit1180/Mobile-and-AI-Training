
/*
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";

export default function App() {
  const [isDrawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!isDrawerVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDrawer} style={styles.button}>
        <Text style={styles.buttonText}>Open Drawer</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isDrawerVisible}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        backdropOpacity={0.4}
        onBackdropPress={toggleDrawer}
        style={styles.modal}
      >
        <View style={styles.drawer}>
          <Text style={styles.title}>Drawer Menu</Text>
          <Text style={styles.item}>Home</Text>
          <Text style={styles.item}>Profile</Text>
          <Text style={styles.item}>Settings</Text>

          <TouchableOpacity onPress={toggleDrawer}>
            <Text style={styles.close}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" ,
    backgroundColor: '#fff'
  },

  button: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
  },

  buttonText: { color: "#fff" },

  modal: {
    margin: 0,           
    justifyContent: "flex-start",
  },

  drawer: {
    width: 250,
    height: "100%",
    backgroundColor: "#fff",
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  item: {
    fontSize: 18,
    marginVertical: 10,
  },

  close: {
    marginTop: 20,
    color: "red",
  },
}); */








import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from "react-native";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const themes = {
  light: {
    background: "#ffffff",
    text: "#000000",
    drawer: "#f2f2f2",
  },
  dark: {
    background: "#121212",
    text: "#ffffff",
    drawer: "#1e1e1e",
  },
};

export default function App() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const savedTheme = await AsyncStorage.getItem("APP_THEME");

    console.log('savedTheme ====>>>> ',savedTheme);
    
    if (savedTheme) setTheme(savedTheme);
  };

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";

    console.log('newTheme ====>>>>> ', newTheme);
    
    setTheme(newTheme);
    await AsyncStorage.setItem("APP_THEME", newTheme);
  };

  const currentTheme = themes[theme];

  console.log('currentTheme =====>>>>> ',currentTheme);
  

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: currentTheme.background },
      ]}
    >
      <TouchableOpacity
        style={styles.menuBtn}
        onPress={() => setDrawerVisible(true)}
      >
        <Text style={{ color: "#fff" }}>Menu</Text>
      </TouchableOpacity>

      <Text style={[styles.text, { color: currentTheme.text }]}>
        Home Screen
      </Text>
      <Modal
        isVisible={drawerVisible}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        onBackdropPress={() => setDrawerVisible(false)}
        style={styles.modal}
      >
        <View
          style={[
            styles.drawer,
            { backgroundColor: currentTheme.drawer },
          ]}
        >
          <Text style={[styles.drawerTitle, { color: currentTheme.text }]}>
            Settings
          </Text>
          <View style={styles.toggleRow}>
            <Text style={{ color: currentTheme.text, fontSize: 16 }}>
              Dark Mode
            </Text>
            <Switch
              value={theme === "dark"}
              onValueChange={toggleTheme}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 22,
  },

  menuBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 6,
  },

  modal: {
    margin: 0,
    justifyContent: "flex-start",
  },

  drawer: {
    width: 260,
    height: "100%",
    padding: 20,
  },

  drawerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
  },

  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  closeBtn: {
    marginTop: 30,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
});

