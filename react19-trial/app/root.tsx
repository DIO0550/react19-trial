import { memo } from "react";
import { Outlet } from "react-router";

const Root = memo(() => (
  <html>
    <head>
      <meta charSet="UTF-8" />
    </head>
    <body>
      <div>
        <Outlet />
      </div>
    </body>
  </html>
));

export default Root;
