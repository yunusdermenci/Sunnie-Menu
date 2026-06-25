import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const DEFAULT_MENU = [
  {
    title: "Kahve Kokusu",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200",
    items: [
      { name: "Espresso", description: "Espresso shot", price: 90 },
      { name: "Double Espressso", description: "Double Espresso Shot", price: 140 },
      { name: "Türk Kahvesi", price: 110 },
      { name: "Double Türk Kahvesi", price: 150 },
      { name: "Filtre Kahve", description: "Filtre kahve", price: 140 },
      { name: "Americano", description: "Espresso, sıcak su", price: 160 },
      { name: "Latte", description: "Espresso, süt. Aroma seçeneği ile +20", price: 180 },
      { name: "Macchiato", price: 180 },
      { name: "Cappucino", description: "Espresso, süt, süt köpüğü", price: 180 },
      { name: "Ice Americano", description: "Espresso, su, buz", price: 180 },
      { name: "Ice Latte", description: "Espresso, süt. Aroma seçeneği ile +20", price: 200 },
      { name: "Flat White", description: "Çift shot espresso, süt, mikro köpük", price: 200 },
      { name: "Freddo Espresso", description: "Çift shot espresso, 4-5 buz küpü ile espresso köpük", price: 200 },
      { name: "Freddo Cappuccino", description: "Çift shot espresso, 4-5 buz küpü, soğuk süt köpüğü", price: 250 }
    ]
  },
  {
    title: "Tatlı Bütünü",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=1200",
    items: [
      { name: "Pistachio Ink Tiramisu", description: "Mascarpone kreması, espresso, kedi dili, kakao", price: 290 },
      { name: "Dark Berry Tart", description: "Tart hamuru, böğürtlen marmelatı, krema, böğürtlen sorbe ile servis edilir", price: 270 },
      { name: "Dark Chocolate Dream", description: "Yoğun kakao ve çikolata aroması, sade dondurma eşliğinde. Sıcak servis edilir, 12 dakika servis süresi.", price: 320 }
    ]
  },
  {
    title: "Sıcak Keyif",
    image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&q=80&w=1200",
    items: [
      { name: "Sahlep", price: 200 },
      { name: "Sıcak Çikolata", price: 200 },
      { name: "Chai Tea Latte", price: 200 }
    ]
  },
  {
    title: "Doyurucu Köşe",
    image: "https://images.unsplash.com/photo-1554433607-66b5efe9d304?auto=format&fit=crop&q=80&w=1200",
    items: [
      { name: "Black Cut Sandwich", description: "Dana kaburga füme, roka, marul, çeri domates, pesto sos, kaşar peyniri, cheddar peynir", price: 280, note: "günlük hazırlanır" },
      { name: "Soft Green Sandwich", description: "Avokado, beyaz peynir, cheddar peynir, roka, marul, hindi füme, kurutulmuş domates", price: 240 },
      { name: "Melt Ink Sandwich", description: "Ajvar sos, cheddar peyniri, kaşar peyniri, beyaz peynir", price: 220 }
    ]
  },
  {
    title: "Sunnie Salads",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200",
    items: [
      { name: "Ink Tuna Salad", description: "Ton balık, marul, roka, mısır, çeri domates, salatalık, kıtır ekmek", price: 270, note: "günlük hazırlanır" },
      { name: "Grill Chicken Green", description: "Izgara tavuk, marul, roka, kapya biber, bezelye, salatalık, keten tohumu, kıtır ekmek", price: 290 }
    ]
  },
  {
    title: "Çay / Bitki Çayı",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=1200",
    items: [
      { name: "Bardak Çay", price: 50 },
      { name: "Fincan Çay", price: 80 },
      { name: "Kış Çayı", price: 140 },
      { name: "Hibiscus", price: 110 },
      { name: "Ihlamur", price: 120 }
    ]
  },
  {
    title: "Meşrubatlar",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=1200",
    items: [
      { name: "Su", price: 40 },
      { name: "Sade Soda", price: 70 },
      { name: "Fanta", price: 80 },
      { name: "Sprite", price: 80 },
      { name: "Kola", price: 80 },
      { name: "Uludağ Frutti Çeşitleri", description: "Elma, karpuz-çilek, limon, ahududu, nar", price: 90 },
      { name: "Ice Tea Çeşitleri", price: 90 },
      { name: "Churchill", description: "Sade soda, tuz, limon suyu", price: 130 },
      { name: "Lemon Fresh Çeşitleri", description: "Mango-limon, ahududu-limon, nane-limon", price: 150 }
    ]
  },
  {
    title: "Yaz Esintisi",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&q=80&w=1200&sat=20",
    items: [
      { name: "Cool Lime", description: "İlave şurup ile tatlandırılabilir (+20)", price: 150 },
      { name: "Limonata", price: 180 },
      { name: "Reyhan Limonata", price: 200 },
      { name: "Hibiscus Limonata", price: 200 }
    ]
  },
  {
    title: "Special",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1200",
    items: [
      { name: "Affogato", description: "Bir top vanilyalı dondurma üzerine sıcak espresso dökülerek hazırlanır.", price: 200 },
      { name: "Karamel Affogato", description: "Bir top karamelli dondurmanın üzerine sıcak espresso dökülmesiyle hazırlanır.", price: 210 },
      { name: "Antep Fıstıklı Affogato", description: "Bir top fıstıklı dondurmanın üzerine sıcak espresso dökülmesiyle hazırlanır.", price: 220 }
    ]
  }
];

const app = document.querySelector("#app");
const backButton = document.querySelector(".back-button");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");
const modalPrice = document.querySelector("#modal-price");

const state = {
  auth: null,
  db: null,
  user: null,
  firebaseReady: false,
  menu: cloneMenu(DEFAULT_MENU),
  activeCategory: 0,
  activeItem: null,
  status: "",
  error: ""
};

const firebaseConfig = window.SUNNIE_FIREBASE_CONFIG || {};
const firebaseComplete = ["apiKey", "authDomain", "projectId", "appId"].every((key) => firebaseConfig[key]);

if (firebaseComplete) {
  const firebaseApp = initializeApp(firebaseConfig);
  state.auth = getAuth(firebaseApp);
  state.db = getFirestore(firebaseApp);
  state.firebaseReady = true;

  onAuthStateChanged(state.auth, (user) => {
    state.user = user;
    render();
  });

  onSnapshot(
    menuDoc(),
    (snapshot) => {
      if (snapshot.exists() && Array.isArray(snapshot.data().categories)) {
        state.menu = normalizeMenu(snapshot.data().categories);
        render();
      }
    },
    () => {
      state.error = "Menü verisi okunamadı. Varsayılan menü gösteriliyor.";
      render();
    }
  );
}

function menuDoc() {
  return doc(state.db, "menus", "current");
}

function cloneMenu(menu) {
  return JSON.parse(JSON.stringify(menu));
}

function normalizeMenu(menu) {
  return menu.map((category) => ({
    title: String(category.title || "Yeni Kategori"),
    image: String(category.image || ""),
    items: Array.isArray(category.items)
      ? category.items.map((item) => ({
          name: String(item.name || "Yeni Ürün"),
          description: String(item.description || ""),
          note: String(item.note || ""),
          price: Number(item.price) || 0
        }))
      : []
  }));
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const slugify = (text) =>
  text
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const formatPrice = (price) => `${Number(price || 0).toLocaleString("tr-TR")} ₺`;

function getCategoryFromHash() {
  const match = window.location.hash.match(/^#\/category\/(.+)$/);
  if (!match) return null;
  return state.menu.find((category) => slugify(category.title) === match[1]) || null;
}

function isAdminRoute() {
  return window.location.hash.startsWith("#/admin");
}

function renderHome() {
  document.body.classList.add("home-view");
  document.body.classList.remove("detail-view", "admin-view");
  app.innerHTML = `
    <div class="menu-label">MENU</div>
    ${state.error ? `<div class="notice">${escapeHtml(state.error)}</div>` : ""}
    <section class="category-list" aria-label="Menu kategorileri">
      ${state.menu
        .map(
          (category) => `
            <a class="category-tile ${category.image ? "" : "category-tile-empty"}" href="#/category/${slugify(category.title)}">
              ${category.image ? `<img src="${escapeHtml(category.image)}" alt="" loading="lazy">` : ""}
              <h2 class="tile-title">${escapeHtml(category.title)}</h2>
              <span class="tile-arrow" aria-hidden="true">›</span>
            </a>
          `
        )
        .join("")}
    </section>
  `;
}

function renderDetail(category) {
  document.body.classList.add("detail-view");
  document.body.classList.remove("home-view", "admin-view");
  app.innerHTML = `
    <section class="detail-view-wrap">
      <div class="detail-hero ${category.image ? "" : "detail-hero-empty"}">
        ${category.image ? `<img src="${escapeHtml(category.image)}" alt="" loading="lazy">` : ""}
        <h2 class="detail-title">${escapeHtml(category.title)}</h2>
      </div>
      <div class="item-list">
        ${category.items
          .map(
            (item, index) => `
              <button class="menu-item" type="button" data-item-index="${index}">
                <div>
                  <h3 class="item-name">${escapeHtml(item.name)}</h3>
                  ${item.description ? `<p class="item-description">${escapeHtml(item.description)}</p>` : ""}
                  ${item.note ? `<span class="item-note">${escapeHtml(item.note)}</span>` : ""}
                </div>
                <strong class="item-price">${formatPrice(item.price)}</strong>
                <span class="info-dot" aria-hidden="true">i</span>
              </button>
            `
          )
          .join("")}
      </div>
    </section>
  `;

  app.querySelectorAll(".menu-item").forEach((button) => {
    button.addEventListener("click", () => {
      const item = category.items[Number(button.dataset.itemIndex)];
      openModal(item);
    });
  });
}

function renderAdmin() {
  document.body.classList.remove("home-view", "detail-view");
  document.body.classList.add("admin-view");

  if (!state.firebaseReady) {
    app.innerHTML = `
      <section class="admin-panel">
        <h2>Firebase bağlantısı gerekli</h2>
        <p class="admin-muted">Admin panelinin kalıcı çalışması için <code>firebase-config.js</code> dosyasındaki Firebase bilgilerini doldur.</p>
      </section>
    `;
    return;
  }

  if (!state.user) {
    renderLogin();
    return;
  }

  const category = state.menu[state.activeCategory] || state.menu[0];
  app.innerHTML = `
    <section class="admin-panel">
      <div class="admin-topbar">
        <div>
          <span class="admin-kicker">Restoran girişi</span>
          <h2>Menü Yönetimi</h2>
        </div>
        <div class="admin-actions">
          <a href="#" class="admin-ghost">Menüye dön</a>
          <button type="button" class="admin-ghost" data-action="logout">Çıkış</button>
        </div>
      </div>
      ${state.status ? `<div class="notice success">${escapeHtml(state.status)}</div>` : ""}
      ${state.error ? `<div class="notice">${escapeHtml(state.error)}</div>` : ""}
      <div class="admin-grid">
        <aside class="admin-sidebar">
          <button type="button" class="admin-primary" data-action="add-category">Yeni kategori</button>
          <div class="admin-category-list">
            ${state.menu
              .map(
                (item, index) => `
                  <button type="button" class="${index === state.activeCategory ? "active" : ""}" data-category-index="${index}">
                    ${escapeHtml(item.title)}
                  </button>
                `
              )
              .join("")}
          </div>
          <button type="button" class="admin-danger-outline" data-action="reset-menu">Varsayılana sıfırla</button>
        </aside>
        <div class="admin-editor">
          ${
            category
              ? renderCategoryEditor(category)
              : `<p class="admin-muted">Düzenlemek için kategori ekle.</p>`
          }
        </div>
      </div>
    </section>
  `;

  bindAdminEvents();
}

function renderLogin() {
  app.innerHTML = `
    <section class="login-panel">
      <span class="admin-kicker">Restoran girişi</span>
      <h2>Menü Yönetimi</h2>
      <form id="login-form" class="admin-form">
        <label>
          Kullanıcı adı
          <input name="username" autocomplete="username" required>
        </label>
        <label>
          Şifre
          <input name="password" type="password" autocomplete="current-password" required>
        </label>
        ${state.error ? `<div class="notice">${escapeHtml(state.error)}</div>` : ""}
        <button type="submit" class="admin-primary">Giriş yap</button>
        <a href="#" class="admin-return">Menüye dön</a>
      </form>
    </section>
  `;

  document.querySelector("#login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const username = String(form.get("username") || "").trim();
    const password = String(form.get("password") || "");
    if (username !== "sunnietattooart") {
      state.error = "Kullanıcı adı veya şifre hatalı.";
      render();
      return;
    }

    try {
      state.error = "";
      await signInWithEmailAndPassword(state.auth, window.SUNNIE_ADMIN_EMAIL, password);
      const snapshot = await getDoc(menuDoc());
      if (!snapshot.exists()) await saveMenu(state.menu, "İlk menü Firebase'e kaydedildi.");
    } catch {
      state.error = "Kullanıcı adı veya şifre hatalı.";
      render();
    }
  });
}

function renderCategoryEditor(category) {
  return `
    <form id="category-form" class="admin-form">
      <div class="admin-section-title">
        <h3>Kategori</h3>
        <button type="button" class="admin-danger" data-action="delete-category">Kategoriyi sil</button>
      </div>
      <label>
        Kategori adı
        <input name="title" value="${escapeHtml(category.title)}" required>
      </label>
      <p class="admin-muted">Görseller sabit tutulur. Yeni kategoriler görselsiz eklenir.</p>
      <button type="submit" class="admin-primary">Kategoriyi kaydet</button>
    </form>
    <div class="admin-items">
      <div class="admin-section-title">
        <h3>Ürünler</h3>
        <button type="button" class="admin-primary small" data-action="add-item">Yeni ürün</button>
      </div>
      ${category.items
        .map(
          (item, index) => `
            <form class="admin-item-form" data-item-form="${index}">
              <div class="admin-item-head">
                <strong>${escapeHtml(item.name || "Yeni Ürün")}</strong>
                <button type="button" class="admin-danger" data-action="delete-item" data-item-index="${index}">Sil</button>
              </div>
              <label>
                Ürün adı
                <input name="name" value="${escapeHtml(item.name)}" required>
              </label>
              <label>
                Açıklama
                <textarea name="description" rows="2">${escapeHtml(item.description || "")}</textarea>
              </label>
              <label>
                Not
                <input name="note" value="${escapeHtml(item.note || "")}">
              </label>
              <label>
                Fiyat
                <input name="price" type="number" min="0" step="1" value="${Number(item.price) || 0}" required>
              </label>
              <button type="submit" class="admin-primary small">Ürünü kaydet</button>
            </form>
          `
        )
        .join("")}
    </div>
  `;
}

function bindAdminEvents() {
  app.querySelectorAll("[data-category-index]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeCategory = Number(button.dataset.categoryIndex);
      state.activeItem = null;
      clearMessages();
      render();
    });
  });

  app.querySelector("[data-action='logout']")?.addEventListener("click", async () => {
    await signOut(state.auth);
    window.location.hash = "";
  });

  app.querySelector("[data-action='add-category']")?.addEventListener("click", async () => {
    const next = cloneMenu(state.menu);
    next.push({ title: "Yeni Kategori", image: "", items: [] });
    state.activeCategory = next.length - 1;
    await saveMenu(next, "Kategori eklendi.");
  });

  app.querySelector("[data-action='delete-category']")?.addEventListener("click", async () => {
    if (!confirm("Bu kategoriyi ve içindeki tüm ürünleri silmek istiyor musun?")) return;
    const next = cloneMenu(state.menu);
    next.splice(state.activeCategory, 1);
    state.activeCategory = Math.max(0, state.activeCategory - 1);
    await saveMenu(next, "Kategori silindi.");
  });

  app.querySelector("[data-action='reset-menu']")?.addEventListener("click", async () => {
    if (!confirm("Menü tam şu anki varsayılan haline dönecek. Tüm Firebase değişiklikleri silinsin mi?")) return;
    state.activeCategory = 0;
    await saveMenu(cloneMenu(DEFAULT_MENU), "Menü varsayılan hale döndürüldü.");
  });

  app.querySelector("[data-action='add-item']")?.addEventListener("click", async () => {
    const next = cloneMenu(state.menu);
    next[state.activeCategory].items.push({ name: "Yeni Ürün", description: "", note: "", price: 0 });
    await saveMenu(next, "Ürün eklendi.");
  });

  app.querySelector("#category-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const next = cloneMenu(state.menu);
    next[state.activeCategory].title = String(form.get("title") || "").trim() || "Yeni Kategori";
    await saveMenu(next, "Kategori kaydedildi.");
  });

  app.querySelectorAll(".admin-item-form").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const itemIndex = Number(form.dataset.itemForm);
      const formData = new FormData(form);
      const next = cloneMenu(state.menu);
      next[state.activeCategory].items[itemIndex] = {
        name: String(formData.get("name") || "").trim() || "Yeni Ürün",
        description: String(formData.get("description") || "").trim(),
        note: String(formData.get("note") || "").trim(),
        price: Number(formData.get("price")) || 0
      };
      await saveMenu(next, "Ürün kaydedildi.");
    });
  });

  app.querySelectorAll("[data-action='delete-item']").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!confirm("Bu ürünü silmek istiyor musun?")) return;
      const next = cloneMenu(state.menu);
      next[state.activeCategory].items.splice(Number(button.dataset.itemIndex), 1);
      await saveMenu(next, "Ürün silindi.");
    });
  });
}

async function saveMenu(menu, message) {
  if (!state.firebaseReady || !state.user) return;
  try {
    clearMessages();
    const categories = normalizeMenu(menu);
    await setDoc(menuDoc(), { categories, updatedAt: serverTimestamp() });
    state.menu = categories;
    state.status = message;
    render();
  } catch {
    state.error = "Değişiklik kaydedilemedi. Firebase kurallarını ve bağlantıyı kontrol et.";
    render();
  }
}

function clearMessages() {
  state.status = "";
  state.error = "";
}

function render() {
  const category = getCategoryFromHash();
  if (isAdminRoute()) {
    renderAdmin();
  } else if (category) {
    renderDetail(category);
  } else {
    renderHome();
  }
  window.scrollTo({ top: 0, behavior: "auto" });
}

function openModal(item) {
  modalTitle.textContent = item.name;
  modalDescription.textContent = item.description || item.note || "";
  modalPrice.textContent = formatPrice(item.price);
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

backButton.addEventListener("click", () => {
  window.location.hash = "";
});

document.querySelector(".modal-backdrop").addEventListener("click", closeModal);
document.querySelector(".modal-close").addEventListener("click", closeModal);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

window.addEventListener("hashchange", () => {
  closeModal();
  clearMessages();
  render();
});

render();
