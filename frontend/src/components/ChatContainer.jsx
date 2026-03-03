import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./designs/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
    const {
        messages,
        getMessages,
        isMessagesLoading,
        selectedUser,
        subscribeToMessages,
        unsubscribeFromMessages,
    } = useChatStore();
    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null);

    useEffect(() => {
        getMessages(selectedUser._id);
        subscribeToMessages();
        return () => unsubscribeFromMessages();
    }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (isMessagesLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />

            {/* Messages with WhatsApp wallpaper */}
            <div className="flex-1 overflow-y-auto chat-wallpaper wa-scrollbar px-4 sm:px-12 md:px-16 py-4">
                {messages.length === 0 && (
                    <div className="flex items-center justify-center h-full">
                        <div className="bg-base-100/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
                            <p className="text-xs text-base-content/50">
                                No messages yet. Say hello! 👋
                            </p>
                        </div>
                    </div>
                )}

                {messages.map((message) => {
                    const isSent = message.senderId === authUser._id;
                    return (
                        <div
                            key={message._id}
                            className={`flex mb-1 ${isSent ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[65%] sm:max-w-[45%] relative px-2.5 py-1.5 shadow-sm ${isSent
                                        ? "wa-bubble-sent bg-primary text-primary-content"
                                        : "wa-bubble-received bg-base-200 text-base-content"
                                    }`}
                            >
                                {message.image && (
                                    <img
                                        src={message.image}
                                        alt="Attachment"
                                        className="rounded-md mb-1 max-w-full"
                                    />
                                )}
                                {message.text && (
                                    <p className="text-[14.2px] leading-relaxed pr-12 wrap-break-words">{message.text}</p>
                                )}
                                <div className={`flex items-center justify-end gap-1 -mt-3 ${!message.text && message.image ? 'mt-1' : ''}`}>
                                    <span className={`text-[11px] ${isSent ? "text-primary-content/60" : "text-base-content/40"}`}>
                                        {formatMessageTime(message.createdAt)}
                                    </span>
                                    {isSent && (
                                        <svg viewBox="0 0 16 11" width="16" height="11" className={`text-primary-content/60`}>
                                            <path
                                                d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.011-2.095a.46.46 0 0 0-.327-.14.458.458 0 0 0-.33.139l-.108.107a.348.348 0 0 0-.1.243c0 .096.032.18.1.254l2.472 2.573a.463.463 0 0 0 .68.02l6.815-8.426a.34.34 0 0 0 .09-.242.34.34 0 0 0-.105-.235l-.201-.21z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M14.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-1.2-1.25-.458.566 1.612 1.678a.463.463 0 0 0 .68.02l6.815-8.426a.34.34 0 0 0 .09-.242.34.34 0 0 0-.105-.235l-.201-.21z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messageEndRef} />
            </div>

            <MessageInput />
        </div>
    );
};
export default ChatContainer;