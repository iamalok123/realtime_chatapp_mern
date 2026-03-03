import { ArrowLeft, Phone, Video, MoreVertical } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const isOnline = onlineUsers.includes(selectedUser._id);

    return (
        <div className="wa-header px-2 py-2 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2 flex-1 min-w-0">
                {/* Back button - visible on mobile */}
                <button
                    onClick={() => setSelectedUser(null)}
                    className="p-1 rounded-full hover:bg-white/10 transition-colors md:hidden"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>

                {/* Avatar */}
                <div className="relative shrink-0">
                    <img
                        src={selectedUser.profilePic || "/avatar.png"}
                        alt={selectedUser.fullName}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    {isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full ring-2 ring-primary" />
                    )}
                </div>

                {/* User info */}
                <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-[15px] truncate">{selectedUser.fullName}</h3>
                    <p className="text-xs opacity-80">
                        {isOnline ? "online" : "offline"}
                    </p>
                </div>
            </div>

            {/* Action icons */}
            <div className="flex items-center gap-1">
                <button className="p-2 rounded-full hover:bg-white/10 transition-colors hidden sm:block">
                    <Video className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-white/10 transition-colors hidden sm:block">
                    <Phone className="w-5 h-5" />
                </button>
                {/* Close button for desktop */}
                <button
                    onClick={() => setSelectedUser(null)}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors hidden md:block"
                >
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};
export default ChatHeader;