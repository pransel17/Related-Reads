import { Link } from "react-router-dom"

const TopNavbar = () => {
  return (
    <div className="navbar w-full bg-base-100 shadow-sm px-4 lg:px-6 py-0.5">
      
      <div className="navbar-start flex items-center gap-3 lg:ml-10">
        
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-medium">
            <li><Link to='/home'>Home</Link></li>
            <li><a>My Books</a></li>
            <li>
              <a>Community</a>
              <ul className="p-2">
                <li><a>Book Clubs</a></li>
                <li><a>Discussions</a></li>
              </ul>
            </li>
            <li><a>Contact US</a></li>
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full overflow-hidden">
            <img src="Logos/logo-1.png" alt="Logo Icon" className="w-full h-full object-cover" />
          </div>
          <div className="w-24 lg:w-32 h-16 overflow-hidden hidden sm:block">
            <img src="Logos/logo-2.png" alt="Logo Text" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>

      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium text-black mr-10 gap-3">
          <li><Link to='/home' className="hover:bg-transparent hover:text-gray-600">Home</Link></li>
          <li><a className="hover:bg-transparent hover:text-gray-600">My Books</a></li>
          <li>
            <details>
              <summary className="hover:bg-transparent hover:text-gray-600">Community</summary>
              <ul className="bg-base-100 rounded-t-none p-2 z-50 shadow-lg min-w-max">
                <li><a>Book Clubs</a></li>
                <li><a>Discussions</a></li>
              </ul>
            </details>
          </li>
          <li><a className="hover:bg-transparent hover:text-gray-600">Contact US</a></li>
        </ul>
      </div>
    </div>
  )
}

export default TopNavbar