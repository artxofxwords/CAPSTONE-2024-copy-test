import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import contextProvider from "../components/header/Context";

export default function NewProposalForm() {
  const navigate = useNavigate();
  const { context, setContext } = useContext(contextProvider);

  const [category, setCategory] = useState(false);
  const [categorySoftwareDevelopment, setCategorySoftwareDevelopment] = useState(false); 
  const [categoryDataAnalysis, setCategoryDataAnalysis] = useState(false);
  const [categoryUxUi, setCategoryUxUi] = useState(false);
  const [categoryDigitalMarketing, setCategoryDigitalMarketing] = useState(false);

  const [projectExists, setProjectExists] = useState(false);

  //functions to handle proposal category setting
  function handleCategory (e) {
    e.preventDefault();

    setCategory(!category);
  }

  function handleSoftDev (e) {
    e.preventDefault();

    setCategorySoftwareDevelopment(!categorySoftwareDevelopment);
  }

  function handleDatAn (e) {
    e.preventDefault();

    setCategoryDataAnalysis(!categoryDataAnalysis);
  }

  function handleUxUi (e) {
    e.preventDefault();

    setCategoryUxUi(!categoryUxUi);
  }

  function handleDigMark (e) {
    e.preventDefault();

    setCategoryDigitalMarketing(!categoryDigitalMarketing);
  }

  function handleCheck (e) {
    e.preventDefault();
  
    setProjectExists(!projectExists);
  }

  async function handleFormSubmit (e) {
    e.preventDefault();

    const proposalData = {
      companyName: e.target.companyName.value,    
      website: e.target.website.value,
      projectStarted: projectExists,    
      proposition: e.target.proposition.value,
      techRequirements: e.target.techRequirements.value, 
      availabilityStart: e.target.availabilityStart.value,
      availabilityEnd: e.target.availabilityEnd.value,
      contact: e.target.contact.value,
      category: category,
      categorySoftwareDevelopment: categorySoftwareDevelopment,
      categoryDataAnalysis: categoryDataAnalysis,
      categoryDigitalMarketing: categoryDigitalMarketing,
      categoryUxUi: categoryUxUi,
      owner: context.userData.user._id
    }

    const response = await fetch(`http://localhost:3000/proposals/createProposal`, {
      method: "POST",
      body: JSON.stringify(proposalData),
      headers: {
        "Content-type": "application/json"
      }
    });

    const data = await response.json();

    console.log("Proposal created.", data);

    setContext({proposalData: data});

    navigate("/dashboard");
  }


  return (
    <>
      <div
      style={{
        width: "45vw",
        height: "80vh",
        margin: "15px",
        display: "flex",
        marginLeft: "auto",
        marginRight: "auto",
        border: "2px solid black",
        // textAlign: "center",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Submit your proposal to Upright Capstone
            </h1>
            {/* <p>(This proposal will be submitted with you, {context.userData.user.firstName}, as the owner.)</p> */}
            <form className="space-y-4 md:space-y-6" onSubmit={(e) => {handleFormSubmit(e)}}>
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
                  <p style={{
                    display: "inline-flex",
                    marginBottom: "8px"
                  }}>
                    Assign Category
                    </p>
                </legend>

                <div className="flex items-center mb-4">
                  <input
                    id="unassigned"
                    type="radio"
                    name="unassigned"
                    value="unassigned"
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => {handleCategory(e)}}
                  />
                  <label
                    htmlFor="unassigned"
                    className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I&apos;m not sure
                  </label>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    id="softwareDevelopment"
                    type="radio"
                    name="softDev"
                    value="softDev"
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => {handleSoftDev(e)}}
                  />
                  <label
                    htmlFor="softDev"
                    className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Software Development
                  </label>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    id="digitalMarketing"
                    type="radio"
                    name="digMark"
                    value="digMark"
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => {handleDigMark(e)}}
                  />
                  <label
                    htmlFor="digMark"
                    className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Digital Marketing
                  </label>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    id="dataAnalysis"
                    type="radio"
                    name="datAn"
                    value="datAn"
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => {handleDatAn(e)}}
                  />
                  <label
                    htmlFor="datAn"
                    className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Data Analytics
                  </label>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    id="uxUi"
                    type="radio"
                    name="uxUi"
                    value="uxUi"
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => {handleUxUi(e)}}
                  />
                  <label
                    htmlFor="uxUi"
                    className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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
                <textarea id="proposition" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Explain the project..." required="true"></textarea>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="projectStarted"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    onChange={(e) => {handleCheck(e)}}
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

              <label htmlFor="availableDates" 
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    What is your availability to sponsor this project for a capstone cohort?
                  </label>
              <div id="date-range-picker" className="flex items-center">
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                  <input
                    id="availabilityStart"
                    name="start"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date start"
                  ></input>
                </div>
                <span className="mx-4 text-gray-500">to</span>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                  <input
                    id="availabilityEnd"
                    name="end"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date end"
                  ></input>
                </div>
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
                  The best contact for this proposal (enter a phone number or email)
                </label>
                <input
                  name="contact"
                  id="contact"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Contact info"
                  required="true"
                />
              </div>



              <button
                type="submit"
                className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Submit your proposal
              </button>
            </form>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
