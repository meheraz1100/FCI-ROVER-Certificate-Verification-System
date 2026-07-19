import { useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import TabNavigation from "../components/TabNavigation";

import VerifySection from "../components/VerifySection";
import LoginSection from "../components/LoginSection";
import Dashboard from "../components/Dashboard";

export default function Home() {

  const [activeTab, setActiveTab] = useState("verify");

  const [isAdmin, setIsAdmin] = useState(

    localStorage.getItem("isAdmin") === "true"

  );

  const login = () => {

    setIsAdmin(true);

  };

  const logout = () => {

    localStorage.removeItem("isAdmin");

    setIsAdmin(false);

  };

  return (

    <div className="min-h-screen bg-[#215434] text-white">

      <Header />

      <TabNavigation

        activeTab={activeTab}

        setActiveTab={setActiveTab}

      />

      <div className="py-10">

        {activeTab === "verify" ? (

          <VerifySection />

        ) : isAdmin ? (

          <Dashboard onLogout={logout} />

        ) : (

          <LoginSection onLogin={login} />

        )}

      </div>

      <Footer />

    </div>

  );

}