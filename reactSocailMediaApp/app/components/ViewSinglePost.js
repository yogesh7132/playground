import React, { useEffect, useState, useContext } from "react"
import Page from "./Page"
import Axios from "axios"
import { useParams, Link, withRouter } from "react-router-dom"
import LoadingDotIcon from "./LoadingDotIcon"
import ReactMarkdown from "react-markdown"
import ReactTooltip from "react-tooltip"
import NotFound from "./NotFound"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"

function ViewSinglePost(props) {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState([])

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${id}`, { cancelToken: ourRequest.token })
        // console.log(response.data)
        setPost(response.data)
        setIsLoading(false)
      } catch (e) {
        console.log("There is a problem")
      }
    }
    fetchPost()
    return () => {
      ourRequest.cancel()
    }
  }, [])

  if (!isLoading && !post) {
    return <NotFound />
  }

  if (isLoading) {
    return (
      <Page title="...">
        <div>
          <LoadingDotIcon />
        </div>
      </Page>
    )
  }

  const date = new Date(post.createdDate)
  const formatedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

  function isOwner() {
    if (appState.loggedIn) {
      return appState.user.username == post.author.username
    }
    return false
  }

  async function deleteHandler() {
    const areYouSure = window.confirm("Do you really want to delete this post")
    if (areYouSure) {
      try {
        const response = await Axios.delete(`/post/${id}`, { data: { token: appState.user.token } })
        if (response.data == "Success") {
          // display a flash message
          appDispatch({ type: "flashMessage", value: "The post was successfully deleted." })
          // redirect back to the current user's profile
          props.history.push(`/profile/${appState.user.username}`)
        }
      } catch (e) {
        console.log("There was a problem")
      }
    }
  }

  return (
    <Page title={post.title}>
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        {isOwner() && (
          <span className="pt-2">
            <Link to={`/post/${id}/edit`} data-tip="Edit" data-for="edit" className="text-primary mr-2">
              <i className="fas fa-edit"></i>
            </Link>
            <ReactTooltip id="edit" className="custom-tooltip" />
            <a onClick={deleteHandler} className="delete-post-button text-danger" data-tip="Delete" data-for="delete">
              <i className="fas fa-trash"></i>
            </a>
            <ReactTooltip id="delete" className="custom-tootip" />
          </span>
        )}
      </div>

      <p className="text-muted small mb-4">
        <Link to={`/profile/${post.author.username}`}>
          <img className="avatar-tiny" src={post.author.avatar} />
        </Link>
        Posted by <Link to={`/profile/${post.author.username}`}>{post.author.username}</Link> on {formatedDate}
      </p>

      <div className="body-content">
        <ReactMarkdown children={post.body} allowedTypes={["paragraph", "strong", "text", "emphasis", "heading", "list", "listItem"]} />
      </div>
    </Page>
  )
}

export default withRouter(ViewSinglePost)
