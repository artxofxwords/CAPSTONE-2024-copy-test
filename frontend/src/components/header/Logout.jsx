import {useNavigate} from 'react-router-dom';
import {Button} from 'flowbite-react';

export default function Logout () {
    const navigate = useNavigate();

    function handleLogout () {
        localStorage.removeItem("jwtToken");

        navigate("/");
    }


    return (
        <Button className="bg-red-500" type="click" onClick={() => {handleLogout()}}>
            Logout
          </Button>


    )
}