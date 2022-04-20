import axios from 'axios';
const KEY = '22985243-b477986a48324befacd1d8a65';
axios.defaults.baseURL = `https://pixabay.com/api/`;
// export const getImage = async (query, page, per_page) => {
//   const responce = await axios.get(
//     `?q=${query}&key=${KEY}&page=${page}&&per_page=${per_page}&image_type=photo&orientation=horizontal`,
//   );
//   return responce.data.hits;
// };

export const getImage = async (query, page, per_page) => {
  const responce = await axios.get(
    `?q=${query}&key=${KEY}&page=${page}&&per_page=${per_page}&image_type=photo&orientation=horizontal`,
  );
  return responce.data;
};
