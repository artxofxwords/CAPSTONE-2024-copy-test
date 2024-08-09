/* eslint-disable react/prop-types */
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function EditProposalForm({
  thisProposal,
  updateProposal,
  setUpdateProposal,
}) {
  const yourJwtToken = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(yourJwtToken);

  const proposalToEdit = thisProposal;
  console.log("proposal to edit: ", proposalToEdit);

  const [companyName, setCompanyName] = useState();
  const [website, setWebsite] = useState();
  const [projectStarted, setProjectStarted] = useState(false);
  const [proposition, setProposition] = useState();
  const [techRequirements, setTechRequirements] = useState();
  const [availabilityStart, setAvailabilityStart] = useState();
  const [availabilityEnd, setAvailabilityEnd] = useState();
  const [contact, setContact] = useState();


  async function handleUpdateProposal(e) {
    e.preventDefault();

    const body = {
      companyName: companyName,
      website: website,
      projectStarted: projectStarted,
      proposition: proposition,
      techRequirements: techRequirements,
      availabilityStart: availabilityStart,
      availabilityEnd: availabilityEnd,
      contact: contact,
      owner: decoded._id,
      updated: true
    };

    const response = await fetch(
      `http://localhost:3000/proposals/updateProposal/${proposalToEdit._id}`,
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
    console.log("Proposal updated:", data);

    setUpdateProposal(false);
  }

  return (
    <>
      <Modal
        show={updateProposal}
        onClose={() => {
          setUpdateProposal(false);
        }}
        style={{
            height:"98vh"
        }}
      >
        <Modal.Header>Edit {proposalToEdit.companyName}</Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "5px",
              overflow: "auto",
            }}
          >
            <form
              onSubmit={(e) => {
                handleUpdateProposal(e);
              }}
            >
                <div style={{display:"block"}}>
              Company Name{" "}
              <input
                defaultValue={proposalToEdit.companyName}
                value={companyName}
                onChange={(e)=>{setCompanyName(e.target.value)}}
                id="companyName"
                style={{ display: "inline-flex" }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              /></div>
              <div style={{display:"block"}}>Website{" "}
              <input
                defaultValue={proposalToEdit.website}
                value={website}
                onChange={(e)=>{setWebsite(e.target.value)}}
                id="website"
                style={{ display: "inline-flex" }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              /></div>
              <div style={{display:"block"}}>Project is Started (true/false){" "}
              <input
                defaultValue={proposalToEdit.projectStarted}
                value={projectStarted}
                onChange={(e)=>{setProjectStarted(e.target.value)}}
                id="projectStarted"
                style={{ display: "inline-flex" }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              /></div>
              <div style={{display:"block"}}>Proposition{" "}
              <input
                defaultValue={proposalToEdit.proposition}
                value={proposition}
                onChange={(e)=>{setProposition(e.target.value)}}
                id="proposition"
                style={{ display: "inline-flex" }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              /></div>
              <div style={{display:"block"}}>Tech Requirements{" "}
              <input
                defaultValue={proposalToEdit.techRequirements}
                value={techRequirements}
                onChange={(e)=>{setTechRequirements(e.target.value)}}
                id="techRequirements"
                style={{ display: "inline-flex" }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              /></div>
              <div style={{display:"block"}}>Availability Start{" "}
              <input
                defaultValue={proposalToEdit.availabilityStart}
                value={availabilityStart}
                onChange={(e)=>{setAvailabilityStart(e.target.value)}}
                id="availabilityStart"
                style={{ display: "inline-flex" }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              /></div>
              <div style={{display:"block"}}>Availability End{" "}
              <input
                defaultValue={proposalToEdit.availabilityEnd}
                value={availabilityEnd}
                onChange={(e)=>{setAvailabilityEnd(e.target.value)}}
                id="availabilityEnd"
                style={{ display: "inline-flex" }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              /></div>
              <div style={{display:"block"}}>Contact{" "}
              <input
                defaultValue={proposalToEdit.contact}
                value={contact}
                onChange={(e)=>{setContact(e.target.value)}}
                id="contact"
                style={{ display: "inline-flex" }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              /></div>
              <Button
                type="submit"
                style={{
                  display: "inline-flex",
                  backgroundColor: "#ff532f",
                  color: "black",
                }}
                className="focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
              >
                Submit
              </Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
