import { IBaseLoaderProps } from "./IBaseLoaderProps";

export interface IFluidLoaderProps extends IBaseLoaderProps {
  /** Fluidity/viscosity of the animation */
  fluidity?: number;
  /** Wave amplitude for wave-based loaders */
  amplitude?: number;

  secondaryColor?: string;
}
