import React, { useEffect, useState, useContext } from "react"
import Page from "./Page"
import Axios from "axios"
import { withRouter } from "react-router-dom"
import DispatchContext from "../DispatchContext"

function CreatePost(props) {
  const [title, setTitle] = useState()
  const [body, setBody] = useState()
  const appDispatch = useContext(DispatchContext)

  async function createPost(e) {
    e.preventDefault()
    try {
      const response = await Axios.post("/create-post", { title, body, token: localStorage.getItem("complexappToken") })
      appDispatch({ type: "flashMessage", value: "Post Created Successfully" })
      // Redirect to new post url
      props.history.push(`/post/${response.data}`)
    } catch (e) {
      console.log("Error: There is a problem while saving the post.")
    }
  }
  return (
    <Page title="Create Post">
      <form onSubmit={createPost}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input autoFocus name="title" onChange={e => setTitle(e.target.value)} id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea name="body" onChange={e => setBody(e.target.value)} id="post-body" className="body-content tall-textarea form-control" type="text"></textarea>
        </div>

        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  )
}

export default withRouter(CreatePost)