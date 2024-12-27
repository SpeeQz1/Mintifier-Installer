import { useState } from "react";
import styles from "@src/components/App/App.module.scss";
import SvgIcons from "@src/components/SvgIcons/SvgIcons";
import "@src/styles/global.scss";

interface Category {
  id: string;
  title: string;
}

interface Section {
  id: string;
  categoryId: string;
  title: string;
}

interface Application {
  id: string;
  name: string;
  categoryId: string;
  sectionId: string;
  formats?: string[];
  isInstalled?: boolean;
}

const App = () => {
  const [categories] = useState<Category[]>([
    { id: "3d-design", title: "3D Design" },
    { id: "video-editing", title: "Video Editing" },
    { id: "utilities", title: "Utilities" },
    { id: "drawing", title: "Drawing" },
    { id: "engineering", title: "Engineering" },
    { id: "animation", title: "Animation" },
    { id: "rendering", title: "Rendering" },
    { id: "texturing", title: "Texturing" },
    { id: "modeling", title: "Modeling" },
    { id: "rigging", title: "Rigging" }
  ]);

  const [sections] = useState<Section[]>([
    { id: "mesh-modeling", categoryId: "3d-design", title: "Mesh Modeling" },
    { id: "sculpting", categoryId: "3d-design", title: "Sculpting" },
    { id: "video-tools", categoryId: "video-editing", title: "Video Tools" },
    { id: "animation-tools", categoryId: "animation", title: "Animation Tools" }
  ]);

  const [applications] = useState<Application[]>([
    {
      id: "meshlab-1",
      name: "MeshLab",
      categoryId: "3d-design",
      sectionId: "mesh-modeling",
      formats: ["deb", "flatpakref", "AppImage"]
    },
    {
      id: "meshlab-2",
      name: "MeshLab 2",
      categoryId: "3d-design",
      sectionId: "mesh-modeling",
      formats: ["deb", "flatpakref", "AppImage"]
    },
    {
      id: "zbrush",
      name: "ZBrush",
      categoryId: "3d-design",
      sectionId: "sculpting"
    },
    {
      id: "maya",
      name: "Maya",
      categoryId: "3d-design",
      sectionId: "sculpting"
    },
    {
      id: "blender",
      name: "Blender",
      categoryId: "3d-design",
      sectionId: "sculpting",
      formats: ["deb", "flatpak", "snap"]
    }
  ]);

  const [activeCategory, setActiveCategory] = useState("3d-design");
  const [checkedApps, setCheckedApps] = useState<Set<string>>(new Set());
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [selectedFormats, setSelectedFormats] = useState<Record<string, string>>({});

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleAppClick = (appId: string, event: React.MouseEvent) => {
    if ((event.target as HTMLElement).tagName === "INPUT" ||
      (event.target as HTMLElement).tagName === "BUTTON") {
      return;
    }

    setCheckedApps(prev => {
      const newChecked = new Set(prev);
      if (newChecked.has(appId)) {
        newChecked.delete(appId);
      } else {
        newChecked.add(appId);
      }
      return newChecked;
    });
  };

  const handleCheckboxChange = (appId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedApps(prev => {
      const newChecked = new Set(prev);
      if (event.target.checked) {
        newChecked.add(appId);
      } else {
        newChecked.delete(appId);
      }
      return newChecked;
    });
  };

  const handleFormatChange = (appId: string, format: string) => {
    setSelectedFormats(prev => ({
      ...prev,
      [appId]: format
    }));
  };

  const toggleAdvancedMode = () => {
    setIsAdvancedMode(prev => !prev);
  };

  // Get sections for active category
  const activeSections = sections.filter(section => section.categoryId === activeCategory);

  // Get applications for each section in the active category
  const getApplicationsForSection = (sectionId: string) => {
    return applications.filter(app =>
      app.categoryId === activeCategory && app.sectionId === sectionId
    );
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
        <aside className={styles.sidebar}>
          <div className={styles.sidebarContent}>
            <div className={styles.categoriesWrapper}>
              <div className={styles.categories}>
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`${styles.categoryButton} ${category.id === activeCategory ? styles.active : ""}`}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.installAllWrapper}>
              <hr className={styles.divider} />
              <button className={styles.installAll}>
                <SvgIcons.DownloadAll className={styles.installAllSVG} />
                INSTALL ALL
              </button>
            </div>
          </div>
        </aside>

        <div className={styles.contentWrapper}>
          <div className={styles.contentHeader}>
            <button
              className={`${styles.advancedButton} ${isAdvancedMode ? styles.active : ""}`}
              onClick={toggleAdvancedMode}
            >
              Advanced Mode
            </button>
          </div>
          <div className={styles.content}>
            {activeSections.length === 0 ? (
              <div className={styles.noContent}>No Sections</div>
            ) : (
              activeSections.map(section => {
                const sectionApps = getApplicationsForSection(section.id);
                return (
                  <section key={section.id} className={styles.section}>
                    <div className={styles.sectionHeader}>
                      <h2>{section.title}</h2>
                      <div className={styles.dividerLines}>
                        <hr />
                        <hr />
                      </div>
                    </div>
                    <div className={styles.applications}>
                      {sectionApps.length === 0 ? (
                        <div className={styles.noApps}>No Apps</div>
                      ) : (
                        sectionApps.map(app => (
                          <div key={app.id} className={styles.appCardContainer}>
                            <div
                              className={styles.appCard}
                              onClick={(e) => handleAppClick(app.id, e)}
                              style={{ cursor: "pointer" }}
                            >
                              <div className={styles.appHeader}>
                                <div className={styles.checkboxWrapper}>
                                  <input
                                    type="checkbox"
                                    checked={checkedApps.has(app.id)}
                                    onChange={(e) => handleCheckboxChange(app.id, e)}
                                  />
                                </div>
                                <span>{app.name}</span>
                                <button
                                  className={styles.infoButton}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  i
                                </button>
                              </div>
                            </div>
                            {isAdvancedMode && (
                              <div className={styles.formats}>
                                {!app.formats || app.formats.length === 0 ? (
                                  <div className={styles.noFormats}>No Formats</div>
                                ) : (
                                  app.formats.map(format => (
                                    <label
                                      key={format}
                                      className={styles.formatOption}
                                    >
                                      <input
                                        type="radio"
                                        name={`format-${app.id}`}
                                        checked={selectedFormats[app.id] === format}
                                        onChange={() => handleFormatChange(app.id, format)}
                                      />
                                      <span>{format}</span>
                                    </label>
                                  ))
                                )}
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </section>
                );
              })
            )}
          </div>
          <hr className={styles.divider} />
          <div className={styles.actions}>
            <div className={styles.installGroup}>
              <button className={styles.installPage}>
                <SvgIcons.DownloadPage className={styles.installPageSVG} />
                Install Page
              </button>
            </div>
            <button className={styles.presetButton}>
              <div className={styles.arrowDown}></div>
              Presets
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;