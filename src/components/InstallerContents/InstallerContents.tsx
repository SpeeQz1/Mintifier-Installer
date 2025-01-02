import { useState } from "react";

import "@src/styles/global.scss";
import styles from "./InstallerContents.module.scss";

import { Section, Application, InstallFormat } from "@src/types/index";
import { SvgIcons } from "@src/components/index";
import { useActiveCategory } from "@src/stores/store"

const InstallerContents = () => {
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
            sectionId: "mesh-modeling"
        },
        {
            id: "meshlab-2",
            name: "MeshLab 2",
            categoryId: "3d-design",
            sectionId: "mesh-modeling"
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
            sectionId: "sculpting"
        }
    ]);

    const activeCategory = useActiveCategory((state) => state.value);

    const [checkedApps, setCheckedApps] = useState<Set<string>>(new Set());
    const [isAdvancedMode, setIsAdvancedMode] = useState(false);
    const [selectedFormats, setSelectedFormats] = useState<Record<string, string>>({});

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

    const onFormatChange = (appId: string, format: string) => {
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
                    <div className={styles.noSections}>No Sections</div>
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
                                                            app.formats.map((format: InstallFormat) => (
                                                                <label
                                                                    key={`${format.type}-${format.source}`}
                                                                    className={styles.formatOption}
                                                                >
                                                                    <input
                                                                        type="radio"
                                                                        name={`format-${app.id}`}
                                                                        checked={selectedFormats[app.id] === format.type}
                                                                        onChange={() => onFormatChange(app.id, format.type)}
                                                                    />
                                                                    <span>
                                                                        {format.type}
                                                                        {format.versionLabel && ` (${format.versionLabel})`}
                                                                    </span>
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
    );
};

export default InstallerContents;