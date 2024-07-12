import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Notification = ({ message, onClose }) => {
  return (
    <View style={styles.notificationContainer}>
      <Text style={styles.notificationText}>{message}</Text>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "#4682A9",
    alignItems: "center",
    zIndex: 10,
  },
  notificationText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#617078",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
  },
});

export default Notification;
