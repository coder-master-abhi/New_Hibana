const ProductSkeleton = () => {
  return (
    <div className="min-h-screen pt-24 bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery Skeleton */}
          <div className="space-y-6">
            <div className="relative h-[600px] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-background/5 to-background/10 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
            </div>
            <div className="flex gap-4">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className="h-28 w-28 rounded-lg overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-background/5 to-background/10 animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-8">
            {/* Badges */}
            <div className="flex gap-3">
              <div className="h-6 w-16 rounded-full bg-gradient-to-r from-background/5 to-background/10 animate-pulse"></div>
              <div className="h-6 w-24 rounded-full bg-gradient-to-r from-background/5 to-background/10 animate-pulse"></div>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <div className="h-12 w-3/4 rounded-lg bg-gradient-to-r from-background/5 to-background/10 animate-pulse"></div>
              <div className="h-6 w-1/3 rounded-lg bg-gradient-to-r from-background/5 to-background/10 animate-pulse"></div>
            </div>

            {/* Price */}
            <div className="h-8 w-1/4 rounded-lg bg-gradient-to-r from-background/5 to-background/10 animate-pulse"></div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent"></div>

            {/* Description */}
            <div className="space-y-3">
              <div className="h-4 w-full rounded-lg bg-gradient-to-r from-background/5 to-background/10 animate-pulse"></div>
              <div className="h-4 w-5/6 rounded-lg bg-gradient-to-r from-background/5 to-background/10 animate-pulse"></div>
              <div className="h-4 w-4/6 rounded-lg bg-gradient-to-r from-background/5 to-background/10 animate-pulse"></div>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-6 w-16 rounded-lg bg-gradient-to-r from-background/5 to-background/10 animate-pulse"></div>
                <div className="h-6 w-24 rounded-lg bg-gradient-to-r from-background/5 to-background/10 animate-pulse"></div>
              </div>
              <div className="flex gap-3">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className="h-12 w-16 rounded-lg bg-gradient-to-r from-background/5 to-background/10 animate-pulse"
                  ></div>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-4">
              <div className="h-6 w-24 rounded-lg bg-gradient-to-r from-background/5 to-background/10 animate-pulse"></div>
              <div className="h-12 w-32 rounded-lg bg-gradient-to-r from-background/5 to-background/10 animate-pulse"></div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="h-6 w-24 rounded-lg bg-gradient-to-r from-background/5 to-background/10 animate-pulse"></div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className="h-4 w-full rounded-lg bg-gradient-to-r from-background/5 to-background/10 animate-pulse"
                  ></div>
                ))}
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent"></div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="h-14 w-full rounded-full bg-gradient-to-r from-background/5 to-background/10 animate-pulse"></div>
              <div className="h-14 w-full rounded-full bg-gradient-to-r from-background/5 to-background/10 animate-pulse"></div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-background/5 to-background/10 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 rounded-lg bg-gradient-to-r from-background/5 to-background/10 animate-pulse"></div>
                    <div className="h-3 w-32 rounded-lg bg-gradient-to-r from-background/5 to-background/10 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          .animate-shimmer {
            animation: shimmer 2s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default ProductSkeleton;
