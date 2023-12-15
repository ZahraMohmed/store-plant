// cart toggle
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cardd");
let cartClose = document.querySelector("#close");
let icon = document.querySelector(".icon");
cartIcon.onclick = () => {
  cart.classList.add("active");
};
cartClose.onclick = () => {
  cart.classList.remove("active");
};

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
// making function
function ready() {
  var removeCartButton = document.getElementsByClassName("cart-remove");
  console.log(removeCartButton);
  for (var i = 0; i < removeCartButton.length; i++) {
    var button = removeCartButton[i];
    button.addEventListener("click", removeCartItem);
  }
  // quantity change
  var quantityInput = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInput.length; i++) {
    var input = quantityInput[i];
    input.addEventListener("change", quantityChange);
  }
  // add to cart
  var addCart = document.getElementsByClassName("shop-btn");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCardClick);
  }
  // buy button

  document
    .getElementsByClassName("bn-buy")[0]
    .addEventListener("click", buyButtonClick);
}
function buyButtonClick() {
  alert("your order is already");
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updatTotal();
}
// ?removw cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatTotal();
}
// quantity Change
function quantityChange(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatTotal();
}
//  add to cart
function addCardClick(event) {
  if (localStorage.dataOfuser != null) {
    var button = event.target;
    var shopProducts = button.parentElement.parentElement;
    var title = shopProducts.getElementsByClassName("shop-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("shop-price")[0].innerText;
    var img = shopProducts.getElementsByClassName("shop-img")[0].src;

    addProductToCart(title, price, img);
    updatTotal();
  } else {
    let alertSign = document.getElementById('alertsign')
    setTimeout(()=>{
      alertSign.classList.add('alertAC')
    },600)
    
  }
}
function addProductToCart(title, price, img) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("card-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("card-product-title");
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerHTML == title) {
      return alert("This item is already added to the cart");
    }
  }

  var cartBoxContentt = `
    <img src="${img}" alt="" class="card-img">
    <div class="detail-box">           
    <div class="card-product-title">${title}</div>
    <div class="card-product-price"> ${price}</div>
    <input type="number" value="1" class="cart-quantity">
    </div>
    <!-- remove -->
    <i class='bx bx-trash-alt cart-remove'></i>`;
  cartShopBox.innerHTML = cartBoxContentt;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChange);
}

// updateToal
function updatTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("card-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("card-product-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}

// end add cart
// start toggle
var btnColor = document.getElementsByClassName("bxs-hearts");
function state(btnColor) {
  btnColor.classList.toggle("bxs-hearts");
}
// change text
var arrowRight = document.getElementById("chang-text");

var texxt = document.getElementById("text77");
var customer = document.getElementById("name-customer");
let masseges = [
  "Cursus posuere rutrum nisl nunc, integer viverra ipsum urna, orci. Scelerisque ultrices orci sit placerat sollicitudin ac. Dictum pretium mi adipiscing suspendisse sit arcu quam morbi nibh lobortis dolor.",
  "Sem magna ut pharetra vitae duis eu senectus  viverra ipsum urna, orci. Scelerisque ultrices sem risus. Morbi non, semper vestibulum euismod suspendisse sit a accumsan...",
  "rutrum nisl nunc, integer viverra ipsum urna, orci. Scelerisque ultrices orci sit placerat sollicitudin ac. Dictum pretium mi adipiscing suspendisse sit arcu quam morbi nibh lobortis dolor.",
];
let customerNam = ["Zahra", "Mohmad", "yosif"];

// change img
var arrowLeft = document.getElementById("chang-img");
var img = document.getElementById("imag");
var imges = [
  "images/pngegg.png",
  "images/pngegg (2).png",
  "images/severin-candrian-cLaaxa4DSnc-unsplash 2.png",
];
var i = 0;
arrowRight.onclick = function () {
  texxt.innerHTML = masseges[i];
  img.setAttribute("src", imges[i]);
  customer.innerHTML = customerNam[i];
  i++;
  if (i == 3) {
    i = 0;
    arrowLeft.addEventListener("click", () => {
      texxt.innerHTML = masseges[i];
      img.setAttribute("src", imges[i]);
      customer.innerHTML = customerNam[i];
      i--;
    });
  }
};

let btnScroll = document.getElementById("btn-scroll");

window.onscroll = function () {
  if (scrollY >= 900) {
    btnScroll.style.display = "block";
  } else {
    btnScroll.style.display = "none";
  }
};
btnScroll.onclick = function () {
  scroll({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};

// get section
let sections = document.querySelectorAll("section");
let navLi = document.querySelectorAll("nav ul li a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    var yetS = window.pageYOffset;
    if (yetS >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });
  navLi.forEach((a) => {
    if (a.classList.contains(current)) {
      a.classList.add("activee");
    } else {
      a.classList.remove("activee");
    }
  });
});
//rede more  sections 3
let read = document.getElementById("read");
let readeMore = document.getElementById("readeMore");

readeMore.addEventListener("click", () => {
  read.classList.toggle("read");
});

//  dark mode nav

let moon = document.getElementById("moon");
let aLink = document.querySelector('a')
moon.addEventListener("click", () => {
  body.classList.toggle("dark");
  navbar.classList.toggle("dark");
  cart.classList.toggle("dark");
  icon.classList.toggle("darkk");
  aLink.classList.toggle("darkk");
  if (body.classList.contains("dark")) {
    moon.innerHTML = `<i class='bx bx-sun'></i>`;
    localStorage.setItem("mode", "dark");
  } else {
    moon.innerHTML = `<i class='bx bx-moon'></i>`;
    localStorage.setItem("mode", "");
  }
});

let getMode = localStorage.getItem("mode");
if (getMode === "dark") {
  body.classList.add("dark");
  navbar.classList.add("dark");
  cart.classList.add("dark");
  icon.classList.add("darkk");
  aLink.classList.add("darkk");
  moon.innerHTML = `<i class='bx bx-sun'></i>`;
} else {
  body.classList.add("");
  moon.innerHTML = `<i class='bx bx-moon'></i>`;
}
//  user
let user = document.getElementById("user");
let userBox = document.querySelector(".userSign");
let backUser = document.querySelector(".backUser");
let userClose = document.getElementById("userClose");
let userName = document.getElementById("userName");
let email = document.getElementById("email");
let Passward = document.getElementById("Passward");
let SignIn = document.getElementById("SignIn");
let massege = document.getElementById("massege");
user.addEventListener("click", () => {
  if (localStorage.dataOfuser != null) {
    userBox.style.display = "none";
    backUser.style.display = "none";
    body.classList.remove("stop-scrolling");
  } else {
    userBox.style.display = "block";
    backUser.style.display = "block";
    body.classList.add("stop-scrolling");
  }
});
userClose.addEventListener("click", () => {
  userBox.style.display = "none";
  backUser.style.display = "none";
  body.classList.remove("stop-scrolling");
});
// save data

let userData;
if (localStorage.dataOfuser != null) {
  userData = JSON.parse(localStorage.dataOfuser);
} else {
  userData = {};
}

SignIn.addEventListener("click", () => {
  userData = { username: userName.value };
  console.log(typeof userData.username);
  localStorage.setItem("dataOfuser", JSON.stringify(userData));
  if (userName.value === "" || email.value === "" || Passward.value === " ") {
    massege.innerText = "You must SignIn";
    massege.style.color = "green";
    massege.style.fontSize = "18px";
  } else {
    userBox.style.display = "none";
    backUser.style.display = "none";
    body.classList.remove("stop-scrolling");
  }

  readData();
  clearData();
});
function clearData() {
  userName.value = "";
  email.value = "";
  Passward.value = "";
}

function readData() {
  if (localStorage.dataOfuser != null) {
    login.innerText = userData.username;
  } else {
    login.innerText = "Sign in";
  }
}
readData();

const scrolly = ScrollReveal({
  origin: "bottom",
  distance: "60px",
  duration: 2500,
});
scrolly.reveal(`.home_imgs`, { distance: "120px", delay: 400 });
scrolly.reveal(`.imges`, { origin:"left",distance: "120px", delay: 1600 });
scrolly.reveal(`.font`, { origin:"right",distance: "120px", delay: 400 });
scrolly.reveal(`.sec2`, {distance: "500px", delay: 1200 });
scrolly.reveal(`.sec3`, { distance: "500px",delay: 1200 });
scrolly.reveal(`.sec4`, { distance: "500px",delay: 1400 });
scrolly.reveal(`.sec5`, { distance: "500px",delay: 1450 });
scrolly.reveal(`.sec6`, { distance: "500px",delay: 1500 });
scrolly.reveal(`.sec7`, { distance: "500px",delay: 1600 });
scrolly.reveal(`.sec-8`, { distance: "500px",delay: 1600 });
scrolly.reveal(`.the-end`, { distance: "500px",delay: 1600 });
