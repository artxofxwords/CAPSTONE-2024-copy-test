import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";

let registrationFailed;
let usernameTaken;
let passwordInputType;

export default function NewUserForm() {
  const yourJwtToken = localStorage.getItem("jwtToken");
  const navigate = useNavigate();
  const [trueCompany, setTrueCompany] = useState(false); //for checkbox on form if rep a company
  const [usState, setUsState] = useState(); //for dropdown state selection

  const [username, setUsername] = useState(""); //for checking if username is taken
  const [viewPassword, setViewPassword] = useState(false); //to view or hide password

  useEffect(() => {
    if (username) {
    handleUsernameChange();
    }
  }, [username]);

  async function handleAccountCreation(e) {
    e.preventDefault();

    const body = {
        username: e.target.username.value,
        password: e.target.password.value,
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        companyName: e.target.companyName.value,
        company: trueCompany,
        city: e.target.city.value,
        state: usState
    }

    const response = await fetch(`http://localhost:3000/users/register`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': "application/json",
            Authorization: yourJwtToken
        }
    });

    const data = await response.json();
    console.log(data);

    //error handling
    if (response.status === 500) {
      registrationFailed = <p className="text-red-600">Registration failed. Please try again.</p>

      e.target.reset();
    } else (
      navigate("/Login")
    )

}

function handleCheck (e) {
  e.preventDefault();

  setTrueCompany(!trueCompany);
}

function handleState (e) {
  e.preventDefault();

  setUsState(e.target.value);
}

async function handleUsernameChange () {
  const response = await fetch (`http://localhost:3000/users/check/${username}`);
  const data = await response.json();
  console.log(data);

    if (!data) {
      usernameTaken = <p className="text-green-500">Username is available.</p>
    }

    if (response.status === 200) {
      usernameTaken = <p className="text-red-600">Sorry, this username is taken.</p>
    } else {
      usernameTaken = <p className="text-green-500">Username is available.</p>
    }
}

if (viewPassword) {
  passwordInputType = "text"
} else {
  passwordInputType = "password"
}


  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      width: "98vw"
    }}>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-teal md:text-2xl dark:text-white">
              Create an account with Upright Capstone to submit your proposal
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleAccountCreation}>
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <input
                  type="firstName"
                  name="firstName"
                  id="firstName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="your first name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  type="lastName"
                  name="lastName"
                  id="lastName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="your last name"
                  required
                />
              </div>
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="company"
                    aria-describedby="company"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    onChange={(e) => {handleCheck(e)}}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="company"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I represent a company/business
                  </label>
                </div>
              </div>

              <div>
                <label
                  htmlFor="companyName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name of company / business (if applicable)
                </label>
                <input
                  type="companyName"
                  name="companyName"
                  id="companyName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="company name"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  City
                </label>
                <input
                  type="city"
                  name="city"
                  id="city"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="city"
                  required
                />
              </div>

              
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  State
                </label>
                <select
                  id="countries"
                  value={usState}
                  onChange={(e) => {handleState(e)}}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>AL</option>
                  <option>AK</option>
                  <option>AZ</option>
                  <option>AR</option>
                  <option>CA</option>
                  <option>CO</option>
                  <option>CT</option>
                  <option>DC</option>
                  <option>DE</option>
                  <option>FL</option>
                  <option>GA</option>
                  <option>HI</option>
                  <option>ID</option>
                  <option>IL</option>
                  <option>IN</option>
                  <option>IO</option>
                  <option>KS</option>
                  <option>KY</option>
                  <option>LA</option>
                  <option>ME</option>
                  <option>MD</option>
                  <option>MA</option>
                  <option>MI</option>
                  <option>MN</option>
                  <option>MS</option>
                  <option>MO</option>
                  <option>MT</option>
                  <option>NE</option>
                  <option>NV</option>
                  <option>NH</option>
                  <option>NJ</option>
                  <option>NM</option>
                  <option>NY</option>
                  <option>NC</option>
                  <option>ND</option>
                  <option>OH</option>
                  <option>OK</option>
                  <option>OR</option>
                  <option>PA</option>
                  <option>RI</option>
                  <option>SC</option>
                  <option>SD</option>
                  <option>TN</option>
                  <option>TX</option>
                  <option>UT</option>
                  <option>VT</option>
                  <option>VA</option>
                  <option>WA</option>
                  <option>WV</option>
                  <option>WI</option>
                  <option>WY</option>
                </select>

              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="username"
                  name="username"
                  id="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="username"
                  required
                />
              </div>
              {usernameTaken}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <div style={{
                  display: "inline-flex",
                  flexDirection: "row"
                }}>
                <input
                  type={passwordInputType}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                <svg onClick={() => {setViewPassword(!viewPassword)}} className="inline w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
  <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
</svg>
</div>

              </div>
              
              <button
                type="submit"
                className="w-full text-black bg-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create account
              </button>

              {registrationFailed}

              <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
