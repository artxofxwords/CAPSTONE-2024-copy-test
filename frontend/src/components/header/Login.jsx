import { useNavigate } from "react-router-dom";

//https://medium.com/@manishmanice2003/using-environment-variables-in-your-front-end-react-app-bd418b3258a8
// const SERVER = import.meta.env.VITE_server;

// import { useContext } from "react";
// import CTX from "../main/Context"; //holds user info for site

let loginFailed; //for error code if login fails

export default function Login() {
  const navigate = useNavigate(); //to direct user based on credentials (admin or sponsor)
  // const CONTEXT = useContext(CTX);

  async function handleAccountLogin(e) {
    e.preventDefault();

    const body = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    const response = await fetch(`http://localhost:3000/users/login`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const userData = await response.json();
    console.log("User Data: ", userData);

    //store user info
    localStorage.setItem("jwtToken", userData.token);
    localStorage.setItem("loggedIn", userData.loggedIn);
    localStorage.setItem("userInfo", userData.user._id);

    //error handling
    if (response.status === 204) {
      loginFailed = (
        <p className="text-red-600">Login failed. Please try again.</p>
      );

      e.target.reset();
    } else {
      localStorage.setItem("jwtToken", userData.token);

      //nav user based on auth
      if (userData.user.isAdmin === true) {
        navigate("/controlpanel");
      } else {
        navigate("/dashboard");
      }
    }
  }

  return (
    <>
      <div
        style={{
          backgroundColor: "#1b3b50",
          alignContent: "center",
          paddingTop: "20vh",
          paddingBottom: "34vh",
        }}
      >
        <form onSubmit={handleAccountLogin} className="max-w-sm mx-auto">
          <div className="mb-5">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-black-900 md:text-5xl lg:text-6xl dark:text-white">
              Login
            </h1>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-black-900 dark:text-orange"
            >
              Username
            </label>
            <input
              type="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-black-900 dark:text-orange"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="flex items-start mb-5">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
        {loginFailed}
        <p className="text-center text-sm font-light text-orange-500 dark:text-orange-400">
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
