import React, { useEffect, useContext, useState } from "react"
import Axios from "axios"
import { useParams, Link } from "react-router-dom"

function ProfilePost() {
  const { username } = useParams()
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      async function fetchPost() {
        const response = await Axios.get(`/profile/${username}/posts`)
        console.log(response.data)
        setPosts(response.data)
        setIsLoading(false)
      }
      fetchPost()
    } catch (e) {
      console.log("There is a problem")
    }
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div className="list-group">
      {posts.map(post => {
        const date = new Date(post.createdDate)
        const formatedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        return (
          <Link key={post._id} to={`/post/${post._id}`} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={post.author.avatar} /> <strong>{post.title}</strong> {""}
            <span className="text-muted small">on {formatedDate} </span>
          </Link>
        )
      })}
    </div>
  )
}

export default ProfilePost
