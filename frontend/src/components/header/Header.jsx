import Nav from "./Nav.jsx";
import uprightLogo from "../../assets/PoweredByUpright.png"

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
            <button><a
            href="https://www.uprighted.com/courses"
            target="_blank"
              style={{
                backgroundColor: "#ff532f",
                color: "black",
                border: "0px",
                borderRadius: "8px",
                padding: "2px"
              }}
            > Learn more!
          </a></button>
          </div>

          <div style={{
            display: "flex",
            width:"40vw",
            height: "auto",
            justifyContent: "center",
            alignItems: "center"
          }}>
          <img
            width="400px"
            height="400px"
            src={uprightLogo} alt="uprightLogo"
          >
          </img>
          
        </div>
      </div>
    </>
  );
}
