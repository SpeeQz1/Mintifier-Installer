import "@src/styles/global.scss";
import styles from "./App.module.scss";

import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { LazyStore } from "@tauri-apps/plugin-store";
import { SvgIcons } from "@src/components/index";
import { InstallerSidebar, InstallerContents } from "@src/components/index";

const App = () => {
  const createNewWindow = async () => {
    try {
      const store = new LazyStore("settings.json");
      await store.set("some-key", "This is a value");
      await store.save();

      const webview = new WebviewWindow(`testing`, {
        url: "/testing",
        title: "Testing",
        width: 1024,
        height: 768,
        decorations: true,
        center: false,
        resizable: true,
      });

      await webview.once("tauri://created", () => {
        console.log("Window successfully created");
      });

      webview.once("tauri://error", (e) => {
        console.error("Error creating window:", e);
      });
    } catch (error) {
      console.error("Error creating window:", error);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <nav className={styles.nav}>
              <button>About</button>
              <div className={styles.dividerVertical}></div>
              <button>Help</button>
              <div className={styles.dividerVertical}></div>
              <button>Settings</button>
              <button onClick={createNewWindow}>Testing</button>
            </nav>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.headerSlopes}>
              <div className={styles.slope1}></div>
              <div className={styles.slope2}></div>
              <div className={styles.slope3}></div>
            </div>
            <div className={styles.logoText}>Mintifier Installer</div>
            <img src={SvgIcons.URLs.AppLogo} className={styles.appLogoSVG} />
          </div>
        </div>
        <div className={styles.headerGradient}></div>
      </header>

      <main className={styles.main}>
        <InstallerSidebar />
        <InstallerContents />
      </main>
    </div>
  );
};

export default App;
