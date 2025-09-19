import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

// Get user profile
async function getUserProfile(ownerId: string) {
  try {
    const { data } = await api.get(`/owner/management/${ownerId}/profile`);
    return data;
  } catch (error) {
    console.error("Get user profile error:", error);
    throw error;
  }
}

export function useGetUserProfile(ownerId: string) {
  return useQuery({
    queryKey: ["userProfile", ownerId],
    queryFn: () => getUserProfile(ownerId),
    enabled: !!ownerId,
  });
}

async function getUserCertificate(url: string) {
  try {
    const { data } = await api.get(url);
    return data;
  } catch (error) {
    console.error("Get user certificate error:", error);
    throw error;
  }
}

export function useGetUserCertificate(
  ownerId: string,
  page: number,
  limit: number
) {
  return useQuery({
    queryKey: ["userCertificate", ownerId, page, limit],
    queryFn: () =>
      getUserCertificate(
        `/owner/management/${ownerId}/certificates?page=${page}&limit=${limit}`
      ),
    enabled: !!ownerId,
  });
}
