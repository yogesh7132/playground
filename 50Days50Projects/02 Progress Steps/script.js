const progress = document.querySelector(".progress")
const circles = document.querySelectorAll(".circle")
const prev = document.querySelector("#prev")
const next = document.querySelector("#next")

let activeCircle = 1
let wid = 0

next.addEventListener("click", () => {
  activeCircle++
  if (activeCircle >= circles.length) {
    activeCircle = circles.length
    next.disabled = true
  }
  prev.disabled = false
  update()
})

prev.addEventListener("click", () => {
  activeCircle--
  if (activeCircle <= 1) {
    activeCircle = 1
    prev.disabled = true
  }
  next.disabled = false
  update()
})

function update() {
  circles.forEach((circle, idx) => {
    circle.classList.remove("active")
    if (idx < activeCircle) {
      circle.classList.add("active")
    }
  })
  wid = ((activeCircle - 1) / (circles.length - 1)) * 100
  console.log(wid)
  progress.style.width = `${wid}%`
}
