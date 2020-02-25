export class pdIndicator extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'color', 'active-color', 'active'];
  }
  constructor() {
    super();
    this.sRoot = this.attachShadow({
      mode: 'closed'
    });
	this.active = (this.getAttribute("active") == "true");
	console.log(this.active);
    this.indicatorStyles = ['moon', 'yin-yang', 'pointer', 'rectangle', 'circle', 'pacman', 'octastar', 'infinity', 'heart'];
    this.color = this.checkColor(this.getAttribute("color"));
    this.activeColor = this.checkColor(this.getAttribute("active-color"), true);
    this.focusColor = (parseInt(this.activeColor, 16)/2).toString(16);
    let type = this.getAttribute("type");
    this.type = (!this.isEmpty(type) && this.indicatorStyles.includes(type)) ? type : 'circle';
  }
  init() {
    let css = '.circle{width:1.75rem;height:1.75rem;border-radius:50%;background:#' + this.color + '}.rectangle{width:1.75rem;height:.25rem;border-radius:5%;background:#' + this.color + '}.pointer{width:2rem;height:.75rem;position:relative;background:#' + this.color + '}.pointer:after{content:"";position:absolute;left:0;bottom:0;width:0;height:0;border-top:.375rem solid transparent;border-bottom:.375rem solid transparent}.pointer:before{content:"";position:absolute;right:-.375rem;bottom:0;width:0;height:0;border-left:.375rem solid #' + this.color + ';border-top:.375rem solid transparent;border-bottom:.375rem solid transparent}.moon{width:1.75rem;height:1.75rem;border-radius:50%;box-shadow:.3rem .3rem 0 0 #' + this.color + '}.yin-yang{width:2rem;box-sizing:content-box;height:1rem;background:#fff;border-color:#' + this.color + ';border-style:solid;border-width:.0416rem .0416rem 1.0416rem .0416rem;border-radius:100%;position:relative}.yin-yang:before{content:"";position:absolute;top:50%;left:0;background:#fff;border:.375rem solid #' + this.color + ';border-radius:100%;width:.25rem;height:.25rem;box-sizing:content-box}.yin-yang:after{content:"";position:absolute;top:50%;left:50%;background:#' + this.color + ';border:.375rem solid #fff;border-radius:100%;width:.25rem;height:.25rem;box-sizing:content-box}.pacman{width:0;height:0;border-right:1rem solid transparent;border-top:1rem solid #' + this.color + ';border-left:1rem solid #' + this.color + ';border-bottom:1rem solid #' + this.color + ';border-top-left-radius:1rem;border-top-right-radius:1rem;border-bottom-left-radius:1rem;border-bottom-right-radius:1rem}@keyframes eat{from{border-right:1rem solid transparent}to{border-right:1rem solid #' + this.color + '}}.octastar{background:#' + this.color + ';width:1.75rem;height:1.75rem;position:relative;text-align:center;transform:rotate(20deg)}.octastar:before{content:"";position:absolute;top:0;left:0;height:1.75rem;width:1.75rem;background:#' + this.color + ';transform:rotate(135deg)}.infinity{position:relative;width:1.12rem;height:.47rem;box-sizing:border-box}.infinity:after,.infinity:before{position:absolute;content:"";box-sizing:content-box;width:.566rem;height:.566rem;border:.188rem solid #' + this.color + ';border-radius:.47rem .47rem 0 .47rem}.infinity:before{transform:rotate(-45deg)}.infinity:after{margin-left:1rem;transform:rotate(135deg)}.heart{position:relative;width:2rem;height:1.8rem}.heart:after,.heart:before{position:absolute;content:"";left:1rem;top:0;width:1rem;height:1.6rem;background:#' + this.color + ';border-radius:1rem 1rem 0 0;transform:rotate(-45deg);transform-origin:0 100%}.heart:after{left:0;transform:rotate(45deg);transform-origin:100% 100%}.heart.active:before,.octastar.active:before,.heart.active:after,.octastar.active:after,.octastar.active{ background:#' + this.activeColor + '}.infinity.active:before,.infinity.active:after{ border-color:#' + this.activeColor + '}.pacman.active{border-top: 1rem solid #' + this.activeColor + '; border-left: 1rem solid #' + this.activeColor + '; border-bottom: 1rem solid #' + this.activeColor + ';}.yin-yang.active { border-color: #' + this.activeColor + '; }.yin-yang.active:before { border: .375rem solid #' + this.activeColor + '; }.yin-yang.active:after { background: #' + this.activeColor + '; }.circle.active,.rectangle.active{ background:#' + this.activeColor + '}.moon.active{ box-shadow: .3rem .3rem 0 0 #' + this.activeColor + '}.pointer.active {background: #' + this.activeColor + ';}.pointer.active:before {border-left: .375rem solid #' + this.activeColor + ';}.switch{width:1.75rem;height:1rem;border:.125rem solid #' + this.color + ';border-radius:1rem;background-color:transparent}.switch>i{display:block;width:1.125rem;height:1rem;border:none;border-radius:.5rem;background-color:#' + this.color + ';padding:0;margin:0}.switch.active{border:.125rem solid #' + this.activeColor + '}.switch.active>i{float:right;animation:switch .3s;background-color:#' + this.activeColor + '}@keyframes switch{from{float:left}to{float:right}}.shadow{filter: drop-shadow(-.0625rem .125rem .175rem rgba(50, 50, 0, 0.5));}.heart.focus:before,.octastar.focus:before,.heart.focus:after,.octastar.focus:after,.octastar.focus{ background:#' + this.focusColor + '}.infinity.focus:before,.infinity.focus:after{ border-color:#' + this.focusColor + '}.pacman.focus{border-top: 1rem solid #' + this.focusColor + '; border-left: 1rem solid #' + this.focusColor + '; border-bottom: 1rem solid #' + this.focusColor + ';}.yin-yang.focus { border-color: #' + this.focusColor + '; }.yin-yang.focus:before { border: .375rem solid #' + this.focusColor + '; }.yin-yang.focus:after { background: #' + this.focusColor + '; }.circle.focus,.rectangle.focus{ background:#' + this.focusColor + '}.moon.focus{ box-shadow: .3rem .3rem 0 0 #' + this.focusColor + '}.pointer.focus {background: #' + this.focusColor + ';}.pointer.focus:before {border-left: .375rem solid #' + this.focusColor + ';}';
    if (!this.isEmpty(this.sRoot.querySelector("style"))) {
      this.sRoot.querySelector("style").remove();
    }
    if (!this.isEmpty(this.sRoot.querySelector("p"))) {
      this.sRoot.querySelector("p").remove();
    }
    let Style = document.createElement("style");
    Style.append(css);
    this.sRoot.appendChild(Style);
    let p = document.createElement("p");
    p.classList.add(this.type);
    if (this.type == "switch") {
      let i = document.createElement("i");
      p.appendChild(i);
    }
      p.addEventListener('mouseover', (e) => {
        e.preventDefault();
        e.target.classList.add('focus');
      });
      p.addEventListener('mouseout', (e) => {
        e.preventDefault();
        e.target.classList.remove('focus');
      });
    p.classList.add('shadow');
    p.addEventListener('click', (e) => {
      e.preventDefault();
      e.target.classList.toggle('active');
    });
	if(!this.isEmpty(this.active)) {
		p.click();
	}
    this.sRoot.append(p);
  }
  checkColor(color, active = false) {
    let regex = RegExp('[0-9a-fA-F]{6}', 'g');
    return !this.isEmpty(color) && regex.test(color) ? color : (!active ? '232323' : 'ff0000');
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
      case (typeof value == 'number'):
        return value == 0;
      case (!value):
        return true;
      default:
        return false;
    }
  }
  connectedCallback() {
    this.color = this.checkColor(this.getAttribute("color"));
    this.activeColor = this.checkColor(this.getAttribute("active-color"), true);
    let type = this.getAttribute("type");
    this.type = (!this.isEmpty(type) && this.indicatorStyles.includes(type)) ? type : 'circle';
	this.active = (this.getAttribute("active") == "true");
    this.init();
  }
  disconnectedCallback() {
    console.log('Disconnected.');
  }

  adoptedCallback() {
    console.log('Adopted.');
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name == "color") {
      this.color = this.checkColor(this.getAttribute("color"));
    }
    if (name == "active-color") {
      this.activeColor = this.checkColor(this.getAttribute("active-color"), true);
    }
	if (name == "active") {
      this.active = (this.getAttribute("active") == "true");
	   this.init();
    }
    if (name == "type") {
      let type = this.getAttribute("type");
      this.type = (!this.isEmpty(type) && this.indicatorStyles.includes(type)) ? type : 'circle';
	  this.init();
    }
  }
}

if (!window.customElements.get('pd-indicator')) {
  window.pdIndicator = pdIndicator;
  window.customElements.define("pd-indicator", pdIndicator);
}
