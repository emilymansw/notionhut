import { useState } from "react";
import {
  Box, Image, IconButton
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const ImageCarousel = ({images}) => {
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <Box minH="330px">
    {images.length > 1 ?
            <Box position="relative" w="50%" m="auto" >
              <IconButton
                aria-label="Search database"
                pos="absolute"
                top="calc(50% - 20px)"
                left="-20px"
                icon={<ChevronLeftIcon />}
                onClick={() => setImgIndex(()=>{return imgIndex == 0 ? imgIndex : imgIndex - 1})}
              />
              <Image src={images[imgIndex].image.publicUrlTransformed} alt={images[imgIndex].image.altText} minH="330px" objectFit="contain"/>
              <IconButton
                aria-label="Search database"
                onClick={() => setImgIndex(()=>{return imgIndex == images.length-1 ? images.length-1 : imgIndex + 1})}
                position="absolute"
                top="calc(50% - 20px)"
                right="-20px"
                icon={<ChevronRightIcon />}
              />
            </Box>
      :<Image src={images[0]?.image.publicUrlTransformed} alt={images[0]?.image.altText} w="50%" m="auto"/>}
    </Box>
  );
};

export default ImageCarousel;