import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Search, Filter } from "lucide-react";
import SidebarSkeleton from "./designs/SidebarSkeleton";

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

    const { onlineUsers } = useAuthStore();
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const filteredUsers = users.filter((user) => {
        const matchesOnline = showOnlineOnly ? onlineUsers.includes(user._id) : true;
        const matchesSearch = user.fullName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesOnline && matchesSearch;
    });

    if (isUsersLoading) return <SidebarSkeleton />;

    return (
        <aside className="h-full w-full md:w-90 lg:w-105 border-r border-base-300 flex flex-col bg-base-100">
            {/* Search Header */}
            <div className="p-3 space-y-3">
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
                    <input
                        type="text"
                        placeholder="Search or start new chat"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-base-200 rounded-lg pl-10 pr-4 py-2 text-sm wa-search focus:bg-base-200 border-none placeholder:text-base-content/40"
                    />
                </div>

                {/* Filter Row */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowOnlineOnly(false)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${!showOnlineOnly
                                ? 'bg-primary text-primary-content'
                                : 'bg-base-200 text-base-content/70 hover:bg-base-300'
                            }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setShowOnlineOnly(true)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${showOnlineOnly
                                ? 'bg-primary text-primary-content'
                                : 'bg-base-200 text-base-content/70 hover:bg-base-300'
                            }`}
                    >
                        Online ({Math.max(0, onlineUsers.length - 1)})
                    </button>
                </div>
            </div>

            {/* Contact List */}
            <div className="overflow-y-auto flex-1 wa-scrollbar">
                {filteredUsers.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className={`w-full px-3 py-3 flex items-center gap-3 wa-transition ${selectedUser?._id === user._id
                                ? "wa-contact-active border-l-4 border-primary"
                                : "wa-contact-hover border-l-4 border-transparent"
                            }`}
                    >
                        {/* Avatar with online indicator */}
                        <div className="relative shrink-0">
                            <img
                                src={user.profilePic || "/avatar.png"}
                                alt={user.fullName}
                                className="w-12 h-12 object-cover rounded-full"
                            />
                            {onlineUsers.includes(user._id) && (
                                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full ring-2 ring-base-100" />
                            )}
                        </div>

                        {/* User info */}
                        <div className="flex-1 text-left min-w-0 border-b border-base-200 pb-3">
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-[15px] truncate">{user.fullName}</span>
                            </div>
                            <p className="text-sm text-base-content/50 truncate mt-0.5">
                                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                            </p>
                        </div>
                    </button>
                ))}

                {filteredUsers.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 px-4">
                        <Filter className="w-10 h-10 text-base-content/20 mb-3" />
                        <p className="text-base-content/50 text-sm text-center">
                            {searchQuery
                                ? `No contacts matching "${searchQuery}"`
                                : showOnlineOnly
                                    ? "No contacts online right now"
                                    : "No contacts found"
                            }
                        </p>
                    </div>
                )}
            </div>
        </aside>
    );
};
export default Sidebar;