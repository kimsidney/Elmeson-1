import blogPostsData from "@/data/blog-posts.json";

export interface BlogPost {
  id: number;
  author: number;
  date: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  modified: string;
  postType: string;
  postStatus: string;
  parent: number;
}

/**
 * Extract the first image URL from blog post content
 */
export function extractFirstImageFromContent(content: string): string | null {
  if (!content) return null;

  // Match WordPress image URLs
  const imageRegex = /https?:\/\/www\.elmesondepepe\.com\/wp-content\/uploads\/([^"'\s\)]+\.(jpg|jpeg|png|webp|gif))/i;
  const match = content.match(imageRegex);
  
  if (match) {
    return `/images/${match[1]}`;
  }

  // Match img tags with src
  const imgTagRegex = /<img[^>]+src=["']([^"']+)["']/i;
  const imgMatch = content.match(imgTagRegex);
  
  if (imgMatch) {
    let src = imgMatch[1];
    // Convert WordPress URLs to local paths
    if (src.includes('wp-content/uploads')) {
      src = src.replace(/https?:\/\/www\.elmesondepepe\.com\/wp-content\/uploads\//, '/images/');
    }
    return src;
  }

  return null;
}

/**
 * Get featured image for a blog post, extracting from content if not available
 */
export function getFeaturedImage(post: BlogPost): string | null {
  // Check if post has featuredImage property (if we add it later)
  if ((post as any).featuredImage) {
    return `/images/${(post as any).featuredImage}`;
  }

  // Extract from content
  return extractFirstImageFromContent(post.content);
}

/**
 * Convert WordPress URL to Next.js route
 */
export function convertWordPressUrlToRoute(url: string): string {
  // Remove protocol and domain
  let route = url.replace(/https?:\/\/www\.elmesondepepe\.com/, '');
  
  // Remove trailing slash
  route = route.replace(/\/$/, '');
  
  // Check if this is a blog post
  const blogPost = blogPostsData.find((post) => {
    // Check exact slug match
    if (route === `/${post.slug}`) return true;
    // Check with trailing slash
    if (route === `/${post.slug}/`) return true;
    return false;
  });

  if (blogPost) {
    return `/story/blog/${blogPost.slug}`;
  }

  // Return as-is for other routes
  return route || '/';
}

/**
 * Check if a URL points to a blog post
 */
export function isBlogPostUrl(url: string): boolean {
  const route = convertWordPressUrlToRoute(url);
  return route.startsWith('/story/blog/');
}

/**
 * Extract keywords from text for related posts matching
 */
function extractKeywords(text: string): string[] {
  if (!text) return [];
  
  // Remove HTML tags
  const cleanText = text.replace(/<[^>]*>/g, ' ').toLowerCase();
  
  // Common words to exclude
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
    'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those',
    'key', 'west', 'cuban', 'cuba', 'best', 'guide', 'ultimate', 'complete'
  ]);
  
  // Extract words (3+ characters)
  const words = cleanText.match(/\b[a-z]{3,}\b/g) || [];
  
  // Filter out stop words and get unique words
  const keywords = [...new Set(words.filter(word => !stopWords.has(word)))];
  
  return keywords.slice(0, 10); // Return top 10 keywords
}

/**
 * Find related blog posts based on keyword matching
 */
export function findRelatedPosts(currentPostSlug: string, limit: number = 4): BlogPost[] {
  const currentPost = blogPostsData.find(p => p.slug === currentPostSlug);
  if (!currentPost) return [];

  // Extract keywords from current post
  const currentKeywords = extractKeywords(currentPost.title + ' ' + currentPost.excerpt + ' ' + currentPost.content);

  // Score other posts
  const scoredPosts = blogPostsData
    .filter(post => post.slug !== currentPostSlug && post.postStatus === 'publish')
    .map(post => {
      const postText = post.title + ' ' + post.excerpt + ' ' + post.content;
      const postKeywords = extractKeywords(postText);
      
      // Count keyword matches
      const matches = currentKeywords.filter(kw => postKeywords.includes(kw)).length;
      
      // Also check for title word matches (higher weight)
      const titleWords = post.title.toLowerCase().split(/\s+/);
      const titleMatches = currentKeywords.filter(kw => 
        titleWords.some(word => word.includes(kw) || kw.includes(word))
      ).length;
      
      const score = matches + (titleMatches * 2);
      
      return { post, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);

  // If we don't have enough matches, fill with recent posts
  if (scoredPosts.length < limit) {
    const recentPosts = blogPostsData
      .filter(post => 
        post.slug !== currentPostSlug && 
        post.postStatus === 'publish' &&
        !scoredPosts.some(sp => sp.slug === post.slug)
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit - scoredPosts.length);
    
    return [...scoredPosts, ...recentPosts].slice(0, limit);
  }

  return scoredPosts;
}

/**
 * Calculate reading time in minutes
 */
export function calculateReadingTime(content: string): number {
  if (!content) return 0;
  
  // Remove HTML tags
  const text = content.replace(/<[^>]*>/g, ' ');
  
  // Count words (average reading speed is 200-250 words per minute)
  const words = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / 200);
  
  return Math.max(1, readingTime); // At least 1 minute
}

