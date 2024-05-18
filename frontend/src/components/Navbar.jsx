import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { UserDetails } from "../Context/UserContext";
import Logo from "../assets/logos/logo-placeholder-image.png";
import PopupModal from "../Modals/PopupModal";
import { useGlobalMessages } from "../Context/GlobalMessagesContext";
import Message from "./Message";

const Navbar = ({ activeTab }) => {
  const { auth, setAuth } = UserDetails();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const { messages, clearMessages , addMessage } = useGlobalMessages();

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const isAuth = storedAuth === "true";
    setAuth(isAuth);
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:8000/apis/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    setAuth(null);
    localStorage.removeItem("isAuthenticated");
    addMessage('Logout successful');
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
    console.log(modalType);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType("");
  };

  const handleClose = () => {
    clearMessages();
  };

  return (
    <>
    <div className="absolute w-full top-0">
      <nav className="flex justify-around bg-transparent p-2">
        <div className="flex">
          <img src={Logo} className="w-12 h-12" />
          <div className="text-lg content-center mx-3 font-bold">BRANDNAME</div>
        </div>
        <div className="flex font-semibold">
          <Link
            to="/"
            className={`px-1 py-1 m-2 ${
              activeTab === "Home" ? "border-b-2 border-black" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/weddings"
            className={`px-1 py-1 m-2 ${
              activeTab === "Weddings" ? "border-b-2 border-black" : ""
            }`}
          >
            Weddings
          </Link>
          <Link
            to="/about-us"
            className={`px-1 py-1 m-2 ${
              activeTab === "About" ? "border-b-2 border-black" : ""
            }`}
          >
            About Us
          </Link>
          <Link
            to="/contact-us"
            className={`px-1 py-1 m-2 ${
              activeTab === "Contact" ? "border-b-2 border-black" : ""
            }`}
          >
            Contact Us
          </Link>
        </div>
        <div className="flex">
          {auth ? (
            <>
              <button
                className="btn backdrop-blur-sm bg-white/30"
                onClick={() => openModal("registerWedding")}
              >
                Be A Host
              </button>
              <button
                className="btn backdrop-blur-sm bg-white/30"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="btn backdrop-blur-sm bg-white/30"
                onClick={() => openModal("register")}
              >
                Register
              </button>
              <button
                className="btn backdrop-blur-sm bg-white/30"
                onClick={() => openModal("login")}
              >
                Login
              </button>
            </>
          )}
        </div>
      </nav>
      <div className="flex justify-center items-center max-w-max">
      {messages.map((message, index) => (
        <Message key={index} message={message} onClose={handleClose} />
      ))}
      </div>
    </div>
    {showModal && <PopupModal type={modalType} closeModal={closeModal} />}
    </>
  );
};

export default Navbar;
