import { IBaseLoaderProps } from "./IBaseLoaderProps";

export interface ITextLoaderProps extends IBaseLoaderProps {
  /** Text to animate */
  text?: string;
  /** Font family for text loaders */
  fontFamily?: string;
  /** Font weight */
  fontWeight?: number | string;
  /** Character animation delay */
  charDelay?: number;
}
