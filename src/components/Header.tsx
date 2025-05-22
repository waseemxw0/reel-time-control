
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="py-4 px-6 border-b bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-primary to-purple-400 h-10 w-10 rounded-lg flex items-center justify-center text-white mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-command"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"></path></svg>
          </div>
          <h1 className="text-xl font-bold">Creator Command Center</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-full w-8 h-8 bg-muted flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
          </div>
          <div className="rounded-full w-8 h-8 bg-primary text-white flex items-center justify-center">
            <span className="text-sm font-medium">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
