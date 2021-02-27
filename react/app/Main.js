import React from "react"
import ReactDOM from "react-dom"

function ExampleComponent() {
  return (
    <div>
      <h1>App Heading</h1>
      <p>All setup, now you can proceed.</p>
    </div>
  )
}

ReactDOM.render(<ExampleComponent />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
