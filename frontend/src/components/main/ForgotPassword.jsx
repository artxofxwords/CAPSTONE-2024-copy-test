import { useState } from "react";

const ForgotPassword = () => {

  const [currentColor, setCurrentColor] = useState("");
  const [fetchResponse, setFetchResponse] = useState("");


  async function forgotPasswordFetch(e) {
    e.preventDefault();

    try {
      let response = await fetch(`http://localhost:3000/users/forgotPassword`, {
        method: "POST",
        body: JSON.stringify({
          email: e.target.email.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let results = await response.json();
      console.log(results);
      if (response.status === 200) {
        setFetchResponse("Email Sent!");
        setCurrentColor("green");
      } else if (response.status === 404) {
        setFetchResponse("User not found!");
        setCurrentColor("red");
      } else {
        setFetchResponse("Server error!");
        setCurrentColor("red");
      }
    } catch(err) {
      if (err.response.status === 404) {
        console.log("User not found");
      } else {
        console.log("Server error!");
      }
    }
  }
  

  return (
    <>
      <div
        style={{
          backgroundColor: "#1b3b50",
          color: "black",
          alignContent: "center",
          paddingTop: "26.5vh",
          paddingBottom: "40vh",
          paddingLeft: "40vw",
          paddingRight: "25vw",
        }}
      >
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={forgotPasswordFetch}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Reset your password here!
            </h5>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
              />
            </div>
            <button
            type="click"
            style={{
              display: "inline-flex",
              backgroundColor: "#ff532f",
              color: "white",
              borderRadius: "8px",
              padding: "4px",
              paddingLeft: "80px",
              paddingRight: "80px",
              marginLeft: "3vw"
            }}
            className="focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
          >
            Reset
          </button>
          </form>
          <div className={currentColor === 'red' ? 'border-solid border-2 border-red-500' : currentColor === 'green' ? 'border-solid border-2 border-green-500' : ''}>{fetchResponse}</div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
