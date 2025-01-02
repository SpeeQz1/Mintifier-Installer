import { create } from 'zustand'

interface ActiveCategory {
    value: string
    setState: (value: string) => void
}

const categories = ([
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

export const useActiveCategory = create<ActiveCategory>((set) => ({
    value: categories.length > 0 ? categories[0].id : "",
    setState: (value) => set({ value })
}))