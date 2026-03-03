import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
    const { selectedUser } = useChatStore();

    return (
        <div className="h-screen bg-base-300">
            {/* WhatsApp-like top colored bar */}
            <div className="wa-header h-32 fixed top-0 left-0 right-0 z-0" />

            <div className="relative z-10 flex items-start justify-center pt-14">
                <div className="bg-base-100 shadow-xl w-full max-w-400 h-[calc(100vh-3.5rem)] flex overflow-hidden border-t border-base-300">
                    {/* Sidebar - hidden on mobile when chat is selected */}
                    <div className={`${selectedUser ? 'hidden md:flex' : 'flex'} h-full`}>
                        <Sidebar />
                    </div>

                    {/* Chat area - hidden on mobile when no chat selected */}
                    <div className={`${!selectedUser ? 'hidden md:flex' : 'flex'} flex-1 h-full`}>
                        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage