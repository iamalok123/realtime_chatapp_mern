import { Search } from "lucide-react";

const SidebarSkeleton = () => {
    const skeletonContacts = Array(8).fill(null);

    return (
        <aside className="h-full w-full md:w-90 lg:w-105 border-r border-base-300 flex flex-col bg-base-100">
            {/* Search Header Skeleton */}
            <div className="p-3 space-y-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/20" />
                    <div className="skeleton w-full h-10 rounded-lg" />
                </div>
                <div className="flex gap-2">
                    <div className="skeleton w-12 h-6 rounded-full" />
                    <div className="skeleton w-20 h-6 rounded-full" />
                </div>
            </div>

            {/* Skeleton Contacts */}
            <div className="overflow-y-auto flex-1">
                {skeletonContacts.map((_, idx) => (
                    <div key={idx} className="w-full px-3 py-3 flex items-center gap-3">
                        <div className="skeleton w-12 h-12 rounded-full shrink-0" />
                        <div className="flex-1 border-b border-base-200 pb-3">
                            <div className="skeleton h-4 w-32 mb-2" />
                            <div className="skeleton h-3 w-20" />
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default SidebarSkeleton;