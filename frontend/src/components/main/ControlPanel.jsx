import { useState, useEffect } from "react";

export default function ControlPanel() {
  //useState variables
  const [allProposals, setAllProposals] = useState([]); //list of all proposals from database
  const [unreadProposals, setUnreadProposals] = useState([]); //list of all unread proposals based on "read = true or false"
  const [currentProposal, setCurrentProposal] = useState(); //clicked proposal, fetches by id to display details

  //useEffect functions
  useEffect(() => {
    getAllProposals(); //stays on top of changing proposals list
  }, []);

  useEffect(() => {
    allUnreadProposals(); //watched allProposals list for changes and refreshes unread list
  }, [allProposals]);

  useEffect(() => {
    handleProposalClick(); //updates current selected proposals as they are clicked on
  }, [currentProposal]);

  async function getAllProposals() {
    const response = await fetch(
      `http://localhost:3000/proposals/displayAllProposal`
    );

    const data = await response.json();
    console.log(data);
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
      console.log(unreadProposalsList);
      setUnreadProposals(unreadProposalsList);
    } catch (err) {
      console.log(err);
    }
  }

  //const topPriorityProposals = fetch list of proposals sorted by available date

  //const pendingReviewProposals = fetch list of proposals with status pending

  //onClick of any project in various lists, proposal appears in 'Project Detail View' with project details
  async function handleProposalClick(e, proposal) {
    e.preventDefault();

    setCurrentProposal(proposal);
    console.log(proposal);
  }

  let projectInProgress;

  if (currentProposal) {
    if (currentProposal.projectStarted) {
      projectInProgress = <p>Project is already underway.</p>;
    } else {
      projectInProgress = <p>Project is not started.</p>;
    }
  }

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
    console.log("Proposal marked as read.", data);

    getAllProposals();
  }

  return (
    <>
      <div
        style={{
          marginLeft: "25px",
        }}
      >
        <h1
          style={{
            fontSize: "60px",
          }}
        >
          Welcome!
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
              Most Urgent Proposals
            </h5>
            <ul className="w-98 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                Proposal for ..date..
              </li>
              <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                Proposal for ..date..
              </li>
              <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                Proposal for ..date..
              </li>
              <li className="w-full px-4 py-2 rounded-b-lg">
                Proposal for ..date..
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
                display: "inline-flex",
              }}
            >
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                {currentProposal.companyName}
                </h1>
              <p style={{
                marginLeft: "40px"
              }}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {currentProposal.availabilityStart} -{" "}
                {currentProposal.availabilityEnd}
              </h5>
              <button
                style={{
                  display: "inline-flex",
                  marginLeft: "25px",
                }}
                onClick={(e) => {
                  handleMarkAsReadProposal(e);
                }}
              ><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8m18 0-8.029-4.46a2 2 0 0 0-1.942 0L3 8m18 0-9 6.5L3 8"/>
            </svg>
            
            
                Mark As Read
              </button>
              </p>
            </div>

            <div
              style={{
                display: "inline-flex",
                position: "relative",
                float: "right",
                marginLeft: "10px",
              }}
            >
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
                    htmlFor="option-disabled"
                    className="block ms-2 text-sm font-medium text-gray-300 dark:text-gray-700"
                  >
                    Submitted
                  </label>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    id="country-option-1"
                    type="radio"
                    name="underReview"
                    value="underReview"
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    checked
                  />
                  <label
                    htmlFor="country-option-1"
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
            <div>
              <p className="mb-3 text-lg text-gray-500 md:text-xl dark:text-gray-400"></p>
              <p className="mb-3 text-lg text-gray-500 md:text-xl dark:text-gray-400">{currentProposal.website}</p>
              <p className="mb-3 text-lg text-gray-500 md:text-xl dark:text-gray-400">{currentProposal.contact}</p>
              <p className="text-gray-500 dark:text-gray-400">{currentProposal.proposition}</p>
              <p className="text-gray-500 dark:text-gray-400">{currentProposal.techRequirements}</p>
              <p className="text-gray-500 dark:text-gray-400">{projectInProgress}</p>
            </div>
          </a>
        </div>
      )}
    </>
  );
}
