import type { LoaderInterfaceName } from "@/types/ILoaderConfig";
import type { PropValues } from "@/components/organism/LoadersShowcaseSectionOrganism";

export function getSpecificProps(
    interfaceName: LoaderInterfaceName,
    propValues: PropValues
) {
    switch (interfaceName) {
        case "ILogoLoaderProps":
            return {
                src: propValues.src as string,
                alt: propValues.alt as string,
                animationType: propValues.animationType as string,
                glowIntensity: propValues.glowIntensity as number,
            };

        case "ITextLoaderProps":
            return {
                loop: propValues.loop as boolean,
                charDelay: propValues.charDelay as number,
                fontWeight: propValues.fontWeight as number,
                fontFamily: propValues.fontFamily as string,
            };

        case "IProgressRingLoaderProps":
            return {
                progress: propValues.progress as number,
                thickness: propValues.thickness as number,
            };

        case "IElementLoaderProps":
            return {
                animationType: propValues.animationType as string,
                children: propValues.children,
                glowIntensity: propValues.glowIntensity as number,
            };

        case "ISkeletonLoaderProps":
            return {
                variant: propValues.variant as string,
                shimmer: propValues.shimmer as boolean,
                shimmerColor: propValues.shimmerColor as string,
                highlightColor: propValues.highlightColor as string,
                spacing: propValues.spacing as number,
                borderRadius: propValues.borderRadius as number,
                lines: propValues.lines as number,
                waveDirection: propValues.waveDirection as string,
                waveWidth: propValues.waveWidth as number,
                ["aria-label"]: propValues["aria-label"] as string,
            };

        case "ISpinDotsLoaderProps":
            return {
                dots: propValues.dots as number,
                gap: propValues.gap as number,
            };

        case "IHeatmapLoaderProps":
            return {
                rows: propValues.rows as number,
                cols: propValues.cols as number,
            };

        case "IMorphLoaderProps":
            return {
                morphVariant: propValues.morphVariant as string,
                speed: propValues.speed as number,
            };

        case "IGeometricLoaderProps":
            return {
                count: propValues.count as number,
                borderWidth: propValues.borderWidth as number,
            };

        case "IFluidLoaderProps":
            return {
                fluidity: propValues.fluidity as number,
                amplitude: propValues.amplitude as number,
            };

        default:
            return {}; // ✅ other loaders don't need specific props
    }
}
