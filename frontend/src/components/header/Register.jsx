import NewUserForm from "../../modals/NewUserForm";

export default function Register(isLoggedIn) {
  let newUserFormDisplay;

  if (isLoggedIn) {
    newUserFormDisplay = "none";
  } else {
    newUserFormDisplay = "inline";
  }

  return (
    <>
      <div
        style={{
          width: "45vw",
          height: "80vh",
          margin: "15px",
        }}
      >
        <div
          style={{
            display: { newUserFormDisplay },
          }}
        >
          <NewUserForm />
        </div>
        </div>
    </>
  );
}
