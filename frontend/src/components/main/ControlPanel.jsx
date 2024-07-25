import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Flowbite, Button, Label, Radio, Modal, Accordion } from "flowbite-react";
import { customTheme } from "../../flowbiteCustom/Flowbite";
import CTX from "../header/Context"; //holds user and proposal info for site

//set variables for conditional rendering
let readIcon;
let deleteIcon;

export default function ControlPanel() {
  const navigate = useNavigate();
  const CONTEXT = useContext(CTX);
  const yourJwtToken = localStorage.getItem("jwtToken");

  //useState variables
  const [allProposals, setAllProposals] = useState([]); //list of all proposals from database
  const [unreadProposals, setUnreadProposals] = useState([]); //list of all unread proposals based on "read = true or false"
  const [priorityProposals, setPriorityProposals] = useState([]); //list of top five proposals sorted by sponser availability date
  const [softDevProposals, setSoftDevProposals] = useState([]);
  const [digMarkProposals, setDigMarkroposals] = useState([]);
  const [datAnProposals, setDatAnProposals] = useState([]);
  const [uxUiProposals, setUxUiProposals] = useState([]);
  const [noCategoryProposals, setNoCategoryProposals] = useState([]);

  const [currentProposal, setCurrentProposal] = useState(); //clicked proposal, fetches by id to display details
  const [currentProposalOwnerInfo, setCurrentProposalOwnerInfo] = useState([]); //sponsor info for selected proposal

  const [categorySoftDev, setCategorySoftDev] = useState(false);
  const [categoryDigMark, setCategoryDigMark] = useState(false);
  const [categoryDatAn, setCategoryDatAn] = useState(false);
  const [categoryUxUi, setCategoryUxUi] = useState(false);
  const [categoryAssigned, setCategoryAssigned] = useState(false);

  const [readProposal, setReadProposal] = useState(false); //mark proposal as read once reviewed
  const [deleteProposal, setDeleteProposal] = useState(false); //shows delete proposal popup to confirm delete

  const [statusUnderReview, setStatusUnderReview] = useState(false); //mark under review once proposal is opened
  const [statusOngoing, setStatusOngoing] = useState(false); //mark ongoing once contact made
  const [statusApproved, setStatusApproved] = useState(false); //mark approved once ready to assign to cohort
  const [statusDenied, setStatusDenied] = useState(false); //mark denied to remove from view

  //useEffect functions
  useEffect(() => {
    getAllProposals(); //stays on top of changing proposals list
  }, []);

  useEffect(() => {
    allUnreadProposals(); //rerenders unread list
    sortProposalsByPriority(); //rerenders priority list
    sortProposalsByCategory(); //rerenders category lists
  }, [allProposals]);

  useEffect(() => {
    if (currentProposal) {
      getOwnerInfo(); //renders sponsor info who submitted selected proposal
    }
  }, [currentProposal]);

  //functions
  //fetches all proposals
  async function getAllProposals() {
    console.log("CONTEXT.userData:", CONTEXT.userData);

    const response = await fetch(
      "http://localhost:3000/proposals/displayAllProposal"
    );

    const data = await response.json();
    console.log("all proposals fetched: ", data);
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
      console.log("unread proposals list: ", unreadProposalsList);
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

    console.log("sorted priority proposals: ", sortedProposals);
    sortedProposals.splice(5);

    setPriorityProposals(sortedProposals);
  }

  //display proposals by category
  async function sortProposalsByCategory() {
    const softDev = [];
    const digMark = [];
    const datAn = [];
    const uxUi = [];
    const noCategory = [];

    try {
      for (const item of allProposals) {
        if (item.categorySoftwareDevelopment === true) {
          softDev.push(item);
        } else if (item.categoryDigitalMarketing === true) {
          digMark.push(item);
        } else if (item.categoryDataAnalytics === true) {
          datAn.push(item);
        } else if (item.categoryUxUi === true) {
          uxUi.push(item);
        } else if (item.category === false) {
          noCategory.push(item);
        }
      }

      setSoftDevProposals(softDev);
      setDigMarkroposals(digMark);
      setDatAnProposals(datAn);
      setUxUiProposals(uxUi);
      setNoCategoryProposals(noCategory);
    } catch (err) {
      console.log(err);
    }
  }

  //onClick of any project in various lists, proposal appears in 'Project Detail View' with project details
  async function handleProposalClick(e, proposal) {
    e.preventDefault();

    setDeleteProposal(false);
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
  async function getOwnerInfo() {
    const _id = currentProposal.owner;
    console.log("owner id: ", currentProposal.owner);

    const response = await fetch(`http://localhost:3000/users/${_id}`);

    const data = await response.json();
    console.log("owner info: ", data);

    setCurrentProposalOwnerInfo(data);
  }

  //set button for current proposal with closed/open envelope icon to 'mark as read/unread'
  if (readProposal === false) {
    readIcon = (
      <button
        type="click"
        style={{
          marginLeft: "25px",
        }}
        onClick={(e) => {
          handleMarkAsReadProposal(e);
        }}
      >
        <svg
          className="inline w-6 h-6 text-gray-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="orange"
            strokeLinecap="round"
            strokeWidth="2"
            d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
          />
        </svg>
        Mark As Read
      </button>
    );
  }

  //handles user click on mark proposal as read
  async function handleMarkAsReadProposal(e) {
    e.preventDefault();

    let body;

    if (readProposal) {
      body = {
        _id: CONTEXT.userData._id,
        isAdmin: CONTEXT.userData.isAdmin,
        read: false,
      };
    } else {
      body = {
        _id: CONTEXT.userData._id,
        isAdmin: CONTEXT.userData.isAdmin,
        read: true,
      };
    }

    const response = await fetch(
      `http://localhost:3000/proposals/updateProposal/${currentProposal._id}`,
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${yourJwtToken}`,
        },
      }
    );

    const data = await response.json();

    setReadProposal(!readProposal);
    console.log("Proposal marked as read.", data);

    readIcon = (
      <button
        type="click"
        style={{
          marginLeft: "25px",
        }}
        onClick={(e) => {
          handleMarkAsReadProposal(e);
        }}
      >
        <svg
          className="inline w-6 h-6 text-gray-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="orange"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8m18 0-8.029-4.46a2 2 0 0 0-1.942 0L3 8m18 0-9 6.5L3 8"
          />
        </svg>
        Mark As Unread
      </button>
    );

    getAllProposals();
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
  function handleStatusUnderReview(e) {
    e.preventDefault();

    setStatusUnderReview(!statusUnderReview);
  }

  function handleStatusOngoing(e) {
    e.preventDefault();

    setStatusOngoing(!statusOngoing);
  }

  function handleStatusApproved(e) {
    e.preventDefault();

    setStatusApproved(!statusApproved);
  }

  function handleStatusDenied(e) {
    e.preventDefault();

    setStatusDenied(!statusDenied);
  }

  //handles admin saving all state variables to database
  async function handleSaveAllProposalChanges(e) {
    e.preventDefault();

    const body = {
      _id: CONTEXT.userData._id,
      isAdmin: CONTEXT.userData.isAdmin,
      read: readProposal,
      category: categoryAssigned,
      categorySoftwareDevelopment: categorySoftDev,
      categoryDigitalMarketing: categoryDigMark,
      categoryDataAnalytics: categoryDatAn,
      categoryUxUi: categoryUxUi,
      approvedStatus: statusApproved,
      underReviewStatus: statusUnderReview,
      deniedStatus: statusDenied,
      ongoingStatus: statusOngoing,
    };

    const response = await fetch(
      `http://localhost:3000/proposals/updateProposal/${currentProposal._id}`,
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${yourJwtToken}`,
        },
      }
    );

    const data = await response.json();
    console.log("updated proposal status: ", data);

    getAllProposals();
  }

  //set button for current proposal with delete icon to 'delete proposal'
  if (deleteProposal === false) {
    deleteIcon = (
      <button
        type="click"
        style={{
          marginLeft: "10px",
        }}
        onClick={(e) => {
          handleClickProposalDelete(e);
        }}
      >
        <svg
          className="inline w-6 h-6 text-gray-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="orange"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
            clipRule="evenodd"
          />
        </svg>
        Delete Proposal
      </button>
    );
  } else {
    deleteIcon = (
      <div>
        <Modal
          show={deleteProposal}
          onClose={() => setDeleteProposal(false)}
        >
          <Modal.Header>Confirm Proposal Deletion</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500">
                Are you sure you want to delete this{" "}
                {currentProposal.companyName} proposal?
              </p>
              <p className="text-base leading-relaxed text-gray-500">
                Action cannot be undone. This will delete the proposal
                completely from the database.
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              theme={customTheme}
              color="primary"
              onClick={(e) => {
                handleDeleteProposal(e);
              }}
            >
              Yes, I&apos;m sure. Delete proposal.
            </Button>
            <Button
              color="gray"
              onClick={(e) => {
                handleClickProposalDelete(e);
              }}
            >
              No, cancel deletion.
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  //admin clicks on delete button for current proposal
  function handleClickProposalDelete(e) {
    e.preventDefault();

    setDeleteProposal(!deleteProposal);
  }

  //handles admin saving all state variables to database
  async function handleDeleteProposal(e) {
    e.preventDefault();

    const body = {
      _id: CONTEXT.userData._id,
      isAdmin: CONTEXT.userData.isAdmin,
    };

    const response = await fetch(
      `http://localhost:3000/proposals/updateProposal/${currentProposal._id}`,
      {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${yourJwtToken}`,
        },
      }
    );

    const data = await response.json();
    console.log("deleted proposal status: ", data);

    getAllProposals();
  }

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div
        style={{
          display: "flex-block",
          margin: "2vw",
        }}
      >
        <h1
          style={{
            fontSize: "60px",
          }}
        >
          Welcome, {CONTEXT.userData.firstName}!
        </h1>
        <h4>
          <button
            type="click"
            onClick={() => {
              navigate("/proposal");
            }}
            style={{ color: "white" }}
          >
            Submit a Proposal
          </button>
        </h4>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          rowGap: "1vh",
          columnGap: "1vw",
          flexWrap: "wrap",
          textAlign: "center",
          width: "95vw",
          height: "40vw",
          marginTop: "2vh",
          marginLeft: "4vw",
        }}
      >
        <div
          style={{
            display: "inline",
          }}
        >
          <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-blue-200">
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
                  className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg"
                >
                  <span className="inline-flex w-3 h-3 me-3 bg-yellow-300 rounded-full"></span>
                  <a href="#">{proposal.companyName}</a>
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
          <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-blue-200">
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
                  <a href="#">{proposal.companyName} - {proposal.availabilityStart}</a>
                </li>
              ))}
            </ul>
          </a>
        </div>

<div style={{
  width: "30vw"
}}>
          <Accordion>
      <Accordion.Panel>
        <Accordion.Title><h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Software Development</h5></Accordion.Title>
        <Accordion.Content>
        <ul className="w-98 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
              {softDevProposals?.map((proposal) => (
                <li
                  key={proposal._id}
                  onClick={(e) => {
                    handleProposalClick(e, proposal);
                  }}
                  className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg"
                >
                  <a href="#">{proposal.companyName}</a>
                </li>
              ))}
            </ul>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title><h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Digital Marketing</h5></Accordion.Title>
        <Accordion.Content>
        <ul className="w-98 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
              {digMarkProposals?.map((proposal) => (
                <li
                  key={proposal._id}
                  onClick={(e) => {
                    handleProposalClick(e, proposal);
                  }}
                  className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg"
                >
                  <a href="#">{proposal.companyName}</a>
                </li>
              ))}
            </ul>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title><h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Data Analytics</h5></Accordion.Title>
        <Accordion.Content>
        <ul className="w-98 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
              {datAnProposals?.map((proposal) => (
                <li
                  key={proposal._id}
                  onClick={(e) => {
                    handleProposalClick(e, proposal);
                  }}
                  className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg"
                >
                  <a href="#">{proposal.companyName}</a>
                </li>
              ))}
            </ul>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title><h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">UX/UI</h5></Accordion.Title>
        <Accordion.Content>
        <ul className="w-98 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
              {uxUiProposals?.map((proposal) => (
                <li
                  key={proposal._id}
                  onClick={(e) => {
                    handleProposalClick(e, proposal);
                  }}
                  className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg"
                >
                  <a href="#">{proposal.companyName}</a>
                </li>
              ))}
            </ul>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title><h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">No Category Assigned</h5></Accordion.Title>
        <Accordion.Content>
        <ul className="w-98 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
              {noCategoryProposals?.map((proposal) => (
                <li
                  key={proposal._id}
                  onClick={(e) => {
                    handleProposalClick(e, proposal);
                  }}
                  className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg"
                >
                  <a href="#">{proposal.companyName}</a>
                </li>
              ))}
            </ul>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
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
          <div
            className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-blue-200"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                {currentProposal.companyName}
              </h1>
              <span
                style={{
                  display: "flex",
                  marginLeft: "40px",
                }}
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {currentProposal.availabilityStart} -{" "}
                  {currentProposal.availabilityEnd}
                </h5>

                {readIcon}

                {deleteIcon}
              </span>
            </div>

            <div
              style={{
                display: "inline-flex",
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
                  margin: "10px"
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

                <fieldset className="flex max-w-md flex-col gap-4">
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
                </fieldset>

                <fieldset className="flex max-w-md flex-col gap-4">
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
                      id="underReviewStatus"
                      name="status"
                      value="underReviewStatus"
                      onChange={(e) => {
                        handleStatusUnderReview(e);
                      }}
                    />
                    <Label htmlFor="underReviewStatus">Under Review</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="ongoingStatus"
                      name="status"
                      value="ongoingStatus"
                      onChange={(e) => {
                        handleStatusOngoing(e);
                      }}
                    />
                    <Label htmlFor="ongoingStatus">
                      Ongoing - contact made
                    </Label>
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
                </fieldset>
              </div>
            </div>

            <div
              style={{
                height: "auto",
                padding: "40px",
                backgroundColor: "white"
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
              </p><br/>
              <p className="text-gray-500 md:text-xl">
                {currentProposal.proposition}
              </p><br/>
              <p className="text-gray-500 md:text-xl">
                Tech: {currentProposal.techRequirements}
              </p><br/>
              <p className="text-gray-500 md:text-xl">
                {projectInProgress}
              </p><br/>

            <div
              style={{
                justifyContent: "right",
                margin: "20px"
              }}
            >
              <Button
                type="click"
                onClick={(e) => {
                  handleSaveAllProposalChanges(e);
                }}
                theme={customTheme}
                color="primary"
              >
                Save All Changes
              </Button>
            </div>

            </div>
          </div>
        </div>
      )}
    </Flowbite>
  );
}
