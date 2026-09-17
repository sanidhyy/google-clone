declare module "react-loader-spinner" {
  import type { ComponentType, CSSProperties } from "react";

  export const Puff: ComponentType<{
    color?: string;
    height?: number | string;
    width?: number | string;
    visible?: boolean;
    ariaLabel?: string;
    wrapperStyle?: CSSProperties;
    wrapperClass?: string;
  }>;
}
