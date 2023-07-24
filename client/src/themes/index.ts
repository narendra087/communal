import {
  DividerProps,
  extendTheme,
  type ThemeConfig,
} from '@chakra-ui/react'
import type { GlobalStyleProps, StyleConfig } from "@chakra-ui/theme-tools"

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

const components: Record<string, StyleConfig> = {
  Divider: {
    baseStyle: ({colorMode}) => ({
      borderColor: colorMode === 'dark' ? 'gray.500' : 'gray.300'
    })
  }
}

export const customTheme = extendTheme({
  config,
  styles,
  components,
})