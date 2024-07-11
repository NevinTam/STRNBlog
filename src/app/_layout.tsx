import { Stack } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";

function CustomHeader() {
    return (
        <View style={styles.headerContainer}>
            <Image
                source={{ uri: 'https://1000logos.net/wp-content/uploads/2017/06/Seattle-Seahawks-Logo.png' }} // Replace with your image URL
                style={styles.headerImage}
            />
            <Text style={styles.headerTitle}>  Posts</Text>
        </View>
    );
}

function CustomPostDetailsHeader() {
    return (
        <View style={styles.headerContainer}>
            <Image
                source={{ uri: 'https://1000logos.net/wp-content/uploads/2017/06/Seattle-Seahawks-Logo.png' }} // Replace with your image URL
                style={styles.headerImage}
            />
            <Text style={styles.headerTitle}>  Post Details</Text>
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
        width: 70,
        height: 30,
        marginTop: 5,
        marginLeft: 10,
        //borderRadius: 60,
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