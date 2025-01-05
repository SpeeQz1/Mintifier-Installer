import { useState } from "react";

import "@src/styles/global.scss";
import styles from "./InstallerContents.module.scss";
import SelectDropdownTheme from "./SelectDropdown.theme";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { InstallFormat } from "@src/types/index";
import { SvgIcons } from "@src/components/index";
import { useActiveCategoryStore, useApplicationStore } from "@src/stores/store";
import { ThemeProvider } from "@mui/material";

const InstallerContents = () => {
  const activeCategory = useActiveCategoryStore((state) => state.value);
  const { sections, applications } = useApplicationStore();

  const [checkedApps, setCheckedApps] = useState<Set<string>>(new Set());
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [selectedFormats, setSelectedFormats] = useState<
    Record<string, { type: string; source: string }>
  >({});

  const onAppClick = (appId: string, event: React.MouseEvent) => {
    if (
      (event.target as HTMLElement).tagName === "INPUT" ||
      (event.target as HTMLElement).tagName === "SELECT"
    ) {
      return;
    }

    setCheckedApps((prev) => {
      const newChecked = new Set(prev);
      if (newChecked.has(appId)) {
        newChecked.delete(appId);
      } else {
        newChecked.add(appId);
      }
      return newChecked;
    });
  };

  const onCheckboxChange = (
    appId: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckedApps((prev) => {
      const newChecked = new Set(prev);
      if (event.target.checked) {
        newChecked.add(appId);
      } else {
        newChecked.delete(appId);
      }
      return newChecked;
    });
  };

  const onFormatChange = (
    appId: string,
    field: "type" | "source",
    value: string
  ) => {
    setSelectedFormats((prev) => {
      const newFormats = { ...prev };

      if (field === "type") {
        if (value === "") {
          delete newFormats[appId];
        } else {
          newFormats[appId] = {
            type: value,
            source: "",
          };
        }
      } else if (field === "source") {
        newFormats[appId] = {
          ...newFormats[appId],
          source: value,
        };
      }

      return newFormats;
    });
    console.log(selectedFormats);
  };

  const toggleAdvancedMode = () => {
    setIsAdvancedMode((prev) => !prev);
  };

  const activeSections = sections.filter(
    (section) => section.categoryId === activeCategory
  );

  const getApplicationsForSection = (sectionId: string) => {
    return applications.filter(
      (app) => app.categoryId === activeCategory && app.sectionId === sectionId
    );
  };

  const getAvailableFormatTypes = (formats?: InstallFormat[]) => {
    if (!formats) return [];
    return [...new Set(formats.map((format) => format.type))];
  };

  const getFormattedSourceLabel = (format: InstallFormat): string => {
    if (format.source === "static") {
      return `Static${format.versionLabel ? ` - v${format.versionLabel}` : ""}`;
    }

    if (format.source === "local") {
      if (format.versionType === "specific" && format.versionLabel) {
        return `Local - v${format.versionLabel}`;
      }
      return format.versionType === "latest" ? "Local - Latest" : "Local";
    }

    // For repo, always show as "Latest"
    return "Repo - Latest";
  };

  const getAvailableSourceTypes = (
    formats?: InstallFormat[],
    selectedType?: string
  ) => {
    if (!formats) return [];

    return formats
      .filter((format) => !selectedType || format.type === selectedType)
      .map((format) => ({
        value: format.source,
        label: getFormattedSourceLabel(format),
        format: format,
      }))
      .sort((a, b) => {
        // Custom sort order: Local > Repo > Static
        const sourceOrder = { local: 1, repo: 2, static: 3 };
        return sourceOrder[a.format.source] - sourceOrder[b.format.source];
      });
  };

  const formatTypeDisplay = (type: string) => {
    return type === "portable" ? "Portable" : `.${type}`;
  };

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.contentHeader}>
        <button
          className={`${styles.advancedButton} ${
            isAdvancedMode ? styles.active : ""
          }`}
          onClick={toggleAdvancedMode}
        >
          Advanced Mode
        </button>
      </div>
      <div className={styles.content}>
        {activeSections.length === 0 ? (
          <div className={styles.noSections}>No Sections</div>
        ) : (
          activeSections.map((section) => {
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
                    sectionApps.map((app) => (
                      <div key={app.id} className={styles.appCardContainer}>
                        <div
                          className={styles.appCard}
                          onClick={(e) => onAppClick(app.id, e)}
                          style={{ cursor: "pointer" }}
                        >
                          <div className={styles.appHeader}>
                            <div className={styles.checkboxWrapper}>
                              <input
                                type="checkbox"
                                checked={checkedApps.has(app.id)}
                                onChange={(e) => onCheckboxChange(app.id, e)}
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
                              <div className={styles.formatDropdowns}>
                                <ThemeProvider theme={SelectDropdownTheme}>
                                  <FormControl>
                                    <Select
                                      value={
                                        selectedFormats[app.id]?.type || ""
                                      }
                                      onChange={(e) =>
                                        onFormatChange(
                                          app.id,
                                          "type",
                                          e.target.value
                                        )
                                      }
                                      displayEmpty
                                      inputProps={{
                                        "aria-label": "Format type",
                                      }}
                                    >
                                      <MenuItem value="">
                                        <em>Select Format</em>
                                      </MenuItem>
                                      {getAvailableFormatTypes(app.formats).map(
                                        (type) => (
                                          <MenuItem key={type} value={type}>
                                            {formatTypeDisplay(type)}
                                          </MenuItem>
                                        )
                                      )}
                                    </Select>
                                  </FormControl>

                                  <FormControl
                                    disabled={!selectedFormats[app.id]?.type}
                                  >
                                    <Select
                                      value={
                                        selectedFormats[app.id]?.source || ""
                                      }
                                      onChange={(e) =>
                                        onFormatChange(
                                          app.id,
                                          "source",
                                          e.target.value
                                        )
                                      }
                                      displayEmpty
                                      inputProps={{
                                        "aria-label": "Format source",
                                      }}
                                    >
                                      <MenuItem value="">
                                        <em>Select Source</em>
                                      </MenuItem>
                                      {getAvailableSourceTypes(
                                        app.formats,
                                        selectedFormats[app.id]?.type
                                      ).map((sourceOption) => (
                                        <MenuItem
                                          key={sourceOption.value}
                                          value={sourceOption.value}
                                        >
                                          {sourceOption.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </ThemeProvider>
                              </div>
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
  );
};

export default InstallerContents;
