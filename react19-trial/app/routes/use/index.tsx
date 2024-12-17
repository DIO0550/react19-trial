import { use, useState } from "react";
import ThemeProvider from "./ThemeProvider";
import { ThemeContext } from "./themeContext";

const ContextUse = () => {
  const [isShow, setIsShow] = useState(false);
  if (isShow) {
    const theme = use(ThemeContext);

    return (
      <div>
        <div>theme:{theme.theme}</div>
        <button type="button" onClick={() => setIsShow((cur) => !cur)}>
          変更
        </button>
      </div>
    );
  }

  return (
    <div>
      <button type="button" onClick={() => setIsShow((cur) => !cur)}>
        変更
      </button>
    </div>
  );
};

const Use = () => {
  return (
    <ThemeProvider>
      <div>
        <div>
          <h2>Context</h2>
          <ContextUse />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Use;
