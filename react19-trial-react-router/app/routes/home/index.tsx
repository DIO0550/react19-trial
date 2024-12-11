import { memo } from "react";
import { NavLink } from "react-router";

console.log("home");
const Home = memo(() => (
  <div>
    <NavLink to="/action-state" end>
      action-state
    </NavLink>
  </div>
));

export default Home;
