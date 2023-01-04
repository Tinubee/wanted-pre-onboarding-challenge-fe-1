import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    borderColor: string;
    hoverColor: string;
    accentColor: string;
    errorColor: string;
  }
}
