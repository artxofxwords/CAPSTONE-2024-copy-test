import { useState, useEffect } from "react";

export default function ControlPanel() {
  //const yourJwtToken = localStorage.getItem("token");

  //useState variables
  const [allProposals, setAllProposals] = useState([]); //list of all proposals from database
  const [unreadProposals, setUnreadProposals] = useState([]); //list of all unread proposals based on "read = true or false"
  const [priorityProposals, setPriorityProposals] = useState([]); //list of top five proposals sorted by sponser availability date
  const [currentProposal, setCurrentProposal] = useState(); //clicked proposal, fetches by id to display details
  const [currentProposalOwnerInfo, setCurrentProposalOwnerInfo] = useState([]); //sponsor info for selected proposal

  const [readProposal, setReadProposal] = useState(false); //mark as read once reviewed
  const [statusUnderReview, setStatusUnderReview] = useState(false); //mark under review once proposal is opened
  const [statusOngoing, setStatusOngoing] = useState(false); //mark ongoing once contact made
  const [statusApproved, setStatusApproved] = useState(false); //mark approved once ready to assign to cohort
  const [statusDenied, setStatusDenied] = useState(false); //mark denied to remove from view

  // const [noCategory, setNoCategory] = useState(true);
  // const [categorySoftwareDevelopment, setCategorySoftwareDevelopment] = useState(false); 
  // const [categoryDataAnalysis, setCategoryDataAnalysis] = useState(false);
  // const [categoryUxUi, setCategoryUxUi] = useState(false);
  // const [categoryDigitalMarketing, setCategoryDigitalMarketing] = useState(false);

  //useEffect functions
  useEffect(() => {
    getAllProposals(); //stays on top of changing proposals list
  }, []);

  useEffect(() => {
    allUnreadProposals(); //rerenders unread list
  }, [allProposals]);

  useEffect(() => {
    sortProposalsByPriority(); //rerenders priority list
  }, [allProposals]);

  useEffect(() => {
    if (currentProposal) {
      getOwnerInfo(); //renders sponsor info who submitted selected proposal
    }
  }, [currentProposal]);

  //functions
  //fetches all proposals
  async function getAllProposals() {
    const response = await fetch(
      `http://localhost:3000/proposals/displayAllProposal`
    );

    const data = await response.json();
    console.log("all proposals fetched: ", data);
    setAllProposals(data);

    allUnreadProposals();
  }

  //grabs unread proposals from allProposals list and displays them on "unread" card
  async function allUnreadProposals() {
    const unreadProposalsList = [];

    try {
      for (const item of allProposals) {
        if (item.read === false) {
          unreadProposalsList.push(item);
        }
      }
      console.log("unread proposals list: ", unreadProposalsList);
      setUnreadProposals(unreadProposalsList);
    } catch (err) {
      console.log(err);
    }
  }

  //const topPriorityProposals = fetch list of proposals sorted by available date
  async function sortProposalsByPriority () {
    const sortedProposals = allProposals.sort((a, b) => new Date(a.availabilityStart) - new Date(b.availabilityStart));

    console.log("sorted priority proposals: ", sortedProposals);
    sortedProposals.splice(5);

    setPriorityProposals(sortedProposals);
  }

  //onClick of any project in various lists, proposal appears in 'Project Detail View' with project details
  async function handleProposalClick(e, proposal) {
    e.preventDefault();

    setCurrentProposal(proposal);
    console.log(proposal);
  }

  //once currentProposal is set, specific proposal things...
  let projectInProgress;

  if (currentProposal) {
    if (currentProposal.projectStarted) {
      projectInProgress = <span>Project is already underway.</span>;
    } else {
      projectInProgress = <span>Project is not started.</span>;
    }
  }

  //pulls info of sponser who submitted proposal through owner id
  async function getOwnerInfo () {
    const _id = currentProposal.owner;
    console.log("owner id: ", currentProposal.owner);

    const response = await fetch(`http://localhost:3000/users/${_id}`);
    
    const data = await response.json();
    console.log("owner info: ", data);

    setCurrentProposalOwnerInfo(data);
  }

  //handles user click on mark proposal as read
  async function handleMarkAsReadProposal(e) {
    e.preventDefault();

    const body = { read: true };

    const response = await fetch(
      `http://localhost:3000/proposals/displayAllProposal/${currentProposal._id}`,
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
          // "Authorization": `Bearer ${yourJwtToken}`
        },
      }
    );

    const data = await response.json();

    setReadProposal(!readProposal);
    console.log("Proposal marked as read.", data);

    getAllProposals();
  }

  //functions for state variables to hold admin selections until "save changes" is clicked for put request
  function handleStatusUnderReview (e) {
    e.preventDefault();

    setStatusUnderReview(!statusUnderReview);
  }

  function handleStatusOngoing (e) {
    e.preventDefault();

    setStatusOngoing(!statusOngoing);
  }

  function handleStatusApproved (e) {
    e.preventDefault();

    setStatusApproved(!statusApproved);
  }

  function handleStatusDenied (e) {
    e.preventDefault();

    setStatusDenied(!statusDenied);
  }
  

//handles admin saving all state variables to database
async function handleSaveAllProposalChanges (e) {
  e.preventDefault();

    const body = {
      read: readProposal,
      approvedStatus: statusApproved,
      underReviewStatus: statusUnderReview,
      deniedStatus: statusDenied,
      ongoingStatus: statusOngoing
    }


    const response = await fetch(`http://localhost:3000/proposals/displayProposal/${currentProposal._id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
        // "Authorization": `Bearer ${yourJwtToken}`
      },
    })

    const data = await response.json();
    console.log("updated proposal status: ", data);
  }


  return (
    <>
      <div
        style={{
          marginLeft: "25px"
        }}
      >
        <h1
          style={{
            fontSize: "60px"
          }}
        >
          Welcome admin!
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          rowGap: "15px",
          columnGap: "15px",
          flexWrap: "wrap",
          alignContent: "center",
          textAlign: "center",
          width: "95vw",
          height: "40vw",
          marginLeft: "25px",
        }}
      >
        <div
          style={{
            display: "inline",
          }}
        >
          <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Unread Proposals
            </h5>

            <ul className="w-98 text-med font-bold text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              {unreadProposals?.map((proposal) => (
                <li
                  key={proposal._id}
                  onClick={(e) => {
                    handleProposalClick(e, proposal);
                  }}
                  className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                >
                  <span className="flex w-3 h-3 me-3 bg-yellow-300 rounded-full"></span>
                  {proposal.companyName}
                </li>
              ))}
            </ul>
          </a>
        </div>
        <div
          style={{
            display: "inline",
          }}
        >
          <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Priority Proposals
            </h5>

            <ul className="w-98 text-med font-bold text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              {priorityProposals?.map((proposal) => (
                <li
                  key={proposal._id}
                  onClick={(e) => {
                    handleProposalClick(e, proposal);
                  }}
                  className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                >
                  {proposal.companyName} - {proposal.availabilityStart}
                </li>
              ))}
            </ul>
          </a>
        </div>

        <div
          style={{
            display: "inline",
          }}
        >
          <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Software Dev
            </h5>
            <ul className="w-98 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                Soft Dev project 1
              </li>
              <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                Soft Dev project 2
              </li>
              <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                Soft Dev project 3
              </li>
            </ul>
          </a>
        </div>

        <div
          style={{
            display: "inline",
          }}
        >
          <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              UX/UI
            </h5>
            <ul className="w-98 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                UX/UI project 1
              </li>
              <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                UX/UI project 2
              </li>
            </ul>
          </a>
        </div>

        <div
          style={{
            display: "inline",
          }}
        >
          <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Data Analytics
            </h5>
            <ul className="w-98 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                Data Analytics project 1
              </li>
              <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                Data Analytics project 2
              </li>
            </ul>
          </a>
        </div>

        <div
          style={{
            display: "inline",
          }}
        >
          <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Digital Marketing
            </h5>
            <ul className="w-98 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                Digital Marketing project 1
              </li>
              <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                Digital Marketing project 2
              </li>
            </ul>
          </a>
        </div>
      </div>

      {currentProposal && (
        <div
          style={{
            display: "inline-block",
            width: "95vw",
            margin: "25px",
          }}
        >
          <a className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline"
              }}
            >
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                {currentProposal.companyName}
                </h1>
              <span style={{
                display: "flex",
                marginLeft: "40px"
              }}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {currentProposal.availabilityStart} -{" "}
                {currentProposal.availabilityEnd}
              </h5>
              <button
                style={{
                  marginLeft: "25px",
                }}
                onClick={(e) => {
                  handleMarkAsReadProposal(e);
                }}
              ><svg className="inline w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8m18 0-8.029-4.46a2 2 0 0 0-1.942 0L3 8m18 0-9 6.5L3 8"/>
            </svg>
            
                Mark As Read
              </button>
              </span>
            </div>


            <div
              style={{
                display: "inline-flex",
                flexDirection: "column",
                columnGap: "20px",
                float: "right",
                marginTop: "20px"
              }}
            >
            <div style={{
              display: "flex"
            }}>
              <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 0 0-1 1H6a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2a1 1 0 0 0-1-1H9Zm1 2h4v2h1a1 1 0 1 1 0 2H9a1 1 0 0 1 0-2h1V4Zm5.707 8.707a1 1 0 0 0-1.414-1.414L11 14.586l-1.293-1.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z"
                      clipRule="evenodd"
                    />
                  </svg>
              <fieldset>
                <legend>
                  <p style={{
                    display: "inline-flex",
                    marginBottom: "8px"
                  }}>
                    Proposal Status
                    </p>
                </legend>

                <div className="flex items-center mb-4">
                  <input
                    id="option-disabled"
                    type="radio"
                    name="submitted"
                    value="submitted"
                    className="w-4 h-4 border-gray-200 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    disabled
                  />
                  <label
                    htmlFor="submitted"
                    className="block ms-2 text-sm font-medium text-gray-300 dark:text-gray-700"
                  >
                    Submitted
                  </label>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    id="underReviewStatus"
                    type="radio"
                    name="underReview"
                    value="underReviewStatus"
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => {handleStatusUnderReview(e)}}
                  />
                  <label
                    htmlFor="underReview"
                    className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Under Review
                  </label>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    id="country-option-2"
                    type="radio"
                    name="ongoing"
                    value="ongoing"
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => {handleStatusOngoing(e)}}
                  />
                  <label
                    htmlFor="country-option-2"
                    className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Ongoing (contact made)
                  </label>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    id="country-option-3"
                    type="radio"
                    name="approved"
                    value="approved"
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => {handleStatusApproved(e)}}
                  />
                  <label
                    htmlFor="country-option-3"
                    className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Approved
                  </label>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    id="country-option-4"
                    type="radio"
                    name="denied"
                    value="denied"
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => {handleStatusDenied(e)}}
                  />
                  <label
                    htmlFor="country-option-4"
                    className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Denied
                  </label>
                </div>
              </fieldset>
            </div>
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
                    checked
                  />
                  <label
                    htmlFor="unassigned"
                    className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    No category assigned
                  </label>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    id="softwareDevelopment"
                    type="radio"
                    name="softDev"
                    value="softDev"
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
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
                  />
                  <label
                    htmlFor="uxUi"
                    className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    UX/UI
                  </label>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    id="all"
                    type="radio"
                    name="all"
                    value="all"
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="all"
                    className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    All Categories
                  </label>
                </div>
              </fieldset>
              </div>


            <div style={{
              height: "200vh",
              marginLeft: "40px"
            }}>
              <p className="mb-3 text-lg text-gray-500 md:text-xl dark:text-gray-400">Submitted by: {currentProposalOwnerInfo.firstName}{" "}{currentProposalOwnerInfo.lastName}</p>
              <p className="mb-3 text-lg text-gray-500 md:text-xl dark:text-gray-400">Website: <a href={currentProposal.website} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{currentProposal.website}</a></p>
              <p className="mb-3 text-lg text-gray-500 md:text-xl dark:text-gray-400">Preferred contact: {currentProposal.contact}</p>
              <p className="mb-3 text-lg text-gray-500 md:text-xl dark:text-gray-400">Location: {currentProposalOwnerInfo.city}, {currentProposalOwnerInfo.state}</p> 
              <p className="text-gray-500 dark:text-gray-400">{currentProposal.proposition}</p>
              <p className="text-gray-500 dark:text-gray-400">Tech: {currentProposal.techRequirements}</p>
              <p className="text-gray-500 dark:text-gray-400">{projectInProgress}</p>
            </div>

          <div style={{
            display: "inline-block",
            float: "right"
          }}>
          <button type="click" onClick={(e) => {handleSaveAllProposalChanges(e)}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save All Changes</button>
          </div>
          </a>

        </div>
      )}
    </>
  );
}
