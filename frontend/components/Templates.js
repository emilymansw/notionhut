import { Box, Image, Badge, Skeleton } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import InfiniteScroll from './InfiniteScroll'
import Link from 'next/link'

export const ALL_TEMPLATES_QUERY = gql`
  query ALL_TEMPLATES_QUERY($take: Int, $skip: Int) {
    templates(take: $take, skip: $skip) {
      id
      name
      pricing {
        name
      }
      source
      url
      images {
        id
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export const ALL_TEMPLATES_COUNT = gql`
  query ALL_TEMPLATES_COUNT {
    templatesCount
  }
`;

const Templates = () => {
  const { data, error, loading, fetchMore, networkStatus  } = useQuery(ALL_TEMPLATES_QUERY, {
    variables: {
      take: 9,
      skip: 0
    }, notifyOnNetworkStatusChange: true})
  
  const { data:templatesCountData, error:templatesCountError, loading:templatesCountLoading } = useQuery(ALL_TEMPLATES_COUNT);

  if (error) return <p>Error: {error.message}</p>;
  const areMoreTemplates = data?.templates?.length < templatesCountData?.templatesCount
  return (
    <Box>
    <Box
      padding={4}
      w="100%"
      maxW="1300px"
      mx="auto"
      sx={{ columnCount: [1, 2, 3], columnGap: "20px" }}
    >
      {loading || !data && new Array(9).fill(0).map((_, i)=>(<Skeleton key={i} height="500px" borderRadius="sm" rounded="md"/>))}

      {data?.templates.map((template) => (
        <Link key = {template.id} href={template.url} isExternal>
          <Box
            position="relative"
            maxHeight="500px"
            overflow="hidden"
            borderRadius="sm"
            boxShadow="md"
            rounded="md"
            bg="white"
            mb={3}
            sx={{ "break-inside": "avoid" }}
            _hover = { { transform: "scale(1.03)", cursor: "pointer"} }
          >
            <Image
              key={template.id}
              w="100%"
              src={template.images[0].image.publicUrlTransformed}
              alt="Alt"
              p="2"
              mb="50px"
            />
            <Box
              borderTop="1px solid #EEEEEE"
              position="absolute"
              bg="#FDFDFD"
              w="100%"
              h="80px"
              zIndex="3"
              bottom="0px"
            >
              <Box p="3">
                <Box display="flex" alignItems="center">
                  <Badge
                    borderRadius="md"
                    px="1"
                    py="0.3"
                    colorScheme="teal"
                    fontSize="11px"
                  >
                    {template.pricing.name}
                  </Badge>
                  <Box
                    color="gray.500"
                    fontWeight="semibold"
                    fontSize="xs"
                    ml="2"
                  >
                    type &bull; category
                  </Box>
                </Box>

                <Box
                  mt="1"
                  fontWeight="semibold"
                  fontSize="13px"
                  as="h4"
                  lineHeight="tight"
                  sx={{ "break-before": "avoid" }}
                >
                  {template.name}
                </Box>
              </Box>
            </Box>
          </Box>
        </Link>
      ))}
    </Box>
    {areMoreTemplates && <InfiniteScroll fetchMore={fetchMore} skip={data.templates.length} items={data.templates}/> }
    <p> </p>
    </Box>
  );
};
export default Templates;
