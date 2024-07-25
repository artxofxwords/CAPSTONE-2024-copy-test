import Nav from "./Nav.jsx";
import {Button} from "flowbite-react";
import {customTheme} from "../../flowbiteCustom/Flowbite.js";

export default function Header() {
    
  return (
    <>
    <Nav />

      <div
        style={{
        display: "inline-flex",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#25394f",
        height: "auto",
        padding: "25px"
        }}
      >

          <div style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "3vh",
            width: "60vw"
          }}>
            
            <h1
              style={{
                color: "white",
                textAlign: "center",
                fontSize: "30px"
              }}
            >
              Apply to be considered for a partnership, at no cost to you, with our excited and capable Upright learners!
            </h1>
            <p
              style={{
                color: "white",
                fontSize: "18px"
              }}
            >
              Register to submit and track your proposal status. Submissions will be reviewed by our team. Upon approval you&apos;ll be assigned a cohort and 
              a team within that cohort who you&apos;ll meet with to discuss your vision. You&apos;ll work closely with your team for a month long capstone to bring your 
              idea to life!
            </p>
            <div style={{display: "flex", justifyContent: "center"}}>
            <Button theme={customTheme} color="primary"><a
            href="https://www.uprighted.com/courses"
            target="_blank"
            >
              Learn more!
            </a></Button></div>
          </div>

          <div style={{
            display: "flex",
            width:"40vw",
            height: "auto",
            justifyContent: "center",
            alignItems: "center"
          }}>
          <img
            width="300px"
            height="200px"
            src="https://cdn.prod.website-files.com/64921323294d7b037da1a52c/649b14c49b4e1c2fd060f3f2_Upright-logo.svg"
          >
          </img>
          
        </div>
      </div>
    </>
  );
}
