/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Accordion } from "flowbite-react";

export default function PropByCatAccordion({ handleProposalClick }) {
  const [allProposals, setAllProposals] = useState([]);
  const [softDevProposals, setSoftDevProposals] = useState([]);
  const [digMarkProposals, setDigMarkroposals] = useState([]);
  const [datAnProposals, setDatAnProposals] = useState([]);
  const [uxUiProposals, setUxUiProposals] = useState([]);
  const [noCategoryProposals, setNoCategoryProposals] = useState([]);

  useEffect(() => {
    getAllProposals(); //stays on top of changing proposals list
  }, []);

  useEffect(() => {
    sortProposalsByCategory(); //rerenders category lists
  }, [allProposals]);

  //fetches all proposals
  async function getAllProposals() {
    const response = await fetch(
      `http://localhost:3000/proposals/displayAllProposal`
    );

    const data = await response.json();
    setAllProposals(data);
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
        if (item.category === "softwareDevelopment") {
          softDev.push(item);
        } else if (item.category === "digitalMarketing") {
          digMark.push(item);
        } else if (item.category === "dataAnalytics") {
          datAn.push(item);
        } else if (item.category === "uxUi") {
          uxUi.push(item);
        } else if (item.category === "noCategory") {
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

  return (
    <>
      <Accordion>
        <Accordion.Panel>
          <Accordion.Title>
            <span className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              Software Development
            </span>
          </Accordion.Title>
          <Accordion.Content>
            <ul className="w-98 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
              {softDevProposals?.map((proposal) => (
                <li
                  key={proposal._id}
                  onClick={(e) => {
                    handleProposalClick(e, proposal);
                  }}
                  className={`w-full px-4 py-2 border-b border-gray-200 rounded-t-lg ${
                    proposal.status === "submitted"
                    ? `bg-yellow-300`
                    : proposal.status === "approved"
                    ? `bg-green-300`
                    : proposal.status === "denied"
                    ? `bg-red-300`
                    : `bg-white`
                  }`}
                >

                  <a href="#">{proposal.companyName}</a>{" "}
                  <span>
                    <i>{proposal.status}</i>
                  </span>
                </li>
              ))}
            </ul>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            <span className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              Digital Marketing
            </span>
          </Accordion.Title>
          <Accordion.Content>
            <ul className="w-98 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
              {digMarkProposals?.map((proposal) => (
                <li
                  key={proposal._id}
                  onClick={(e) => {
                    handleProposalClick(e, proposal);
                  }}
                  className={`w-full px-4 py-2 border-b border-gray-200 rounded-t-lg ${
                    proposal.status === "submitted"
                    ? `bg-yellow-300`
                    : proposal.status === "approved"
                    ? `bg-green-300`
                    : proposal.status === "denied"
                    ? `bg-red-300`
                    : `bg-white`
                  }`}
                >
                  <a href="#">{proposal.companyName}</a>{" "}
                  <span>
                    <i>{proposal.status}</i>
                  </span>
                </li>
              ))}
            </ul>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            <span className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              Data Analytics
            </span>
          </Accordion.Title>
          <Accordion.Content>
            <ul className="w-98 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
              {datAnProposals?.map((proposal) => (
                <li
                  key={proposal._id}
                  onClick={(e) => {
                    handleProposalClick(e, proposal);
                  }}
                  className={`w-full px-4 py-2 border-b border-gray-200 rounded-t-lg ${
                    proposal.status === "submitted"
                    ? `bg-yellow-300`
                    : proposal.status === "approved"
                    ? `bg-green-300`
                    : proposal.status === "denied"
                    ? `bg-red-300`
                    : `bg-white`
                  }`}
                >
                  <a href="#">{proposal.companyName}</a>{" "}
                  <span>
                    <i>{proposal.status}</i>
                  </span>
                </li>
              ))}
            </ul>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            <span className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              UX/UI
            </span>
          </Accordion.Title>
          <Accordion.Content>
            <ul className="w-98 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
              {uxUiProposals?.map((proposal) => (
                <li
                  key={proposal._id}
                  onClick={(e) => {
                    handleProposalClick(e, proposal);
                  }}
                  className={`w-full px-4 py-2 border-b border-gray-200 rounded-t-lg ${
                    proposal.status === "submitted"
                    ? `bg-yellow-300`
                    : proposal.status === "approved"
                    ? `bg-green-300`
                    : proposal.status === "denied"
                    ? `bg-red-300`
                    : `bg-white`
                  }`}
                >
                  <a href="#">{proposal.companyName}</a>{" "}
                  <span>
                    <i>{proposal.status}</i>
                  </span>
                </li>
              ))}
            </ul>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            <span className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              No Category Assigned
            </span>
          </Accordion.Title>
          <Accordion.Content>
            <ul className="w-98 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
              {noCategoryProposals?.map((proposal) => (
                <li
                  key={proposal._id}
                  onClick={(e) => {
                    handleProposalClick(e, proposal);
                  }}
                  className={`w-full px-4 py-2 border-b border-gray-200 rounded-t-lg ${
                    proposal.status === "submitted"
                    ? `bg-yellow-300`
                    : proposal.status === "approved"
                    ? `bg-green-300`
                    : proposal.status === "denied"
                    ? `bg-red-300`
                    : `bg-white`
                  }`}
                >
                  <a href="#">{proposal.companyName}</a>{" "}
                  <span>
                    <i>{proposal.status}</i>
                  </span>
                </li>
              ))}
            </ul>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </>
  );
}
