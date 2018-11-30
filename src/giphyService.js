import ky from "ky";
import { GIPHY_API_KEY, GIPHY_URL, GIPHY_DEFAULT_CONFIG } from "./config";

const baseUrl = ky.extend({ prefixUrl: GIPHY_URL });
const { LIMIT, OFFSET, LANG, RATING } = GIPHY_DEFAULT_CONFIG;

export default async ({
  searchQuery,
  limit = LIMIT,
  offset = OFFSET,
  rating = RATING,
  lang = LANG
}) => {
  const { data, pagination } = await baseUrl
    .get(
      `search?api_key=${GIPHY_API_KEY}&q=${searchQuery}&limit=${limit}&offset=${offset}&rating=${rating}&lang=${lang}`
    )
    .json();
  return { data, pagination };
};
