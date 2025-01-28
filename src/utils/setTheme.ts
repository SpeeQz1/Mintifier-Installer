import colors from "@src/assets/themes/default.module.scss";
import { colord } from "colord";

interface ColorModule {
  [key: string]: string;
}

const colorVars = colors as ColorModule;

export function setTheme() {
  const themeVariables = {
    '--color-primary': colorVars.colorPrimary,
    '--color-primary-light-1': colorVars.colorPrimaryLight1,
    '--color-primary-light-2': colorVars.colorPrimaryLight2,
    '--color-primary-dark-1': colorVars.colorPrimaryDark1,
    '--color-secondary': colorVars.colorSecondary,
    '--color-secondary-light-1': colorVars.colorSecondaryLight1,
    '--color-secondary-light-2': colorVars.colorSecondaryLight2,
    '--color-accent': colorVars.colorAccent,
    '--color-accent-light-1': colorVars.colorAccentLight1,
    '--color-accent-light-2': colorVars.colorAccentLight2,
    '--color-accent-dark-1': colorVars.colorAccentDark1,
    '--color-info': colorVars.colorInfo,
    '--color-info-light-1': colorVars.colorInfoLight1,
    '--color-info-dark-1': colorVars.colorInfoDark1,
    '--color-gray': colorVars.colorGray,
    '--color-background': colorVars.colorBackground,
    '--color-text-1': colorVars.colorText1,
    '--color-text-2': colorVars.colorText2,
    '--color-mint-gradient-1': colorVars.colorMintGradient1,
    '--color-mint-gradient-1-light-1': colorVars.colorMintGradient1Light1,
    '--color-mint-gradient-1-dark-1': colorVars.colorMintGradient1Dark1,
    '--color-mint-gradient-2': colorVars.colorMintGradient2,
    '--color-mint-gradient-2-dark-1': colorVars.colorMintGradient2Dark1,
    '--color-mint-gradient-2-light-1': colorVars.colorMintGradient2Light1,
  };

  const problematicVariables: string[] = [];

  // Check each variable individually
  for (const [property, value] of Object.entries(themeVariables)) {
    try {
      if (value === undefined) {
        throw new Error('Variable is undefined');
      }

      // Validate color value using colord
      const isValid = colord(value).isValid();
      if (!isValid) {
        throw new Error('Invalid color value');
      }

      // If validation passes, set the CSS variable
      document.documentElement.style.setProperty(property, value);
    } catch (error) {
      problematicVariables.push(`${property}: ${value}`);
      console.error(`Error with variable ${property}:`, error instanceof Error ? error.message : "Unknown error");
    }
  }

  if (problematicVariables.length > 0) {
    console.error("The following variables have invalid values:", problematicVariables);
  } else {
    console.log("Theme variables set successfully");
  }
}

export function getCSSVar(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--${name}`)
    .trim();
}