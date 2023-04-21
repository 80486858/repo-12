import { convertHexToRgba } from "@kiwicom/orbit-design-tokens";

import { TOKENS, TYPE_OPTIONS } from "../consts";
import type { Type } from "../types";
import type { Theme } from "../../../defaultTheme";

export type TokenName =
  | "backgroundButton"
  | "backgroundButtonHover"
  | "backgroundButtonActive"
  | "backgroundButtonFocus"
  | "colorTextButton"
  | "colorTextButtonHover"
  | "colorTextButtonActive"
  | "borderColorButtonFocus";

type GetAlertButtonTypeToken = (name: TokenName, type: Type, theme: Theme) => string;

const getAlertButtonTypeToken: GetAlertButtonTypeToken = (name, type, theme) => {
  const tokens = {
    [TOKENS.backgroundButton]: {
      [TYPE_OPTIONS.INFO]: theme.orbit.backgroundButtonInfo,
      [TYPE_OPTIONS.SUCCESS]: theme.orbit.backgroundButtonSuccess,
      [TYPE_OPTIONS.WARNING]: theme.orbit.backgroundButtonWarning,
      [TYPE_OPTIONS.CRITICAL]: theme.orbit.backgroundButtonCritical,
      [TYPE_OPTIONS.INFO_SUBTLE]: convertHexToRgba(theme.orbit.paletteBlueNormal, 12),
      [TYPE_OPTIONS.SUCCESS_SUBTLE]: convertHexToRgba(theme.orbit.paletteGreenNormal, 12),
      [TYPE_OPTIONS.WARNING_SUBTLE]: convertHexToRgba(theme.orbit.paletteOrangeNormal, 12),
      [TYPE_OPTIONS.CRITICAL_SUBTLE]: convertHexToRgba(theme.orbit.paletteRedNormal, 12),
      [TYPE_OPTIONS.SECONDARY]: theme.orbit.backgroundButtonSecondary,
    },
    [TOKENS.backgroundButtonHover]: {
      [TYPE_OPTIONS.INFO]: theme.orbit.backgroundButtonInfoHover,
      [TYPE_OPTIONS.SUCCESS]: theme.orbit.backgroundButtonSuccessHover,
      [TYPE_OPTIONS.WARNING]: theme.orbit.backgroundButtonWarningHover,
      [TYPE_OPTIONS.CRITICAL]: theme.orbit.backgroundButtonCriticalHover,
      [TYPE_OPTIONS.INFO_SUBTLE]: convertHexToRgba(theme.orbit.paletteBlueNormal, 18),
      [TYPE_OPTIONS.SUCCESS_SUBTLE]: convertHexToRgba(theme.orbit.paletteGreenNormal, 18),
      [TYPE_OPTIONS.WARNING_SUBTLE]: convertHexToRgba(theme.orbit.paletteOrangeNormal, 18),
      [TYPE_OPTIONS.CRITICAL_SUBTLE]: convertHexToRgba(theme.orbit.paletteRedNormal, 18),
    },
    [TOKENS.backgroundButtonActive]: {
      [TYPE_OPTIONS.INFO]: theme.orbit.backgroundButtonInfoActive,
      [TYPE_OPTIONS.SUCCESS]: theme.orbit.backgroundButtonSuccessActive,
      [TYPE_OPTIONS.WARNING]: theme.orbit.backgroundButtonWarningActive,
      [TYPE_OPTIONS.CRITICAL]: theme.orbit.backgroundButtonCriticalActive,
      [TYPE_OPTIONS.INFO_SUBTLE]: convertHexToRgba(theme.orbit.paletteBlueNormal, 24),
      [TYPE_OPTIONS.SUCCESS_SUBTLE]: convertHexToRgba(theme.orbit.paletteGreenNormal, 24),
      [TYPE_OPTIONS.WARNING_SUBTLE]: convertHexToRgba(theme.orbit.paletteOrangeNormal, 24),
      [TYPE_OPTIONS.CRITICAL_SUBTLE]: convertHexToRgba(theme.orbit.paletteRedNormal, 24),
    },
    [TOKENS.backgroundButtonFocus]: {
      [TYPE_OPTIONS.INFO]: convertHexToRgba(theme.orbit.paletteBlueNormal, 10),
      [TYPE_OPTIONS.SUCCESS]: convertHexToRgba(theme.orbit.paletteGreenNormal, 10),
      [TYPE_OPTIONS.WARNING]: convertHexToRgba(theme.orbit.paletteOrangeNormal, 10),
      [TYPE_OPTIONS.CRITICAL]: convertHexToRgba(theme.orbit.paletteRedNormal, 10),
      [TYPE_OPTIONS.INFO_SUBTLE]: theme.orbit.paletteBlueLight,
      [TYPE_OPTIONS.SUCCESS_SUBTLE]: theme.orbit.paletteGreenLight,
      [TYPE_OPTIONS.WARNING_SUBTLE]: theme.orbit.paletteOrangeLight,
      [TYPE_OPTIONS.CRITICAL_SUBTLE]: theme.orbit.paletteRedLight,
    },
    [TOKENS.colorTextButton]: {
      [TYPE_OPTIONS.INFO]: theme.orbit.colorTextButtonInfo,
      [TYPE_OPTIONS.SUCCESS]: theme.orbit.colorTextButtonSuccess,
      [TYPE_OPTIONS.WARNING]: theme.orbit.colorTextButtonWarning,
      [TYPE_OPTIONS.CRITICAL]: theme.orbit.colorTextButtonCritical,
      [TYPE_OPTIONS.INFO_SUBTLE]: theme.orbit.paletteBlueDark,
      [TYPE_OPTIONS.SUCCESS_SUBTLE]: theme.orbit.paletteGreenDark,
      [TYPE_OPTIONS.WARNING_SUBTLE]: theme.orbit.paletteOrangeDark,
      [TYPE_OPTIONS.CRITICAL_SUBTLE]: theme.orbit.paletteRedDark,
      [TYPE_OPTIONS.SECONDARY]: theme.orbit.paletteInkDark,
    },
    [TOKENS.colorTextButtonHover]: {
      [TYPE_OPTIONS.INFO]: theme.orbit.colorTextButtonInfo,
      [TYPE_OPTIONS.SUCCESS]: theme.orbit.colorTextButtonSuccess,
      [TYPE_OPTIONS.WARNING]: theme.orbit.colorTextButtonWarning,
      [TYPE_OPTIONS.CRITICAL]: theme.orbit.colorTextButtonCritical,
      [TYPE_OPTIONS.INFO_SUBTLE]: theme.orbit.paletteBlueDarkHover,
      [TYPE_OPTIONS.SUCCESS_SUBTLE]: theme.orbit.paletteGreenDarkHover,
      [TYPE_OPTIONS.WARNING_SUBTLE]: theme.orbit.paletteOrangeDarkHover,
      [TYPE_OPTIONS.CRITICAL_SUBTLE]: theme.orbit.paletteRedDarkHover,
      [TYPE_OPTIONS.SECONDARY]: theme.orbit.paletteInkDark,
    },
    [TOKENS.colorTextButtonActive]: {
      [TYPE_OPTIONS.INFO]: theme.orbit.colorTextButtonInfo,
      [TYPE_OPTIONS.SUCCESS]: theme.orbit.colorTextButtonSuccess,
      [TYPE_OPTIONS.WARNING]: theme.orbit.colorTextButtonWarning,
      [TYPE_OPTIONS.CRITICAL]: theme.orbit.colorTextButtonCritical,
      [TYPE_OPTIONS.INFO_SUBTLE]: theme.orbit.paletteBlueDarkActive,
      [TYPE_OPTIONS.SUCCESS_SUBTLE]: theme.orbit.paletteGreenDarkActive,
      [TYPE_OPTIONS.WARNING_SUBTLE]: theme.orbit.paletteOrangeDarkActive,
      [TYPE_OPTIONS.CRITICAL_SUBTLE]: theme.orbit.paletteRedDarkActive,
      [TYPE_OPTIONS.SECONDARY]: theme.orbit.paletteInkDark,
    },
    [TOKENS.borderColorButtonFocus]: {
      [TYPE_OPTIONS.INFO]: convertHexToRgba(theme.orbit.paletteBlueNormal, 50),
      [TYPE_OPTIONS.SUCCESS]: convertHexToRgba(theme.orbit.paletteGreenNormal, 50),
      [TYPE_OPTIONS.WARNING]: convertHexToRgba(theme.orbit.paletteOrangeNormal, 50),
      [TYPE_OPTIONS.CRITICAL]: convertHexToRgba(theme.orbit.paletteRedNormal, 50),
      [TYPE_OPTIONS.INFO_SUBTLE]: convertHexToRgba(theme.orbit.paletteBlueNormal, 50),
      [TYPE_OPTIONS.SUCCESS_SUBTLE]: convertHexToRgba(theme.orbit.paletteGreenNormal, 50),
      [TYPE_OPTIONS.WARNING_SUBTLE]: convertHexToRgba(theme.orbit.paletteOrangeNormal, 50),
      [TYPE_OPTIONS.CRITICAL_SUBTLE]: convertHexToRgba(theme.orbit.paletteRedNormal, 50),
    },
  };
  return tokens[name][type];
};

export default getAlertButtonTypeToken;
