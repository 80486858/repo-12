// Type definitions for @kiwicom/orbit-components
// Project: http://github.com/kiwicom/orbit
import type * as Common from "../common/types";

export type Indent = "none" | "small" | "medium" | "large" | "XLarge" | "XXLarge";
export type Align = "left" | "center" | "right";

export interface Props extends Common.SpaceAfter {
  indent?: Indent;
  type?: "solid" | "dashed" | "dotted" | "double" | "none";
  color?: string;
  align?: Align;
}
