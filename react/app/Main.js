import React from "react"
import ReactDOM from "react-dom"

const useState = React.useState

// Header ---------------------------------------------
function Header() {
  return <h1 className="special">App Header</h1>
}

// TimeArea ---------------------------------------------
function TimeArea() {
  const [theTime, setTime] = useState(new Date().toLocaleString())

  setTimeout(function () {
    setTime(new Date().toLocaleString())
  }, 1000)
  return (
    <p>
      The current time is{" "}
      <b>
        <u>{theTime}</u>
      </b>
    </p>
  )
}

// LikeArea ---------------------------------------------
function LikeArea() {
  const [likeCount, setLikeCount] = useState(10)

  function increaseLikeHandler() {
    setLikeCount(prev => prev + 1)
  }

  function decreaseLikeHandler() {
    setLikeCount(prev => {
      if (prev > 0) {
        return (prev = prev - 1)
      }
      return 0
    })
  }
  return (
    <>
      <span>
        This page has{" "}
        <b>
          <u>{likeCount}</u>
        </b>{" "}
        likes.
      </span>
      <button onClick={increaseLikeHandler}>Increase Like</button>
      <button onClick={decreaseLikeHandler}>Decrease Like</button>
      <br />
      <br />
    </>
  )
}

// AddPetsForm ---------------------------------------------
function AddPetsForm(props) {
  const [name, setName] = useState("")
  const [species, setSpecies] = useState("")
  const [age, setAge] = useState("")

  function submitHandler(e) {
    e.preventDefault()
    props.setPets(prev => prev.concat({ name, species, age, id: Date.now() }))

    setName("")
    setSpecies("")
    setAge("")
  }
  return (
    <>
      <form onSubmit={submitHandler}>
        <fieldset>
          <legend>Add Pet Details:</legend>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
          <input type="text" value={species} onChange={e => setSpecies(e.target.value)} placeholder="Species" />
          <input type="text" value={age} onChange={e => setAge(e.target.value)} placeholder="Age" />
          <button>Add Pet</button>
        </fieldset>
      </form>
    </>
  )
}

// DisplayPets ---------------------------------------------
function DisplayPets(props) {
  return (
    <>
      <li>
        {props.name} is a {props.species} is {props.age} years old.
        <button>Delete</button>
      </li>
    </>
  )
}

// Footer ---------------------------------------------
function Footer() {
  return <small>Copyright @ Footer</small>
}

// OurApp ---------------------------------------------
function OurApp() {
  const [pets, setPets] = useState([
    { name: "Meowsalot", species: "cat", age: "2", id: 1234 },
    { name: "Barksalot", species: "dog", age: "3", id: 2234 },
    { name: "Purrsalot", species: "cat", age: "5", id: 3234 },
    { name: "Fluffsalot", species: "rabbit", age: "4", id: 4234 }
  ])
  return (
    <>
      <Header />
      <hr />
      <TimeArea />
      <LikeArea />
      <br />
      <AddPetsForm setPets={setPets} />
      <h2>Pet Details:</h2>
      <ul>
        {pets.map(pet => {
          return <DisplayPets name={pet.name} species={pet.species} age={pet.age} />
        })}
      </ul>
      <hr />
      <Footer />
    </>
  )
}

// Render ---------------------------------------------
ReactDOM.render(<OurApp />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
