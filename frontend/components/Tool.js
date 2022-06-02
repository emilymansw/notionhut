import { Box, Image, Badge, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody} from "@chakra-ui/react";
import Link from 'next/link'
import { useRouter } from "next/router";
import ToolDetail from "./ToolDetail";

const Tool = ({ logo, name, pricing, type, category, description, slug }) => {
  const router = useRouter()

  return (
    <>
    <Link href={`/tools/?slug=${slug}`} as={`/tool/${slug}`}>
      <a>
      
      <Box
        w="300px"
        h="250px"
        borderWidth="1px"
        boxShadow="base"
        bg="white"
        borderRadius="lg"
        mt={9}
        pos="relative"
        _hover = { { transform: "scale(1.03)", cursor: "pointer"} }

      >
        <Box
          boxSize="70px"
          pos="absolute"
          left="6"
          top="-9"
          borderWidth="1px"
          boxShadow="base"
          bg="white"
          borderRadius="lg"
        >
          <Image
            src={logo}
            alt={name}
            boxSize="55px"
            m="7px"
            objectFit="contain"
          />
        </Box>

        <Box p="5" mt="6">
          <Box display="flex" alignItems="center">
            <Badge borderRadius="md" px="1.5" py="0.5" colorScheme="teal">
              {pricing}
            </Badge>
            <Box color="gray.500" fontWeight="semibold" fontSize="xs" ml="2">
              {type} &bull; {category}
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            fontSize="lg"
            as="h4"
            lineHeight="tight"
          >
            {name}
          </Box>

          <Box as="span" color="gray.600" fontSize="sm" noOfLines={4}>
            {description}
          </Box>
        </Box>
      </Box>
      </a>
    </Link>
    
    </>
  );
};

export default Tool;
