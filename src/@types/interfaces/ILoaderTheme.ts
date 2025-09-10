export interface ILoaderTheme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  animation: {
    duration: string;
    easing: string;
  };
  typography: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
  };
}
