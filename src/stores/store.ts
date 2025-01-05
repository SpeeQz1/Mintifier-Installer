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
    // 3D Design sections
    { id: "mesh-modeling", categoryId: "3d-design", title: "Mesh Modeling" },
    { id: "sculpting", categoryId: "3d-design", title: "Sculpting" },
    { id: "cad", categoryId: "3d-design", title: "CAD" },

    // Video Editing sections
    { id: "video-tools", categoryId: "video-editing", title: "Video Tools" },
    { id: "color-grading", categoryId: "video-editing", title: "Color Grading" },
    { id: "compositing", categoryId: "video-editing", title: "Compositing" },

    // Utilities sections
    { id: "system-tools", categoryId: "utilities", title: "System Tools" },
    { id: "file-management", categoryId: "utilities", title: "File Management" },

    // Drawing sections
    { id: "digital-painting", categoryId: "drawing", title: "Digital Painting" },
    { id: "vector-graphics", categoryId: "drawing", title: "Vector Graphics" },

    // Animation sections
    { id: "animation-tools", categoryId: "animation", title: "Animation Tools" },
    { id: "motion-graphics", categoryId: "animation", title: "Motion Graphics" },

    // Empty category (Rendering) - will show "No Sections"

    // Texturing sections
    { id: "texture-painting", categoryId: "texturing", title: "Texture Painting" },

    // Modeling sections
    { id: "parametric-modeling", categoryId: "modeling", title: "Parametric Modeling" },
];

export const applications: Application[] = [
    // 3D Design - Mesh Modeling
    {
        id: "meshlab",
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
                versionLabel: "2023.12",
            },
        ],
    },
    {
        id: "blender",
        name: "Blender",
        categoryId: "3d-design",
        sectionId: "mesh-modeling",
        formats: [
            { type: "flatpakref", source: "local", versionType: "latest" },
            {
                type: "AppImage",
                source: "static",
                url: "https://download.blender.org/release/Blender3.6/blender-3.6.0-linux-x64.AppImage",
                versionType: "specific",
                versionLabel: "3.6.0"
            }
        ],
    },

    // 3D Design - Sculpting
    {
        id: "zbrush",
        name: "ZBrush",
        categoryId: "3d-design",
        sectionId: "sculpting",
        // No formats - will show "No Formats"
    },

    // 3D Design - CAD
    {
        id: "freecad",
        name: "FreeCAD",
        categoryId: "3d-design",
        sectionId: "cad",
        formats: [
            { type: "flatpakref", source: "local", versionType: "latest" },
            { type: "deb", source: "repo", versionType: "latest" },
        ],
    },
    {
        id: "openscad",
        name: "OpenSCAD",
        categoryId: "3d-design",
        sectionId: "cad",
        formats: [
            { type: "deb", source: "local", versionType: "latest" },
        ],
    },

    // Video Editing - Video Tools
    {
        id: "kdenlive",
        name: "Kdenlive",
        categoryId: "video-editing",
        sectionId: "video-tools",
        formats: [
            { type: "flatpakref", source: "local", versionType: "latest" },
            {
                type: "AppImage",
                source: "static",
                url: "https://download.kde.org/stable/kdenlive/23.08/linux/kdenlive-23.08.2-x86_64.AppImage",
                versionType: "specific",
                versionLabel: "23.08.2"
            }
        ],
    },
    {
        id: "olive",
        name: "Olive",
        categoryId: "video-editing",
        sectionId: "video-tools",
        formats: [
            { type: "deb", source: "repo", versionType: "latest" },
        ],
    },

    // Video Editing - Color Grading (Empty section - will show "No Apps")

    // Video Editing - Compositing
    {
        id: "natron",
        name: "Natron",
        categoryId: "video-editing",
        sectionId: "compositing",
        formats: [
            {
                type: "AppImage",
                source: "static",
                url: "https://github.com/NatronGitHub/Natron/releases/download/v2.5.0/Natron-2.5.0-Linux-x86_64.AppImage",
                versionType: "specific",
                versionLabel: "2.5.0"
            }
        ],
    },

    // Utilities - System Tools
    {
        id: "stacer",
        name: "Stacer",
        categoryId: "utilities",
        sectionId: "system-tools",
        formats: [
            { type: "deb", source: "repo", versionType: "latest" },
            { type: "snap", source: "local", versionType: "latest" },
        ],
    },
    {
        id: "bleachbit",
        name: "BleachBit",
        categoryId: "utilities",
        sectionId: "system-tools",
        formats: [
            { type: "deb", source: "local", versionType: "latest" },
        ],
    },

    // Utilities - File Management
    {
        id: "filezilla",
        name: "FileZilla",
        categoryId: "utilities",
        sectionId: "file-management",
        formats: [
            { type: "flatpakref", source: "local", versionType: "latest" },
        ],
    },

    // Drawing - Digital Painting
    {
        id: "krita",
        name: "Krita",
        categoryId: "drawing",
        sectionId: "digital-painting",
        formats: [
            { type: "flatpakref", source: "local", versionType: "latest" },
            {
                type: "AppImage",
                source: "static",
                url: "https://download.kde.org/stable/krita/5.2.2/krita-5.2.2-x86_64.appimage",
                versionType: "specific",
                versionLabel: "5.2.2"
            }
        ],
    },
    {
        id: "mypaint",
        name: "MyPaint",
        categoryId: "drawing",
        sectionId: "digital-painting",
        formats: [
            { type: "flatpakref", source: "local", versionType: "latest" },
        ],
    },

    // Drawing - Vector Graphics
    {
        id: "inkscape",
        name: "Inkscape",
        categoryId: "drawing",
        sectionId: "vector-graphics",
        formats: [
            { type: "flatpakref", source: "local", versionType: "latest" },
            { type: "deb", source: "repo", versionType: "latest" },
        ],
    },

    // Animation - Animation Tools
    {
        id: "opentoonz",
        name: "OpenToonz",
        categoryId: "animation",
        sectionId: "animation-tools",
        formats: [
            { type: "flatpakref", source: "local", versionType: "latest" },
            {
                type: "AppImage",
                source: "static",
                url: "https://github.com/opentoonz/opentoonz/releases/download/v1.7.1/OpenToonz-1.7.1.AppImage",
                versionType: "specific",
                versionLabel: "1.7.1"
            }
        ],
    },

    // Animation - Motion Graphics
    {
        id: "synfig",
        name: "Synfig Studio",
        categoryId: "animation",
        sectionId: "motion-graphics",
        formats: [
            { type: "flatpakref", source: "local", versionType: "latest" },
        ],
    },

    // Texturing - Texture Painting
    {
        id: "substance-painter",
        name: "Substance Painter",
        categoryId: "texturing",
        sectionId: "texture-painting",
        // No formats - will show "No Formats"
    },

    // Modeling - Parametric Modeling
    {
        id: "fusion360",
        name: "Fusion 360",
        categoryId: "modeling",
        sectionId: "parametric-modeling",
        formats: [
            {
                type: "AppImage",
                source: "static",
                url: "https://dl.appstreaming.autodesk.com/production/installers/Fusion360-Linux.AppImage",
                versionType: "specific",
                versionLabel: "2024.1"
            }
        ],
    },
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