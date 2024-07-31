import CTX from "../header/Context";
import { useContext, useState, useEffect } from "react"




export default function proposalStatus () {
    const [state, setState] = useState(null);
    const CONTEXT = useContext(CTX);
    const userInfo = localStorage.getItem("userInfo")
    const owner = userInfo
    console.log("userInfo", userInfo)
    
    useEffect(() => {
        if (!state){
            getUserProposal()
        }
    }, [])

    async function getUserProposal() {
        console.log("test")


    
        const response = await fetch(
            `http://localhost:3000/proposals/displayUserProposal/${owner}`);

            
            const data = await response.json();
            console.log("data", data);
            setState(data)
    }



    return (
        <div>
            {state ?
            <p>
                {state[0].companyName}
            </p> : null}
        <ul>
            

        {state?.map((proposal) => {
            <li
            key={proposal._id}
            >{proposal.companyName}
                {proposal.submittedStatus ?
                    <p>Your proposal has been submitted</p>
                    : proposal.underReviewStatus ?
                    <p>Your proposal is under review</p>
                    : proposal.ongoingStatus ?
                    <p>Your proposal is ongoing</p>
                    : proposal.approvedStatus ?
                    <p>Your proposal is APPROVED!</p>
                    :proposal.deniedStatus ?
                    <p>Your proposal has been DENIED!</p>
                    : null
                }
                </li>
    })}

            </ul>
            <div>
                hello
            </div>
        </div>
    )
    }


