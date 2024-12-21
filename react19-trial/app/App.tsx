import { Outlet } from "react-router";
import { useEffect, useState } from "react";

const App = () => {
  const [isStartWoker, setIsStartWorker] = useState(false);

  useEffect(() => {
    const workerPromise = async () => {
      const workerModule = await import("./mocks/worker");
      await workerModule.worker.start();

      setIsStartWorker(true);
    };

    workerPromise();
  }, []);

  if (!isStartWoker) {
    return null;
  }

  return <Outlet />;
};

export default App;
