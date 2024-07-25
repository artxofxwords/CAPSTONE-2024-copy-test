import LoginHeader from "../header/loginHeader.jsx";
import Categories from "./Categories.jsx";
import Proposal from "./Proposal.jsx";

export default function Dashboard() {



  return (
  <>
    <div
    style={{
      marginLeft: "25px"
    }}>
    <LoginHeader/>
    <Categories/>
    </div>
  </>
  );
}
