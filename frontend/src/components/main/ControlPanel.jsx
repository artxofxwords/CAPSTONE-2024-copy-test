import { useState, useEffect } from "react";

export default function ControlPanel () {
    const [currentProposal, setCurrentProposal] = useState();

    useEffect(() => {
      handleProposalClick();
    }, []);
    
      //fetch list of proposals to match owner to user._id
      //if match, display on page, ekse, display text "you have no active proposals"
    
      //if (isAdmin) {
    
      //const unreadProposals = fetch list of proposals with status read: false
    
      //const topPriorityProposals = fetch list of proposals sorted by available date
    
      //const pendingReviewProposals = fetch list of proposals with status pending
    
      //onClick of any project in various lists, modal appears in 'Project Detail View' with project details
      //}
    
      async function handleProposalClick(e) {
        e.preventDefault();
    
        setCurrentProposal(e.target);
        console.log(currentProposal);
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
              <a
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Unread Proposals
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  <ul className="w-98 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      New Proposal 1
                    </li>
                    <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                      New Proposal 2
                    </li>
                    <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                      New Proposal 3
                    </li>
                    <li className="w-full px-4 py-2 rounded-b-lg">
                      New Proposal 4
                    </li>
                  </ul>
                </p>
              </a>
            </div>
            <div
              style={{
                display: "inline",
              }}
            >
              <a
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Most Urgent Proposals
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
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
                </p>
              </a>
            </div>
    
            <div
              style={{
                display: "inline",
              }}
            >
              <a
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Software Dev
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
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
                </p>
              </a>
            </div>
    
            <div
              style={{
                display: "inline"
              }}
            >
              <a
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  UX/UI
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  <ul className="w-98 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      UX/UI project 1
                    </li>
                    <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                      UX/UI project 2
                    </li>
                  </ul>
                </p>
              </a>
            </div>
    
            <div
              style={{
                display: "inline"
              }}
            >
              <a
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Data Analytics
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  <ul className="w-98 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      Data Analytics project 1
                    </li>
                    <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                      Data Analytics project 2
                    </li>
                  </ul>
                </p>
              </a>
            </div>
    
            <div
              style={{
                display: "inline"
              }}
            >
              <a
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Digital Marketing
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  <ul className="w-98 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      Digital Marketing project 1
                    </li>
                    <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                      Digital Marketing project 2
                    </li>
                  </ul>
                </p>
              </a>
            </div>
          </div>
    
          <div
            style={{
              display: "inline-block",
              width: "95vw",
              margin: "25px",
            }}
          >
            <a
              className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Project Detail View
              </h5>{" "}
              Here is where project specifics will show once clicked on from lists
              above
    
              <div style={{
                display: "inline-flex",
                position: "relative",
                float: "right",
                marginLeft: "10px"
              }}>
              <fieldset>
                <legend>Proposal Status</legend>
    
                <div className="flex items-center mb-4">
                  <input
                    id="option-disabled"
                    type="radio"
                    name="countries"
                    value="China"
                    className="w-4 h-4 border-gray-200 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    disabled
                  />
                  <label
                    htmlFor="option-disabled"
                    className="block ms-2 text-sm font-medium text-gray-300 dark:text-gray-700"
                  >
                    Unread Proposal
                  </label>
                </div>
    
                <div className="flex items-center mb-4">
                  <input
                    id="country-option-1"
                    type="radio"
                    name="countries"
                    value="USA"
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
                    name="countries"
                    value="Germany"
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="country-option-2"
                    className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    New status
                  </label>
                </div>
    
                <div className="flex items-center mb-4">
                  <input
                    id="country-option-3"
                    type="radio"
                    name="countries"
                    value="Spain"
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="country-option-3"
                    className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    New Status
                  </label>
                </div>
    
                <div className="flex items-center mb-4">
                  <input
                    id="country-option-4"
                    type="radio"
                    name="countries"
                    value="United Kingdom"
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="country-option-4"
                    className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    New Status
                  </label>
                </div>
              </fieldset>
              </div>
              <div>
              <p>
                Company Name
              </p>
              <p>
                Company Website
              </p>
              <p>
                Contact Info
              </p>
              <p>
                Proposition
              </p>
              <p>
                Tech Requirements
              </p>
              <p>
                This project is already underway / This project is still in planning phase
              </p>
              </div>
            </a>
          </div>
        </>
      );
    }
    