import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import CheckboxGroup from './CheckboxGroup';
import { Box } from '@chakra-ui/react'

export const ALL_TOOLTYPES_QUERY = gql`
  query ALL_TOOLTYPES_QUERY {
    toolTypes {
      id
      name
      slug
      toolsCount
    }
  }
`;

export const ALL_TOOLCATS_QUERY = gql`
  query ALL_TOOLCATS_QUERY {
    toolCategories {
      id
      name
      slug
      toolsCount
    }
  }
`;

export const ALL_PRICINGS_QUERY = gql`
  query ALL_PRICINGS_QUERY {
    pricings {
      id
      name
      slug
      __typename
    }
  }
`;

const ToolSidebar = () => {
const { data:typedata, error:typeerror, loading:typeloading } = useQuery(ALL_TOOLTYPES_QUERY)
const { data:catdata, error:caterror, loading:carloading } = useQuery(ALL_TOOLCATS_QUERY)
const { data:pricedata, error:priceerror, loading:priceloading } = useQuery(ALL_PRICINGS_QUERY)

if (typeloading || carloading || priceloading) return <p>Loading...</p>;
if (typeerror) return <p>Error: {typeerror.message}</p>;
if (caterror) return <p>Error: {caterror.message}</p>;
if (priceerror) return <p>Error: {priceerror.message}</p>;

return(
  <Box w="fit-content" ml='5'>
  <CheckboxGroup group={typedata.toolTypes}/>
  <CheckboxGroup group={pricedata.pricings}/>
  <CheckboxGroup group={catdata.toolCategories}/>
  </Box>
)

}
export default ToolSidebar