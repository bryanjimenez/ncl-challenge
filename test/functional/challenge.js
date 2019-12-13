import {expect} from 'chai';

describe('Guest explores Port of Departure', function(){
    it.skip("should zoom to selected port", function(){
        browser.url('https://www.ncl.com/');

        const explore = browser.$('.navigationWrapper a[aria-label="Explore"]')
        explore.waitForDisplayed(2000);
        explore.click();

        const port = browser.$('.drophover_menu .drophover_menu_content ul a[title="Ports"]');
        port.waitForDisplayed(2000);
        port.click();

        const search = browser.$('#searchbar');
        search.waitForDisplayed(3000);
        search.setValue('Honolulu');
        // browser.keys('Return');
        
        // const btn = browser.$('#searchArea > div.type-find-port > form > div > span');
        // btn.waitForDisplayed(2000);
        // btn.click();

        const result = browser.$('#searchArea > div.expanded-find-port > ul > li.ng-scope > a');
        result.waitForDisplayed(2000);
        result.click();


        const departure = browser.$('#ports-map img[src="/resources/images/icons/pin-port-of-departure.png"]');
        departure.waitForDisplayed();
         
        //map zoomed to show selected port
        //port is on the middle of the map
        //port is displayed as port of departure

        // browser.debug();
        // browser.pause(10000);

        expect(true).to.be.true;
    })
});


describe('Guest explores shore excursions destinations', function(){
    it.skip("shore excursions page is present", function(){
        browser.url('https://www.ncl.com/');

        const explore = browser.$('.navigationWrapper a[aria-label="Explore"]')
        explore.waitForDisplayed(2000);
        explore.click();

        const port = browser.$('.drophover_menu .drophover_menu_content ul a[title="Shore Excursions"]');
        port.waitForDisplayed(2000);
        port.click();

        const destination = browser.$('#search_destinations');
        destination.waitForExist(2000);
        destination.click();

        //Alaska Cruises


        //Shore excursions page is present
        //Results are filtered by Alaska Cruises
        //Filter By Ports are only belong to “Alaska, British Columbia”

        expect(true).to.be.true;
        // browser.debug();
    })
})

describe('Guest filters shore excursions results using price range', function(){
    it("should return only shore excursions within range", function(){
        browser.url('https://www.ncl.com/');

        // range
        const lower=0;
        const upper=30;

        const explore = browser.$('.navigationWrapper a[aria-label="Explore"]')
        explore.waitForDisplayed(2000);
        explore.click();

        const port = browser.$('.drophover_menu .drophover_menu_content ul a[title="Shore Excursions"]');
        port.waitForDisplayed(2000);

        try{
            port.click();
        }
        catch(e){
        //<img usemap="#IPEMap" border="0" width="640" height="360" src="https://ips-invite.iperceptions.com/invitations/invitationsJS/0/s850/images/invitation1.png">
            const close = browser.$('map[name="IPEMap"] area[alt="close"]');
            close.click();

            port.click();
        }
        

        const find = browser.$('button[class~="search-submit"]');
        find.waitForDisplayed(2000);
        find.click();

        // set price $0-30
        browser.url('https://www.ncl.com/shore-excursions/search?sort=searchWeight&perPage=12&priceRange='+lower+'+'+upper);

        const results = browser.$$('ul.holders-list.ng-scope > li');
        console.log(results.length);

        results.forEach(r=>{

            const prices = r.$$('.details .price li');
            // console.log(prices.length);
            //[0-0] ADULT FROM: $30.00 USD
            // console.log(prices[0].getText())
            prices.forEach(p=>{
                const text = p.getText();

                const amount = Number(text.slice(text.indexOf('$')+1,text.indexOf('.')));
                // console.log(amount);
                expect(amount).to.be.at.least(lower)
                expect(amount).to.be.at.most(upper)
            })

        })
        
        // browser.debug();
    })
})
