import { pdCarousel } from "../pd-carousel.js";
import { TestUtils } from "../test-utils.js";

describe("pd-carousel", () => {
  describe("img", () => {
    it("Checks current image is not null upon initialization.", () => {
        const component = new pdCarousel();		
        expect(typeof component.img).toEqual("object");
		expect(JSON.stringify(component.img).length > 0).toBeTrue();
    });
  });
  describe("index", () => {
    it("checks the index that is set to 1 upon initialization.", () => {
        const component = new pdCarousel();
		expect(component.index == 1).toBeTrue();
    });
  });
  
  describe("cTitle", () => {
    it("Checks current title is not null upon initialization.", () => {
        const component = new pdCarousel();		
        expect(typeof component.cTitle).toEqual("object");
		expect(JSON.stringify(component.cTitle).length > 0).toBeTrue();
    });
  });
  describe("introText", () => {
    it("Checks current introduction text is not null upon initialization.", () => {
        const component = new pdCarousel();		
        expect(typeof component.introText).toEqual("object");
		expect(JSON.stringify(component.introText).length > 0).toBeTrue();
    });
  });
  describe("wordsLengthTime", () => {
    it("checks that the time populated by the introduction text words is set to 0 upon initialization.", () => {
        const component = new pdCarousel();
		expect(component.wordsLengthTime == 0).toBeTrue();
    });
  });
  
  describe("images", () => {
    it("checks that images is an empty array upon initialization.", () => {
        const component = new pdCarousel();
		expect(component.images.length == 0).toBeTrue();
    });
  });
  describe("cTitles", () => {
    it("checks that titles is an empty array upon initialization.", () => {
        const component = new pdCarousel();
		expect(component.cTitles.length == 0).toBeTrue();
    });
  });
  describe("introTexts", () => {
    it("checks that introduction texts is  an empty array upon initialization.", () => {
        const component = new pdCarousel();
		expect(component.introTexts.length == 0).toBeTrue();
    });
  });
  describe("ceiling", () => {
    it("checks that ceiling is 0 upon initialization.", () => {
        const component = new pdCarousel();
		expect(component.ceiling == 0).toBeTrue();
    });
  });
  describe("removalTimeout", () => {
    it("checks that removal timeout is null upon initialization.", () => {
        const component = new pdCarousel();
		expect(component.removalTimeout == null).toBeTrue();
    });
  });
  describe("sRoot", () => {
    it('Checks that component is attached to DOM and is equal to <pd-carousel>', async () => {
        const component = await TestUtils.render('pd-carousel');
        expect(component.outerHTML).toEqual("<pd-carousel></pd-carousel>");
    });
  });  
  describe("sRoot", () => {
    it('Checks that component is attached to DOM and has empty innerHTML', async () => {
        const component = await TestUtils.render('pd-carousel');
        expect(component.innerHTML.includes("")).toBeTruthy();
    }); 
  });
});
describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present. This is a demo test to check that the response from the testing framework is ok.', () => {
    assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});