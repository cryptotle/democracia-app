import { ColorMode, color, extendTheme } from "@chakra-ui/react";
import {  MultiSelectTheme } from 'chakra-multiselect'

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)"
};

const customTheme = extendTheme(
    {
      initialColorMode: "light",
      useSystemColorMode: false,
      fontWeight:{
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      letterSpacings: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "-0.3px",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
      },
      styles: {
        global: ({ colorMode }: { colorMode: ColorMode }) => ({
          body: {
            bg: {
              base: colorMode == "dark" ? "darkMode.500" : color.whiteSmoke,
              md: colorMode == "dark" ? "darkMode.500" : color.whiteSmoke,
            },
          },
        }),
      },
      components: {
        Button: {
          defaultProps: {
            colorScheme: "messenger",
          },
        },
        Text: {
          baseStyle: ({ colorMode }: { colorMode: ColorMode }) => ({
            color: colorMode === "dark" ? color.white : color.darkTeal,
          }),
        },
        Alert: {
          defaultProps: {
            borderRadius: '18px',
            border: '3px solid red'
          },
        },
        MultiSelect: MultiSelectTheme,
        Form: {
          variants: {
            floating: {
              container: {
                _focusWithin: {
                  label: {
                    ...activeLabelStyles
                  }
                },
                "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, .react-date-picker + label, .chakra-react-select--has-value + label": {
                  ...activeLabelStyles
                },
                label: {
                  top: 0,
                  left: 0,
                  zIndex: 2,
                  position: "absolute",
                  backgroundColor: "white",
                  pointerEvents: "none",
                  mx: 0,
                  px: "6px",
                  my: 2,
                  transformOrigin: "left top"
                }
              }
            }
          }
        }
      },
    },
  );
  
  export default customTheme;
  