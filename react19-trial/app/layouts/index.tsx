import { memo } from "react";
import { Outlet } from "react-router";

const Layout = memo(() => (
  <div>
    <div>ヘッダー</div>
    <Outlet />
    <div>フッター</div>
  </div>
));

export default Layout;
