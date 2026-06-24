const menu = [
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
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&q=80&w=1200",
    items: [
      { name: "Cool Lime", description: "İlave şurup ile tatlandırılabilir (+20)", price: 150 },
      { name: "Limonata", price: 180 },
      { name: "Reyhan Limonata", price: 200 },
      { name: "Hibiscus Limonata", price: 200 }
    ]
  },
  {
    title: "Special",
    image: "",
    items: [
      { name: "Affogato", description: "Bir top vanilyalı dondurma üzerine sıcak espresso dökülerek hazırlanır.", price: 200 },
      { name: "Karamel Affogato", description: "Bir top karamelli dondurmanın üzerine sıcak espresso dökülmesiyle hazırlanır.", price: 210 },
      { name: "Antep Fıstıklı Affogato", description: "Bir top fıstıklı dondurmanın üzerine sıcak espresso dökülmesiyle hazırlanır.", price: 220 }
    ]
  }
];

const slugify = (text) =>
  text
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const formatPrice = (price) =>
  new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0
  }).format(price);

function renderNavigation() {
  const nav = document.querySelector(".category-nav");
  nav.innerHTML = menu
    .map((category) => `<a href="#${slugify(category.title)}">${category.title}</a>`)
    .join("");
}

function renderMenu() {
  const container = document.querySelector("#menu");

  container.innerHTML = menu
    .map((category) => {
      const id = slugify(category.title);
      const image = category.image
        ? `<img src="${category.image}" alt="${category.title}" loading="lazy">`
        : "";

      const items = category.items
        .map(
          (item) => `
            <article class="menu-item">
              <div>
                <h3 class="item-name">${item.name}</h3>
                ${item.description ? `<p class="item-description">${item.description}</p>` : ""}
                ${item.note ? `<span class="item-note">${item.note}</span>` : ""}
              </div>
              <div class="item-price">${formatPrice(item.price)}</div>
            </article>
          `
        )
        .join("");

      return `
        <section class="category-card" id="${id}">
          <div class="category-hero">
            ${image}
            <h2 class="category-title">${category.title}</h2>
          </div>
          <div class="items">${items}</div>
        </section>
      `;
    })
    .join("");
}

renderNavigation();
renderMenu();
