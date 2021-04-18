import React, { useEffect, useContext, useState } from "react"
import Axios from "axios"
import { useParams, Link } from "react-router-dom"
import LoadingDotIcon from "./LoadingDotIcon"
import Post from "./Post"

function ProfilePost() {
  const { username } = useParams()
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    async function fetchPost() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`, { cancelToken: ourRequest.token })
        // console.log(r0esponse.data)
        setPosts(response.data)
        setIsLoading(false)
      } catch (e) {
        console.log("There is a problem")
      }
    }
    fetchPost()
    return () => {
      ourRequest.cancel()
    }
  }, [username])

  if (isLoading) {
    return (
      <div>
        <LoadingDotIcon />
      </div>
    )
  }
  return (
    <div className="list-group">
      {posts.map(post => {
        return <Post noAuthor={true} post={post} key={post._id} />
      })}
    </div>
  )
}

export default ProfilePost
