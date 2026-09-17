const addImg = document.getElementById("add-img");
const products = document.getElementById("products");
const btn = document.getElementsByClassName("btn");
const filterbtn = document.getElementsByClassName("filter");
const searchInput = document.getElementById("input-1");

// ============================================
// ჰამბურგერი / კალათის sidebar toggle ელემენტები
// ============================================
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const cartContainer = document.getElementById("cartContainer");
const overlay = document.getElementById("overlay");

function showSidebar() {
    cartContainer.classList.add("active");
    overlay.classList.add("active");
    menuBtn.style.display = "none";
}

function hideSidebar() {
    cartContainer.classList.remove("active");
    overlay.classList.remove("active");
    menuBtn.style.display = "flex";
}

menuBtn.addEventListener("click", showSidebar);
closeBtn.addEventListener("click", hideSidebar);
overlay.addEventListener("click", hideSidebar);

//                                                                      img changes 
btn[0].onclick = function () {
    addImg.src = "images/1.avif";
    for (let button of btn) {
        button.classList.remove("active");
    }
    this.classList.add("active");
}
btn[1].onclick = function () {
    addImg.src = "images/2.avif";
    for (let button of btn) {
        button.classList.remove("active");
    }
    this.classList.add("active");
}
btn[2].onclick = function () {
    addImg.src = "images/3.avif";
    for (let button of btn) {
        button.classList.remove("active");
    }
    this.classList.add("active");
}


let cart = [];
let allProducts = [];

async function getFood() {
    let url = 'https://restaurant.stepprojects.ge/api/Products/GetAll';

    const response = await fetch(url);
    const data = await response.json();
    allProducts = data;
    renderProducts(allProducts);
};

getFood();





                                                                  // search
searchInput.addEventListener("input", function () {
    let searchValue = searchInput.value.toLowerCase();
    let filteredProducts = allProducts.filter(function (item) {     
        return item.name.toLowerCase().includes(searchValue);
    });
    renderProducts(filteredProducts);
});

                                                            // filter of products
document.getElementById("btnAll").addEventListener("click", function () {
    renderProducts(allProducts);
});
document.getElementById("btnVegetarian").addEventListener("click", function () {
    let filtered = allProducts.filter(function (item) {
        return item.vegeterian === true;
    });
    renderProducts(filtered);
});
document.getElementById("btnNuts").addEventListener("click", function () {
    let filtered = allProducts.filter(function (item) {
        return item.nuts === true;
    });
    renderProducts(filtered);
})


function renderProducts(products) {
    document.getElementById("products").innerHTML = "";
    products.forEach(function (item) {

        let card = `
 <div class="food-card">
    <img src="https://thecultureur.com/wp-content/uploads/2014/01/2.-Som-Tam.jpg" width = "150">
    
    <h3>${item.name}</h3>
    <p>${item.price} ლ</p>
  
    <button class ="heart-icon" data-id="${item.id}">❤️</button> 
 </div>
 `
        document.getElementById("products").innerHTML += card;

    });
    
    const removeButton = document.querySelectorAll(".remove-icon");
    const heartButtons = document.querySelectorAll(".heart-icon");

   




    heartButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            let productId = parseInt(button.dataset.id);
            let product = allProducts.find(function (item) {
                return item.id === productId;
            });

            if (!product) {
                return;
            }

            let cartItem = cart.find(function (item) {
                return item.id === productId;
            });

            if (cartItem) {
                cartItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            renderCart();
        });
    });

}
  




function renderCart() {
    let cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    cart.forEach(function (item) {
        let row = `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
             <button class = "remove-icon" data-id="${item.id}">❌ </button>
            <div class="cart-item-info">
             
                <h4>${item.name}</h4>
                <p>${item.price} ლ</p>
            </div>
            <span class="cart-item-qty">x${item.quantity}</span>
        </div>
        `;
        cartItems.innerHTML += row;
    });
    
    updateTotals();
}

function updateTotals() {
    let subtotal = 0;
    cart.forEach(function (item) {
        subtotal += item.price * item.quantity;
    });

    document.getElementById("subtotal").textContent = subtotal;
    let delivery = Number(document.getElementById("delivery").textContent);
    document.getElementById("total").textContent = subtotal + delivery;
}