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
                <meta property="og:image" content="https://pbs.twimg.com/profile_images/1577822032490041344/9sm_ZYGp_400x400.jpg" />
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
                    style={{ width: '100%', height: '30%', aspectRatio: 16 / 9 }}
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
