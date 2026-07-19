import { useState } from "react";

export default function LoginSection({ onLogin }) {
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    if (password === "rover2026") {

      localStorage.setItem("isAdmin", "true");

      onLogin();

    } else {

      alert("Invalid Password");

    }

  };

  return (

    <div className="max-w-md mx-auto">

      <div className="bg-[#3f6e4d] rounded-xl border border-yellow-600 p-10">

        <h2 className="text-3xl font-bold text-center">

          Admin Login

        </h2>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mt-8 bg-[#214b31] rounded-lg px-4 py-4 outline-none"
        />

        <button
          onClick={handleLogin}
          className="w-full mt-5 py-4 bg-yellow-500 text-black rounded-lg font-bold"
        >

          Login

        </button>

      </div>

    </div>

  );
}