import { Link } from 'react-router-dom';

const Navbar = () => {
 return (
  <nav className="bg-gray-900 text-white shadow-md">
   <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <div className="relative flex items-center justify-between h-16">
     <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
      {/* Mobile menu button */}
      <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
       <span className="sr-only">Open main menu</span>
       <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
       </svg>
       <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
       </svg>
      </button>
     </div>
     <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
      <div className="flex-shrink-0">
       <Link to="/" className="text-xl font-bold text-white">LeetCode</Link>
      </div>
      <div className="hidden sm:block sm:ml-6">
       <div className="flex space-x-4">
        <Link to="/create-problem" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700">Add Problems</Link>
        <Link to="/all-problems" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700">All Problems</Link>
        <button className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700">Logout</button>
       </div>
      </div>
     </div>
    </div>
   </div>

   <div className="sm:hidden" id="mobile-menu">
    <div className="px-2 pt-2 pb-3 space-y-1">
     <Link to="/add-problem" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Add Problems</Link>
     <Link to="/all-problems" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">All Problems</Link>
     <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Logout</button>
    </div>
   </div>
  </nav>
 );
};

export default Navbar;
