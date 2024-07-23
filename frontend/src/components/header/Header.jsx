import Nav from "./Nav.jsx";

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
        width: "98vw",
        height: "50vh",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "90vw",
            height: "auto"
          }}
        >
          <div style={{
            alignContent: "center",
            textAlign: "center",
            width: "50vw"
          }}>
            <h1
              style={{
                color: "white",
                fontSize: "30px",
                paddingBottom: "15px",
              }}
            >
              Apply to be considered for a partnership, at no cost to you, with our exited and capable Upright learners!
            </h1>
            <p
              style={{
                color: "white",
                fontSize: "18px",
                marginBottom: "14px"
              }}
            >
              Register to submit and track your proposal status. Submissions will be reviewed by our team. Upon approval you'll be assigned a cohort and 
              a team within that cohort who you'll meet with to discuss your vision. You'll work closely with your team for a month long capstone to bring your 
              idea to life!
            </p>
            <button><a
            href="https://www.uprighted.com/courses"
            target="_blank"
              style={{
                backgroundColor: "#ff532f",
                color: "black",
                border: "0px",
                borderRadius: "4px",
                padding: "2px"
              }}
            >
              Learn more!
            </a></button>
          </div>
          <div style={{
            display: "flex",
            width:"50vw",
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
      </div>
    </>
  );
}
