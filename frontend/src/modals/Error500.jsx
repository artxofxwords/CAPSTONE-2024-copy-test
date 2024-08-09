/* eslint-disable react/prop-types */
import {Modal, Button} from "flowbite-react";
import { useNavigate } from "react-router-dom";

//!Modal seems to be out of scope for import, consider relocating Modals folder

//enter this code onto any component that contains a function that could throw a 500 error
//at top of page:
//import Error500 from ...modals/Error500

//at top of function:
//const [error500, setError500] = useState(false);
//const [errorMessage, setErrorMessage] = useState();

//after fetch response:
// if (response.status === 500) {
//     setError500(true);
//     setErrorMessage(data);
//   }

//at end of return statement:
//<Error500 error500={error500} setError500={setError500} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />

export default function Error500 ({error500, setError500, errorMessage, setErrorMessage}) {
    const navigate = useNavigate();

    function closeErrorModal () {
        setError500(false);
        setErrorMessage(null);
    }

    return (
        <Modal show={error500} onClose={closeErrorModal}>
            <Modal.Header>ERROR</Modal.Header>
            <Modal.Body><h1 className="text-color-red">
                I&apos;m sorry, there was an error. 
                Details: {errorMessage}
                Please refresh the page and try again.</h1>
                <Button type="click" onClick={()=> {navigate("/")}}>Navigate to Home</Button>
            </Modal.Body>
        </Modal>
    )
}