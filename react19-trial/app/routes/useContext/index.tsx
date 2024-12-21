import { use, useState } from "react";
import ThemeProvider from "./ThemeProvider";
import { Theme, ThemeContext, useThemeContext } from "./themeContext";

const ContextUse = () => {
  const [isShow, setIsShow] = useState(false);
  const context = useThemeContext();
  const changeThemeByUseContext = () => {
    if (context.theme === Theme.light) {
      context.setTheme(Theme.dark);

      return;
    }

    context.setTheme(Theme.light);
  };
  if (isShow) {
    // if文のブロック内で呼び出せる
    const theme = use(ThemeContext);

    const changeThemeByUse = () => {
      if (theme.theme === Theme.light) {
        theme.setTheme(Theme.dark);

        return;
      }

      theme.setTheme(Theme.light);
    };

    return (
      <div>
        {/* ここのプロバイダーは無視される */}
        <ThemeProvider>
          <div>useContextで取得: {context.theme}</div>
          <div>useで取得(if文内): {theme.theme}</div>
          <button type="button" onClick={() => setIsShow((cur) => !cur)}>
            表示変更
          </button>
          <button type="button" onClick={changeThemeByUseContext}>
            Theme変更（useContext）
          </button>
          <button type="button" onClick={changeThemeByUse}>
            Theme変更（use）
          </button>
        </ThemeProvider>
      </div>
    );
  }

  return (
    <div>
      <div>useContextで取得: {context.theme}</div>
      <button type="button" onClick={() => setIsShow((cur) => !cur)}>
        表示変更
      </button>
      <button type="button" onClick={changeThemeByUseContext}>
        Theme変更（useContext）
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
