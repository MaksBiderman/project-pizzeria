import { select } from "../settings.js";
import AmountWidget from "./AmountWidget.js";

class CartProduct{
  constructor(menuProduct, element){
  const thisCartProduct = this;
  thisCartProduct.id = menuProduct.id;
  thisCartProduct.name = menuProduct.name;
  thisCartProduct.amount = menuProduct.amount;
  thisCartProduct.price = menuProduct.price;
  thisCartProduct.params = menuProduct.params;
  thisCartProduct.priceSingle = menuProduct.priceSingle;
  console.log('TO JEST TO',thisCartProduct.priceSingle);
  thisCartProduct.element = element;
  thisCartProduct.getElements(element);
  thisCartProduct.initAmountWidget();
  thisCartProduct.initActions();
  //console.log('thisCartProduct', thisCartProduct);
  }
  getElements(element){
    const thisCartProduct = this;
    thisCartProduct.dom = {};
    thisCartProduct.dom.wrapper = element;
    thisCartProduct.dom.amountWidget = thisCartProduct.element.querySelector(select.cartProduct.amountWidget);
    thisCartProduct.dom.price = thisCartProduct.element.querySelector(select.cartProduct.price);
    thisCartProduct.dom.edit = thisCartProduct.element.querySelector(select.cartProduct.edit);
    thisCartProduct.dom.remove = thisCartProduct.element.querySelector(select.cartProduct.remove);

  }
  initAmountWidget() {
    const thisCartProduct = this;
    thisCartProduct.amountWidget = new AmountWidget(thisCartProduct.dom.amountWidget);
    thisCartProduct.dom.amountWidget.addEventListener('updated', function () {
      thisCartProduct.amount = thisCartProduct.amountWidget.value;
      thisCartProduct.price = thisCartProduct.priceSingle * thisCartProduct.amount;
      thisCartProduct.dom.price.innerHTML = thisCartProduct.price;
    })
  }
  remove(){
    const thisCartProduct = this;

    const event = new CustomEvent('remove',
    {bubbles: true,
    detail: {
      cartProduct: thisCartProduct,
    },
  });
  thisCartProduct.dom.wrapper.dispatchEvent(event);
  //console.log("remove");
  }
  initActions(){
    const thisCartProduct = this;
    thisCartProduct.dom.edit.addEventListener('click', function(event){
      event.preventDefault;
    });
    thisCartProduct.dom.remove.addEventListener('click', function(event){
      event.preventDefault;
      thisCartProduct.remove();
    });


  }
  getData(){
    const thisCartProduct = this;
    const productSummary = {};
    productSummary.id = thisCartProduct.id;
    productSummary.amount = thisCartProduct.amount;
    productSummary.price = thisCartProduct.price;
    productSummary.priceSingle = thisCartProduct.priceSingle;
    productSummary.name = thisCartProduct.name;
    productSummary.params = thisCartProduct.params;
    return productSummary;
  }
}
export default CartProduct;