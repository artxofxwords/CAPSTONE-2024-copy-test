import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  async function handleAccountLogin(e) {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    const body = {
      username: username,
      password: password,
    };

    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();


    //store user info
    localStorage.setItem("_id", data.user._id);
    localStorage.setItem("username", data.user.username);
    localStorage.setItem("firstName", data.user.firstName);
    localStorage.setItem("lastName", data.user.lastName);
    localStorage.setItem("email", data.user.email);
    localStorage.setItem("companyName", data.user.companyName);
    localStorage.setItem("city", data.user.city);
    localStorage.setItem("state", data.user.state);
    localStorage.setItem("isAdmin", data.user.isAdmin);
    localStorage.setItem("jwtToken", data.token);

  //in this code at the end, there needs to be an "if" statement that asks if the user isAdmin
  //if isAdmin === true, code should end with navigate("/controlpanel")
  //if isAdmin === false, code should end with navigate("/dashboard")
    if (data.user.isAdmin === true) {
    navigate("/controlpanel");
  } else {
    navigate("/dashboard");
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
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
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