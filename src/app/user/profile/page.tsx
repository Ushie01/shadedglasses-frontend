"use client";

import { useGetUserProfile } from "@/api/user";
import { toast } from "sonner";
import { handleApiError } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";

export default function UserProfilePage() {
  const { user, isLoading: isUserLoading } = useUser();
  const ownerId = user?.id || "";

  const {
    data: profile,
    isLoading: isProfileLoading,
    error,
  } = useGetUserProfile(ownerId);

  if (isUserLoading || isProfileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    handleApiError(error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Error loading profile. Please try again.</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>No profile data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-[#92B917] mb-6">User Profile</h1>

      <div className="bg-[#171714] border border-[#5d5538] rounded-lg p-6 max-w-2xl">
        {profile.data && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Personal Information
                </h2>
                <div className="space-y-2">
                  <p>
                    <span className="text-gray-400">Name:</span>{" "}
                    {profile.data.fullName}
                  </p>
                  <p>
                    <span className="text-gray-400">Email:</span>{" "}
                    {profile.data.email}
                  </p>
                  <p>
                    <span className="text-gray-400">Role:</span>{" "}
                    {profile.data.role}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Eyewear Information
                </h2>
                <div className="space-y-2">
                  <p>
                    <span className="text-gray-400">Model:</span>{" "}
                    {profile.data.model}
                  </p>
                  <p>
                    <span className="text-gray-400">Serial Number:</span>{" "}
                    {profile.data.serialNumber}
                  </p>
                </div>
              </div>
            </div>

            {profile.data.createdAt && (
              <div className="pt-4 border-t border-[#5d5538]">
                <p>
                  <span className="text-gray-400">Member since:</span>{" "}
                  {new Date(profile.data.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
