import {expect} from 'chai';
import {page} from "../pom/home.pom";

describe('Guest explores Port of Departure', function(){
    it.skip("should zoom to selected port", function(){
        browser.url('https://www.ncl.com/');

        const explore = browser.$(page.exploreLinkSelector)
        explore.waitForDisplayed(2000);
        explore.click();

        const port = browser.$(page.portLinkSelector);
        port.waitForDisplayed(2000);
        port.click();

        const search = browser.$(page.searchBar);
        search.waitForDisplayed(3000);
        search.setValue('Honolulu');
        // browser.keys('Return');
        
        // const btn = browser.$('#searchArea > div.type-find-port > form > div > span');
        // btn.waitForDisplayed(2000);
        // btn.click();

        const result = browser.$(page.searchResult);
        result.waitForDisplayed(2000);
        result.click();


        const departure = browser.$(page.departureMarker);
        departure.waitForDisplayed();
         
        //map zoomed to show selected port
        //port is on the middle of the map
        //port is displayed as port of departure
    })
});


describe('Guest explores shore excursions destinations', function(){
    it.skip("shore excursions page is present", function(){
        browser.url('https://www.ncl.com/');

        const explore = browser.$(page.exploreLinkSelector)
        explore.waitForDisplayed(2000);
        explore.click();

        const port = browser.$(page.excursionsLinkSelector);
        port.waitForDisplayed(2000);
        port.click();

        const destination = browser.$(page.searchButton);
        destination.waitForExist(2000);
        destination.click();

        //Alaska Cruises


        //Shore excursions page is present
        //Results are filtered by Alaska Cruises
        //Filter By Ports are only belong to “Alaska, British Columbia”
    })
})

describe('Guest filters shore excursions results using price range', function(){
    it("should return only shore excursions within range", function(){
        browser.url('https://www.ncl.com/');

        // range
        const lower=0;
        const upper=30;

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
        browser.url('https://www.ncl.com/shore-excursions/search?sort=searchWeight&perPage=12&priceRange='+lower+'+'+upper);

        
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
