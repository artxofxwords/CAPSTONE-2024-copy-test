/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Button } from "flowbite-react";

export default function NewProposalForm() {
  const navigate = useNavigate();
  const yourJwtToken = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(yourJwtToken);

  const [userInfo, setUserInfo] = useState([]); //userInfo that persists

  const [category, setCategory] = useState("noCategory");
  // const [categorySoftwareDevelopment, setCategorySoftwareDevelopment] =
  //   useState(false);
  // const [categoryDataAnalysis, setCategoryDataAnalysis] = useState(false);
  // const [categoryUxUi, setCategoryUxUi] = useState(false);
  // const [categoryDigitalMarketing, setCategoryDigitalMarketing] =
  //   useState(false);

  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();

  const [projectExists, setProjectExists] = useState(false);

  useEffect(() => {
    setPersistingCurrentUserObject(); //user info persists with refresh
  }, []);

  async function setPersistingCurrentUserObject() {
    const response = await fetch(`http://localhost:3000/users/${decoded._id}`);

    const data = await response.json();
    console.log("Persistent user data:", data);

    setUserInfo(data);
  }

  //functions to handle proposal category setting
  function handleCategory(e) {
    e.preventDefault();

    setCategory(e.target.value);
  }

  // function handleSoftDev(e) {
  //   e.preventDefault();

  //   setCategorySoftwareDevelopment(!categorySoftwareDevelopment);
  // }

  // function handleDatAn(e) {
  //   e.preventDefault();

  //   setCategoryDataAnalysis(!categoryDataAnalysis);
  // }

  // function handleUxUi(e) {
  //   e.preventDefault();

  //   setCategoryUxUi(!categoryUxUi);
  // }

  // function handleDigMark(e) {
  //   e.preventDefault();

  //   setCategoryDigitalMarketing(!categoryDigitalMarketing);
  // }

  function handleCheck(e) {
    e.preventDefault();

    setProjectExists(!projectExists);
  }

  function handleDateStart(e) {
    e.preventDefault();

    setDateStart(e.target.value);
  }

  function handleDateEnd(e) {
    e.preventDefault();

    setDateEnd(e.target.value);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    let companyNameHandle;
    let websiteHandle;

    if (e.target.companyName.value) {
      companyNameHandle = e.target.companyName.value;
    } else {
      companyNameHandle = userInfo.companyName;
    }

    if (e.target.website.value) {
      websiteHandle = e.target.website.value;
    } else {
      websiteHandle = "None specified.";
    }

    const proposalData = {
      companyName: companyNameHandle,
      website: websiteHandle,
      projectStarted: projectExists,
      proposition: e.target.proposition.value,
      techRequirements: e.target.techRequirements.value,
      availabilityStart: dateStart,
      availabilityEnd: dateEnd,
      contact: e.target.contact.value,
      category: category,
      owner: decoded._id,
      status: "submitted",
      read: false,
      updated: false
    };

    const response = await fetch(
      `http://localhost:3000/proposals/createProposal`,
      {
        method: "POST",
        body: JSON.stringify(proposalData),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const data = await response.json();

    console.log("Proposal created.", data);

    navigate("/dashboard");
  }

  async function handleSendEmail(e) {
    e.preventDefault();

    let companyNameHandle;
    let websiteHandle;

    if (e.target.companyName.value) {
      companyNameHandle = e.target.companyName.value;
    } else {
      companyNameHandle = userInfo.companyName;
    }

    if (e.target.website.value) {
      websiteHandle = e.target.website.value;
    } else {
      websiteHandle = "None specified.";
    }

    const proposalData = {
      companyName: companyNameHandle,
      website: websiteHandle,
      projectStarted: projectExists,
      proposition: e.target.proposition.value,
      techRequirements: e.target.techRequirements.value,
      availabilityStart: dateStart,
      availabilityEnd: dateEnd,
      contact: e.target.contact.value,
      category: category,
      owner: decoded._id,
      status: "submitted",
      read: false,
      updated: false
    };

    const response = await fetch(`http://localhost:3000/proposals/send`, {
      method: "POST",
      body: JSON.stringify(proposalData),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await response.json();
    console.log("Proposal sent.", data);
  }

  return (
    <>
      <div
        style={{
          width: "auto",
          height: "80vh",
          display: "flex",
          marginLeft: "auto",
          marginRight: "auto",
          justifyContent: "center",
          alignItems: "start",
          overflow: "auto",
        }}
      >
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Submit your proposal to Upright Capstone
              </h1>
              <p>(This proposal will be submitted with you as the owner.)</p>

              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => {
                  handleSendEmail(e), handleFormSubmit(e);
                }}
              >
                <div>
                  <label
                    htmlFor="Company name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Company Name (if applicable)
                  </label>
                  <input
                    name="companyName"
                    id="companyName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="Company website"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Company Website (if applicable)
                  </label>
                  <input
                    name="website"
                    id="website"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your company website"
                  />
                </div>

                <div>
                  <fieldset>
                    <legend>
                      <p
                      className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        style={{
                          display: "inline-flex",
                          marginBottom: "8px",
                        }}
                      >
                        Assign Category
                      </p>
                    </legend>

                    <div className="flex items-center mb-4">
                      <input
                        id="noCategory"
                        type="radio"
                        name="category"
                        value="noCategory"
                        className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                        onChange={(e) => {
                          handleCategory(e);
                        }}
                      />
                      <label
                        htmlFor="noCategory"
                        className="block ms-2 text-sm font-light text-gray-900 dark:text-gray-300"
                      >
                        I&apos;m not sure
                      </label>
                    </div>

                    <div className="flex items-center mb-4">
                      <input
                        id="softwareDevelopment"
                        type="radio"
                        name="category"
                        value="softwareDevelopment"
                        className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                        onChange={(e) => {
                          handleCategory(e);
                        }}
                      />
                      <label
                        htmlFor="softwareDevelopment"
                        className="block ms-2 text-sm font-light text-gray-900 dark:text-gray-300"
                      >
                        Software Development
                      </label>
                    </div>

                    <div className="flex items-center mb-4">
                      <input
                        id="digitalMarketing"
                        type="radio"
                        name="category"
                        value="digitalMarketing"
                        className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                        onChange={(e) => {
                          handleCategory(e);
                        }}
                      />
                      <label
                        htmlFor="digitalMarketing"
                        className="block ms-2  text-sm font-light text-gray-900 dark:text-gray-300"
                      >
                        Digital Marketing
                      </label>
                    </div>

                    <div className="flex items-center mb-4">
                      <input
                        id="dataAnalytics"
                        type="radio"
                        name="category"
                        value="dataAnalytics"
                        className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                        onChange={(e) => {
                          handleCategory(e);
                        }}
                      />
                      <label
                        htmlFor="dataAnalytics"
                        className="block ms-2 text-sm font-light text-gray-900 dark:text-gray-300"
                      >
                        Data Analytics
                      </label>
                    </div>

                    <div className="flex items-center mb-4">
                      <input
                        id="uxUi"
                        type="radio"
                        name="category"
                        value="uxUi"
                        className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                        onChange={(e) => {
                          handleCategory(e);
                        }}
                      />
                      <label
                        htmlFor="uxUi"
                        className="block ms-2 text-sm font-light text-gray-900 dark:text-gray-300"
                      >
                        UX/UI
                      </label>
                    </div>
                  </fieldset>
                </div>

                <div>
                  <label
                    htmlFor="projectProposition"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Proposition - please be as detailed as possible
                  </label>
                  <textarea
                    id="proposition"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Explain the project..."
                    required
                  ></textarea>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="projectStarted"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      onChange={(e) => {
                        handleCheck(e);
                      }}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="projectExists"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      This project is already underway
                    </label>
                  </div>
                </div>

                <label
                  htmlFor="availableDates"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  What is your availability to sponsor this project for a
                  capstone cohort?
                </label>
                <div className="flex items-center">
                  <input
                    value={dateStart}
                    onChange={(e) => {
                      handleDateStart(e);
                    }}
                    placeholder="MM/DD/YYYY"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <span className="mx-4 text-gray-500">to</span>
                  <input
                    value={dateEnd}
                    onChange={(e) => {
                      handleDateEnd(e);
                    }}
                    placeholder="MM/DD/YYYY"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="Company website"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Project Technologies used or preferred
                  </label>
                  <input
                    name="techRequirements"
                    id="techRequirements"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Tech or software requirements"
                  />
                </div>

                <div>
                  <label
                    htmlFor="Company website"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    The best contact for this proposal (enter a valid email)
                  </label>
                  <input
                  type="email"
                    name="contact"
                    id="contact"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Contact info"
                    required
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                  }}
                >
                  <Button
                    type="submit"
                    style={{
                      display: "inline-flex",
                      backgroundColor: "#ff532f",
                      color: "black"
                    }}
                    className="focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
                  >
                    Submit your proposal
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
