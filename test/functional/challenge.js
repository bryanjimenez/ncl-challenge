import {expect} from 'chai';
import {page} from "../pom/home.pom";

const homePageUrl = 'https://www.ncl.com/';

describe('Guest explores Port of Departure', function(){
    const departureImgName = /pin-port-of-departure.png$/;
    const allAvailableDestinations = 32;
    const portQuery = 'Honolulu';

    it("should zoom to selected port", function(){
        browser.url(homePageUrl);

        const explore = browser.$(page.exploreLinkSelector)
        explore.waitForDisplayed(2000);
        explore.click();

        const port = browser.$(page.portLinkSelector);
        port.waitForDisplayed(2000);

        try{
            port.click();
        }
        catch(e){
            const popupClose = browser.$(page.surveyPopupClose);
            popupClose.click();
            port.click();
        }

        //initial map NOT zoomed showing all available destinations
        expect(browser.$$(page.destinationMarker)).to.have.lengthOf(allAvailableDestinations)

        const search = browser.$(page.searchBar);
        search.waitForDisplayed(3000);
        search.setValue(portQuery);
        
        const result = browser.$(page.searchResult);
        result.waitForDisplayed(2000);
        result.click();

        browser.$(page.departureMarker).waitForDisplayed();

        //final map zoomed to show selected port
        expect(browser.$$(page.destinationMarker)).to.have.lengthOf(0);
    })

    it('should display port on the middle of the map', function(){
        // map
        const mapRect = browser.execute(function(selec){
            const m = document.querySelector(selec);
            return m.getBoundingClientRect();
        }, page.portMap)

        // port
        const portPinRect = browser.execute(function(selec){
            const pin = document.querySelectorAll(selec)[0];
            return pin.getBoundingClientRect();
        },page.departureMarker);

        //port is on the middle of the map
        expect(portPinRect.left+portPinRect.width/2).is.equal(mapRect.width/2);
    })

    it('should be displayed as port of departure', function(){
        const departure = browser.$$(page.departureMarker);

        //port is displayed as port of departure
        departure.forEach(marker=>{
            expect(marker.getAttribute('src')).to.match(departureImgName);
        })
    })
});


describe('Guest explores shore excursions destinations', function(){
    const destinationName = 'Alaska Cruises';
    const enterKey = '\uE007';

    it("should display shore excursions page", function(){
        browser.url(homePageUrl);

        const explore = browser.$(page.exploreLinkSelector)
        explore.waitForDisplayed(2000);
        explore.click();

        const port = browser.$(page.excursionsLinkSelector);
        port.waitForDisplayed(2000);

        try{
            port.click();
        }
        catch(e){
            const popupClose = browser.$(page.surveyPopupClose);
            popupClose.click();
            port.click();
        }

        const destinationSearch = browser.$(page.destinationSearch);
        destinationSearch.waitForDisplayed();
        destinationSearch.click();

        //Alaska Cruises
        const search = browser.$(page.destinationInput);
        search.setValue(destinationName);
        search.addValue(enterKey);

        //Loading modal
        const loading = browser.$(page.loadingModal);
        loading.waitForExist(1000)
        loading.waitForExist(1000, true)

        const find = browser.$(page.findExcursionsBtn);
        find.waitForDisplayed()
        find.click();

        //Shore excursions page is present
        expect(browser.getTitle()).to.equal('Alaska Cruises | Shore Excursions | Norwegian Cruise Line');
    });

    it('should filter by Alaska Cruises', function(){
        //Results are filtered by Alaska Cruises
        const filter = browser.$(page.destinationFilter);
        expect(filter.getText()).to.equal(destinationName);
    });

    it.skip('should ...?', function(){
        //Filter By Ports are only belong to “Alaska, British Columbia”
        //TODO: can't find 'Alaska, British Columbia'
    });
});

describe('Guest filters shore excursions results using price range', function(){
    const baseUrl = 'https://www.ncl.com/shore-excursions/search?sort=searchWeight&perPage=12&priceRange=';
    // range
    const lower=0;
    const upper=30;

    it("should return only shore excursions within range", function(){
        browser.url(homePageUrl);

        const explore = browser.$(page.exploreLinkSelector)
        explore.waitForDisplayed(2000);
        explore.click();

        const excursionLink = browser.$(page.excursionsLinkSelector);
        excursionLink.waitForDisplayed(2000);

        try{
            excursionLink.click();
        }
        catch(e){
            const popupClose = browser.$(page.surveyPopupClose);
            popupClose.click();
            excursionLink.click();
        }
        
        const find = browser.$(page.findExcursionsBtn);
        find.waitForDisplayed(2000);
        find.click();

        // set price $0-30
        browser.url(baseUrl+lower+'+'+upper);

        
        // result page navigation
        let next = true;
        while(next){
            const nextPage = browser.$(page.excursionResultNextPage);

            const results = browser.$$(page.excursionResultList);
            results.forEach(r=>{
                const prices = r.$$('.details .price li');
                prices.forEach(p=>{
                    const text = p.getText();
    
                    const amount = Number(text.slice(text.indexOf('$')+1,text.indexOf('.')));
                    // console.log(amount);
                    expect(amount).to.be.at.least(lower)
                    expect(amount).to.be.at.most(upper)
                })
            })

            if(nextPage.isExisting()){
                nextPage.click();
                next=true;
            }
            else{
                next = false;
            }
        }
    })
})
