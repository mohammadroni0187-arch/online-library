
"use client";

import { authClient, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  FiCamera,
  FiRefreshCw,
  FiTrash2,
  FiUploadCloud,
} from "react-icons/fi";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { data: session, isPending, refetch } = authClient.useSession();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const user = session?.user;

  const currentName = name !== null ? name : user?.name || "";
  const displayImage = image !== null ? image : user?.image || "";
  const hasValidImage = Boolean(displayImage && failedSrc !== displayImage);

  const initial =
    currentName.charAt(0).toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    "U";

  if (isPending) {
    return (
      <main className="min-h-screen bg-[#f4f6f5] px-4 py-10 sm:py-12">
        <div className="mx-auto max-w-2xl animate-pulse space-y-6">
          <div className="space-y-2">
            <div className="h-7 w-40 rounded bg-gray-200" />
            <div className="h-4 w-60 rounded bg-gray-200" />
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-gray-200 sm:h-20 sm:w-20" />
              <div className="space-y-2">
                <div className="h-5 w-32 rounded bg-gray-200" />
                <div className="h-4 w-44 rounded bg-gray-200" />
                <div className="flex gap-2 pt-1">
                  <div className="h-6 w-20 rounded bg-gray-200" />
                  <div className="h-6 w-24 rounded bg-gray-200" />
                </div>
              </div>
            </div>
            <div className="h-9 w-24 rounded-xl bg-gray-200" />
          </div>

          <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="h-5 w-20 rounded bg-gray-200" />
            <div className="h-11 w-full rounded-xl bg-gray-200" />
            <div className="h-11 w-full rounded-xl bg-gray-200" />
            <div className="h-11 w-full rounded-xl bg-gray-200" />
            <div className="mt-2 h-11 w-full rounded-xl bg-gray-200" />
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#f4f6f5] px-4 py-16">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">
            You are not signed in
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Please sign in to view your profile.
          </p>

          <button
            onClick={() => router.replace("/sign-in")}
            className="mt-5 cursor-pointer rounded-xl bg-[#058c42] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#047738]"
          >
            Sign In
          </button>
        </div>
      </main>
    );
  }

  const emojiPresets = [
    "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Happy",
    "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Cool",
    "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Lucky",
    "https://api.dicebear.com/7.x/bottts/svg?seed=Bazar",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix",
  ];

  // Local file upload
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImage(base64String);
      setFailedSrc(null);
      toast.success("Image selected! Click Update to save it.");
    };

    reader.readAsDataURL(file);
  };

  // Generate random avatar
  const handleGenerateRandomEmoji = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    const styles = ["fun-emoji", "bottts", "avataaars", "adventurer", "thumbs"];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];

    const newAvatar = `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${randomSeed}`;

    setImage(newAvatar);
    setFailedSrc(null);
  };

  // Remove profile image
  const handleRemoveImage = () => {
    setImage("");
    setFailedSrc(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Sign Out
  const handleSignOut = async () => {
    setLoading(true);

    try {
      await signOut();

      toast.success("Signed out successfully!");

      router.replace("login");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
      toast.error("Failed to sign out. Please try again.");
      setLoading(false);
    }
  };

  // Update Profile
  const handleUpdateProfile = async () => {
    if (!currentName.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    try {
      setSaving(true);

      await authClient.updateUser({
        name: currentName.trim(),
        image: displayImage,
      });

      if (refetch) {
        await refetch();
      }

      toast.success("Profile updated successfully!");
      router.refresh();
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f6f5] px-4 py-10 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-2xl">
            My Profile
          </h1>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            View and update your account information and profile picture.
          </p>
        </div>

        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                {hasValidImage ? (
                  <img
                    src={displayImage}
                    alt={currentName || "Profile"}
                    referrerPolicy="no-referrer"
                    onError={() => setFailedSrc(displayImage)}
                    className="h-16 w-16 shrink-0 rounded-2xl bg-gray-100 object-cover shadow-sm sm:h-20 sm:w-20"
                  />
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-green-600 to-emerald-500 text-2xl font-bold text-white shadow-sm sm:h-20 sm:w-20 sm:text-3xl">
                    {initial}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload Profile Picture"
                  className="absolute -right-1 -bottom-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-green-600 text-white shadow-md transition hover:scale-105 hover:bg-green-700"
                >
                  <FiCamera className="text-xs" />
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-base font-bold text-gray-900 sm:text-lg">
                  {currentName || "Name not provided"}
                </h2>

                <p className="break-all text-xs text-gray-500 sm:text-sm">
                  {user.email}
                </p>

                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    <FiUploadCloud className="text-xs text-green-600" />
                    Upload Image
                  </button>

                  <button
                    type="button"
                    onClick={handleGenerateRandomEmoji}
                    className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    <FiRefreshCw className="text-xs text-emerald-600" />
                    Random Avatar
                  </button>

                  {displayImage && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-600 transition hover:bg-red-100"
                    >
                      <FiTrash2 className="text-xs" />
                      Remove Image
                    </button>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              disabled={loading}
              className="flex shrink-0 cursor-pointer items-center justify-center gap-1.5 self-start rounded-xl border border-red-300 px-4 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 sm:self-center sm:text-sm"
            >
              <span className="text-sm font-bold leading-none sm:text-base">
                ↩
              </span>

              <span>{loading ? "Signing Out..." : "Sign Out"}</span>
            </button>
          </div>

          <div className="mt-5 border-t border-gray-100 pt-4">
            <label className="mb-2.5 block text-xs font-semibold text-gray-700">
              Choose a Profile Avatar
            </label>

            <div className="flex flex-wrap items-center gap-2.5">
              {emojiPresets.map((preset, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setImage(preset);
                    setFailedSrc(null);
                  }}
                  className={`relative h-11 w-11 cursor-pointer overflow-hidden rounded-xl border-2 transition hover:scale-105 ${
                    displayImage === preset
                      ? "border-green-600 shadow-sm ring-2 ring-green-200"
                      : "border-gray-200 bg-gray-50 hover:border-green-400"
                  }`}
                >
                  <img
                    src={preset}
                    alt={`Avatar ${index + 1}`}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="mb-4 text-base font-bold text-gray-900">
            Account Information
          </h3>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:text-sm">
                Full Name
              </label>

              <input
                type="text"
                value={currentName}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-1 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:text-sm">
                Email Address
              </label>

              <input
                type="email"
                value={user.email}
                disabled
                className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:text-sm">
                Profile Image URL (Optional)
              </label>

              <input
                type="url"
                value={
                  displayImage && !displayImage.startsWith("data:")
                    ? displayImage
                    : ""
                }
                onChange={(e) => {
                  setImage(e.target.value);
                  setFailedSrc(null);
                }}
                placeholder="https://example.com/photo.jpg"
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-1 focus:ring-green-600"
              />

              {displayImage && displayImage.startsWith("data:") && (
                <p className="mt-1 text-xs font-medium text-green-600">
                  Your image has been selected from your device.
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleUpdateProfile}
            disabled={saving}
            className="mt-6 w-full cursor-pointer rounded-xl bg-[#058c42] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#047738] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Updating..." : "Update Profile"}
          </button>
        </section>
      </div>
    </main>
  );
};

export default UserProfile;
