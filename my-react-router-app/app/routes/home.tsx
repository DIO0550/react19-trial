// import type { Route } from "./+types/home";
// import { Welcome } from "../welcome/welcome";

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "New React Router App" },
//     { name: "description", content: "Welcome to React Router!" },
//   ];
// }

// export default function Home() {
//   return <Welcome />;
// }

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
