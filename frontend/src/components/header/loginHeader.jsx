/* eslint-disable react-hooks/exhaustive-deps */
import Nav from "./Nav.jsx";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

export default function LoginHeader() {
  const navigateProp = useNavigate();
  const yourJwtToken = localStorage.getItem("jwtToken");
  const decoded = jwtDecode(yourJwtToken);

  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    setPersistingCurrentUserObject();
  }, []);

  async function setPersistingCurrentUserObject() {
    const response = await fetch(`http://localhost:3000/users/${decoded._id}`);

    const data = await response.json();
    console.log("Persistent user data:", data);

    setUserInfo(data);
  }

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        width: "100vw",
      }}
    >
      <Nav />

      <div
        style={{
          display: "inline-flex",
          justifyContent: "center",
          flexDirection: "row",
          backgroundColor: "#1A9988",
          // width: "98vw",
          height: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            // width: "90vw",
            height: "auto",
            justifyContent: "center",
          }}
        >
          <div>
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // marginTop: "25%",
                // marginRight: "0%",
                color: "white",
                // padding: "20px 250px",
                // width: "100%",
                height: "auto",
                fontSize: "3em",
                maxWidth: "500%",
              }}
            >
              Welcome {userInfo.firstName}!
            </h1>
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "5vh",
                color: "white",
              }}
            >
              Click the button below to submit a proposal or check the status of your proposal(s)!
            </p>
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5%",
                marginBottom: "5%",
              }}
            >
              <button
                type="click"
                onClick={() => navigateProp("/Proposal")}
                style={{
                  display: "flex",
                  backgroundColor: "#ff532f",
                  color: "white",
                  borderRadius: "8px",
                  padding: "5px",
                }}
              >
                Submit a Proposal / Check on my Proposal
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
