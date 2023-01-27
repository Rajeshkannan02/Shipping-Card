const btnCart=document.querySelector('#cart-icon');
const cart=document.querySelector('.cart');
const btnClose=document.querySelector('#cart-close');

btnCart.addEventListener('click',()=>{
  cart.classList.add('cart-active');
});

btnClose.addEventListener('click',()=>{
  cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded', loadFood);

function loadFood(){
    loadContent();
}

function loadContent(){
    //Remove items from cart

    let btnRemove=document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn)=>{
        btn.addEventListener('click',removeItem);
    });

    //product item change event
    let qltElement=document.querySelectorAll('.cart-quantity');
    qltElement.forEach((input)=>{
        input.addEventListener('click',changeQlty);
    });

    //product cart
    let cartBtn=document.querySelectorAll('.add-cart');
    cartBtn.forEach((btn)=>{
        btn.addEventListener('click',addCart);
    });
   updateTotal();
}

//Remove item
function removeItem(){
    if(confirm('Are you Sure to remove')){
        let title=this.parentElement.querySelector('.cart-food-title').innerHTML;
        itemList=itemList.filter(el=>el.title!=title);
    this.parentElement.remove();
    loadContent();
}
}

//Change Quantity
function changeQlty(){
    if(isNaN(this.value) || this.value<1){
        this.value=1;
    }
    loadContent();
}
let itemList=[];

//add cart
function addCart(){
    let food=this.parentElement;
    let title=food.querySelector('.food-title').innerHTML;
    let price=food.querySelector('.food-price').innerHTML;
    let imgSrc=food.querySelector('.food-img').src;

    let newProductElement=createCartProduct(title,price,imgSrc);
    //check product altready exist
    let newProduct={
        title,price,imgSrc
    }
    if(itemList.find((el)=>el.title==newProduct.title)){
        alert('Product Altready in the cart')
    }
    else{
        itemList.push(newProduct);
    }

    let element=document.createElement('div');
    element.innerHTML=newProductElement;
    let Bascket=document.querySelector('.cart-content');
    Bascket.append(element);
    loadContent();
}

function createCartProduct(title,price,imgSrc){
    return`<div class="cart-box">
    <img src="${imgSrc}" alt="img not found" class="cart-image">
  <div class="detail-box">
    <div class="cart-food-title">${title}</div>
    <div class="box-price">
      <div class="cart-price">${price}</div>
      <div class="cart-amt">${price}</div>
    </div>
    <input type="number" value="1" class="cart-quantity">
  </div>
  <ion-icon name="trash" class="cart-remove"></ion-icon>
  </div>`
    ;
}

function updateTotal(){
    const cartItems=document.querySelectorAll('.cart-box');
    const totalValue=document.querySelector('.total-price');

    let total=0;
    cartItems.forEach(product=>{
        let priceElement=product.querySelector('.cart-price');
        let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
        let qty=product.querySelector('.cart-quantity').value;
        total=total+(price*qty);
        product.querySelector('.cart-amt').innerText="Rs."+(price*qty);
    })
    totalValue.innerHTML="Rs."+total;
    //Add Product Count in Cart Icon
    const cartCount=document.querySelector('.cart-count');
    let count=itemList.length;
    cartCount.innerHTML=count;
}
  
