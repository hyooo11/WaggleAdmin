import axios from "axios";

export const getProductCount = async () => {
  const response = await axios.get(`/api/product/wine/count`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
