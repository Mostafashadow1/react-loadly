import { Sliders, Droplet, Type, Play, Layout, Cuboid, Image as ImageIcon, BarChart2, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type GroupKey =
    | "General"
    | "Style"
    | "Typography"
    | "Animation"
    | "Layout"
    | "Variant"
    | "Image"
    | "Progress"
    | "Specific";

export const GROUP_ORDER: GroupKey[] = [
    "General",
    "Style",
    "Animation",
    "Typography",
    "Layout",
    "Variant",
    "Image",
    "Progress",
    "Specific"
];
export const GROUP_ICON: Record<GroupKey, LucideIcon> = {
    General: Sliders,
    Style: Droplet,
    Typography: Type,
    Animation: Play,
    Layout: Layout,
    Variant: Cuboid,
    Image: ImageIcon,
    Progress: BarChart2,
    Specific: Star
};
