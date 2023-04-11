import { Post } from '@prisma/client';
import natural from 'natural';

// Create a tokenizer
const tokenizer = new natural.WordTokenizer();

export function extractKeywords(content: string) {
  // Tokenize the content into words
  const words = tokenizer.tokenize(content);

  // Remove stop words
  // @ts-ignore
  const { stopwords } = natural;
  const filteredWords = words.filter((word) => !stopwords.includes(word));

  // Stem the words
  const stemmer = natural.PorterStemmer;
  const stemmedWords = filteredWords.map((word) => stemmer.stem(word));

  // Return the keywords
  return stemmedWords;
}

export function cosineSimilarity(post1Keywords: string[], post2Keywords: string[]) {
  const intersection = post1Keywords.filter((keyword) => post2Keywords.includes(keyword));
  const magnitude1 = Math.sqrt(post1Keywords.length);
  const magnitude2 = Math.sqrt(post2Keywords.length);
  return intersection.length / (magnitude1 * magnitude2);
}

export function getRecommendedPosts(userLikedPosts: string[], allPosts: Post[]) {
  const userViewedPosts = allPosts.filter((post) => userLikedPosts.includes(post.id));
  const recommendedPosts = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const post of allPosts) {
    if (!userLikedPosts.includes(post.id)) {
      const similarityScore = cosineSimilarity(userViewedPosts.map((post) => post.keywords).flat(), post.keywords);
      recommendedPosts.push({ post, similarityScore });
    }
  }
  recommendedPosts.sort((a, b) => b.similarityScore - a.similarityScore);
  return recommendedPosts.map((recommendedPost) => recommendedPost.post);
}
