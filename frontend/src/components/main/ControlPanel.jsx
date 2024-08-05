/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Button, Label, Radio } from "flowbite-react";
import Nav from "../header/Nav";
import ViewProposalFormModal from "./ControlPanel/ViewProposalFormModal";
import AllUsersDrawer from "../main/ControlPanel/AllUsersDrawer";
import AllProposalsModal from "./ControlPanel/AllProposalsModal";
import AssignAdminModal from "./ControlPanel/AssignAdminModal";
import PropByCatAccordion from "./ControlPanel/PropByCatAccordion";
import MarkAsReadButton from "./ControlPanel/MarkAsReadButton";
import DeleteProposalModal from "./ControlPanel/DeleteProposalModal";

export default function ControlPanel() {
  const yourJwtToken = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(yourJwtToken); //https://www.npmjs.com/package/jwt-decode

  //useState variables
  const [userInfo, setUserInfo] = useState([]); //userInfo that persists
  const [userInfoLoaded, setUserInfoLoaded] = useState(false); //stops page from loading till userInfo fetched

  const [allProposals, setAllProposals] = useState([]); //list of all proposals from database
  const [unreadProposals, setUnreadProposals] = useState([]); //list of all unread proposals based on "read = true or false"
  const [priorityProposals, setPriorityProposals] = useState([]); //list of top five proposals sorted by sponser availability date

  const [currentProposal, setCurrentProposal] = useState(); //clicked proposal, fetches by id to display details
  const [currentProposalOwnerInfo, setCurrentProposalOwnerInfo] = useState([]); //sponsor info for selected proposal
  // const [currentCategory, setCurrentCategory] = useState();
  // const [currentStatus, setCurrentStatus] = useState();

  const [categorySoftDev, setCategorySoftDev] = useState(false);
  const [categoryDigMark, setCategoryDigMark] = useState(false);
  const [categoryDatAn, setCategoryDatAn] = useState(false);
  const [categoryUxUi, setCategoryUxUi] = useState(false);
  const [categoryAssigned, setCategoryAssigned] = useState(false);

  const [deleteProposal, setDeleteProposal] = useState(false); //shows delete proposal popup to confirm delete

  const [status, setStatus] = useState(); //proposa status submitted/ approved/ denied
  // const [statusOngoing, setStatusOngoing] = useState(false); //mark ongoing once contact made
  // const [statusApproved, setStatusApproved] = useState(false); //mark approved once ready to assign to cohort
  // const [statusDenied, setStatusDenied] = useState(false); //mark denied to remove from view

  //useEffect functions
  useEffect(() => {
    setPersistingCurrentUserObject(); //user info persists with refresh
  }, []);

  useEffect(() => {
    getAllProposals(); //stays on top of changing proposals list
  }, []);

  useEffect(() => {
    allUnreadProposals(); //rerenders unread list
    sortProposalsByPriority(); //rerenders priority list
  }, [allProposals]);

  useEffect(() => {
    if (currentProposal) {
      getOwnerInfo(); //renders sponsor info who submitted selected proposal
    }
  }, [currentProposal]);

  //functions
  async function setPersistingCurrentUserObject() {
    const response = await fetch(`http://localhost:3000/users/${decoded._id}`);

    const data = await response.json();
    console.log("Persistent user data:", data);

    setUserInfo(data);
    setUserInfoLoaded(true);
  }

  //fetches all proposals
  async function getAllProposals() {
    const response = await fetch(
      `http://localhost:3000/proposals/displayAllProposal`
    );

    const data = await response.json();
    setAllProposals(data);
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
      setUnreadProposals(unreadProposalsList);
    } catch (err) {
      console.log(err);
    }
  }

  //fetch list of proposals sorted by available date
  async function sortProposalsByPriority() {
    const sortedProposals = allProposals.sort(
      (a, b) => new Date(a.availabilityStart) - new Date(b.availabilityStart)
    );

    sortedProposals.splice(5);

    setPriorityProposals(sortedProposals);
  }

  //onClick of any project in various lists, proposal appears in 'Project Detail View' with project details
  async function handleProposalClick(e, proposal) {
    e.preventDefault();

    setDeleteProposal(false);
    setCurrentProposal(proposal);
  }

  async function handleProposalClose(e) {
    e.preventDefault();

    setCurrentProposal(null);
  }

  //once currentProposal is set, specific proposal things...
  let projectInProgress;

  if (currentProposal) {
    if (currentProposal.projectStarted) {
      projectInProgress = <span>Project is already underway.</span>;
    } else {
      projectInProgress = <span>Project is not started.</span>;
    }

    currentProposalStatus();
  }

  function currentProposalStatus() {
    if (currentProposal.status === "submitted") {
      setStatus("Submitted");
    }
    if (currentProposal.status === "approved") {
      setStatus("Approved");
    }
    if (currentProposal.status === "denied") {
      setStatus("Denied");
    }
  }

  //pulls info of sponser who submitted proposal through owner id
  async function getOwnerInfo() {
    const _id = currentProposal.owner;
    console.log("owner id: ", currentProposal.owner);

    const response = await fetch(`http://localhost:3000/users/${_id}`);

    const data = await response.json();
    console.log("owner info: ", data);

    setCurrentProposalOwnerInfo(data);
  }

  //function for state variables to hold category assignment until "save changes"
  function handleCategorySoftwareDevelopment(e) {
    e.preventDefault();
    setCategorySoftDev(!categorySoftDev);
    setCategoryAssigned(true);
  }

  function handleCategoryDigitalMarketing(e) {
    e.preventDefault();
    setCategoryDigMark(!categoryDigMark);
    setCategoryAssigned(true);
  }

  function handleCategoryDataAnalytics(e) {
    e.preventDefault();
    setCategoryDatAn(!categoryDatAn);
    setCategoryAssigned(true);
  }

  function handleCategoryUxUi(e) {
    e.preventDefault();
    setCategoryUxUi(!categoryUxUi);
    setCategoryAssigned(true);
  }

  //functions for state variables to hold admin selections until "save changes" is clicked for put request
  function handleStatusApproved(e) {
    e.preventDefault();
    setStatus("approved");
  }

  function handleStatusDenied(e) {
    e.preventDefault();
    setStatus("denied");
  }

  //handles admin saving all state variables to database
  async function handleSaveAllProposalChanges(e) {
    e.preventDefault();

    const body = {
      _id: userInfo._id,
      isAdmin: userInfo.isAdmin,
      category: categoryAssigned,
      categorySoftwareDevelopment: categorySoftDev,
      categoryDigitalMarketing: categoryDigMark,
      categoryDataAnalytics: categoryDatAn,
      categoryUxUi: categoryUxUi,
      status: status,
    };

    const response = await fetch(
      `http://localhost:3000/proposals/updateProposal/${currentProposal._id}`,
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
          Authorization: yourJwtToken,
        },
      }
    );

    const data = await response.json();
    console.log("Proposal has been updated:", data);

    getAllProposals();
    currentProposalStatus();
  }

  return (
    <div>
      <Nav />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {userInfoLoaded && (
          <div>
            <h1
              style={{
                fontSize: "2.5em",
                marginTop: "5vh",
                marginBottom: "5vh",
              }}
            >
              <span style={{ color: "#ff532f" }}>Upright Capstone</span> | Admin
              Control Panel
            </h1>
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: "10px",
            alignContent: "center",
          }}
        >
          <ViewProposalFormModal />

          <AllUsersDrawer userInfo={userInfo} />

          <AllProposalsModal handleProposalClick={handleProposalClick} />

          <AssignAdminModal />

          <span
            style={{ fontSize: "1.2em", color: "#ddd5d0", marginLeft: "5vw" }}
          >
            Hello, {userInfo.firstName}
          </span>
        </div>
        <div style={{ display: "inline-flex" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              rowGap: "1vh",
              columnGap: "1vw",
              flexWrap: "wrap",
              justifyContent: "center",
              textAlign: "center",
              width: "95vw",
              // height: "40vw",
              marginTop: "2vh",
              marginLeft: "4vw",
            }}
          >
            <div
              style={{
                display: "inline-flex",
              }}
            >
              <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-200">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  Unread Proposals
                </h5>

                <ul className="w-98 text-med font-bold text-gray-900 bg-white border border-gray-200 rounded-lg">
                  {unreadProposals?.map((proposal) => (
                    <li
                      key={proposal._id}
                      onClick={(e) => {
                        handleProposalClick(e, proposal);
                      }}
                      // style={{}}
                      className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg"
                    >
                      <span className="inline-flex w-3 h-3 me-3 bg-yellow-300 rounded-full"></span>
                      <a href="#">{proposal.companyName}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              style={{
                display: "inline-flex",
              }}
            >
              <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-200">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  Priority Proposals
                </h5>

                <ul className="w-98 text-med font-bold text-gray-900 bg-white border border-gray-200 rounded-lg">
                  {priorityProposals?.map((proposal) => (
                    <li
                      key={proposal._id}
                      onClick={(e) => {
                        handleProposalClick(e, proposal);
                      }}
                      className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg"
                    >
                      <a href="#">
                        {proposal.companyName} - {proposal.availabilityStart}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              style={{
                display: "inline-flex",
                width: "30vw",
              }}
            >
              <PropByCatAccordion
                allProposals={allProposals}
                handleProposalClick={handleProposalClick}
              />
            </div>
          </div>
        </div>

        {currentProposal && (
          <div
            style={{
              display: "inline-flex",
              width: "85vw",
              margin: "25px",
            }}
          >
            <a href="#">
              <svg
                onClick={(e) => {
                  handleProposalClose(e);
                }}
                className="w-6 h-6 text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
            </a>

            <div
              style={{
                backgroundColor: "#1a9988",
              }}
              className="block p-6 bg-white border rounded-lg shadow"
            >
              <div
                style={{
                  display: "inline-flex",
                  // justifyContent: "space-around",
                  alignItems: "baseline",
                }}
              >
                <h1
                  style={{ marginRight: "2vw", color: "ff532f" }}
                  className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl"
                >
                  {currentProposal.companyName}
                </h1>
                <span
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "baseline",
                    // marginLeft: "40px",
                  }}
                >
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    {currentProposal.availabilityStart} -{" "}
                    {currentProposal.availabilityEnd}
                  </h5>

                  <MarkAsReadButton
                    currentProposal={currentProposal}
                    getAllProposals={getAllProposals}
                  />

                  <DeleteProposalModal
                    userInfo={userInfo}
                    currentProposal={currentProposal}
                    setCurrentProposal={setCurrentProposal}
                    deleteProposal={deleteProposal}
                    setDeleteProposal={setDeleteProposal}
                    getAllProposals={getAllProposals}
                  />
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  columnGap: "20px",
                  float: "right",
                  marginTop: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "10px",
                    margin: "10px",
                  }}
                >
                  <svg
                    className="w-6 h-6 text-gray-800"
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

                  <fieldset className="inline-flex max-w-md flex-col gap-4">
                    <legend className="mb-4">Set Proposal Category</legend>
                    <div className="flex items-center gap-2">
                      <Radio
                        id="category"
                        name="category"
                        value="category"
                        defaultChecked
                      />
                      <Label htmlFor="category">No Category</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Radio
                        id="categorySoftwareDevelopment"
                        name="category"
                        value="categorySoftwareDevelopment"
                        onChange={(e) => {
                          handleCategorySoftwareDevelopment(e);
                        }}
                      />
                      <Label htmlFor="categorySoftwareDevelopment">
                        Software Development
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Radio
                        id="categoryDataAnalytics"
                        name="category"
                        value="categoryDataAnalytics"
                        onChange={(e) => {
                          handleCategoryDataAnalytics(e);
                        }}
                      />
                      <Label htmlFor="categoryDataAnalytics">
                        Data Analytics
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Radio
                        id="categoryDigitalMarketing"
                        name="category"
                        value="categoryDigitalMarketing"
                        onChange={(e) => {
                          handleCategoryDigitalMarketing(e);
                        }}
                      />
                      <Label htmlFor="categoryDigitalMarketing">
                        Digital Marketing
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Radio
                        id="categoryUxUi"
                        name="category"
                        value="categoryUxUi"
                        onChange={(e) => {
                          handleCategoryUxUi(e);
                        }}
                      />
                      <Label htmlFor="categoryUxUi">UX/UI</Label>
                    </div>
                    {/* <p>
                      <h6 className="text-xs">
                        <i>Current category is {currentCategory}</i>
                      </h6>
                    </p> */}
                  </fieldset>

                  <fieldset className="inline-flex max-w-md flex-col gap-4">
                    <legend className="mb-4">Set Proposal Status</legend>
                    <div className="flex items-center gap-2">
                      <Radio
                        id="submitted"
                        name="status"
                        value="submitted"
                        defaultChecked
                      />
                      <Label htmlFor="submitted">Submitted</Label>
                    </div>

                    <div className="flex items-center gap-2">
                      <Radio
                        id="approvedStatus"
                        name="status"
                        value="approvedStatus"
                        onChange={(e) => {
                          handleStatusApproved(e);
                        }}
                      />
                      <Label htmlFor="approvedStatus">Approved</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Radio
                        id="deniedStatus"
                        name="status"
                        value="deniedStatus"
                        onChange={(e) => {
                          handleStatusDenied(e);
                        }}
                      />
                      <Label htmlFor="deniedStatus">Denied</Label>
                    </div>
                    <p>
                      <h6 className="text-xs">
                        <i>Current status is {status}</i>
                      </h6>
                    </p>
                  </fieldset>
                </div>
              </div>

              <div
                style={{
                  height: "auto",
                  padding: "40px",
                  backgroundColor: "white",
                }}
              >
                <p className="mb-3 text-xl text-gray-500 md:text-xl">
                  Submitted by: {currentProposalOwnerInfo.firstName}{" "}
                  {currentProposalOwnerInfo.lastName}
                </p>
                <p className="mb-3 text-xl text-gray-500 md:text-xl">
                  Website:{" "}
                  <a
                    href={currentProposal.website}
                    className="font-xl text-blue-600 hover:underline"
                  >
                    {currentProposal.website}
                  </a>
                </p>
                <p className="mb-3 text-xl text-gray-500 md:text-xl">
                  Preferred contact: {currentProposal.contact}
                </p>
                <p className="mb-3 text-xl text-gray-500 md:text-xl">
                  Location: {currentProposalOwnerInfo.city},{" "}
                  {currentProposalOwnerInfo.state}
                </p>
                <br />
                <p className="text-gray-500 md:text-xl">
                  {currentProposal.proposition}
                </p>
                <br />
                <p className="text-gray-500 md:text-xl">
                  Tech: {currentProposal.techRequirements}
                </p>
                <br />
                <p className="text-gray-500 md:text-xl">{projectInProgress}</p>
                <br />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    margin: "20px",
                  }}
                >
                  <Button
                    type="click"
                    onClick={(e) => {
                      handleSaveAllProposalChanges(e);
                    }}
                    style={{
                      display: "inline-flex",
                      backgroundColor: "#ff532f",
                      color: "black",
                    }}
                    className="focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
                  >
                    Save All Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
