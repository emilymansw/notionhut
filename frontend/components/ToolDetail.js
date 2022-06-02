import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Box, Badge, Button, Link, Image, Divider } from '@chakra-ui/react'
import ImageCarousel from './ImageCarousel'

export const SINGLE_TOOL_QUERY = gql`
  query SINGLE_TOOL_QUERY( $slug: String) {
    tools(where:{slug:{equals:$slug}}) {
      id
      name
      url
      slug
      description
      pricingDetail
    	type{name}
    	category{name}
    	logo{
        altText
        image{publicUrlTransformed}
      }
    	images{
        id
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;
export const ToolDetail = ({slug}) => {
  const { data, loading, error } = useQuery(SINGLE_TOOL_QUERY, 
    {
        variables: {
          slug,
        }}
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>; 
  if (data) 
  return(
    <Box mx="auto">
       <Box maxW='3xl' display='flex' alignItems="center" justifyContent="space-evenly" mb="4" mx="auto">
       <Box
          boxSize="80px"
          borderWidth="1px"
          boxShadow="base"
          bg="white"
          borderRadius="lg"
          mr="3"
        >
          <Image
            src= {data.tools[0].logo.image.publicUrlTransformed}
            alt={data.tools[0].logo.altText}
            boxSize="55px"
            m="11px"
            objectFit="contain"
          />
        </Box>
         <Box>
      <Box fontWeight="semibold" fontSize="lg"> {data.tools[0].name} </Box>
      <Badge> {data.tools[0].type.name} </Badge> <Badge> {data.tools[0].category.name} </Badge>
      <Box> {data.tools[0].pricingDetail} </Box>

      </Box>
        <Link href={data.tools[0].url} isExternal>
      <Button colorScheme='blue'>Get It</Button>
      </Link>
     </Box>
      
     <Box maxW='xl' mx="auto" mb={3}> {data.tools[0].description} </Box>
     <Divider maxW='xl' />

      <ImageCarousel images={data.tools[0].images}/>


    </Box>
  )
}

export default ToolDetail