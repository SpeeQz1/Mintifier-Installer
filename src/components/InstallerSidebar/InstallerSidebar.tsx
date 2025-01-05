import "@src/styles/global.scss";
import styles from "./InstallerSidebar.module.scss";

import { SvgIcons } from "@src/components/index";
import { useActiveCategoryStore, categories } from "@src/stores/store";

const InstallerSidebar = () => {
  const activeCategory = useActiveCategoryStore((state) => state.value);
  const setActiveCategory = useActiveCategoryStore((state) => state.setState);

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
              categories.map((category) => (
                <button
                  key={category.id}
                  className={`${styles.categoryButton} ${
                    category.id === activeCategory ? styles.active : ""
                  }`}
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
