// import React from "react";
// import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";

// const dresses = [
//   { id: "1", name: "Elegant Red Gown", price: "$120", image: require("../assets/images/eagle.jpg") },
//   { id: "2", name: "Classic Black Dress", price: "$90", image: require("../assets/images/icon.png") },
//   { id: "3", name: "Floral Summer Dress", price: "$75", image: require("../assets/images/tiger.jpg") }
// ];

// export default function Home() {
//   return (
//     <View style={styles.container}>
//       {/* Hero Section */}
//       <View style={styles.hero}>
//         <Text style={styles.title}>Discover Your Perfect Dress</Text>
//         <Text style={styles.subtitle}>Find the latest styles at unbeatable prices.</Text>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Shop Now</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Featured Dresses */}
//       <FlatList
//         data={dresses}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Image source={item.image} style={styles.image} />
//             <Text style={styles.dressName}>{item.name}</Text>
//             <Text style={styles.dressPrice}>{item.price}</Text>
//             <TouchableOpacity style={styles.buyButton}>
//               <Text style={styles.buttonText}>Buy Now</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//         numColumns={2}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#fff" },
//   hero: { alignItems: "center", padding: 20, backgroundColor: "#f3f3f3", borderRadius: 10 },
//   title: { fontSize: 24, fontWeight: "bold" },
//   subtitle: { color: "#666", marginVertical: 10 },
//   button: { backgroundColor: "#007bff", padding: 10, borderRadius: 8, marginTop: 10 },
//   buttonText: { color: "#fff", fontWeight: "bold" },
//   card: { flex: 1, margin: 10, alignItems: "center", backgroundColor: "#fff", padding: 10, borderRadius: 10, elevation: 5 },
//   image: { width: 150, height: 200, borderRadius: 10 },
//   dressName: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
//   dressPrice: { color: "#888" },
//   buyButton: { backgroundColor: "#28a745", padding: 10, borderRadius: 8, marginTop: 10 },
// });

