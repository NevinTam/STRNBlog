import { Post } from "../types/post";

const posts: Record<string, Post> = {
    //name of file: require('./name of file).default,
    //testLeo: require('./testLeo').default,
    offseasonPickupsTwentyTwo: require('./offseasonPickupsTwentyTwo').default,
    offseasonTwentyTwoOffenseDraftTargets: require('./offseasonTwentyTwoOffenseDraftTargets').default,
    offseasonDefensiveDraftTargetsTwentyTwo: require('./offseasonDefensiveDraftTargetsTwentyTwo').default,
};

export default posts;
