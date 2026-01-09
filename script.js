/* LOGIN PAGE */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email")?.value.trim();
        const password = document.getElementById("password")?.value.trim();

        if (!email || !password) {
            alert("Email dan password wajib diisi.");
            return;
        }

        alert("Welcome to SAQÉRA EYEWEAR ✨");
        // pastikan home.html ada di folder yang sama
        window.location.href = "home.html";
    });
}

/* CART GLOBAL */
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

function updateCartCount() {
    const cart = document.getElementById("cart-count");
    if (cart) {
        cart.innerText = cartItems.length;
    }
}

document.addEventListener("DOMContentLoaded", updateCartCount);

/* ADD TO CART  */
function addToCart(name, price, image) {
    if (!name || !price || !image) {
        console.error("Add to cart gagal: data produk tidak lengkap");
        return;
    }

    cartItems.push({
        name,
        price: Number(price.toString().replace(/\D/g, "")),
        image
    });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCartCount();

    alert(name + " berhasil ditambahkan ke keranjang 🛒");
}

/* SCROLL PRODUCT */
function scrollProduct() {
    const productSection = document.getElementById("products");
    if (productSection) {
        productSection.scrollIntoView({ behavior: "smooth" });
    }
}

/* WISHLIST */
document.querySelectorAll(".wishlist").forEach(icon => {
    icon.addEventListener("click", () => {
        icon.classList.toggle("active");
        icon.innerHTML = icon.classList.contains("active")
            ? '<i class="fa-solid fa-heart"></i>'
            : '<i class="fa-regular fa-heart"></i>';
    });
});

/* CATEGORY FILTER */
const cats = document.querySelectorAll(".cat-card");
const products = document.querySelectorAll(".product-card");
const title = document.getElementById("product-title");

if (cats.length && products.length && title) {
    cats.forEach(cat => {
        cat.addEventListener("click", () => {
            cats.forEach(c => c.classList.remove("active"));
            cat.classList.add("active");

            const filter = (cat.dataset.filter || "").toLowerCase();
            title.innerText = cat.innerText;

            products.forEach(product => {
                const category = (product.dataset.category || "").toLowerCase();
                product.style.display =
                    filter === "all" || category.includes(filter)
                        ? "block"
                        : "none";
            });
        });
    });
}

/* NAVIGASI ACTIVE */
const navLinks = document.querySelectorAll(".nav-link");
const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});

/* WISHLIST STORAGE */
function getWishlist() {
    return JSON.parse(localStorage.getItem("wishlistItems")) || [];
}

function saveWishlist(data) {
    localStorage.setItem("wishlistItems", JSON.stringify(data));
}

function toggleWishlist(product, icon) {
    let wishlist = getWishlist();
    const index = wishlist.findIndex(item => item.name === product.name);

    if (index === -1) {
        wishlist.push(product);
        icon.classList.add("active");
        icon.innerHTML = '<i class="fa-solid fa-heart"></i>';
    } else {
        wishlist.splice(index, 1);
        icon.classList.remove("active");
        icon.innerHTML = '<i class="fa-regular fa-heart"></i>';
    }

    saveWishlist(wishlist);
}

// auto aktifkan icon wishlist saat reload
document.addEventListener("DOMContentLoaded", () => {
    const wishlist = getWishlist();

    document.querySelectorAll(".wishlist").forEach(wrapper => {
        const icon = wrapper.querySelector("i");
        const card = wrapper.closest(".product-card");
        if (!icon || !card) return;

        const name = card.querySelector("h4")?.innerText;
        const priceText = card.querySelector("p")?.innerText.replace(/\D/g, "");
        const img = card.querySelector("img")?.getAttribute("src");

        if (!name || !priceText || !img) return;

        const exists = wishlist.some(item => item.name === name);

        if (exists) {
            wrapper.classList.add("active");
            icon.classList.replace("fa-regular", "fa-solid");
        }

        wrapper.addEventListener("click", () => {
            toggleWishlist(
                {
                    name,
                    price: Number(priceText),
                    image: img
                },
                wrapper
            );
        });
    });
});
