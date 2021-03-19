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
      if(value != "" && value != this.previousValue){
        clearInterval(this.timingWaitTimer)
        this.showLoaderIcon()
        this.timingWaitTimer = setTimeout(()=> this.sendRequest(),3000)
      }
      this.previousValue = value
    }
    showLoaderIcon(){
      this.loaderItem.classList.add("circle-loader--visible")
    }
    sendRequest(){
      axios.post("/search",{searchTerm: this.inputFeild.value}).then((response)=>{
        console.log(response)
      }).catch(()=>{
        alert("Hello, the request failed")
      })
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
              <div class="list-group shadow-sm">
                <div class="list-group-item active"><strong>Search Results</strong> (4 items found)</div>
    
                <a href="#" class="list-group-item list-group-item-action">
                  <img class="avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128"> <strong>Example Post #1</strong>
                  <span class="text-muted small">by barksalot on 0/14/2019</span>
                </a>
                <a href="#" class="list-group-item list-group-item-action">
                  <img class="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128"> <strong>Example Post #2</strong>
                  <span class="text-muted small">by brad on 0/12/2019</span>
                </a>
                <a href="#" class="list-group-item list-group-item-action">
                  <img class="avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128"> <strong>Example Post #3</strong>
                  <span class="text-muted small">by barksalot on 0/14/2019</span>
                </a>
                <a href="#" class="list-group-item list-group-item-action">
                  <img class="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128"> <strong>Example Post #4</strong>
                  <span class="text-muted small">by brad on 0/12/2019</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>`)
    }
}