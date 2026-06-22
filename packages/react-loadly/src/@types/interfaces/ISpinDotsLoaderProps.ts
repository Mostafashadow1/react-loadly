import { IBaseLoaderProps } from "./IBaseLoaderProps";

export interface ISpinDotsLoaderProps extends IBaseLoaderProps {
  /** Number of dots in the spinner */
  dots?: number;
  /** Gap between dots */
  gap?: number;
}
