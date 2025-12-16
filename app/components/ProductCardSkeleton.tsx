export default function ProductCardSkeleton() {
    return (
        <div className="min-w-[45%] md:min-w-[23%] flex-shrink-0 snap-start animate-pulse">
            <div className="flex flex-col h-full">
                {/* Image Skeleton */}
                <div className="relative aspect-square bg-gray-200 mb-6 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
                </div>

                {/* Text Skeletons */}
                <div className="flex flex-col items-start space-y-2 px-1">
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-5 bg-gray-200 rounded w-1/3" />
                </div>
            </div>
        </div>
    );
}
