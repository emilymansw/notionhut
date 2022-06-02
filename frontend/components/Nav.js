  import {
    HamburgerIcon,
    CloseIcon,
  } from '@chakra-ui/icons';
  
  import { Box, Flex, Text, Link } from "@chakra-ui/react";
  import { useState } from 'react'
  import NextLink from "next/link"

  const MenuItem = ({ children, isLast, href }) => {
    return (
      <Text
        mb={{ base: isLast ? 0 : 8, sm: 0 }}
        mr={{ base: 0, sm: isLast ? 0 : 8 }}
        display="block"
      >
        <NextLink href={href} passHref>
            <Link>{children}</Link>
        </NextLink>
      </Text>
    );
  };
  
  
  const Nav = () => {
    const [show, setShow] = useState(false);
    const toggleMenu = () => setShow(!show);
  
    return (
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        mb={8}
        p={8}
        bg={["primary.500", "primary.500", "transparent", "transparent"]}
        color={["white", "white", "primary.700", "primary.700"]}
      >
        <Flex align="center">
          <MenuItem href="/">NotionHut</MenuItem>
        </Flex>
  
        <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
          {show ? <CloseIcon /> : <HamburgerIcon />}
        </Box>
  
        <Box
          display={{ base: show ? "block" : "none", md: "block" }}
          flexBasis={{ base: "100%", md: "auto" }}
        >
          <Flex
            align="center"
            justify={["center", "space-between", "flex-end", "flex-end"]}
            direction={["column", "row", "row", "row"]}
            pt={[4, 4, 0, 0]}
          >
            <MenuItem href="/tools">Tools </MenuItem>
            <MenuItem href="/templates" isLast={true}>Templates </MenuItem>
          </Flex>
        </Box>
      </Flex>
    );
  };
  
  export default Nav;