import { Post } from "../types/post";

const posts: Record<string, Post> = {
    post1: require('./post1').default,
    post2: require('./post2').default,
    post3: require('./post3').default,
    post4: require('./post4').default,
    post5: require('./post4').default,
    post6: require('./post4').default,
    post7: require('./post4').default,
    post8: require('./post4').default,
    post9: require('./post4').default,


};

export default posts;
