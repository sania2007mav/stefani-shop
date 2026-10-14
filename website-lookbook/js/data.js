// data.js — резервный каталог и общие функции сайта Stefani
// Основной источник данных — Firebase Firestore (коллекция products).
let PRODUCTS = [
  {id:1,cat:'Платья',name:'Платье миди с принтом',price:24900,sizes:['XS','S','M','L','XL'],img:['img/p6.jpg','img/p2.jpg','img/p4.jpg'],pos:'center',isNew:true,desc:'Лёгкое платье миди из вискозы с нежным цветочным принтом. Свободный крой, V-образный вырез, длина ниже колена.'},
  {id:2,cat:'Платья',name:'Платье-рубашка из льна',price:19900,sizes:['XS','S','M','L','XL'],img:['img/p2.jpg','img/p6.jpg','img/p4.jpg'],pos:'center',isNew:false,desc:'Платье-рубашка из натурального льна молочного цвета. Пуговицы по всей длине, пояс в комплекте.'},
  {id:3,cat:'Платья',name:'Сарафан молочный',price:22900,sizes:['XS','S','M','L','XL'],img:['img/p4.jpg','img/p2.jpg','img/p6.jpg'],pos:'left',isNew:false,desc:'Воздушный сарафан на тонких бретелях. Хлопок 100%, подходит для лета и отпуска.'},
  {id:4,cat:'Платья',name:'Платье макси «Ривьера»',price:29900,sizes:['XS','S','M','L','XL'],img:['img/p6.jpg','img/p4.jpg','img/p2.jpg'],pos:'top',isNew:false,desc:'Длинное струящееся платье с разрезом. Цветочный принт, мягкая ткань, не мнётся.'},
  {id:5,cat:'Блузы',name:'Джемпер крупной вязки',price:18500,sizes:['XS','S','M','L','XL'],img:['img/p10.jpg','img/p11.jpg','img/p5.jpg'],pos:'center',isNew:true,desc:'Уютный джемпер-пончо крупной вязки с бахромой. Мягкая пряжа, свободная посадка.'},
  {id:6,cat:'Блузы',name:'Топ укороченный',price:8900,sizes:['XS','S','M','L','XL'],img:['img/p5.jpg','img/p10.jpg','img/p11.jpg'],pos:'center',isNew:true,desc:'Укороченный топ изумрудного цвета на тонких бретелях. Эластичная ткань в рубчик.'},
  {id:7,cat:'Блузы',name:'Рубашка белая базовая',price:15900,sizes:['XS','S','M','L','XL'],img:['img/p11.jpg','img/p10.jpg','img/p5.jpg'],pos:'left',isNew:true,desc:'Классическая белая рубашка из хлопка. Базовая вещь, которая сочетается со всем.'},
  {id:8,cat:'Блузы',name:'Худи оверсайз',price:16900,sizes:['XS','S','M','L','XL'],img:['img/p1.jpg','img/p5.jpg','img/p10.jpg'],pos:'top',isNew:true,desc:'Худи свободного кроя с капюшоном. Плотный футер с начёсом, цвет горчица.'},
  {id:9,cat:'Брюки',name:'Брюки палаццо',price:21900,sizes:['XS','S','M','L','XL'],img:['img/p9.jpg','img/p1.jpg','img/p11.jpg'],pos:'center',isNew:true,desc:'Широкие брюки палаццо в полоску с высокой посадкой. Визуально удлиняют ноги.'},
  {id:10,cat:'Брюки',name:'Джоггеры горчичные',price:13900,sizes:['XS','S','M','L','XL'],img:['img/p1.jpg','img/p9.jpg','img/p11.jpg'],pos:'bottom',isNew:false,desc:'Мягкие джоггеры на резинке. Пара к худи оверсайз — получится стильный костюм.'},
  {id:11,cat:'Брюки',name:'Джинсы прямые',price:19900,sizes:['XS','S','M','L','XL'],img:['img/p11.jpg','img/p9.jpg','img/p1.jpg'],pos:'right',isNew:false,desc:'Прямые джинсы с высокой талией из плотного денима. Классический синий цвет.'},
  {id:12,cat:'Брюки',name:'Брюки в полоску',price:17900,sizes:['XS','S','M','L','XL'],img:['img/p9.jpg','img/p11.jpg','img/p1.jpg'],pos:'bottom',isNew:false,desc:'Брюки свободного кроя из струящейся ткани. Подходят и в офис, и на прогулку.'},
  {id:13,cat:'Верхняя одежда',name:'Пальто оверсайз в клетку',price:54900,sizes:['XS','S','M','L','XL'],img:['img/p8.jpg','img/p3.jpg','img/p7.jpg'],pos:'center',isNew:true,desc:'Тёплое пальто оверсайз в клетку. Шерсть 60%, подклад, глубокие карманы.'},
  {id:14,cat:'Верхняя одежда',name:'Плащ голубой',price:49900,sizes:['XS','S','M','L','XL'],img:['img/p7.jpg','img/p8.jpg','img/p3.jpg'],pos:'center',isNew:true,desc:'Удлинённый плащ нежно-голубого цвета с поясом. Водоотталкивающая ткань.'},
  {id:15,cat:'Верхняя одежда',name:'Пальто бордо',price:59900,sizes:['XS','S','M','L','XL'],img:['img/p3.jpg','img/p8.jpg','img/p7.jpg'],pos:'center',isNew:false,desc:'Элегантное пальто цвета бордо с широким воротником. Шерсть с кашемиром.'},
  {id:16,cat:'Верхняя одежда',name:'Жакет в клетку',price:32900,sizes:['XS','S','M','L','XL'],img:['img/p8.jpg','img/p7.jpg','img/p3.jpg'],pos:'top',isNew:false,desc:'Удлинённый жакет в клетку прямого кроя. Носите с джинсами или платьем.'}
];

// Справочники
const CATS = ['Платья', 'Блузы', 'Брюки', 'Верхняя одежда'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const WA = '77000000000'; // ЗАГЛУШКА: замените на реальный номер WhatsApp
let DATA_SOURCE = 'local'; // откуда загружен каталог: 'firestore' или 'local'

// Загрузка каталога из Firebase Firestore.
// Если база недоступна (нет интернета, ошибка, таймаут 6 с) — остаётся резервный массив PRODUCTS.
async function loadProducts() {
  try {
    const db = await import('./db.js');
    const list = await Promise.race([
      db.fetchProducts(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 6000))
    ]);
    if (list.length) { PRODUCTS = list; DATA_SOURCE = 'firestore'; }
  } catch (e) {
    console.warn('Firestore недоступен, используется резервный каталог data.js', e);
  }
  return PRODUCTS;
}

// Вспомогательные функции
const fmt = n => Number(n).toLocaleString('ru-RU').replace(/\u00a0|,/g, ' ') + ' ₸';
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const findProduct = id => PRODUCTS.find(p => p.id == id);

// Корзина хранится в localStorage браузера
const getCart = () => JSON.parse(localStorage.getItem('stefani_cart') || '[]');
const setCart = c => { localStorage.setItem('stefani_cart', JSON.stringify(c)); updBadge(); };
function updBadge() {
  const n = getCart().reduce((s, i) => s + i.q, 0);
  document.querySelectorAll('.cnt').forEach(e => e.textContent = n);
}

// Карточка товара для сеток каталога
function card(p) {
  return `<a class="card" href="product.html?id=${p.id}">
    <img src="${esc(p.img[0])}" style="object-position:${esc(p.pos || 'center')}" alt="${esc(p.name)}" loading="lazy">
    <span class="ccat">${esc(p.cat)}</span><h3>${esc(p.name)}</h3>
    <div class="price">${fmt(p.price)}*</div></a>`;
}

// Общие шапка и подвал для всех страниц
const HEAD = `<header><a class="logo" href="index.html">Stefani</a><nav><a href="catalog.html">Каталог</a><a href="catalog.html?cat=Платья">Платья</a><a href="catalog.html?cat=Верхняя одежда">Верхняя</a><a href="about.html">О бренде</a></nav><a class="cartlink" href="cart.html">Корзина <b class="cnt">0</b></a></header>`;
const FOOT = `<footer><span><b>Stefani</b> lookbook © 2026</span><span><a href="catalog.html">Каталог</a> · <a href="about.html">О бренде</a> · <a href="cart.html">Корзина</a> · <a href="admin.html">Админ</a></span><span>* Цены и контакты — пример</span></footer>`;
document.addEventListener('DOMContentLoaded', () => {
  if ('admin' in document.body.dataset) return; // у админ-панели своя шапка
  document.body.insertAdjacentHTML('afterbegin', HEAD);
  document.body.insertAdjacentHTML('beforeend', FOOT);
  updBadge();
});
