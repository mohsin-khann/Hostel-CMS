import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppContext } from './context/AppContext';

import LoginForm from './components/Login';
import Chatbot from "./components/chatbot/chatbot";
import ChatbotIcon from "./components/chatbot/chatButton";
import Browse from './components/Browse';
import OTPVerification from './components/OTPwait';
import SuccessScreen from './components/Success';
import Cards from './components/Cards';
import Complaint from './components/Complaints';
import Notification from './components/Notification';
import Account from './components/Account';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/ABout';
import Admin from './components/Admin';
import AdminPanel from './components/AdminPanel';
import WardenPanel from './components/WardenPanel';
import EmployeePanel from './components/EmployeePanel';
import DeputyProvostPanel from './components/DeputyProvostPanel';
import ProvostPanel from './components/ProvostPanel';
import User from './components/User';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  const [showBot, setShowBot] = useState(false);
  const { role } = useContext(AppContext);

  // wait for context
  if (role === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const isLoggedIn = role !== null;

  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <LoginForm /> },
    { path: "/about", element: <About /> },

    {
      path: "/browse",
      element: isLoggedIn ? <Browse /> : <Navigate to="/login" replace />,
      children: [
        { path: "card", element: <Cards /> },
        { path: "complaints", element: <Complaint /> },
        { path: "notify", element: <Notification /> },
        { path: "account", element: <Account /> },
      ],
    },

    { path: "/wait", element: <OTPVerification /> },
    { path: "/success", element: <SuccessScreen /> },

    {
      path: "/admin",
      element: role === "Admin" ? <Admin /> : <Navigate to="/login" replace />,
      children: [
        { path: "panel", element: <AdminPanel /> },
        { path: "user", element: <User /> },
        { path: "account", element: <Account /> },
        { path: "*", element: <Navigate to="panel" replace /> },
      ],
    },

    {
      path: "/warden",
      element: role === "Warden" ? <Admin /> : <Navigate to="/login" replace />,
      children: [
        { path: "panel", element: <WardenPanel /> },
        { path: "account", element: <Account /> },
        { path: "*", element: <Navigate to="panel" replace /> },
      ],
    },

    {
      path: "/employee",
      element: role === "Employee" ? <Admin /> : <Navigate to="/login" replace />,
      children: [
        { path: "panel", element: <EmployeePanel /> },
        { path: "account", element: <Account /> },
        { path: "*", element: <Navigate to="panel" replace /> },
      ],
    },

    {
      path: "/provost",
      element: role === "Provost" ? <Admin /> : <Navigate to="/login" replace />,
      children: [
        { path: "panel", element: <ProvostPanel /> },
        { path: "account", element: <Account /> },
        { path: "*", element: <Navigate to="panel" replace /> },
      ],
    },

    {
      path: "/deputy-provost",
      element: role === "DeputyProvost" ? <Admin /> : <Navigate to="/login" replace />,
      children: [
        { path: "panel", element: <DeputyProvostPanel /> },
        { path: "account", element: <Account /> },
        { path: "*", element: <Navigate to="panel" replace /> },
      ],
    },

    { path: "*", element: <Navigate to="/" replace /> },
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 overflow-hidden relative">
        {!showBot && (
          <button className="bot-button" onClick={() => setShowBot(true)}>
            <ChatbotIcon />
          </button>
        )}

        {showBot && <Chatbot closeBot={() => setShowBot(false)} />}

        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default App;
