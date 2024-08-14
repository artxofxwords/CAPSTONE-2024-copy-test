import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ResetPassword = () => {

  const [currentColor, setCurrentColor] = useState("");
  const [fetchResponse, setFetchResponse] = useState("");
  
  const navigate = useNavigate();
  async function resetPasswordFetch(e) {
    e.preventDefault();
    console.log(e.target.confirmPassword.value);
    try {
      if (e.target.password.value !== e.target.confirmPassword.value) {
        throw new Error("Passwords do not match!");
      }

      let response = await fetch(`http://localhost:3000/users/resetPassword`, {
        method: "POST",
        body: JSON.stringify({
          token: e.target.token.value,
          newPassword: e.target.password.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let results = await response.json();
      console.log("results are", results);
      console.log("Are you happening?");
    setCurrentColor("green");
      setFetchResponse("Success! Password changed!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      if (err.message === "Passwords do not match!") {
        setCurrentColor("red");
        setFetchResponse("Passwords do not match!");
        console.log(err.message);
      } else if (err.response.status === 401) {
        console.log(err.message);
        setCurrentColor("red");
        setFetchResponse(err.message);
      } else {
        console.log(err.message);
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
          paddingTop: "20vh",
          paddingBottom: "20.5vh",
          paddingLeft: "39vw",
          paddingRight: "20vw",
        }}
      >
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={resetPasswordFetch}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Reset your password here!
            </h5>
            <div>
              <label
                htmlFor="token"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your token
              </label>
              <input
                type="text"
                name="token"
                id="token"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="paste token here"
                value={new URLSearchParams(document.location.search).get(
                  "token"
                )}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your new password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="please enter password"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="please confirm password"
                required
              />
            </div>
            <button
              type="submit"
              style={{
                display: "inline-flex",
                backgroundColor: "#ff532f",
                color: "white",
                borderRadius: "8px",
                padding: "4px",
                paddingLeft: "80px",
                paddingRight: "80px",
                marginLeft: "4vw",
                marginBottom: "2vh",
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
  )
};

export default ResetPassword;
