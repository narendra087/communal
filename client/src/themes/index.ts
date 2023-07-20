import {
  extendTheme,
  type ThemeConfig,
} from '@chakra-ui/react'
import type { GlobalStyleProps } from "@chakra-ui/theme-tools"

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}
const styles = {
  global: (props: GlobalStyleProps) => ({
    'html, body': {
      fontFamily: 'Rubik, sans-serif',
      color: props.colorMode === 'dark' ? 'white' : '#121212',
      background: props.colorMode === 'dark' ? '#121212' : 'white',
    },
  })
}

export const customTheme = extendTheme({
  config,
  styles,
})