import React from 'react';
import { Stack } from 'expo-router';
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';

function CustomHeader() {
  const { width: windowWidth } = useWindowDimensions();
  const headerFontSize = windowWidth < 1081 ? 14 : 18;

  return (
    <View style={[styles.headerContainer, styles.blueBackground]}>
      <View style={styles.rectangle} /> {/* Dark blue rectangle */}
      <Image
        source={{ uri: 'https://substackcdn.com/image/fetch/w_176,h_176,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F60c80449-366b-47dc-a711-17219ba57e61_463x427.png' }}
        style={styles.headerImage}
      />
      <Text style={[styles.headerTitle, { fontSize: headerFontSize }]}>SeahawksToday</Text>
    </View>
  );
}

function CustomPostDetailsHeader() {
  const { width: windowWidth } = useWindowDimensions();
  const headerFontSize = windowWidth < 1081 ? 14 : 18;

  return (
    <View style={[styles.headerContainer, styles.blueBackground]}>
      <View style={styles.rectangle} /> {/* Dark blue rectangle */}
      <Image
        source={{ uri: 'https://substackcdn.com/image/fetch/w_176,h_176,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F60c80449-366b-47dc-a711-17219ba57e61_463x427.png' }}
        style={styles.headerImage}
      />
      <Text style={[styles.headerTitle, { fontSize: headerFontSize }]}>Post Details</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    position: 'relative', // Ensure positioning context for absolute elements
  },
  blueBackground: {
    backgroundColor: '#07083a',
    width: '100%',
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
    zIndex: 1, // Ensure text is above other elements
  },
  headerImage: {
    width: 70,
    height: 30,
    position: 'absolute', // Position image above rectangle
    top: 0,
    left: 10,
    zIndex: 2, // Image should be above rectangle and text
  },
  rectangle: {
    position: 'absolute',
    backgroundColor: '#07083a', // Dark blue color for the rectangle
    height: '100%',
    width: '100%', // Full width of the container
    zIndex: 0, // Ensure it's behind other elements
  },
});

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerTitle: () => <CustomHeader />
        }} 
      />
      <Stack.Screen 
        name="[slug]" 
        options={{ 
          headerTitle: () => <CustomPostDetailsHeader />
        }} 
      />
    </Stack>
  );
}
