import axios from 'axios';

const generateSitemap = async () => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_WEBSITE_BASE_URL}/api/generate-sitemap`,
    );
  } catch (error) {
    console.error('Sitemap generation failed', error);
  }
};

export default generateSitemap;
