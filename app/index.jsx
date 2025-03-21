import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";

const couriers = ["Delhivery", "DTDC", "Bluedart"];

const BookShipmentScreen = () => {
  const [pickup, setPickup] = useState("");
  const [delivery, setDelivery] = useState("");
  const [courier, setCourier] = useState(couriers[0]);
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchShippingRate = async () => {
    if (!pickup || !delivery) {
      alert("Please enter both pickup and delivery addresses.");
      return;
    }

    setLoading(true);
    try {
      // Mock API for demo purposes
      const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      const data = await response.json();
      const estimatedPrice = Math.floor(Math.random() * 500) + 100; // Random price for testing
      setPrice(estimatedPrice);
    } catch (error) {
      console.error("Error fetching shipping rate", error);
      alert("Failed to fetch shipping rate. Try again later.");
    }
    setLoading(false);
  };

  const handlePayment = () => {
    if (price === null) {
      alert("Please fetch the shipping price first.");
      return;
    }
    alert(`Proceeding to payment for ₹${price}`);
    // Implement actual payment logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Pickup Address</Text>
      <TextInput style={styles.input} value={pickup} onChangeText={setPickup} placeholder="Enter pickup address" />
      
      <Text style={styles.label}>Delivery Address</Text>
      <TextInput style={styles.input} value={delivery} onChangeText={setDelivery} placeholder="Enter delivery address" />
      
      <Text style={styles.label}>Select Courier</Text>
      <Picker selectedValue={courier} onValueChange={(value) => setCourier(value)}>
        {couriers.map((c, index) => (
          <Picker.Item key={index} label={c} value={c} />
        ))}
      </Picker>

      <Button title="Get Shipping Price" onPress={fetchShippingRate} />
      {loading && <ActivityIndicator size="large" color="blue" style={{ marginTop: 10 }} />}
      {price !== null && <Text style={styles.price}>Estimated Price: ₹{price}</Text>}
      {price !== null && <Button title="Proceed to Payment" onPress={handlePayment} color="green" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
  price: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
});

export default BookShipmentScreen;