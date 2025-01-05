import { create } from 'zustand'
import { Category, Section, Application } from '@src/types/index'

export const categories: Category[] = [
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
];

export const sections: Section[] = [
    { id: "mesh-modeling", categoryId: "3d-design", title: "Mesh Modeling" },
    { id: "sculpting", categoryId: "3d-design", title: "Sculpting" },
    { id: "video-tools", categoryId: "video-editing", title: "Video Tools" },
    { id: "animation-tools", categoryId: "animation", title: "Animation Tools" }
];

export const applications: Application[] = [
    {
        id: "meshlab-1",
        name: "MeshLab",
        categoryId: "3d-design",
        sectionId: "mesh-modeling",
        formats: [
            { type: "deb", source: "repo", versionType: "latest" },
            {
                type: "AppImage",
                source: "static",
                url: "https://github.com/cnr-isti-vclab/meshlab/releases/download/MeshLab-2023.12/MeshLab2023.12-linux.AppImage",
                versionType: "specific",
                versionLabel: "2.0",
            },
        ],
    },
    {
        id: "meshlab-2",
        name: "MeshLab 2",
        categoryId: "3d-design",
        sectionId: "mesh-modeling",
    },
    {
        id: "zbrush",
        name: "ZBrush",
        categoryId: "3d-design",
        sectionId: "sculpting",
    }
];

interface ActiveCategoryStore {
    value: string
    setState: (value: string) => void
}

interface ApplicationStore {
    applications: Application[]
    sections: Section[]
}

export const useActiveCategoryStore = create<ActiveCategoryStore>((set) => ({
    value: categories.length > 0 ? categories[0].id : "",
    setState: (value) => set({ value })
}));

export const useApplicationStore = create<ApplicationStore>(() => ({
    applications,
    sections
}));