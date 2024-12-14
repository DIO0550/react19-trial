import { Outlet } from "react-router";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const workerPromise = async () => {
      const workerModule = await import("./mocks/worker");
      await workerModule.worker.start();
    };

    workerPromise();
  }, []);
  return <Outlet />;
};

export default App;
