import DOMPurify from "dompurify"
import axios from "axios"
export default class Search{
    // 1. Select DOM elements and keep track of any useful function
    constructor(){
        this.innerHTML()
        this.headerSearchIcon = document.querySelector(".header-search-icon")
        this.overlay = document.querySelector(".search-overlay")
        this.closeIcon = document.querySelector(".close-live-search")
        this.inputFeild = document.querySelector(".live-search-field")
        this.resultArea = document.querySelector(".live-search-results")
        this.loaderItem = document.querySelector(".circle-loader")
        this.timingWaitTimer
        this.previousValue = ""
        this.events()
    }

    // 2. Events
    events(){
        this.inputFeild.addEventListener("keyup", ()=> this.keyPressHandler())
        this.closeIcon.addEventListener("click", ()=>this.closeOverlay())
        this.headerSearchIcon.addEventListener("click", (e)=>{
            e.preventDefault()
            this.openOverlay()
        })
    }

    // 3. Methods
    keyPressHandler(){
      let value = this.inputFeild.value
      if(value == ""){
        clearInterval(this.timingWaitTimer)
        this.hideLoaderIcon()
        this.hideResultArea()
      }

      if(value != "" && value != this.previousValue){
        clearInterval(this.timingWaitTimer)
        this.showLoaderIcon()
        this.hideResultArea()
        this.timingWaitTimer = setTimeout(()=> this.sendRequest(),750)
      }
      this.previousValue = value
    }

    showLoaderIcon(){
    this.loaderItem.classList.add("circle-loader--visible")
    }
    hideLoaderIcon(){
    this.loaderItem.classList.remove("circle-loader--visible")
    }
    showResultArea(){
      this.resultArea.classList.add("live-search-results--visible")
    }
    hideResultArea(){
      this.resultArea.classList.remove("live-search-results--visible")
    }
    sendRequest(){
      axios.post("/search",{searchTerm: this.inputFeild.value}).then((response)=>{
        // console.log(response.data)  
        this.renderPostHTML(response.data)
      }).catch(()=>{
        alert("Hello, the request failed")
      })
    }
    renderPostHTML(posts){
      if(posts.length){
        this.resultArea.innerHTML= DOMPurify.sanitize(`<div class="list-group shadow-sm">
        <div class="list-group-item active"><strong>Search Results</strong> (${posts.length > 1?`${posts.length} items found`: "1 item found"})</div>
        ${posts.map( post =>{
          let postDate = new Date(post.createdDate)
          return `<a href="/post/${post._id}" class="list-group-item list-group-item-action">
          <img class="avatar-tiny" src="${post.author.avatar}"> <strong>${post.title}</strong>
          <span class="text-muted small">by ${post.author.username} on ${postDate.getDate()}/${postDate.getMonth()+1}/${postDate.getFullYear()} </span>
        </a>`})}</div>
        </div>`)
      }else{
        this.resultArea.innerHTML=`<p class="alert alert-danger text-center shadow-sn"> Sorry, we could find any results for the search</p>`
      }
      this.hideLoaderIcon()
      this.showResultArea()
    }
    openOverlay(){
        this.overlay.classList.add("search-overlay--visible")
        setTimeout(()=> this.inputFeild.focus() ,50)
    }
    closeOverlay(){
        this.overlay.classList.remove("search-overlay--visible")
    }
    innerHTML(){
        document.body.insertAdjacentHTML("beforeend",`<div class="search-overlay">
        <div class="search-overlay-top shadow-sm">
          <div class="container container--narrow">
            <label for="live-search-field" class="search-overlay-icon"><i class="fas fa-search"></i></label>
            <input type="text" id="live-search-field" class="live-search-field" placeholder="What are you interested in?">
            <span class="close-live-search"><i class="fas fa-times-circle"></i></span>
          </div>
        </div>
    
        <div class="search-overlay-bottom">
          <div class="container container--narrow py-3">
            <div class="circle-loader"></div>
            <div class="live-search-results">
              
          </div>
        </div>
      </div>`)
    }
}