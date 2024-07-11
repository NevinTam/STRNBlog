import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View, Text, Image, Dimensions } from "react-native";
import { getAllPosts } from "../repository/postRepository";
import { Link } from "expo-router";
import { Post } from "../types/post"; // Adjust the path as per your project structure

const Page = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);

  useEffect(() => {
    const fetchedPosts = getAllPosts();
    setPosts(fetchedPosts.reverse()); // Reverse the order of the posts

    const handleResize = () => {
      setWindowWidth(Dimensions.get("window").width);
    };

    Dimensions.addEventListener("change", handleResize);

    return () => {
      Dimensions.removeEventListener("change", handleResize);
    };
  }, []);

  const itemWidth = windowWidth / 8 - 20; // Subtract some space for margins

  const renderItem = ({ item }: { item: Post }) => (
    <View style={[styles.postContainer, { width: itemWidth }]}>
      <Link href={`/${item.slug}`} style={styles.postLink}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.thumbnail }}
            style={[styles.postThumbnail, { width: itemWidth - 4 }]} // Adjusted to fit within border
            resizeMode="cover"
          />
          <View style={styles.titleContainer}>
            <Text style={styles.postTitle}>{item.title}</Text>
          </View>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.postDate}>{formatDate(item.date)}</Text>
        </View>
      </Link>
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
        numColumns={8}
        key={8} // Force re-render when numColumns changes
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    backgroundColor: "lightgray",
    borderRadius: 10,
    overflow: "hidden",
    margin: 5,
    borderWidth: 2,
    borderColor: "#0d47a1",
    position: "relative",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 200,
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
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  postDate: {
    fontSize: 12,
    color: "#fff",
  },
});

export default Page;
