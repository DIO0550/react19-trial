import {
  type RouteConfig,
  route,
  index,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/home/index.tsx"),
  layout("layouts/index.tsx", [
    route("use-action-state", "routes/useActionState/index.tsx"),
    route("use-form-status", "routes/useFormStatus/index.tsx"),
    route("use-optimistic", "routes/useOptimistic/index.tsx"),
    route("use-context", "routes/useContext/index.tsx"),
    route("use-promise", "routes/usePromise/index.tsx"),
  ]),
] satisfies RouteConfig;
