import { memo } from "react";
import { NavLink } from "react-router";

const Home = memo(() => (
  <div>
    あああああああああ
    <NavLink to="/action-state" end>
      action-state
    </NavLink>
  </div>
));

export default Home;
