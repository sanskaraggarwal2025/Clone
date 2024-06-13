const Skeleton = () => {
 return (
  <div role="status" className="animate-pulse space-y-4 w-full max-w-xl">
   {[...Array(5)].map((_, index) => (
    <div key={index} className="p-4 border-b border-gray-700 bg-gray-800 rounded-md shadow-md">
     <div className="flex space-x-4">
      <div className="h-12 w-12 bg-gray-700 rounded-full"></div>
      <div className="flex-1 space-y-4 py-1">
       <div className="h-4 bg-gray-700 rounded w-3/4"></div>
       <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      </div>
     </div>
     <div className="space-y-2 mt-4">
      <div className="h-4 bg-gray-700 rounded"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
     </div>
     <div className="mt-4">
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
     </div>
    </div>
   ))}
   <span className="sr-only">Loading...</span>
  </div>
 );
};

export default Skeleton;
