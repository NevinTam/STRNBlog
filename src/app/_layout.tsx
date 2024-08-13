import React, { useEffect } from 'react';
import { router, Stack, useRouter } from 'expo-router';
import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { initializeGA, logPageView } from '../analytics/ga4';

// Custom header for the main screen
function CustomHeader() {
  const { width: windowWidth } = useWindowDimensions();
  const router = useRouter(); // Use router for navigation
  const headerFontSize = windowWidth < 1081 ? 24 : 32; // Adjusted font size
  const imageSize = windowWidth < 1081 ? 60 : 80; // Adjusted image size
  const isSmallScreen = windowWidth < 1081;

  return (
    <View style={styles.headerContent}>
      <TouchableOpacity onPress={() => router.push('/')} style={styles.headerImageWrapper}>
        <Image
          source={{ uri: 'https://substackcdn.com/image/fetch/w_176,h_176,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F60c80449-366b-47dc-a711-17219ba57e61_463x427.png' }}
          style={[styles.headerImage, { width: imageSize, height: imageSize }]} // Image size
        />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { fontSize: headerFontSize }]}>SeahawksToday</Text>
      {!isSmallScreen && (
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
        </>
      )}
    </View>
  );
}

// Custom header for the post details screen
function CustomPostDetailsHeader() {
  const { width: windowWidth } = useWindowDimensions();
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

// Styles for the components
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
    flexDirection: 'row', // Ensure buttons are in a row
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImageWrapper: {
    marginRight: 10, // Space between image and text
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
  fixedButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#07083a', // Dark blue background for the fixed button container
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10, // Padding for vertical alignment
    zIndex: 2, // Ensure buttons are above other content
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
              headerTitleStyle: { color: 'white' }, // White text color for header title
            }} 
          />
        </Stack>
      </View>
      {isSmallScreen && (
        <View style={styles.fixedButtonsContainer}>
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
      )}
    </View>
  );
}
