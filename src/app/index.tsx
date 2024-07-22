import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View, Text, Image, useWindowDimensions } from "react-native";
import { getAllPosts } from "../repository/postRepository";
import { Link } from "expo-router";
import { Post } from "../types/post"; // Adjust the path as per your project structure

const Page = () => {
  const windowWidth = useWindowDimensions().width;
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchedPosts = getAllPosts();
    setPosts(fetchedPosts.reverse()); // Reverse the order of the posts
  }, []);

  const numColumns = windowWidth < 1081 ? 2 : 4;
  const itemWidth = windowWidth / numColumns - 20; // Subtract some space for margins
  const itemHeight = itemWidth * 1.2; // Adjusted height based on window width
  const titleFontSize = windowWidth < 1081 ? 14 : 18; // Adjusted font size for title
  const dateFontSize = windowWidth < 1081 ? 10 : 12; // Adjusted font size for date
  const imageHeightAdjustment = windowWidth < 1081 ? 18 : 0; // Adjust height based on window width

  const renderItem = ({ item }: { item: Post }) => (
    <View style={[styles.postContainer, { width: itemWidth, height: itemHeight }]}>
      <Link href={`/${item.slug}`} style={styles.postLink}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.thumbnail }}
            style={[styles.postThumbnail, { width: itemWidth - 4, height: itemHeight - 44 + imageHeightAdjustment }]} // Adjusted to fit within border
            resizeMode="cover"
          />
          <View style={styles.titleContainer}>
            <Text style={[styles.postTitle, { fontSize: titleFontSize }]}>{item.title}</Text>
          </View>
        </View>
      </Link>
      <View style={styles.dateContainer}>
        <Text style={[styles.postDate, { fontSize: dateFontSize }]}>{formatDate(item.date)}</Text>
      </View>
    </View>
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        contentContainerStyle={styles.postList}
        renderItem={renderItem}
        keyExtractor={(item) => item.slug}
        numColumns={numColumns}
        key={numColumns} // Force re-render when numColumns changes
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07083a",
    padding: 10,
  },
  postList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  postLink: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
    textDecorationLine: "none",
  },
  postContainer: {
    backgroundColor: "#07083a",
    borderRadius: 10,
    overflow: "hidden",
    margin: 5,
    borderWidth: 2,
    borderColor: "rgba(191,163,68, 0.8)",
    position: "relative",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: "85%", // Adjusted to leave space for title and date
  },
  postThumbnail: {
    height: "100%",
    borderRadius: 10,
  },
  titleContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(191,163,68, 0.8)", // Semi-transparent gold
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  dateContainer: {
    backgroundColor: "#07083a",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 30, // Adjusted height for date container
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  postDate: {
    color: "#ffff",
  },
});

export default Page;
