import axios from 'axios';

const revalidateCatch = async (tags) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_WEBSITE_BASE_URL}/api/revalidate-catch`, { tags });
  } catch (error) {
    console.error('Error posting data:', error);
  }
};

export default revalidateCatch;
