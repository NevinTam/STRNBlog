import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { getPost, getAllPosts } from '../repository/postRepository';
import Markdown from 'react-native-markdown-display';
import Head from 'expo-router/head';
import { ORIGIN } from '../config';

export async function generateStaticParams(): Promise<Record<string, string>[]> {
    const posts = getAllPosts();
    // Return an array of params to generate static HTML files for.
    // Each entry in the array will be a new page.
    return posts.map(post => ({ slug: post.slug }));
}

const PostDetailsPage = () => {
    const { slug } = useLocalSearchParams();
    const [post, setPost] = useState(getPost(slug));

    if (!post) {
        return <Text>Post not Found!</Text>;
    }

    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.description} />
                <meta property="og:image" content="https://substackcdn.com/image/fetch/w_176,h_176,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F60c80449-366b-47dc-a711-17219ba57e61_463x427.png" />
                <meta name="twitter:image" content="https://substackcdn.com/image/fetch/w_176,h_176,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F60c80449-366b-47dc-a711-17219ba57e61_463x427.png"/>
            </Head>
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                }}
                contentContainerStyle={{
                    maxWidth: 960,
                    width: '100%',
                    marginHorizontal: 'auto',
                    padding: 20,
                }}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{post.title}</Text>
                </View>

                <Image
                    source={{ uri: post.thumbnail }}
                    style={{ width: '100%', aspectRatio: 16 / 9 }}
                    alt={post.title}
                />
                <View style={styles.postContainer}>
                    <Markdown>{post.content}</Markdown>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        width: '100%',
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    postContainer: {
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderColor: 'gold',
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
});

export default PostDetailsPage;
