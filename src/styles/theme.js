// @see: https://chakra-ui.com/docs/styled-system/theming/customize-theme
import { theme as chakraTheme, extendTheme } from '@chakra-ui/react'

const fonts = {
  ...chakraTheme.fonts,
  body: `"Segoe UI",-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  heading: `"Segoe UI",-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
}
const overrides = {
  ...chakraTheme,
  fonts,
  global: props => ({
    color: props.colorMode === 'dark' ? 'white' : 'black',
  }),
}

const customTheme = extendTheme(overrides)

export default customTheme
