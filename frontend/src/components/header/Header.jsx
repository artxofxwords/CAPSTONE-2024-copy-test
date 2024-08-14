import Nav from "./Nav.jsx";
import { Button } from "flowbite-react";
import uprightLogo from "../../assets/PoweredByUpright4.png";

export default function Header() {
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
      }}
    >
      <Nav />
      <div
        style={{
          display: "inline-flex",
          justifyContent: "center",
          flexDirection: "row",
          backgroundColor: "#1b3b50",
          height: "auto",
          paddingTop: "25px",
          paddingBottom: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "3vh",
            paddingLeft: "10px",
            width: "60vw",
          }}
        >
          <h1
            style={{
              color: "white",
              textAlign: "center",
              fontSize: "2em",
            }}
          >
            Apply to be considered for a partnership, at no cost to you, with
            our excited and capable Upright learners!
          </h1>
          <p
            style={{
              color: "white",
              fontSize: "1.2em",
            }}
          >
            Register to submit and track your proposal status. Submissions will
            be reviewed by our team. Upon approval you&apos;ll be assigned a
            cohort and a team within that cohort who you&apos;ll meet with to
            discuss your vision. You&apos;ll work closely with your team for a
            month long capstone to bring your idea to life!
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              size="xs"
              style={{
                display: "inline-flex",
                backgroundColor: "#ff532f",
                color: "#ddd5d0",
                borderRadius: "8px",
                padding: "3px",
                marginTop: "3px",
              }}
            >
              <a href="https://www.uprighted.com/courses" target="_blank">
                {" "}
                Learn more!
              </a>
            </Button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: "40vw",
            height: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            width="300px"
            height="300px"
            src={uprightLogo}
            alt="uprightLogo"
          ></img>
        </div>
      </div>
    </div>
  );
}
