import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", { name, email, day, month, year, password });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-white text-river-black z-40 flex items-center justify-center mt-16 p-5 border-t-2 border-primary-border"
    >
      <div className="w-full max-w-md">
        <h1 className="text-2xl text-river-black text-opacity-70 font-semibold text-center mb-6">
          Join River
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-icons-primary text-3xl font-semibold text-opacity-70 mt-8">
              ~
            </span>
            <div className="flex w-full flex-col">
              <label
                htmlFor="name"
                className="block text-river-black font-semibold text-lg mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border-2 border-primary-border rounded-full text-black placeholder:italic"
                placeholder="Graeme"
                required
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 w-full">
              <span className="text-icons-primary text-3xl font-semibold text-opacity-70 mt-8">
                ~
              </span>
              <div className="flex w-full flex-col">
                <label
                  htmlFor="email"
                  className="block text-river-black font-semibold text-lg mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border-2 border-primary-border rounded-full text-black placeholder:italic"
                  placeholder="example@email.com"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-icons-primary text-3xl font-semibold text-opacity-70 mt-8">
                ~
              </span>
              <div className="flex flex-col">
                <label className="block text-lg mb-1 text-river-black font-semibold">
                  Date of birth
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="w-1/3 p-2 border-2 border-primary-border rounded-full text-black placeholder:italic"
                    placeholder="DD"
                    maxLength={2}
                    required
                  />
                  <input
                    type="text"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-1/3 p-2 border-2 border-primary-border rounded-full text-black placeholder:italic"
                    placeholder="MM"
                    maxLength={2}
                    required
                  />
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-1/3 p-2 border-2 border-primary-border rounded-full text-black placeholder:italic"
                    placeholder="YYYY"
                    maxLength={4}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-lg mb-1">
              Password
            </label>
            <div className="flex items-center gap-2">
              <span className="text-icons-primary text-3xl font-semibold text-opacity-70">
                <FaLock size={15} />
              </span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border-2 border-primary-border rounded-full text-black"
                placeholder="********"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold"
          >
            Sign up
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default SignUpForm;
