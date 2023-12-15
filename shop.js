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
  alert("order is already");

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
    let alertSign = document.getElementById("alertsign");
    setTimeout(() => {
      alertSign.classList.add("alertAC");
    }, 600);
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
// start toggle
var btnColor = document.getElementsByClassName("bxs-hearts");
function state(btnColor) {
  btnColor.classList.toggle("bxs-hearts");
}
//button scroll
let btnScroll = document.getElementById("btn-scroll");

window.onscroll = function () {
  if (scrollY >= 100) {
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

//  dark mode nav

let moon = document.getElementById("moon");
let aLink = document.querySelector("a");
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
// chat bote
let chatInput = document.querySelector(".chat-input textarea ");
let sendBtn = document.getElementById("send-btn");
let chatBox = document.querySelector(".chatbox");
var API_KEY = "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";
let userMessage;
let createChatLi = (message, className) => {
  let chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent =
    className === "outcoming"
      ? `<p>${message}</p>`
      : `  <span class="smart-sumbole"><i class='bx bxs-ghost'></i></span>
<p>${message} </p>`;

  chatLi.innerHTML = chatContent;
  return chatLi;
};

const generateResponse = (chatElement) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const messageElement = chatElement.querySelector("p");
  // Define the properties and message for the API request

  const requestOptions = {
    method: "POST",
    headers: {
      " Authorization": " Bearer" + API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    }),
  };
  // Send POST request to API, get response and set the reponse as paragraph text
  fetch(API_URL, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      messageElement.textContent = data.choices[0].message.content.trim();
    })
    .catch(() => {
      messageElement.classList.add("error");
      messageElement.textContent =
        "Oops! Something went wrong. Please try again.";
    });
};
let handelChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatBox.appendChild(createChatLi(userMessage, "outcoming"));
  chatInput.value = "";
  setTimeout(() => {
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatBox.appendChild(incomingChatLi);
    generateResponse(incomingChatLi);
  }, 600);
};

sendBtn.addEventListener("click", handelChat);
closeBtn.addEventListener("click", () => body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () =>
  body.classList.toggle("show-chatbot")
);
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
let flower = document.querySelector(".flowers");
let plants = document.querySelector(".plant");
let alovera = document.querySelector(".alover");
let rose = document.querySelector(".rose");
let plantBtn = document.getElementById("plant");
let aloverBtn = document.getElementById("olvera");
let flowerBtn = document.getElementById("flower");

plantBtn.addEventListener("click", () => {
  flower.style.display = "none";
  alovera.style.display = "none";
  rose.style.display = "none";
  plants.style.display = "block";
});

flowerBtn.addEventListener("click", () => {
  flower.style.display = "block";
  plants.style.display = "none";
  alovera.style.display = "none";
  rose.style.display = "none";
});
aloverBtn.addEventListener("click", () => {
  flower.style.display = "none";
  alovera.style.display = "block";
  rose.style.display = "none";
  plants.style.display = "none";
});
all.addEventListener("click", () => {
  flower.style.display = "block";
  alovera.style.display = "block";
  rose.style.display = "block";
  plants.style.display = "block";
});

const scrolly = ScrollReveal({
  origin: "bottom",
  distance: "60px",
  duration: 2500,
});
scrolly.reveal(`.fonts`, { distance: "120px", delay: 400 });
scrolly.reveal(`.sec2`, { distance: "120px", delay: 200 });
scrolly.reveal(`.flowers`, { delay: 800 });
scrolly.reveal(`.plant`, { delay: 850 });
scrolly.reveal(`.alover`, { delay: 900 });
scrolly.reveal(`.rose`, { delay: 950 });
scrolly.reveal(`.the-end`, { delay: 1000 });
