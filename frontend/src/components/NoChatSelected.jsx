import { MessageSquare, Lock } from "lucide-react";

const NoChatSelected = () => {
    return (
        <div className="w-full flex flex-1 flex-col items-center justify-center bg-base-200/30 border-l border-base-300">
            <div className="max-w-md text-center space-y-6 px-4">
                {/* WhatsApp-style illustration */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="w-50 h-50 rounded-full bg-base-200 flex items-center justify-center">
                            <MessageSquare className="w-20 h-20 text-primary/30" />
                        </div>
                    </div>
                </div>

                {/* Welcome Text */}
                <h2 className="text-3xl font-light text-base-content/80">ByteChat Web</h2>
                <p className="text-base-content/50 text-sm leading-relaxed">
                    Send and receive messages from your browser.<br />
                    Select a chat from the sidebar to start messaging.
                </p>

                {/* End-to-end encrypted notice like WhatsApp */}
                <div className="flex items-center justify-center gap-2 pt-8">
                    <Lock className="w-3.5 h-3.5 text-base-content/30" />
                    <span className="text-xs text-base-content/30">Your personal messages are private</span>
                </div>
            </div>
        </div>
    );
};

export default NoChatSelected;