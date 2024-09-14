import { global } from "@/actions";
import { useGlobalContext } from "@/app/Context/store";
import { useEffect, useState } from "react";
export function usePosts(id) {
  const [loading, setLoading] = useState();
  const [posts, setPosts] = useState({});
  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/posts/getusersposts/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const post = await res.json();
        setPosts(post);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, [id]);
  return { posts };
}
