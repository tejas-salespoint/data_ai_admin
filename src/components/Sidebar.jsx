import { Link, useLocation } from "react-router-dom";
import { sidebarData } from "../data/sidebarData.jsx";

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
        <ul className="space-y-2">
          {sidebarData.map((item, count) => (
            <li
              key={count}
              className={
                location.pathname === item.link
                  ? 'rounded-lg bg-gray-700 group w-full'
                  : ''
              }
            >
              <Link
                to={item.link}
                className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
