import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import contextProvider from "./Context";

export default function Login() {
  const navigate = useNavigate();
  const { context, setContext } = useContext(contextProvider);

  async function handleAccountLogin(e) {
    e.preventDefault();

    const body = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const userData = await response.json();


    //store user info
    setContext({userData: userData});

  //nav user based on auth
  if (userData.user.isAdmin === true) {
    navigate("/controlpanel");
  } else {
    navigate("/controlpanel");
  }
  }

  return (
    <>
      <div
        style={{
          width: "95vw",
          height: "80vh",
          alignContent: "center",
        }}
      >
        

<form onSubmit={handleAccountLogin} className="max-w-sm mx-auto">
  <div className="mb-5"><h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Login</h1>
    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
    <input type="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  <div className="flex items-start mb-5">
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    Submit
    </button>
      </div>
</form>
<p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <a
                  href="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Register here
                </a>
              </p>
      </div>
    </>
  );
}