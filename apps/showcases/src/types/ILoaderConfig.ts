import type {
  IBaseLoaderProps,
  IElementLoaderProps,
  IFluidLoaderProps,
  IGeometricLoaderProps,
  ILogoLoaderProps,
  ISkeletonLoaderProps,
  ITextLoaderProps,
  ISpinDotsLoaderProps,
  IHeatmapLoaderProps,
  IMorphLoaderProps,
  IProgressRingLoaderProps,
  IStairLoaderProps,
  IOrbitLoaderProps,
  IPlaneLoaderProps,
  IRippleLoaderProps,
  ISnakeLoaderProps,
  ISquaresLoaderProps,
  IHashtagLoaderProps,
  IAutoSkeletonProps,
  IGradientRingLoaderProps,
  ISignalLoaderProps,
  ICardFlipLoaderProps,
  IOrbitDotsLoaderProps,
  IEqualizerLoaderProps,
} from "react-loadly";

export type LoaderPropsMap = {
  spin: IBaseLoaderProps;
  pulse: IGeometricLoaderProps;
  wave: IFluidLoaderProps;
  grid: IGeometricLoaderProps;
  typing: ITextLoaderProps;
  logo: ILogoLoaderProps;
  bars: IGeometricLoaderProps;
  dots: IGeometricLoaderProps;
  blob: IFluidLoaderProps;
  ring: IGeometricLoaderProps;
  flow: IFluidLoaderProps;
  rotate: IGeometricLoaderProps;
  element: IElementLoaderProps;
  bounce: IGeometricLoaderProps;
  skeleton: ISkeletonLoaderProps;
  spinDots: ISpinDotsLoaderProps;
  heatmap: IHeatmapLoaderProps;
  morph: IMorphLoaderProps;
  progressRing: IProgressRingLoaderProps;
  stair: IStairLoaderProps;
  squares: ISquaresLoaderProps;
  ripple: IRippleLoaderProps;
  orbit: IOrbitLoaderProps;
  plane: IPlaneLoaderProps;
  hashtag: IHashtagLoaderProps;
  snake: ISnakeLoaderProps;
  gradientRing: IGradientRingLoaderProps;
  signal: ISignalLoaderProps;
  cardFlip: ICardFlipLoaderProps;
  orbitDots: IOrbitDotsLoaderProps;
  equalizer: IEqualizerLoaderProps;
};

type LoaderInterfaces = {
  IBaseLoaderProps: IBaseLoaderProps;
  IElementLoaderProps: IElementLoaderProps;
  IFluidLoaderProps: IFluidLoaderProps;
  IGeometricLoaderProps: IGeometricLoaderProps;
  ILogoLoaderProps: ILogoLoaderProps;
  ISkeletonLoaderProps: ISkeletonLoaderProps;
  ITextLoaderProps: ITextLoaderProps;
  ISpinDotsLoaderProps: ISpinDotsLoaderProps;
  IHeatmapLoaderProps: IHeatmapLoaderProps;
  IMorphLoaderProps: IMorphLoaderProps;
  IProgressRingLoaderProps: IProgressRingLoaderProps;
  IStairLoaderProps: IStairLoaderProps;
  ISquaresLoaderProps: ISquaresLoaderProps;
  IRippleLoaderProps: IRippleLoaderProps;
  IOrbitLoaderProps: IOrbitLoaderProps;
  IPlaneLoaderProps: IPlaneLoaderProps;
  ISnakeLoaderProps: ISnakeLoaderProps;
  IHashtagLoaderProps: IHashtagLoaderProps;
  IAutoSkeletonProps: IAutoSkeletonProps;
  IGradientRingLoaderProps: IGradientRingLoaderProps;
  ISignalLoaderProps: ISignalLoaderProps;
  ICardFlipLoaderProps: ICardFlipLoaderProps;
  IOrbitDotsLoaderProps: IOrbitDotsLoaderProps;
  IEqualizerLoaderProps: IEqualizerLoaderProps;
};

export type LoaderInterfaceName = keyof LoaderInterfaces;

export type LoaderKind = keyof LoaderPropsMap;
export type AnyLoaderConfig = {
  [K in LoaderKind]: ILoaderConfig<K>;
}[LoaderKind];

// Make the uniqueProps array more flexible to avoid type conflicts
export interface ILoaderConfig<K extends LoaderKind> {
  component: React.ComponentType<LoaderPropsMap[K]>;
  title: string;
  interface: LoaderInterfaceName;
  commonProps: (keyof IBaseLoaderProps)[];
  uniqueProps: (keyof LoaderPropsMap[K])[]; // More flexible type
  isNew?: boolean;
}

export const commonProps: (keyof IBaseLoaderProps)[] = [
  "className",
  "style",
  "size",
  "width",
  "height",
  "color",
  "speed",
  "loading",
  "aria-label",
  "showText",
  "loadingText",
  "showText",
  "data-testid",
  "fullscreen",
  "screenWidth",
  "screenHeight",
  "loaderCenter",
  "screenBackground",
];
