import { IBaseLoaderProps } from "./IBaseLoaderProps";
export interface ITextLoaderProps extends Exclude<IBaseLoaderProps, "showText"> {
    /** Font family for text loaders */
    fontFamily?: string;
    /** Font weight */
    fontWeight?: number | string;
    /** Character animation delay */
    charDelay?: number;
    loop?: boolean;
}
//# sourceMappingURL=ITextLoaderProps.d.ts.map