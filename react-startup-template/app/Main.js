import React from "react"
import ReactDOM from "react-dom"

function Main() {
  return (
    <>
      <h1>This is an App</h1>
      <p>The sky is blue</p>
    </>
  )
}

ReactDOM.render(<Main />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
