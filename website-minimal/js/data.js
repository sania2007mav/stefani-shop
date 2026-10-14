// data.js — каталог Stefani (стиль VELORA-like minimal)
let PRODUCTS = [
  {id:1,cat:'Платья',name:'Платье миди с принтом',price:24900,oldPrice:null,sizes:['XS','S','M','L','XL'],img:['img/p6.jpg','img/p2.jpg','img/p4.jpg'],pos:'center',isNew:true,desc:'Лёгкое платье миди из вискозы с нежным цветочным принтом.'},
  {id:2,cat:'Платья',name:'Платье-рубашка из льна',price:16900,oldPrice:19900,sizes:['XS','S','M','L','XL'],img:['img/p2.jpg','img/p6.jpg','img/p4.jpg'],pos:'center',isNew:false,desc:'Платье-рубашка из натурального льна молочного цвета.'},
  {id:3,cat:'Платья',name:'Сарафан молочный',price:22900,oldPrice:null,sizes:['XS','S','M','L','XL'],img:['img/p4.jpg','img/p2.jpg','img/p6.jpg'],pos:'left',isNew:false,desc:'Воздушный сарафан на тонких бретелях. Хлопок 100%.'},
  {id:4,cat:'Платья',name:'Платье макси «Ривьера»',price:24900,oldPrice:29900,sizes:['XS','S','M','L','XL'],img:['img/p6.jpg','img/p4.jpg','img/p2.jpg'],pos:'top',isNew:false,desc:'Длинное струящееся платье с разрезом.'},
  {id:5,cat:'Блузы',name:'Джемпер крупной вязки',price:18500,oldPrice:null,sizes:['XS','S','M','L','XL'],img:['img/p10.jpg','img/p11.jpg','img/p5.jpg'],pos:'center',isNew:true,desc:'Уютный джемпер-пончо крупной вязки с бахромой.'},
  {id:6,cat:'Блузы',name:'Топ укороченный',price:8900,oldPrice:null,sizes:['XS','S','M','L','XL'],img:['img/p5.jpg','img/p10.jpg','img/p11.jpg'],pos:'center',isNew:true,desc:'Укороченный топ на тонких бретелях.'},
  {id:7,cat:'Блузы',name:'Рубашка белая базовая',price:15900,oldPrice:null,sizes:['XS','S','M','L','XL'],img:['img/p11.jpg','img/p10.jpg','img/p5.jpg'],pos:'left',isNew:true,desc:'Классическая белая рубашка из хлопка.'},
  {id:8,cat:'Блузы',name:'Худи оверсайз',price:13900,oldPrice:16900,sizes:['XS','S','M','L','XL'],img:['img/p1.jpg','img/p5.jpg','img/p10.jpg'],pos:'top',isNew:true,desc:'Худи свободного кроя с капюшоном.'},
  {id:9,cat:'Брюки',name:'Брюки палаццо',price:21900,oldPrice:null,sizes:['XS','S','M','L','XL'],img:['img/p9.jpg','img/p1.jpg','img/p11.jpg'],pos:'center',isNew:true,desc:'Широкие брюки палаццо с высокой посадкой.'},
  {id:10,cat:'Брюки',name:'Джоггеры горчичные',price:13900,oldPrice:null,sizes:['XS','S','M','L','XL'],img:['img/p1.jpg','img/p9.jpg','img/p11.jpg'],pos:'bottom',isNew:false,desc:'Мягкие джоггеры на резинке.'},
  {id:11,cat:'Брюки',name:'Джинсы прямые',price:16900,oldPrice:19900,sizes:['XS','S','M','L','XL'],img:['img/p11.jpg','img/p9.jpg','img/p1.jpg'],pos:'right',isNew:false,desc:'Прямые джинсы с высокой талией.'},
  {id:12,cat:'Брюки',name:'Брюки в полоску',price:17900,oldPrice:null,sizes:['XS','S','M','L','XL'],img:['img/p9.jpg','img/p11.jpg','img/p1.jpg'],pos:'bottom',isNew:false,desc:'Брюки свободного кроя из струящейся ткани.'},
  {id:13,cat:'Верхняя одежда',name:'Пальто оверсайз в клетку',price:54900,oldPrice:null,sizes:['XS','S','M','L','XL'],img:['img/p8.jpg','img/p3.jpg','img/p7.jpg'],pos:'center',isNew:true,desc:'Тёплое пальто оверсайз в клетку.'},
  {id:14,cat:'Верхняя одежда',name:'Плащ голубой',price:44900,oldPrice:49900,sizes:['XS','S','M','L','XL'],img:['img/p7.jpg','img/p8.jpg','img/p3.jpg'],pos:'center',isNew:true,desc:'Удлинённый плащ с поясом.'},
  {id:15,cat:'Верхняя одежда',name:'Пальто бордо',price:59900,oldPrice:null,sizes:['XS','S','M','L','XL'],img:['img/p3.jpg','img/p8.jpg','img/p7.jpg'],pos:'center',isNew:false,desc:'Элегантное пальто цвета бордо.'},
  {id:16,cat:'Верхняя одежда',name:'Жакет в клетку',price:32900,oldPrice:null,sizes:['XS','S','M','L','XL'],img:['img/p8.jpg','img/p7.jpg','img/p3.jpg'],pos:'top',isNew:false,desc:'Удлинённый жакет в клетку прямого кроя.'}
];

const CATS = ['Платья', 'Блузы', 'Брюки', 'Верхняя одежда'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const WA = '77000000000';
let DATA_SOURCE = 'local';

async function loadProducts() {
  try {
    const db = await import('./db.js');
    const list = await Promise.race([
      db.fetchProducts(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 6000))
    ]);
    if (list.length) {
      PRODUCTS = list.map(p => ({
        oldPrice: p.oldPrice || null,
        ...p,
        img: (p.img || []).map(src => String(src).startsWith('img/') || String(src).startsWith('http') ? src : `img/${src}.jpg`)
      }));
      DATA_SOURCE = 'firestore';
    }
  } catch (e) {
    console.warn('Firestore недоступен, локальный каталог', e);
  }
  return PRODUCTS;
}

const fmt = n => Number(n).toLocaleString('ru-RU').replace(/\u00a0|,/g, ' ') + ' ₸';
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const findProduct = id => PRODUCTS.find(p => p.id == id);
const onSale = p => p.oldPrice && p.oldPrice > p.price;

const getCart = () => JSON.parse(localStorage.getItem('stefani_cart') || '[]');
const setCart = c => { localStorage.setItem('stefani_cart', JSON.stringify(c)); updBadge(); };
function updBadge() {
  const n = getCart().reduce((s, i) => s + i.q, 0);
  document.querySelectorAll('.cnt').forEach(e => e.textContent = n);
}

const HANGER = `<svg class="hanger" viewBox="0 0 64 64" aria-hidden="true"><path d="M32 10a6 6 0 0 1 6 6c0 2.4-1.4 4.4-3.5 5.4L48 40H16l13.5-18.6A6.1 6.1 0 0 1 26 16a6 6 0 0 1 6-6z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 44h44v4H10z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`;

function card(p) {
  const img = p.img && p.img[0]
    ? `<img src="${esc(p.img[0])}" style="object-position:${esc(p.pos || 'center')}" alt="${esc(p.name)}" loading="lazy">`
    : `<div class="ph">${HANGER}</div>`;
  const price = onSale(p)
    ? `<div class="price"><s>${fmt(p.oldPrice)}</s> <b>${fmt(p.price)}</b></div>`
    : `<div class="price">${fmt(p.price)}</div>`;
  const badges = [
    p.isNew ? '<span class="badge">new</span>' : '',
    onSale(p) ? '<span class="badge sale">sale</span>' : ''
  ].join('');
  return `<a class="card" href="product.html?id=${p.id}">
    <div class="thumb">${img}${badges}</div>
    <div class="meta"><h3>${esc(p.name)}</h3>${price}</div>
  </a>`;
}

const HEAD = `
<div class="topbar">−20% на первый заказ по промокоду <b>STEFANI20</b> · бесплатная доставка от 30 000 ₸</div>
<header class="site-head">
  <a class="logo" href="index.html">Stefani</a>
  <nav>
    <a href="index.html" data-nav="women">Женщинам</a>
    <a href="index.html?new=1" data-nav="new">Новинки</a>
    <a href="index.html?sale=1" data-nav="sale">Sale</a>
    <a href="about.html" data-nav="about">О бренде</a>
    <a href="about.html#contacts" data-nav="contacts">Контакты</a>
  </nav>
  <a class="cartlink" href="cart.html">Корзина <b class="cnt">0</b></a>
</header>`;

const FOOT = `<footer>
  <span><b>Stefani</b> — женская одежда © 2026</span>
  <span><a href="index.html">Каталог</a> · <a href="about.html">О бренде</a> · <a href="cart.html">Корзина</a> · <a href="admin.html">Админ</a></span>
  <span>* Цены и контакты указаны для примера</span>
</footer>`;

document.addEventListener('DOMContentLoaded', () => {
  if ('admin' in document.body.dataset) return;
  document.body.insertAdjacentHTML('afterbegin', HEAD);
  document.body.insertAdjacentHTML('beforeend', FOOT);
  updBadge();
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    if (a.getAttribute('href') === path || (path === '' && a.getAttribute('href') === 'index.html')) {
      a.classList.add('on');
    }
  });
});
