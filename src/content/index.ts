import { Post } from "../types/post";

const posts: Record<string, Post> = {
    //name of file: require('./name of file).default,
    //testLeo: require('./testLeo').default,
    offseasonPickups2022: require('./offseasonPickups2022').default,
    offseasonOffenseDraftTargets2022: require('./offseasonOffenseDraftTargets2022').default,
    offseasonDefensiveDraftTargets2022: require('./offseasonDefensiveDraftTargets2022').default,
};

export default posts;
