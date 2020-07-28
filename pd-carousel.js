export class pdCarousel extends HTMLElement {
  constructor() {
    super();
    this.sRoot = this.attachShadow({
      mode: 'open'
    });	
	this.img = null;
	this.cTitle = null;
	this.introText = null;
	this.wordsLengthTime = 0;
	this.index = 1;
	this.images = [];
	this.cTitles = [];
	this.introTexts = [];
	this.ceiling = 0;
	this.removalTimeout = null;	
  }
  init() { 
	let self = this;
	self.prepareCSS();	
	self.prepareTemplate();	
	self.showSlide();
	self.sRoot.addEventListener("click", (e) => {
		if(e.target.hasAttribute('active') && e.target.getAttribute('active') == 'true') {
			self.setIndicatorsInactive();
		}
		
		let indicators = self.sRoot.querySelectorAll(".indicators-container pd-indicator[data-slide]");
			indicators.forEach((indicator) => {
				if(e.target == indicator) {				
					self.index = e.target.dataset.slide;
					if(!(self.isEmpty(self.img) && self.isEmpty(self.cTitle) && self.isEmpty(self.introtext))) {
						self.cTitle.classList.replace("slide-left-in","slide-left-out");
						self.introText.classList.replace("slide-right-in","slide-right-out");
						setTimeout(() => {
							self.img.classList.replace("zoom-in","zoom-out");				
							setTimeout(() => {
								self.img.classList.remove("zoom-out");
								self.cTitle.classList.remove("slide-left-out");
								self.introText.classList.remove("slide-right-out");
								if(!(self.isEmpty(self.img) && self.isEmpty(self.cTitle) && self.isEmpty(self.introtext))) {
									self.sRoot.removeChild(self.img);
									self.sRoot.removeChild(self.cTitle);
									self.sRoot.removeChild(self.introText);	
								}
								clearTimeout(self.removalTimeout);
								self.showSlide();
							},700);
						},700);
					}
				}
			});			
	});
  }
  setIndicatorsInactive() {
	let pdIndicators = this.sRoot.querySelectorAll(".indicators-container pd-indicator[data-slide]");
    pdIndicators.forEach((pdi,index) => {
		pdi.removeAttribute("active");
	});
  }
  prepareTemplate() {
    let template = '';
    if(!this.isEmpty(document.querySelector("template[data-pd-carousel-id=\""+this.id+"\"]")) || !this.isEmpty(document.querySelector("template[data-for=\"pd-carousel\"]"))) {
	    template = !this.isEmpty(this.id) ? document.querySelector("template[data-pd-carousel-id=\""+this.id+"\"]").content.cloneNode(true) : document.querySelector("template[data-for=\"pd-carousel\"]").content.cloneNode(true);
    }
	if(this.isEmpty(template)) {
		let doc = new DOMParser().parseFromString('<template data-for="pd-carousel" data-pd-carousel-id="image-gallery"></template>', 'text/html');
		let templateContent = doc.querySelector("template");
		templateContent.innerHTML = '<style>img { width: 100%; height: 100%; }</style><img src="https://picsum.photos/1200/900" data-slide="1"/><img src="https://picsum.photos/1201/900" data-slide="2"/><img src="https://picsum.photos/1200/901" data-slide="3"/><div class="title" data-slide="1">Turpis consequat</div><div class="title" data-slide="2">Fusce eget turpis consequat, cursus ante id, vehicula nisl</div><div class="title" data-slide="3">Maecenas porta quis nisi sit amet fermentum</div><div class="introtext" data-slide="1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac facilisis eros. Nullam feugiat ex vel ornare sagittis. Etiam blandit lectus nec dui mollis fermentum. Suspendisse pellentesque eros at risus vehicula porta. Quisque dui tellus, ullamcorper eget diam sit amet, venenatis condimentum odio. Vivamus eget viverra leo. Mauris fringilla metus dolor, porta finibus tortor gravida sed.</div><div class="introtext" data-slide="2">Suspendisse iaculis, velit vitae vestibulum volutpat, mauris sapien tempor diam, eu pellentesque arcu ex quis neque. Sed nec mauris at purus viverra scelerisque. Donec metus risus, ultrices in gravida vel, porttitor interdum lectus. Aliquam faucibus metus sed laoreet placerat. Praesent efficitur enim dictum, molestie velit vitae, hendrerit magna. Sed et dolor vel lectus blandit tristique. Cras tristique nec sapien quis pellentesque. Nunc nec ullamcorper sapien. Nulla fermentum quis mi id interdum. Quisque gravida ipsum non euismod pellentesque. Aenean placerat nec tortor eget porta.</div><div class="introtext" data-slide="3">Pellentesque quis ex sem. Donec congue, massa ac ultrices bibendum, dolor justo rutrum arcu, dapibus pharetra magna lorem eget sem. Etiam ex lectus, venenatis nec lectus at, lobortis euismod tortor. Donec nec ipsum eget nisl finibus tempor at vitae augue. Fusce ipsum nibh, elementum non ante nec, eleifend molestie nulla. Aenean vitae pharetra ex. Praesent a quam ut tellus molestie vestibulum. Proin nec hendrerit ante. Aenean aliquam arcu nec dolor lobortis bibendum.</div><div class="indicators-container"><pd-indicator type="circle" data-slide="1"></pd-indicator><pd-indicator type="circle" data-slide="2"></pd-indicator><pd-indicator type="circle" data-slide="3"></pd-indicator></div>';
		template = templateContent.content.cloneNode(true);
	}	
	let indicatorsContainer = template.querySelector(".indicators-container");	
	this.images = Array.from(template.querySelectorAll("img"));
	this.cTitles = Array.from(template.querySelectorAll(".title"));
	this.introTexts = Array.from(template.querySelectorAll(".introtext"));	
	this.sRoot.appendChild(indicatorsContainer);
	this.ceiling = this.images.length;
	
  }
  prepareCSS() {
	let css = '.slide, img {width:100%;height:100%;display:block;margin:0;padding:0}.indicators-container{width:60%;display:flex;align-items:center;align-content:center;justify-content:center;height:5vh;padding:0;font-size:1rem;position:fixed;bottom:2vmax;margin:0 20%;z-index: 999;}.indicators-container pd-indicator{padding-left:.875rem}.title{text-align: center;border-radius: 0.25rem; position: fixed; top: 5%;left:5%;right: 5%; width: 90%;font-size: 10vmin;filter: drop-shadow(0 0 0.75rem rgba(255, 255, 255, 0.95));line-height:10vmin;padding: 0.75rem;}.introtext{display: block; position: fixed; bottom: calc( 5vh + 3vmax );left:calc(5% - 0.75rem);right: calc(5% - 0.75rem);width: 90%;font-size: 3.875vmin;filter: drop-shadow(-.0625rem .125rem .175rem rgba(50, 50, 0, 0.5));background-color: rgba(255,255,255,0.175);background-image: linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.35) 45%, rgba(206,206,207,0.25) 100%);filter: drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.95));opacity: .75;color:#000;padding: 0.75rem;border-radius: .25rem;} .slide-left-in { animation: slideleftin 0.7s forwards normal ease-in;} @keyframes slideleftin { 0% { opacity:0; transform:translateX(100%); } 100% { opacity:1 ;transform:translateX(0%); } } .slide-left-out { animation: slideleftout 0.7s forwards normal ease-in;} @keyframes slideleftout { 0% { opacity:1 ;transform:translateX(0%); } 100% { opacity:0; transform:translateX(100%); } }.slide-right-in { animation: sliderightin 0.7s forwards normal ease-in;} @keyframes sliderightin { 0% { opacity:0; transform:translateX(-100%); } 100% { opacity:1 ;transform:translateX(0%); } } .slide-right-out { animation: sliderightout 0.7s forwards normal ease-in;} @keyframes sliderightout { 0% { opacity:1 ;transform:translateX(0%); } 100% { opacity:0; transform:translateX(-100%); } }.zoom-in { animation: zoomin 0.7s forwards normal ease-in;} @keyframes zoomin { 0% { opacity:0; transform:scale(0.25); } 50% { opacity:0.65; transform:scale(0.85); } 100% { opacity:1 ;transform:scale(1); } } .zoom-out { animation: zoomout 0.7s forwards normal ease-in;} @keyframes zoomout { 0% { opacity:1 ;transform:scale(1); } 50% { opacity:0.65; transform:scale(0.85); } 100% { opacity:0; transform:scale(0.25); } }';
    let Style = document.createElement("style");
    Style.append(css);
    this.sRoot.appendChild(Style);
  }
  showSlide() {	  	
	this.img = this.images.filter(item => item.dataset.slide == this.index)[0];
	this.img.classList.add("zoom-in");
		setTimeout(() => {
			this.cTitle = this.cTitles.filter(item => item.dataset.slide == this.index)[0];
			this.cTitle.classList.add("slide-left-in");
			this.introText = this.introTexts.filter(item => item.dataset.slide == this.index)[0];	
			this.wordsLengthTime = !this.isEmpty(this.introText) ? 1000*parseInt(this.introText.textContent.split(" ").length/1.25) : 30000 ;
			this.introText.classList.add("slide-right-in");
			this.sRoot.querySelector(".indicators-container pd-indicator[data-slide=\""+this.index+"\"]").setAttribute("active","true");
			this.sRoot.appendChild(this.img);
			this.sRoot.appendChild(this.cTitle);
			this.sRoot.appendChild(this.introText);	
			this.removalTimeout = setTimeout(() => {
				if(!(this.isEmpty(this.img) && this.isEmpty(this.cTitle) && this.isEmpty(this.introtext))) {
					this.cTitle.classList.replace("slide-left-in","slide-left-out");
					this.introText.classList.replace("slide-right-in","slide-right-out");
					setTimeout(() => {
						this.img.classList.replace("zoom-in","zoom-out");
						
						setTimeout(() => {
							this.img.classList.remove("zoom-out");
							this.cTitle.classList.remove("slide-left-out");
							this.introText.classList.remove("slide-right-out");
							if(!(this.isEmpty(this.img) && this.isEmpty(this.cTitle) && this.isEmpty(this.introtext))) {
								this.sRoot.removeChild(this.img);
								this.sRoot.removeChild(this.cTitle);
								this.sRoot.removeChild(this.introText);	
							}
							clearTimeout(this.removalTimeout);
							this.sRoot.querySelector(".indicators-container pd-indicator[data-slide=\""+this.index+"\"]").removeAttribute("active");
							this.index++;
							if(this.index > this.ceiling) {
								this.index = 1;
							}
							this.showSlide();
						},700);
					},700);
				}
			},this.wordsLengthTime);		
		},700);		
  }
  isEmpty(value) {
    switch (true) {
      case (value == null || value == undefined):
        return true;
      case (Array.isArray(value)):
        return value.length == 0;
      case (typeof value == 'object'):
        return (Object.keys(value).length === 0 && value.constructor === Object);
      case (typeof value == 'string'):
        return value.length == 0;
      case (typeof value == 'number' && !isNaN(value)):
        return value == 0;
      case (!value):
        return true;
      default:
        return false;
    }
  }
    disconnectedCallback() {
    console.log('Disconnected.');
  }

  adoptedCallback() {
    console.log('Adopted.');
  }

  connectedCallback() {
	this.init();
  }
 
  attributeChangedCallback(name, oldValue, newValue) {
    if (name == "id") {
      this.init();
    }
  }
}
if (!window.customElements.get('pd-carousel')) {
  window.pdCarousel = pdCarousel;
  window.customElements.define('pd-carousel', pdCarousel);
}

