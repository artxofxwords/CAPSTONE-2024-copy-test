import {useState, useEffect} from 'react';
import { Accordion } from 'flowbite-react';

export default function PropByCatAccordion ({allProposals, handleProposalClick}) {
    const [softDevProposals, setSoftDevProposals] = useState([]);
    const [digMarkProposals, setDigMarkroposals] = useState([]);
    const [datAnProposals, setDatAnProposals] = useState([]);
    const [uxUiProposals, setUxUiProposals] = useState([]);
    const [noCategoryProposals, setNoCategoryProposals] = useState([]);

useEffect(() => {
    sortProposalsByCategory(); //rerenders category lists
  }, [allProposals]);

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
                      className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg"
                    >
                      <a href="#">{proposal.companyName}</a>
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
                      className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg"
                    >
                      <a href="#">{proposal.companyName}</a>
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
                      className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg"
                    >
                      <a href="#">{proposal.companyName}</a>
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
                      className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg"
                    >
                      <a href="#">{proposal.companyName}</a>
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
                      className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg"
                    >
                      <a href="#">{proposal.companyName}</a>
                    </li>
                  ))}
                </ul>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
          </>
    )
}