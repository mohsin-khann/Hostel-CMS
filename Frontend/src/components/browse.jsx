import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Headers from './DashboardHeader';

const Browse = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-56px)] bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Right content */}
      <main className="flex-1 flex flex-col min-w-0">
        <Headers />

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto overflow-x-auto px-4 py-4">
          <div className="max-w-full">
            <Outlet />
          </div>
        </div>
      </main>

    </div>
  );
};

export default Browse;
