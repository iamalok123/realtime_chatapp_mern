import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send, Check, Palette } from "lucide-react";

const PREVIEW_MESSAGES = [
    { id: 1, content: "Hey! How's it going?", isSent: false },
    { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
    const { theme, setTheme } = useThemeStore();

    return (
        <div className="min-h-screen bg-base-200 pt-14">
            {/* Header */}
            <div className="wa-header px-6 py-4">
                <div className="container mx-auto max-w-5xl flex items-center gap-3">
                    <Palette className="w-6 h-6" />
                    <div>
                        <h2 className="text-lg font-semibold">Settings</h2>
                        <p className="text-xs opacity-80">Customize your chat interface</p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6 max-w-5xl">
                <div className="space-y-6">
                    {/* Theme Section */}
                    <div className="bg-base-100 rounded-lg shadow-sm p-5">
                        <h3 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wide">Theme</h3>
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                            {THEMES.map((t) => (
                                <button
                                    key={t}
                                    className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all ${theme === t
                                            ? "bg-primary/10 ring-2 ring-primary"
                                            : "hover:bg-base-200/50"
                                        }`}
                                    onClick={() => setTheme(t)}
                                >
                                    <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                                        <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                                            <div className="rounded bg-primary"></div>
                                            <div className="rounded bg-secondary"></div>
                                            <div className="rounded bg-accent"></div>
                                            <div className="rounded bg-neutral"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {theme === t && <Check className="w-3 h-3 text-primary" />}
                                        <span className={`text-[11px] font-medium truncate text-center ${theme === t ? "text-primary" : ""}`}>
                                            {t.charAt(0).toUpperCase() + t.slice(1)}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className="bg-base-100 rounded-lg shadow-sm p-5">
                        <h3 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wide">Preview</h3>
                        <div className="rounded-xl border border-base-300 overflow-hidden shadow-sm">
                            {/* Mock Chat Header */}
                            <div className="wa-header px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-medium text-sm">
                                        J
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-sm">John Doe</h3>
                                        <p className="text-xs opacity-70">online</p>
                                    </div>
                                </div>
                            </div>

                            {/* Mock Chat Messages */}
                            <div className="p-4 space-y-2 min-h-45 max-h-45 overflow-y-auto chat-wallpaper">
                                {PREVIEW_MESSAGES.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[80%] px-3 py-1.5 shadow-sm ${message.isSent
                                                    ? "wa-bubble-sent bg-primary text-primary-content"
                                                    : "wa-bubble-received bg-base-200"
                                                }`}
                                        >
                                            <p className="text-sm">{message.content}</p>
                                            <p
                                                className={`text-[10px] mt-1 text-right ${message.isSent ? "text-primary-content/60" : "text-base-content/40"}`}
                                            >
                                                12:00
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Mock Chat Input */}
                            <div className="px-3 py-2 bg-base-200 flex items-center gap-2">
                                <input
                                    type="text"
                                    className="flex-1 bg-base-100 rounded-2xl px-4 py-2 text-sm border-none"
                                    placeholder="Type a message"
                                    value="This is a preview"
                                    readOnly
                                />
                                <button className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SettingsPage;