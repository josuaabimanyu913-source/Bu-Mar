console.log("JS aktif");

// =======================
// HAMBURGER MENU
// =======================
const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");
const closeMenu = document.getElementById("closeMenu");

hamburger?.addEventListener("click", () => {
  sideMenu.classList.add("active");
  overlay.classList.add("active");
  hamburger.classList.add("active");
});

closeMenu?.addEventListener("click", closeAllMenu);
overlay?.addEventListener("click", closeAllMenu);

function closeAllMenu() {
  sideMenu.classList.remove("active");
  overlay.classList.remove("active");
  hamburger.classList.remove("active");
}

// =======================
// CART DATA
// =======================
let cart = {};

// =======================
// CART ELEMENTS
// =======================
const cartBtn = document.getElementById("cartBtn");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutBtn2 = document.getElementById("CheckoutSebagian")

// =======================
// UPDATE CART UI
// =======================

function updateCartUI() {
  cartItems.innerHTML = "";

  const items = Object.values(cart);

  // badge jumlah item
  cartCount.textContent = items.reduce((sum, item) => sum + item.qty, 0);

  let totalSelected = 0;
  let totalAll = 0;

  if (items.length === 0) {
    cartItems.innerHTML = "<p>Keranjang masih kosong</p>";
    subtotalSelected.textContent = "Rp 0";
    subtotalAll.textContent = "Rp 0";
    return;
  }

  items.forEach(item => {
    totalAll += item.price * item.qty;
    if (item.selected) {
      totalSelected += item.price * item.qty;
    }

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <label class="cart-row">
        <input type="checkbox" ${item.selected ? "checked" : ""}>
        <div class="cart-info">
          <h4>${item.name}</h4>
          <span>Rp ${item.price * item.qty}</span>
        </div>
      </label>

      <div class="qty-control">
        <button class="qty-minus">−</button>
        <span class="qty">${item.qty}</span>
        <button class="qty-plus">+</button>
      </div>

      <button class="remove-item">Hapus</button>
    `;

    // checkbox
    div.querySelector("input").addEventListener("change", e => {
      item.selected = e.target.checked;
      updateCartUI();
    });

    // tambah
    div.querySelector(".qty-plus").addEventListener("click", () => {
      item.qty++;
      updateCartUI();
    });

    // kurang
    div.querySelector(".qty-minus").addEventListener("click", () => {
      if (item.qty > 1) item.qty--;
      updateCartUI();
    });

    // hapus
    div.querySelector(".remove-item").addEventListener("click", () => {
      delete cart[item.name];
      updateCartUI();
    });

    cartItems.appendChild(div);
  });

  subtotalSelected.textContent = "Rp " + totalSelected;
  subtotalAll.textContent = "Rp " + totalAll;
}

// =======================
// ADD TO CART
// =======================
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    const product = btn.closest(".product-card");
    const name = product.dataset.name;
    const price = Number(product.dataset.price);

    if (cart[name]) {
      cart[name].qty += 1;
    } else {
      cart[name] = {
        name,
        price,
        qty: 1,
        selected: true
      };
    }

    updateCartUI();
  });
});

// =======================
// OPEN / CLOSE CART
// =======================
cartBtn?.addEventListener("click", () => {
  cartPanel.classList.add("active");
});

closeCart?.addEventListener("click", () => {
  cartPanel.classList.remove("active");
});

// =======================
// BUY NOW
// =======================
document.querySelectorAll(".buy-now").forEach(btn => {
  btn.addEventListener("click", () => {
    const product = btn.closest(".product-card");

    const msg = `Halo, saya ingin membeli:
${product.dataset.name}
Harga: Rp ${product.dataset.price}`;

    window.open(
      "https://wa.me/6289506446845?text=" + encodeURIComponent(msg),
      "_blank"
    );
  });
});


// =======================
// TERTARIK BEMITRA
// =======================

const walinks = document.querySelectorAll('.WhatsApp-link');

walinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); 

    const phone = this.dataset.phone;
    const message = encodeURIComponent(this.dataset.message); 
    const url = `https://wa.me/${phone}?text=${message}`;

    window.open(url, '_blank');

  })});
  
  
// =======================
// CHECKOUT SELECTED
// =======================
checkoutBtn?.addEventListener("click", () => {
  const selectedItems = Object.values(cart).filter(i => i.selected);

  if (selectedItems.length === 0) {
    alert("Pilih minimal satu produk untuk checkout");
    return;
  }

  let message = "Halo, saya ingin memesan:\n\n";

  selectedItems.forEach(item => {
    message += `- ${item.name} x${item.qty} (Rp ${item.price * item.qty})\n`;
  });

  window.open(
    "https://wa.me/6289506446845?text=" + encodeURIComponent(message),
    "_blank"
  );
});


checkoutBtn2?.addEventListener("click", () => {
  const selectAllItems = Object.values(cart).filter(i => i.selectAll);

  if (selectAllItems.length === 0) {
    alert("Pilih minimal satu produk untuk checkout");
    return;
  }

  let message = "Halo, saya ingin memesan:\n\n";

  selectAllItems.forEach(item => {
    message += `- ${item.name} x${item.qty} (Rp ${item.price * item.qty})\n`;
  })

  window.open(
    "https://wa.me/6289506446845?text=" + encodeURIComponent(message),
    "_blank"
  )
})

// ELEMENT BARU

const subtotalSelected = document.getElementById("subtotalSelected");
const subtotalAll = document.getElementById("subtotalAll");
const checkoutAllBtn = document.getElementById("checkoutAll");


