import React, { useState, useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity, TextInput, FlatList, TouchableWithoutFeedback } from 'react-native';
import { initializeGA, logPageView } from '../analytics/ga4';
import { getAllPosts } from '../repository/postRepository'; // Ensure this function is available for fetching posts

function CustomHeader() {
  const { width: windowWidth } = useWindowDimensions();
  const router = useRouter();
  const headerFontSize = windowWidth < 1081 ? 24 : 32;
  const imageSize = windowWidth < 1081 ? 60 : 80;

  return (
    <View style={styles.headerContent}>
      <TouchableOpacity onPress={() => router.push('/')}>
        <Image
          source={{ uri: 'https://substackcdn.com/image/fetch/w_176,h_176,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F60c80449-366b-47dc-a711-17219ba57e61_463x427.png' }}
          style={[styles.headerImage, { width: imageSize, height: imageSize }]}
        />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { fontSize: headerFontSize }]}>SeahawksToday</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/aboutPage')}>
        <Text style={styles.buttonText}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/contactUs')}>
        <Text style={styles.buttonText}>Contact</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/twitter')}>
        <Text style={styles.buttonText}>Twitter</Text>
      </TouchableOpacity>
    </View>
  );
}

function CustomSearchBar() {
  const { width: windowWidth } = useWindowDimensions(); // Define windowWidth here
  const [searchText, setSearchText] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getAllPosts();
      setAllPosts(posts);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const results = allPosts.filter(post => post.title.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredPosts(results);
    setShowDropdown(searchText.length > 0); // Show dropdown if there's search text
  }, [searchText, allPosts]);

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={[styles.searchInput, { width: windowWidth < 1081 ? 50 : 200 }]} // Adjust width based on screen size
        placeholder="Search..."
        value={searchText}
        onChangeText={text => setSearchText(text)}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 100)} // Delay hiding dropdown for user interaction
      />
      {showDropdown && filteredPosts.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={filteredPosts}
            keyExtractor={item => item.slug}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback onPress={() => {
                router.push(`/${item.slug}`);
                setSearchText('');
                setShowDropdown(false);
              }}>
                <Text style={styles.dropdownItem}>{item.title}</Text>
              </TouchableWithoutFeedback>
            )}
          />
        </View>
      )}
    </View>
  );
}

function CustomPostDetailsHeader() {
  const { width: windowWidth } = useWindowDimensions(); // Define windowWidth here
  if (windowWidth < 1081) return null; // Hide if screen width is less than 1081px

  const headerFontSize = 24; // Font size for Post Details
  const imageSize = 0; // Image size

  return (
    <View style={styles.detailsHeaderContent}>
      <Image
        source={{ uri: 'https://substackcdn.com/image/fetch/w_176,h_176,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F60c80449-366b-47dc-a711-17219ba57e61_463x427.png' }}
        style={[styles.detailsHeaderImage, { width: imageSize, height: imageSize }]} // Image size
      />
      <Text style={[styles.detailsHeaderTitle, { fontSize: headerFontSize }]}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07083a', // Dark blue background for the entire screen
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#07083a', // Dark blue background for the header
    paddingVertical: 30, // Reduced padding to minimize height
    zIndex: 1, // Ensure the header is above other content
    flexDirection: 'row', // Ensure buttons and search bar are in a row
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    marginRight: 10, // Space between image and text
  },
  headerTitle: {
    color: 'white', // White text color
    fontWeight: 'bold',
  },
  button: {
    marginLeft: 10, // Space between buttons
    backgroundColor: '#0A74DA', // Button background color
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', // Button text color
    fontWeight: 'bold',
  },
  searchContainer: {
    position: 'relative', // For absolute positioning of the dropdown
    marginLeft: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 2, // Ensure the dropdown is above other content
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  detailsHeaderContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#07083a', // Dark blue background for the header
    paddingVertical: 10, // Padding for vertical alignment
    zIndex: 1, // Ensure the header is above other content
    flexDirection: 'row', // Ensure image and text are in a row
  },
  detailsHeaderImage: {
    marginRight: 10, // Space between image and text
  },
  detailsHeaderTitle: {
    color: 'white', // White text color
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    // The height will be adjusted dynamically based on the screen width
  },
});

// Root layout to include the custom headers
export default function RootLayout() {
  const { width: windowWidth } = useWindowDimensions();
  const isSmallScreen = windowWidth < 1081;

  useEffect(() => {
    initializeGA();
    logPageView();
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer, { paddingVertical: isSmallScreen ? 10 : 30 }]}>
        <CustomHeader />
        <CustomSearchBar />
      </View>
      <View style={[styles.contentContainer, { paddingTop: isSmallScreen ? 40 : 85 }]}>
        <Stack>
          <Stack.Screen 
            name="index" 
            options={{ 
              headerShown: false // Hide default header
            }} 
          />
          <Stack.Screen 
            name="[slug]" 
            options={{ 
              headerTitle: () => <CustomPostDetailsHeader />,
              headerStyle: { backgroundColor: '#07083a' }, // Set the header background color
            }} 
          />
        </Stack>
      </View>
    </View>
  );
}
