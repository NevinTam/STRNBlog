import React from 'react';
import { Stack } from 'expo-router';
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';

// Custom header for the main screen
function CustomHeader() {
  const { width: windowWidth } = useWindowDimensions();
  const headerFontSize = windowWidth < 1081 ? 24 : 32; // Adjusted font size
  const imageSize = windowWidth < 1081 ? 60 : 80; // Adjusted image size

  return (
    <View style={styles.headerContent}>
      <Image
        source={{ uri: 'https://substackcdn.com/image/fetch/w_176,h_176,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F60c80449-366b-47dc-a711-17219ba57e61_463x427.png' }}
        style={[styles.headerImage, { width: imageSize, height: imageSize }]} // Image size
      />
      <Text style={[styles.headerTitle, { fontSize: headerFontSize }]}>SeahawksToday</Text>
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
        style={[styles.detailsHeaderImage, { width: imageSize, height: imageSize}]} // Image size
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

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CustomHeader />
      </View>
      <View style={[styles.contentContainer, { paddingTop: isSmallScreen ? 65 : 85 }]}>
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
    </View>
  );
}
