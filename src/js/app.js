import { settings, select, classNames } from "./settings.js";
import Product from "./components/Product.js";
import Booking from "./components/Booking.js";
import Cart from "./components/Cart.js";
const app = {
  initBooking: function(){
    const thisApp = this;
    thisApp.bookingWrap = document.querySelector(select.containerOf.booking);
    thisApp.booking = new Booking(thisApp.bookingWrap);
  },
  initPages: function (){
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idfromHash = window.location.hash.replace('#/', '');
    //console.log('idFromHash', idfromHash);
    let defaultPage = thisApp.pages[0].id;
    //let pageMatchingHash = thisApp.pages[0].id;
   // console.log(pageMatchingHash);

    for(let page of thisApp.pages){
      if(page.id == idfromHash){
       // pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(defaultPage);


    for(let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();

        /* get page id from href attribute */
        const id = clickedElement.getAttribute('href').replace('#', '');

        /* run thisApp.activatePage with that id */
        thisApp.activatePage(id);

        /* change Url hash */ 
        window.location.hash = '#/' + id;
      });
    }
  },
  initLinks: function(){
   const thisApp = this;
    const linkOrder = document.querySelector('#link-order');
    const linkBooking = document.querySelector('#link-booking');
    linkOrder.addEventListener('click', function(event){
      event.preventDefault();
      thisApp.activatePage('order');
      window.location.hash = '#/order';
    })
    linkBooking.addEventListener('click', function(event){
      event.preventDefault();
      thisApp.activatePage('booking');
      window.location.hash = '#/booking';
    })
  },
  activatePage: function (pageId){
    const thisApp = this;
    /* add class "active" to matching pages, remove from non-matching */
    for(let page of thisApp.pages){
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
    /* add class "active" to matching links, remove from non-matching */
    for(let link of thisApp.navLinks){
      link.classList.toggle(
        classNames.nav.active,
         link.getAttribute('href') == '#' + pageId
         );
    }
  },
  initMenu: function () {
    const thisApp = this;
    // console.log('thisApp.data:', thisApp.data);
    for (let productData in thisApp.data.products) {
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
    }

  },
  initData: function () {
    const thisApp = this;
    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.products;
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
       // console.log('parsedResponse', parsedResponse);
        /* save parsedResponse as thisApp.data.products */
        thisApp.data.products = parsedResponse;
        /* execute initmenu method */
        thisApp.initMenu();
      })
    //console.log('thisApp.data', JSON.stringify(thisApp.data));

  },
  init: function () {
    const thisApp = this;
    
    thisApp.initData();
    thisApp.initCart();
    thisApp.initPages();
    thisApp.initBooking();
    thisApp.initLinks();

    var elem = document.querySelector('.main-carousel'); // eslint-disable-line
    var flkty = new Flickity( elem, { // eslint-disable-line
  // options
  cellAlign: 'center',
  contain: true,
  autoPlay: 3000,
  pauseAutoPlayOnHover: false
});

// element argument can be a selector string
//   for an individual element
   },
  initCart: function () {
    const thisApp = this;
    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);

    thisApp.productList = document.querySelector(select.containerOf.menu);
    const productList = thisApp.productList;
    productList.addEventListener('add-to-cart', function(event){
          app.cart.add(event.detail.product);

    })
  },
};

app.init();

