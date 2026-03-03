const MessageSkeleton = () => {
    const skeletonMessages = Array(6).fill(null);

    return (
        <div className="flex-1 overflow-y-auto chat-wallpaper px-4 sm:px-12 md:px-16 py-4 space-y-3">
            {skeletonMessages.map((_, idx) => (
                <div key={idx} className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}>
                    <div
                        className={`max-w-[45%] px-3 py-2 shadow-sm rounded-lg ${idx % 2 === 0
                                ? "bg-base-200"
                                : "bg-primary/30"
                            }`}
                    >
                        <div className="skeleton h-4 w-45 mb-2" />
                        <div className="skeleton h-3 w-25" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageSkeleton;