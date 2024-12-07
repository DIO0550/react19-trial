import { memo } from "react";
import { Outlet } from "react-router";

const Root = memo(() => (
  <div>
    <Outlet />
    hoge
  </div>
));

export { Root };
