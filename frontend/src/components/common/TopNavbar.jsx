import { Link } from "react-router-dom"

const TopNavbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-6">

        <div className="navbar-start flex items-center gap-3 ml-10">
          <div className="w-14 h-14 rounded-full overflow-hidden">
            <img 
              src="Logos/logo-1.png" 
              alt="Logo Icon" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="w-32 h-16 overflow-hidden">
            <img 
              src="Logos/logo-2.png" 
              alt="Logo Text" 
              className="w-full h-full object-contain" 
            />
          </div>
        </div>

        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1 font-medium text-black mr-10 gap-3">
            <li><Link to='/home'><a className="hover:bg-transparent hover:text-gray-600">Home</a></Link></li>
            <li><a className="hover:bg-transparent hover:text-gray-600">My Books</a></li>
            <li>
              <details>
                <summary className="hover:bg-transparent hover:text-gray-600">
                  Community
                </summary>
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