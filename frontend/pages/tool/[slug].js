import ToolDetail from '../../components/ToolDetail'
import { useRouter } from 'next/router'
const ToolPage = () => {
const router = useRouter()
const { slug } = router.query
  return (
    <ToolDetail slug={slug} pathname={router.pathname}/>
  )
}

export default ToolPage
