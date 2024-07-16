//import { useNavigate } from "react";

export default function Login() {
//const navigate = useNavigate();

  //in this code at the end, there needs to be an "if" statement that asks if the user isAdmin
  //if isAdmin === true, code should end with navigate("/controlpanel")
  //if isAdmin === false, code should end with navigate("/dashboard")

  return (
    <>
      <div
        style={{
          width: "95vw",
          height: "80vh",
          backgroundColor: "gray",
          color: "white",
          textAlign: "center",
          alignContent: "center",
        }}
      >
        <p>This is where user logs in.</p>
      </div>
    </>
  );
}
