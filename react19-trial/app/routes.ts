import {
  type RouteConfig,
  route,
  index,
  layout,
} from "@react-router/dev/routes";

export default [
  index("./routes/home/index.tsx"),
  layout("./layouts/index.tsx", [
    route("action-state", "./routes/actionState/index.tsx"),
  ]),
] satisfies RouteConfig;
