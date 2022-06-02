import { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";

const InfiniteScroll = ({ skip, fetchMore, items}) =>{
  const ref = useRef()
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        fetchMore({
          variables: {
            skip: skip
          },
        });
      }
    }, options);
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [items]);

  return <Box ref={ref}/>
}

export default InfiniteScroll