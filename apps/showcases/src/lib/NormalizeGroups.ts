import type { PropControlConfig } from "@/utils/loaderPropsConfig";

export type GroupKey = "General" | "Specific";

export function getGroupsForTabs(
    allControls: Record<string, PropControlConfig>
) {

    const grouped: [string, [string, PropControlConfig][]][] = [
        ["General", []],
        ["Specific", []],
    ];

    Object.entries(allControls).forEach(([name, cfg]) => {
        if (cfg.group) {
            const isGeneral = cfg.group?.toLowerCase() === "general";
            grouped[isGeneral ? 0 : 1][1].push([name, cfg]);
        }
    });

    return grouped;
}
