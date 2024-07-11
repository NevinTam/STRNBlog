import { Stack } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";

function CustomHeader() {
    return (
        <View style={styles.headerContainer}>
            <Image
                source={{ uri: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F60c80449-366b-47dc-a711-17219ba57e61_463x427.png' }} // Replace with your image URL
                style={styles.headerImage}
            />
            <Text style={styles.headerTitle}> Posts</Text>
        </View>
    );
}

function CustomPostDetailsHeader() {
    return (
        <View style={styles.headerContainer}>
            <Image
                source={{ uri: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F60c80449-366b-47dc-a711-17219ba57e61_463x427.png' }} // Replace with your image URL
                style={styles.headerImage}
            />
            <Text style={styles.headerTitle}> Post Details</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerImage: {
        width: 40,
        height: 40,
        marginLeft: 10,
        borderRadius: 60,
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