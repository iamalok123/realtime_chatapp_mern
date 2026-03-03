import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Paperclip, Send, X, Camera } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const textInputRef = useRef(null);
    const { sendMessage } = useChatStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;

        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview,
            });

            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            textInputRef.current?.focus();
        } catch (error) {
            console.error("Failed to send message:", error);
            toast.error("Failed to send message");
        }
    };

    return (
        <div className="bg-base-200 border-t border-base-300">
            {/* Image Preview */}
            {imagePreview && (
                <div className="px-4 pt-3 bg-base-100 border-b border-base-300">
                    <div className="relative inline-block">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-24 h-24 object-cover rounded-lg border border-base-300 shadow-sm"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-error text-error-content flex items-center justify-center shadow-md hover:scale-105 transition-transform"
                            type="button"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="flex items-end gap-2 px-3 py-2">
                {/* Attachment + Emoji */}
                <div className="flex items-center gap-1 pb-1.5">
                    <button
                        type="button"
                        className="p-2 rounded-full text-base-content/50 hover:text-base-content hover:bg-base-300 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Paperclip className="w-5 h-5" />
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                </div>

                {/* Text Input */}
                <div className="flex-1 relative">
                    <input
                        ref={textInputRef}
                        type="text"
                        className="w-full bg-base-100 rounded-2xl px-4 py-2.5 text-sm border-none wa-search placeholder:text-base-content/40 focus:ring-1 focus:ring-primary/30"
                        placeholder="Type a message"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>

                {/* Send / Camera Button */}
                <div className="pb-0.5">
                    {text.trim() || imagePreview ? (
                        <button
                            type="submit"
                            className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center hover:opacity-90 transition-opacity shadow-md"
                        >
                            <Send className="w-5 h-5 ml-0.5" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center hover:opacity-90 transition-opacity shadow-md"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Camera className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};
export default MessageInput;