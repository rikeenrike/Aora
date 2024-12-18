import { useEffect, useState } from "react";

const useAppwritehook = (fn: () => any) => {

    const [data , setData] = useState<Record<string, any> | null>(null);
    const [loading, setLoading] = useState(true)
  

    const fetchPosts = async () => {
      try {
        const posts = await fn()
        if (posts) {
          setData(posts)
        }
        setLoading(false)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
      fetchPosts()
    }, [])
  
    const refetch = async () => {
        setLoading(true)
        await fetchPosts()
        setLoading(false)
        }


    return { data, loading, refetch }
}

export { useAppwritehook }