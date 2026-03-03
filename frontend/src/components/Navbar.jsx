import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, MoreVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
    const { logout, authUser } = useAuthStore();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="wa-header fixed w-full top-0 z-40 shadow-md">
            <div className="px-4 h-14 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                    <MessageSquare className="w-6 h-6" />
                    <h1 className="text-lg font-bold tracking-wide">ByteChat</h1>
                </Link>

                {/* Right side icons */}
                <div className="flex items-center gap-1">
                    {authUser && (
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <MoreVertical className="w-5 h-5" />
                            </button>

                            {/* Dropdown Menu */}
                            {menuOpen && (
                                <div className="absolute right-0 top-full mt-1 w-48 bg-base-100 text-base-content rounded-md shadow-xl border border-base-300 py-1 z-50">
                                    <Link
                                        to="/profile"
                                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-base-200 transition-colors text-sm"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <User className="w-4 h-4" />
                                        Profile
                                    </Link>
                                    <Link
                                        to="/settings"
                                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-base-200 transition-colors text-sm"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </Link>
                                    <hr className="border-base-300 my-1" />
                                    <button
                                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-base-200 transition-colors text-sm w-full text-left text-error"
                                        onClick={() => { logout(); setMenuOpen(false); }}
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Log out
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    {!authUser && (
                        <Link
                            to="/settings"
                            className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        >
                            <Settings className="w-5 h-5" />
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};
export default Navbar;