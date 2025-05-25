import axios from "axios";

const createApiInstance = (baseURL?: string, customHeaders = {}) => {
  if (!baseURL) {
    throw new Error("NEXT_PUBLIC_BASE_URL environment variable is required");
  }
  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      ...customHeaders,
    },
  });
};

export const productsService = createApiInstance(
  process.env.NEXT_PUBLIC_BASE_URL
);

export const categoryService = createApiInstance(
  process.env.NEXT_PUBLIC_BASE_URL_2
);

export const bannerService = createApiInstance(
  process.env.NEXT_PUBLIC_BASE_URL_2
);
