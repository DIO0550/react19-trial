import { memo } from "react";
import { NavLink } from "react-router";

const Home = memo(() => (
  <div
    style={{
      margin: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    }}
  >
    <div>
      <NavLink to="/use-action-state" end>
        use-action-state
      </NavLink>
    </div>
    <div>
      <NavLink to="/use-form-status" end>
        use-form-status
      </NavLink>
    </div>
  </div>
));

export default Home;
