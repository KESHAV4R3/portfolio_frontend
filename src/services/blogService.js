import axios from 'axios';

const CACHE_KEY = 'medium_blogs_cache';
const CACHE_TIME_KEY = 'medium_blogs_cache_time';
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes cache

/**
 * Fetches Medium blog posts dynamically for the user @4r3keshav.
 * Bypasses CORS using the rss2json API converter.
 * Stores results in sessionStorage to optimize performance and prevent rate-limiting.
 */
export const fetchMediumBlogs = async () => {
  // 1. Check cache
  try {
    const cachedData = sessionStorage.getItem(CACHE_KEY);
    const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY);
    if (cachedData && cachedTime && (Date.now() - Number(cachedTime) < CACHE_DURATION)) {
      return JSON.parse(cachedData);
    }
  } catch (e) {
    console.warn("Failed to read blogs cache", e);
  }

  // 2. Fetch fresh data
  const rssUrl = 'https://medium.com/feed/@4r3keshav';
  let url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
  
  // Support optional RSS2JSON API Key from environment variables
  const apiKey = import.meta.env.VITE_RSS2JSON_API_KEY;
  if (apiKey) {
    url += `&api_key=${apiKey}`;
  }

  const response = await axios.get(url);
  if (response.data && response.data.status === 'ok') {
    const items = response.data.items || [];
    const formattedBlogs = items.map(item => {
      // 1. Clean HTML to make a plain-text excerpt
      let excerpt = '';
      const rawContent = item.description || item.content || '';
      if (rawContent) {
        try {
          const parser = new DOMParser();
          const doc = parser.parseFromString(rawContent, 'text/html');
          const text = doc.body.textContent || "";
          // Replace consecutive whitespaces/newlines with a single space
          const cleanText = text.replace(/\s+/g, ' ').trim();
          excerpt = cleanText.substring(0, 150);
          if (cleanText.length > 150) {
            excerpt += '...';
          }
        } catch (e) {
          // Fallback regex if DOMParser fails
          const cleanText = rawContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
          excerpt = cleanText.substring(0, 150);
          if (cleanText.length > 150) {
            excerpt += '...';
          }
        }
      }

      // 2. Format Date: e.g. "2026-05-19 04:01:46" -> "May 19, 2026"
      let formattedDate = item.pubDate;
      if (item.pubDate) {
        try {
          // Replace dash with slash for cross-browser (Safari) support
          const dateStr = item.pubDate.replace(/-/g, '/');
          const dateObj = new Date(dateStr);
          if (!isNaN(dateObj.getTime())) {
            formattedDate = dateObj.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });
          }
        } catch (e) {
          console.warn("Error parsing date:", e);
        }
      }

      // 3. Estimate read time (avg 200 words per minute)
      let readTime = '5 min read';
      if (item.content || item.description) {
        const textForReadTime = item.content || item.description;
        const cleanText = textForReadTime.replace(/<[^>]*>/g, ' ');
        const wordCount = cleanText.split(/\s+/).filter(Boolean).length;
        const minutes = Math.ceil(wordCount / 200);
        readTime = `${minutes} min read`;
      }

      // 4. Normalize tags (limit to 3 for visual spacing)
      const tags = item.categories && item.categories.length > 0 
        ? item.categories.map(cat => cat.replace(/-/g, ' ')).slice(0, 3)
        : ["Technical"];

      return {
        title: item.title,
        date: formattedDate,
        readTime: readTime,
        excerpt: excerpt,
        tags: tags,
        link: item.link
      };
    });

    // Save to cache
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(formattedBlogs));
      sessionStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
    } catch (e) {
      console.warn("Failed to write blogs cache", e);
    }

    return formattedBlogs;
  } else {
    throw new Error(response.data?.message || "Failed to fetch blogs feed");
  }
};
