import React from "react"
import ReactDOM from "react-dom"

function Main() {
  return (
    <>
      <h1>Hello</h1>
    </>
  )
}

ReactDOM.render(<Main />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
