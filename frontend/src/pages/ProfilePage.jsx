import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Shield, Calendar } from "lucide-react";

const ProfilePage = () => {
    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({ profilePic: base64Image });
        };
    };

    return (
        <div className="min-h-screen bg-base-200 pt-14">
            {/* Profile Header with primary color */}
            <div className="wa-header h-36 relative">
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                    <div className="relative">
                        <img
                            src={selectedImg || authUser.profilePic || "/avatar.png"}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-base-100 shadow-lg"
                        />
                        <label
                            htmlFor="avatar-upload"
                            className={`absolute bottom-1 right-1 w-10 h-10 bg-primary text-primary-content rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 transition-transform ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
                        >
                            <Camera className="w-5 h-5" />
                            <input
                                type="file"
                                id="avatar-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={isUpdatingProfile}
                            />
                        </label>
                    </div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="max-w-lg mx-auto px-4 pt-20 pb-8 space-y-4">
                {/* Upload status */}
                <p className="text-center text-sm text-base-content/50">
                    {isUpdatingProfile ? "Uploading..." : "Tap the camera icon to update photo"}
                </p>

                {/* Name Card */}
                <div className="bg-base-100 rounded-lg shadow-sm overflow-hidden">
                    <div className="px-6 py-4 flex items-center gap-4">
                        <User className="w-5 h-5 text-primary shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-primary font-medium mb-0.5">Name</p>
                            <p className="text-[15px] truncate">{authUser?.fullName}</p>
                        </div>
                    </div>
                    <div className="border-t border-base-200 mx-6" />
                    <div className="px-6 py-4 flex items-center gap-4">
                        <Mail className="w-5 h-5 text-primary shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-primary font-medium mb-0.5">Email</p>
                            <p className="text-[15px] truncate">{authUser?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Account Info Card */}
                <div className="bg-base-100 rounded-lg shadow-sm overflow-hidden">
                    <div className="px-6 py-3">
                        <p className="text-xs text-primary font-medium">Account</p>
                    </div>
                    <div className="border-t border-base-200 mx-6" />
                    <div className="px-6 py-4 flex items-center gap-4">
                        <Calendar className="w-5 h-5 text-base-content/40 shrink-0" />
                        <div className="flex-1">
                            <p className="text-sm text-base-content/70">Member since</p>
                        </div>
                        <p className="text-sm">{authUser.createdAt?.split("T")[0]}</p>
                    </div>
                    <div className="border-t border-base-200 mx-6" />
                    <div className="px-6 py-4 flex items-center gap-4">
                        <Shield className="w-5 h-5 text-base-content/40 shrink-0" />
                        <div className="flex-1">
                            <p className="text-sm text-base-content/70">Account status</p>
                        </div>
                        <span className="text-sm text-green-500 font-medium">Active</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProfilePage;