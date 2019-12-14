export const page = {
    exploreLinkSelector:'.navigationWrapper a[aria-label="Explore"]',
    portLinkSelector:'.drophover_menu .drophover_menu_content ul a[title="Ports"]',
    excursionsLinkSelector:'.drophover_menu .drophover_menu_content ul a[title="Shore Excursions"]',

    // port-of-call
    searchBar:'#searchbar',
    searchResult:'#searchArea > div.expanded-find-port > ul > li.ng-scope > a',

    portMap: '#ports-map',
    departureMarker:'#ports-map :not(li) > div > img[src$="pin-port-of-departure.png"]',
    callMarker:'#ports-map :not(li) > div > img[src$="pin-port.png"]',
    destinationMarker: 'img[src$="pin_destination.png"]',

    // shore-excursions
    loadingModal: '.modal-backdrop.fade',
    destinationSearch: '#search_destinations_chosen > a.chosen-single',
    destinationInput: 'input.chosen-search-input',
    findExcursionsBtn:'button[class~="search-submit"]',

    destinationFilter: '.filter-options a[title="Destination"] ~ .widget-items li',
    excursionResultList:'ul.holders-list.ng-scope > li',
    excursionResultNextPage: 'a[title="Next"]',

    surveyPopupClose: 'map[name="IPEMap"] area[alt="close"]'
};