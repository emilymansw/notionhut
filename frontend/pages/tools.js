import Tools from '../components/Tools'
import ToolSidebar from '../components/ToolSidebar'
import { Box } from '@chakra-ui/react'
import { useMediaQuery } from "@chakra-ui/react"

const ToolsPage = () => {
   const [isMobile] = useMediaQuery("(max-width: 768px)") 
  return (
    <Box display='flex'>
      {!isMobile && <ToolSidebar/>}
      <Tools />
    </Box>
  )
}

export default ToolsPage
