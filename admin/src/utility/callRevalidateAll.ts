import axios from 'axios';

const revalidateAll = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_WEBSITE_BASE_URL}/api/revalidate-all`);
    return res
  } catch (error) {
    console.error('Error posting data:', error);
  }
};

export default revalidateAll;
