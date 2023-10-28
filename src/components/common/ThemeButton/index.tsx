import { IconButton, useColorMode } from '@chakra-ui/react'
import { FiMoon, FiSun } from 'react-icons/fi'

export default function ThemeButtonComponent({ styleProps }: any): JSX.Element {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      aria-label="Change Theme Mode"
      icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
      {...styleProps}
      onClick={toggleColorMode}
    />
  )
}
