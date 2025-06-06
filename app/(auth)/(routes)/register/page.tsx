"use client";

import axios from "axios";
import { useState } from "react";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");



const handleSubmit = async () => {
  setIsSubmitting(true);
  setSuccessMsg("");
  setErrors({});
  console.log("username" , username);
  console.log("password" , password);
  console.log("email" , email);

  try {
    const response = await axios.post("http://localhost:3000/api/register", {
      userName: username,
      password,
      email,
    });

    console.log(response.data);

    // If no error, set success
    setSuccessMsg("Account created successfully!");
    setUsername("");
    setEmail("");
    setPassword("");
  } catch (error: any) {
    // Axios attaches error.response when the server sends error responses
    if (error.response) {
      const { status, data } = error.response;

      if (status === 400 && data.details) {
        const fieldErrors = data.details.fieldErrors;
        const newErrors: { [key: string]: string } = {};

        Object.keys(fieldErrors).forEach((field) => {
          newErrors[field] = `${fieldErrors[field]}`;
        });

        console.log("newError: ",newErrors);
        setErrors(newErrors);
      } else {
        // General error (e.g., status 400 or 500)
        setErrors({
          general: data.error || "Something went wrong. Please try again.",
        });
        console.log(errors);
      }
    } else {
      // Network error or something else
      setErrors({
        general: "Something went wrong. Please try again.",
      });
    }
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 flex flex-col justify-center py-12 px-6 sm:px-0">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-indigo-200 max-w">
          Sign up to get started with your new account.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white shadow-md rounded-lg px-8 py-10">
          {errors.general && (
            <p className="mb-4 text-center text-red-600">{errors.general}</p>
          )}
          {successMsg && (
            <p className="mb-4 text-center text-green-600">{successMsg}</p>
          )}

          {/* Username */}
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.userName ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!errors.userNqme}
              aria-describedby="username-error"
            />
            {errors.userName && (
              <p
                className="mt-1 text-sm text-red-600"
                id="username-error"
                role="alert"
              >
                {errors.userName}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />
            {errors.email && (
              <p
                className="mt-1 text-sm text-red-600"
                id="email-error"
                role="alert"
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
            />
            {errors.password && (
              <p
                className="mt-1 text-sm text-red-600"
                id="password-error"
                role="alert"
              >
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </button>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
