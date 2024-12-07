import React, { useState, useRef, useEffect } from 'react'
import { User, Menu, X, LogOut } from "lucide-react"
import { Link,useNavigate } from "react-router-dom";
import logo from "../../../public/admin/logo.png"

// UserMenu component
const UserMenu = ({ onLogout }) => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border">
      <button
        onClick={onLogout}
        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </div>
  );
};

// LogoutModal component
const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to logout from your account?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Navbar() {
  const username = localStorage.getItem('name')
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate()
  
  const link = [
    { label: "Company", link: "/u/companies" },
    { label: "Approval", link: "/u/approval" },
    { label: "Schedule", link: "/u/schedules" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("name");
    window.location.href = "/";
  };

  const currentPath = window.location.pathname;

  return (
    <nav className="relative">
      {/* Main Navbar */}
      <div className="flex justify-between items-center px-4 md:px-12 shadow-md w-full bg-white">
        <img onClick={()=>navigate("/")} src={logo} alt="Logo" className="w-24 cursor-pointer md:w-32" />

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          {link.map((nav, index) => {
            const isActive = currentPath === nav.link;
            return (
              <Link 
                key={index}
                className={`text-black hover:text-red-400 py-3 transition-colors ${isActive ? 'text-red-500 border-b-4 border-red-500' : ''}`} 
                to={nav.link}
              >
                {nav.label}
              </Link>
            )
          })}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex gap-3 items-center hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <div className="rounded-full bg-gray-100 p-1.5">
                <User className="w-5 h-5" />
              </div>
              <span>{username}</span>
            </button>
            {showUserMenu && <UserMenu onLogout={handleLogout} />}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute  top-full left-0 right-0 bg-white shadow-lg z-50">
          <div className="flex flex-col py-2">
            {link.map((nav, index) => {
              const isActive = currentPath === nav.link;
              return (
                <Link 
                  key={index}
                  className={`px-4 py-2 text-black hover:bg-gray-50 ${isActive ? 'text-red-500 border-b' : ''}`}
                  to={nav.link}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {nav.label}
                </Link>
              )
            })}
            <button
              onClick={handleLogout}
              className="flex gap-3 items-center px-4 py-2 border-t text-left hover:bg-gray-50"
            >
              <div className="rounded-full bg-gray-50 p-1.5">
                <User className="w-5 h-5" />
              </div>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
    </nav>
  );
}