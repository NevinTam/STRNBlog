import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity, TextInput, FlatList, TouchableWithoutFeedback, Modal } from 'react-native';
import { getAllPosts } from '../repository/postRepository'; // Ensure this function is available for fetching posts
import { db } from '../../firebaseConfig'; // Import your Firebase config
import { collection, addDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { router, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { initializeGA, logPageView } from '../analytics/ga4';
import Head from 'expo-router/head';

const fallbackMeta = {
  title: 'SeahawksToday6',
  description: 'SeahawksToday - Your source for the latest Seahawks news.',
  thumbnail: 'https://substackcdn.com/image/fetch/w_176,h_176,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F60c80449-366b-47dc-a711-17219ba57e61_463x427.png'
};

// CustomHeader Component
function CustomHeader({ onSubscribePress }) {
  const { width: windowWidth } = useWindowDimensions();
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
      {windowWidth < 1081 ? (
        <TouchableOpacity style={styles.searchIcon} onPress={() => {/* Add functionality if needed */}}>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/aboutPage')}>
            <Text style={styles.buttonText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/contactUs')}>
            <Text style={styles.buttonText}>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/twitter')}>
            <Text style={styles.buttonText}>Twitter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onSubscribePress}>
            <Text style={styles.buttonText}>Subscribe</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

// Footer Component
function Footer({ onSubscribePress }) {
  const router = useRouter();
  return (
    <View style={styles.footerButtons}>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/aboutPage')}>
        <Text style={styles.buttonText}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/contactUs')}>
        <Text style={styles.buttonText}>Contact</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/twitter')}>
        <Text style={styles.buttonText}>Twitter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onSubscribePress}>
        <Text style={styles.buttonText}>Subscribe</Text>
      </TouchableOpacity>
    </View>
  );
}

// CustomSearchBar Component
function CustomSearchBar() {
  const { width: windowWidth } = useWindowDimensions();
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
    initializeGA();
    logPageView();
  }, []);
  useEffect(() => {
    const results = allPosts.filter(post => post.title.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredPosts(results);
    setShowDropdown(searchText.length > 0); // Show dropdown if there's search text
  }, [searchText, allPosts]);

  if (windowWidth < 1081) return null; // Hide search bar for small screens

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

// RootLayout Component
export default function RootLayout() {
  const { width: windowWidth } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const { slug } = useLocalSearchParams(); // Get the slug from route params
  const [currentPost, setCurrentPost] = useState(null);

  const handleSubscribePress = () => {
    // Show the modal
    setModalVisible(true);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const posts = await getAllPosts();
      if (slug) {
        // Ensure slug is defined and use it to find the specific post
        const post = posts.find(p => p.slug === slug || (slug.startsWith(p.slug) && slug.length > p.slug.length));
        setCurrentPost(post || null);
      } else {
        setCurrentPost(null);
      }
    };
    fetchPost();
  }, [slug]);

  const handleConfirmSubscription = async () => {
    try {
      // Add the email to Firestore
      await addDoc(collection(db, 'subscriptions'), { email });
      setModalVisible(false);
      setEmail('');
    } catch (error) {
      console.error("Error adding email to Firestore: ", error);
    }
  };

  const handleCancelSubscription = async () => {
    setModalVisible(false);
    setEmail('');
  };

  useEffect(() => {
    const checkModalVisibility = async () => {
      try {
        // Clear the modal flag to show the modal on each app visit
        await AsyncStorage.removeItem('hasShownModal');
        setModalVisible(true);
      } catch (error) {
        console.error("Error checking modal visibility: ", error);
      }
    };
    checkModalVisibility();
  }, []);

  const isHomePage = !slug || slug === '/' || slug === 'https://www.seahawks-today.com/' || slug === 'https://seahawks-today.com/';
  const isSpecialPage = slug === 'aboutPage' || slug === 'contactUs' || slug === 'twitter';

  const meta = currentPost && !isHomePage && !isSpecialPage ? {
    title: currentPost.title,
    description: currentPost.description,
    thumbnail: currentPost.thumbnail
  } : fallbackMeta;

  return (
    <View style={styles.container}>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="og:title" content={meta.title} />
        <meta name="og:description" content={meta.description} />
        <meta name="og:image" content={meta.thumbnail} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.thumbnail} />
      </Head>
      <View style={styles.headerContainer}>
        <CustomHeader onSubscribePress={handleSubscribePress} />
        <CustomSearchBar />
      </View>
      <Stack />
      {windowWidth < 1081 && <Footer onSubscribePress={handleSubscribePress} />}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Subscribe to SeahawksToday for free!</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter your email"
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalConfirmButton} onPress={handleConfirmSubscription}>
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalCancelButton} onPress={handleCancelSubscription}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingVertical: 18, // Reduced padding to minimize height
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
    paddingTop: 50,
   // flex: 1,
    // The height will be adjusted dynamically based on the screen width
  },
  searchIcon: {
    marginLeft: 10,
  },
  searchIconText: {
    color: 'white',
    fontSize: 24,
  },
  footerButtons: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center', // Adjust spacing as needed
    backgroundColor: '#07083a',
    paddingVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    height: '100%',
    //flex: 1,  // Fill the screen
    justifyContent: 'center',  // Center vertically
    alignItems: 'center',      // Center horizontally
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay background
  },
  modalContent: {
    width: '80%',  // Adjust width as a percentage of the screen width
    maxWidth: 400, // Optional: Max width to prevent it from being too large
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    // Removed absolute positioning and transform
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis', // Truncate text if it overflows
  },
  modalInput: {
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 10, // Add padding to make space for buttons
  },
  modalConfirmButton: {
    backgroundColor: '#0A74DA',
    padding: 10,
    borderRadius: 5,
    paddingRight: 20,
    alignItems: 'center',
    flex: 1, // Take up space in the row
    marginRight: 10, // Space between confirm and cancel buttons
  },
  modalCancelButton: {
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    flex: 1, // Take up space in the row
    marginLeft: 5, // Space between confirm and cancel buttons
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});