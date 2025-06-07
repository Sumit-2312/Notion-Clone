"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");



  const handleLogin = async () => {


    setErrors({});
    setIsLoading(true);
    setLoginError("");
// singIn do not throw the error so we don't have any need to pack it inside try catch block 
// it simply return ans object having {status,error,ok}
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setIsLoading(false);

    if (res?.error) {
      setLoginError(res.error);
    } else if (res?.ok) {
      window.location.href = "/";
    }
  };

  const handleSocialLogin = (provider: string) => {
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-600 via-purple-700 to-pink-600 flex flex-col justify-center py-12 px-6 sm:px-0">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Log in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-indigo-200 max-w">
          Enter your email and password or use a social login.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white shadow-lg rounded-lg px-8 py-10 space-y-6">
          {loginError && (
            <p className="text-center text-red-600">{loginError}</p>
          )}

          {/* Email */}
          <div>
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
          <div>
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

          {/* Login Button */}
          <button
            type="button"
            disabled={isLoading}
            onClick={handleLogin}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>

          <div className="relative flex items-center justify-center text-sm text-gray-400">
            <span className="bg-white px-2">Or continue with</span>
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleSocialLogin("github")}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 0C5.372 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577v-2.234c-3.338.726-4.033-1.61-4.033-1.61-.546-1.387-1.334-1.756-1.334-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.774.42-1.304.763-1.605-2.665-.305-5.467-1.335-5.467-5.932 0-1.31.467-2.38 1.235-3.22-.123-.303-.535-1.527.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.654 1.65.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.624-5.48 5.921.43.372.823 1.103.823 2.222v3.293c0 .32.218.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z"
                />
              </svg>
              GitHub
            </button>

            <button
              onClick={() => handleSocialLogin("google")}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 533.5 544.3"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272v95.4h146.9c-6.4 34.4-25.7 63.5-54.9 83v68h88.8c52-48 81.7-118 81.7-195.9z"
                  fill="#4285F4"
                />
                <path
                  d="M272 544.3c73.7 0 135.7-24.4 180.9-66.2l-88.8-68c-24.7 16.5-56.3 26.2-92.1 26.2-70.8 0-130.8-47.9-152.4-112.3H29.1v70.7c45.4 89.7 139.5 149.6 242.9 149.6z"
                  fill="#34A853"
                />
                <path
                  d="M119.6 320.1c-10.6-31.2-10.6-64.6 0-95.8V153.6H29.1c-39.4 77.1-39.4 168.2 0 245.3l90.5-78.8z"
                  fill="#FBBC05"
                />
                <path
                  d="M272 107.7c38.9-.6 76.3 13.3 104.7 38.4l78.6-78.6C401.9 24.6 343.5 0 272 0 168.6 0 74.5 59.9 29.1 149.6l90.5 70.7c21.6-64.4 81.6-112.3 152.4-112.6z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
