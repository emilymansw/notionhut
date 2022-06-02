import Tool from './Tool'
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import InfiniteScroll from './InfiniteScroll'
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Skeleton, SimpleGrid, Box, Image, Badge, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody} from "@chakra-ui/react";
import { ToolDetail } from './ToolDetail';

export const TOOLS_QUERY= gql`
  query TOOLS_QUERY($pricing:[String!], $category:[String!], $type:[String!], $take:Int, $skip:Int) {
    tools(where: {AND:[
      {pricing:{slug:{in:$pricing}}},
      {category:{slug:{in:$category}}},
      {type:{slug:{in:$type}}}
    ]}, take:$take, skip:$skip) {
      id
      name
      slug
      url
      pricing {
        name
      }
      description
      type {
        name
      }
      category {
        name
      }
      logo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }`

export const TOOLS_COUNT = gql`
  query SELECTED_TOOLS_QUERY($pricing:[String!], $category:[String!], $type:[String!]) {
    toolsCount(where: {AND:[
      {pricing:{slug:{in:$pricing}}},
      {category:{slug:{in:$category}}},
      {type:{slug:{in:$type}}}
    ]})      
  }
`;

  

const Tools= () => {
  const [getTools, { data, error, loading, fetchMore }] = useLazyQuery(TOOLS_QUERY, {
    variables: {
      take: 9,
      skip: 0
    }, notifyOnNetworkStatusChange: true});


  const router = useRouter()

  
  useEffect(()=>{
    if(router.query !== {}){
      
      const pricing = undefined
      const category = undefined
      const type = undefined
      if (router.query.Pricing?.split(",").length > 0 && router.query.Pricing?.split(",")[0] !== "all") { pricing = router.query.Pricing?.split(",")}
      if (router.query.ToolCategory?.split(",").length > 0 && router.query.ToolCategory?.split(",")[0] !== "all") { category = router.query.ToolCategory?.split(",")}
      if (router.query.ToolType?.split(",").length > 0 && router.query.ToolType?.split(",")[0] !== "all") { type = router.query.ToolType?.split(",")}

      getTools({
        variables: { 
        take: 9,
        skip: 0,
        pricing: pricing,
        category: category,
        type: type
        }}
      )
    }
  },[router.query])

    const { data:toolsCountData, error:toolsCountError, loading:toolsCountLoading } = useQuery(TOOLS_COUNT);

    const areMoreTools = data?.tools?.length < toolsCountData?.toolsCount
    return (
        <Box mx='auto'>
        
        <SimpleGrid columns={{sm: 2, md: 2, lg:3}} spacing='20px'>
        {loading ||!data && <Skeleton maxHeight="500px" borderRadius="sm" rounded="md"/>}
        
            {data?.tools.map(
            tool => 
              <Tool 
                  key={tool.id}
                  logo={tool.logo.image.publicUrlTransformed} 
                  name={tool.name} 
                  description={tool.description} 
                  type={tool.type.name} 
                  category={tool.category.name} 
                  pricing={tool.pricing.name}
                  slug={tool.slug}
                  url={tool.url}
                  
              />
            )}
  
          

        </SimpleGrid>
        {areMoreTools && <InfiniteScroll fetchMore={fetchMore} skip={data.tools.length} items={data.tools} /> }
        <Modal isOpen={!!router.query.slug} onClose={()=> router.push("/tools")} size="xl">

          <ModalContent padding={2}>
          <ModalCloseButton />
            <ModalBody>
            <ToolDetail slug={router.query.slug}/>
            </ModalBody>
          </ModalContent>
        </Modal>    
        </Box>
    )
}

export default Tools
