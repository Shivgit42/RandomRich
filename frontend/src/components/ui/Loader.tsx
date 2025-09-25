export const Loader = () => {
  return (
    <div className="p-6 space-y-4 animate-pulse">
      {/* Title placeholder */}
      <div className="h-6 bg-gray-700/70 rounded w-1/3"></div>
      {/* Subtext lines */}
      <div className="h-4 bg-gray-700/70 rounded w-2/3"></div>
      <div className="h-4 bg-gray-700/70 rounded w-1/2"></div>
      {/* Content block */}
      <div className="h-64 bg-gray-700/70 rounded"></div>
    </div>
  );
};
