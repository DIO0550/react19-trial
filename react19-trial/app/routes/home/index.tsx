import { memo } from "react";
import { NavLink } from "react-router";

let count = 1;

const Home = memo(() => (
  <div>
    <NavLink to="/action-state" end>
      action-state
    </NavLink>

    <div>{count}</div>
    <button
      onClick={() => {
        count += 1;
      }}
    >
      +1
    </button>
  </div>
));

export default Home;
