import { Checkbox, Stack } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const CheckboxGroup = ({group}) => {
  const checkedItemsState = Array(group.length).fill(false)
  const [checkedItems, setCheckedItems] = useState(checkedItemsState)
  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked
  const [filterParam, setfilterParam] =  useState("")
  const router = useRouter();

  useEffect(()=>{
    allChecked && setfilterParam("all")
    const checkedIndex = []
    checkedItems.map((item, index)=>{ if(item==true)checkedIndex.push(index)})
    !allChecked  && setfilterParam(checkedIndex.map((item)=>(group[item].slug)).join(","))
  },[checkedItems])

  useEffect(()=>{
    if(filterParam !== ""){
      router.push({ 
        pathname: '/tools', 
        query: { ...router.query, [group[0].__typename] : filterParam} 
      })
    }else{
      const newQuery = {}
      for (const param in router.query){
        if(param !== group[0].__typename){
          newQuery[param] = router.query[param]
        }
      }
      router.push({ 
        pathname: '/tools', 
        query: newQuery
      })
    }
    
  },[filterParam])

  

  return (
    <Box mb={2}>
      <Checkbox
        fontWeight= "bold"
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={(e) => setCheckedItems(Array(checkedItems.length).fill(e.target.checked))}
      >
        {group[0].__typename}
      </Checkbox>
      <Stack pl={6} mt={1} spacing={1}>
      { group.map((item, index)=>(
        <Checkbox
          key={item.id}
          slug={item.slug}
          isChecked={checkedItems[index]}
          onChange={(e) => setCheckedItems(()=>{
            const CheckedItemsCopy = [...checkedItems]
            CheckedItemsCopy[index] = e.target.checked
            return CheckedItemsCopy
          })}
        >
          {item.name} 
          {group[0].__typename != "Pricing" && `(${item.toolsCount})`}
      </Checkbox>
      )) 
      
      }
      </Stack>
    </Box>
  )
}

export default CheckboxGroup
