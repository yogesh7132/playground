import React, { useEffect, useContext, useState } from "react"
import Axios from "axios"
import { useParams, Link } from "react-router-dom"
import LoadingDotIcon from "./LoadingDotIcon"

function ProfileFollowing() {
  const { username } = useParams()
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    async function fetchPost() {
      try {
        const response = await Axios.get(`/profile/${username}/following`, { cancelToken: ourRequest.token })
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
      {posts.map((follower, index) => {
        return (
          <Link key={index} to={`/profile/${follower.username}`} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={follower.avatar} /> {follower.username}
          </Link>
        )
      })}
    </div>
  )
}

export default ProfileFollowing
