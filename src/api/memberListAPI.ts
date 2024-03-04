import axios from "axios";

export const getMemberList = async (token: string) => {
  const response = await axios.get(`/api/admin/memberList`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${token}`,
    },
  });
  return response;
};
