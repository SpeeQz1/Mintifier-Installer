import { createTheme } from "@mui/material/styles";
import colors from "@src/styles/colors.module.scss";

const SelectDropdownTheme = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "100%",
          "& > *": {
            fontFamily: "Inter",
            boxSizing: "border-box",
            fontSize: "0.75rem",
            borderRadius: "50vh",
          },
          "& em": {
            fontStyle: "normal",
          },

          // First FormControl
          "&:first-of-type": {
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: colors.colorMintGradient1Light1,
              },
              "&:hover fieldset": {
                borderColor: colors.colorPrimary,
              },
              "&:active fieldset": {
                borderColor: colors.colorPrimaryLight1,
              },
            },
          },

          // Second FormControl
          "&:last-of-type": {
            "& .MuiOutlinedInput-root": {
              "&.Mui-disabled": {
                "& fieldset": {
                  borderColor: `rgba(${(colors.colorText1, 0.05)})`,
                },
              },
              "&:not(.Mui-disabled)": {
                "&.Mui-focused fieldset": {
                  borderColor: colors.colorMintGradient2Light1,
                },
                "&:hover fieldset": {
                  borderColor: colors.colorAccentLight1,
                },
                "&:active fieldset": {
                  borderColor: colors.colorAccentLight2,
                },
              },
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: "0.25rem 0.5rem",
          borderRadius: "50vh",
          backgroundColor: "transparent",
          fontSize: "0.75rem",
          fontFamily: "Inter",
          "&:hover": {
            borderColor: colors.colorAccent,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderRadius: "50vh",
          borderColor: `rgba(${(colors.colorText1, 0.2)})`,
          borderWidth: 2,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: colors.colorBackground,
          color: colors.colorText1,
          fontFamily: "Inter",
          fontSize: "1rem",
          "*": {
            fontStyle: "normal",
          },
          "&:hover": {
            backgroundColor: `rgba(${(colors.colorText1, 0.05)})`,
          },
          "&:not(:first-of-type)": {
            borderTop: `1px solid rgba(${colors.colorText1}, 0.25)`,
          },
          "&.Mui-selected": {
            color: colors.colorText2,
            backgroundColor: colors.colorMintGradient1,
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: `${colors.colorMintGradient1Light1} !important`,
            },
          },
        },
      },
    },
  },
});

export default SelectDropdownTheme;
