# pd-carousel

A custom web component that can be used in web applications or websites. It provides a carousel window container that can contain an image, a title and an introduction text message.
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/pd-carousel)

[Demo page (by unpkg.com)](https://unpkg.com/pd-carousel@1.0.0/pd-carousel.html)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

`node.js`

### Installing

`$ npm install pd-carousel`

## Running the tests

`npm test`

### Tests output explanation

#### pd-carousel

_**img**_

_✓ Checks current image is not null upon initialization._

_**index**_

_✓ checks the index that is set to 1 upon initialization._

_**carousel-indicator**_

_✓ checks the carousel indicator attribute that is a non empty string having default value 'circle' upon initialization._

_**cTitle**_

_✓ Checks current title is not null upon initialization._

_**introText**_

_✓ Checks current introduction text is not null upon initialization._

_**wordsLengthTime**_

_✓ checks that the time populated by the introduction text words is set to 0 upon initialization._

_**images**_

_✓ checks that images is not an empty array upon initialization._

_**cTitles**_

_✓ checks that titles is not an empty array upon initialization._

_**introTexts**_

_✓ checks that introduction texts is not an empty array upon initialization._

_**ceiling**_

_✓ checks that ceiling is larger than 0 upon initialization._

_**removalTimeout**_

_✓ checks that removal timeout is null upon initialization._

_**sRoot**_

_✓ Checks that component is attached to DOM and is equal to <pd-carousel>_

_**sRoot**_

_✓ Checks that component is attached to DOM and has empty innerHTML_

##### Array

_**indexOf()**_

_✓ should return -1 when the value is not present. This is a demo test to check that the response from the testing framework is ok._


## Deployment

Add the custom element tag to your HTML page. 

The element's parameters are:

 - **carousel-indicator** (string - default `circle`). Set the style of carousel indicators.
 - **id** (string - optional). If the element has an id then the carousel content will be created from `template` elements that have attribute `data-pd-carousel-id` equal to the id of the element. If it is not set then the carousel content will be created from `template` elements that have attribute `data-for="pd-carousel"`.

**Basic Usage**

`<template data-for="pd-carousel" data-pd-carousel-id="my_carousel">...rest of HTML here...</template><pd-carousel></pd-carousel>`

In order for the carousel window to be flexible regarding it's content in the examples below `templates` are used. The `template` or `other` web element (e.g. a custom one) should have either a `data-for` attribute that has value `pd-carousel` or a `data-pd-carousel-id` that matches the `id` attribute that `pd-carousel` element has. Adding `CSS` inside your `template` can change the overall style of the inner content.

For the `carousel` to work the below `template` example has three `images`, three `div` elements having class `title`, three `div` elements having class `introtext` and three `pd-indicator` elements havig type `circle`. All of the above mentioned elements are members to logical groups of `slides`, so the `data-slide` attribute in each element simply shows the group it is attached.  

**Example HTML**

	<template data-for="pd-carousel" data-pd-carousel-id="image-gallery">
	<style>img { width: 100%; height: 100%; }</style>
	<img src="https://picsum.photos/1200/900" data-slide="1"/>
	<img src="https://picsum.photos/1201/900" data-slide="2"/>
	<img src="https://picsum.photos/1200/901" data-slide="3"/>
	<div class="title" data-slide="1">Turpis consequat</div>
	<div class="title" data-slide="2">Fusce eget turpis consequat, cursus ante id, vehicula nisl</div>
	<div class="title" data-slide="3">Maecenas porta quis nisi sit amet fermentum</div>
	<div class="introtext" data-slide="1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac facilisis eros. Nullam feugiat ex vel ornare sagittis. Etiam blandit lectus nec dui mollis fermentum. Suspendisse pellentesque eros at risus vehicula porta. Quisque dui tellus, ullamcorper eget diam sit amet, venenatis condimentum odio. Vivamus eget viverra leo. Mauris fringilla metus dolor, porta finibus tortor gravida sed.</div>
	<div class="introtext" data-slide="2">Suspendisse iaculis, velit vitae vestibulum volutpat, mauris sapien tempor diam, eu pellentesque arcu ex quis neque. Sed nec mauris at purus viverra scelerisque. Donec metus risus, ultrices in gravida vel, porttitor interdum lectus. Aliquam faucibus metus sed laoreet placerat. Praesent efficitur enim dictum, molestie velit vitae, hendrerit magna. Sed et dolor vel lectus blandit tristique. Cras tristique nec sapien quis pellentesque. Nunc nec ullamcorper sapien. Nulla fermentum quis mi id interdum. Quisque gravida ipsum non euismod pellentesque. Aenean placerat nec tortor eget porta.</div>
	<div class="introtext" data-slide="3">Pellentesque quis ex sem. Donec congue, massa ac ultrices bibendum, dolor justo rutrum arcu, dapibus pharetra magna lorem eget sem. Etiam ex lectus, venenatis nec lectus at, lobortis euismod tortor. Donec nec ipsum eget nisl finibus tempor at vitae augue. Fusce ipsum nibh, elementum non ante nec, eleifend molestie nulla. Aenean vitae pharetra ex. Praesent a quam ut tellus molestie vestibulum. Proin nec hendrerit ante. Aenean aliquam arcu nec dolor lobortis bibendum.</div>
	<div class="indicators-container">
		<pd-indicator type="circle" data-slide="1"></pd-indicator>
		<pd-indicator type="circle" data-slide="2"></pd-indicator>
		<pd-indicator type="circle" data-slide="3"></pd-indicator>
	</div>
	</template>
	<pd-carousel id="image-gallery"></pd-carousel>

You can change the element's attributes by using Javascript and pass callbacks, for example.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request 😁

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* test-utils.js can be found in https://github.com/github/custom-element-boilerplate
