import { useState } from "react";

import "@src/styles/global.scss";
import styles from "./InstallerSidebar.module.scss";

import { Category } from "@src/types/index";
import { SvgIcons } from "@src/components/index";
import { useActiveCategory } from "@src/stores/store"

const InstallerSidebar = () => {
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

    const activeCategory = useActiveCategory((state) => state.value);
    const setActiveCategory = useActiveCategory((state) => state.setState);

    const handleCategoryClick = (categoryId: string) => {
        setActiveCategory(categoryId);
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarContent}>
                <div className={styles.categoriesWrapper}>
                    <div className={styles.categories}>
                        {categories.length === 0 ? (
                            <div className={styles.noCategory}>No Categories</div>
                        ) : (
                            categories.map(category => (
                                <button
                                    key={category.id}
                                    className={`${styles.categoryButton} ${category.id === activeCategory ? styles.active : ""}`}
                                    onClick={() => handleCategoryClick(category.id)}
                                >
                                    {category.title}
                                </button>
                            ))
                        )}
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
    );
};

export default InstallerSidebar;