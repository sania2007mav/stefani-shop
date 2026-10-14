// admin.js — админ-панель: вход, список товаров, добавление, изменение, удаление
import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut }
  from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js';
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc }
  from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const $ = id => document.getElementById(id);

let items = [];      // товары из Firestore
let editId = null;   // id редактируемого товара (null — новый)
let photos = [];     // фотографии в форме (пути img/... или data:URL)

// ---------- Авторизация ----------
$('loginForm').onsubmit = async e => {
  e.preventDefault();
  $('loginErr').textContent = '';
  try {
    await signInWithEmailAndPassword(auth, $('email').value.trim(), $('pass').value);
  } catch (err) {
    $('loginErr').textContent = 'Неверный e-mail или пароль';
  }
};

onAuthStateChanged(auth, user => {
  $('loginBox').classList.toggle('hidden', !!user);
  $('listBox').classList.toggle('hidden', !user);
  $('who').innerHTML = user
    ? `${esc(user.email)} <button class="btn ghost sm" id="logout">Выйти</button>` : '';
  if (user) { $('logout').onclick = () => signOut(auth); loadList(); }
});

// ---------- Список товаров ----------
async function loadList() {
  const snap = await getDocs(collection(db, 'products'));
  items = snap.docs.map(d => d.data()).sort((a, b) => a.id - b.id);
  $('count').textContent = '(' + items.length + ')';
  $('rows').innerHTML = items.map(p => `<tr>
    <td><img src="${esc(p.img[0] || '')}" alt=""></td>
    <td><a href="product.html?id=${p.id}" target="_blank"><b>${esc(p.name)}</b></a><small class="mob"> ${esc(p.cat)} · ${fmt(p.price)}</small></td>
    <td>${esc(p.cat)}</td><td>${fmt(p.price)}</td>
    <td>${esc((p.sizes || []).join(', '))}</td><td>${p.isNew ? '✓' : ''}</td>
    <td><button class="btn ghost sm" data-edit="${p.id}">Изменить</button>
        <button class="btn sm danger" data-del="${p.id}">Удалить</button></td></tr>`).join('');
}

$('rows').onclick = async e => {
  const ed = e.target.dataset.edit, del = e.target.dataset.del;
  if (ed) openForm(items.find(p => p.id == ed));
  if (del) {
    const p = items.find(x => x.id == del);
    if (!confirm(`Удалить товар «${p.name}»?`)) return;
    try {
      await deleteDoc(doc(db, 'products', String(p.id)));
      flash('Товар удалён');
      loadList();
    } catch (err) { flash('Ошибка удаления: ' + err.message); }
  }
};

function flash(text) { $('listMsg').textContent = text; setTimeout(() => $('listMsg').textContent = '', 4000); }

// ---------- Форма товара ----------
$('fCat').innerHTML = CATS.map(c => `<option>${c}</option>`).join('');
$('fSizes').innerHTML = SIZES.map(s => `<label><input type="checkbox" value="${s}"> ${s}</label>`).join('');
$('addBtn').onclick = () => openForm(null);
$('cancelBtn').onclick = () => $('modal').classList.add('hidden');

function openForm(p) {
  editId = p ? p.id : null;
  $('formTitle').textContent = p ? 'Редактирование товара' : 'Новый товар';
  $('fName').value = p ? p.name : '';
  $('fCat').value = p ? p.cat : CATS[0];
  $('fPrice').value = p ? p.price : '';
  $('fDesc').value = p ? p.desc : '';
  $('fNew').checked = p ? !!p.isNew : true;
  $('fPos').value = p ? (p.pos || 'center') : 'center';
  document.querySelectorAll('#fSizes input').forEach(c => c.checked = p ? (p.sizes || []).includes(c.value) : true);
  photos = p ? [...p.img] : [];
  drawPhotos();
  $('formErr').textContent = '';
  $('modal').classList.remove('hidden');
}

function drawPhotos() {
  $('fPhotos').innerHTML = photos.map((src, i) =>
    `<div><img src="${esc(src)}" alt=""><button type="button" data-rm="${i}" title="Убрать">×</button></div>`).join('')
    || '<small>Фото не добавлены</small>';
}
$('fPhotos').onclick = e => { if (e.target.dataset.rm) { photos.splice(+e.target.dataset.rm, 1); drawPhotos(); } };

// Загрузка фото: уменьшаем до 900 px и сжимаем в JPEG, сохраняем как data:URL
$('fFile').onchange = async e => {
  for (const file of e.target.files) photos.push(await compress(file, 900, 0.75));
  e.target.value = '';
  drawPhotos();
};
function compress(file, max, quality) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const k = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(img.src);
      resolve(c.toDataURL('image/jpeg', quality));
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

// Сохранение товара в Firestore
$('editForm').onsubmit = async e => {
  e.preventDefault();
  const sizes = [...document.querySelectorAll('#fSizes input:checked')].map(c => c.value);
  const price = Number($('fPrice').value);
  if (!photos.length) return $('formErr').textContent = 'Добавьте хотя бы одно фото';
  if (!sizes.length) return $('formErr').textContent = 'Отметьте хотя бы один размер';
  if (!(price > 0)) return $('formErr').textContent = 'Укажите цену больше нуля';
  const id = editId ?? (Math.max(0, ...items.map(p => p.id)) + 1);
  const product = {
    id, name: $('fName').value.trim(), cat: $('fCat').value, price, sizes,
    desc: $('fDesc').value.trim(), isNew: $('fNew').checked, pos: $('fPos').value, img: photos
  };
  // ограничение Firestore — 1 МБ на документ
  if (JSON.stringify(product).length > 950000) return $('formErr').textContent = 'Слишком большие фото: уберите одно или загрузите меньшее';
  $('saveBtn').disabled = true;
  try {
    await setDoc(doc(db, 'products', String(id)), product);
    $('modal').classList.add('hidden');
    flash(editId ? 'Изменения сохранены' : 'Товар добавлен');
    loadList();
  } catch (err) {
    $('formErr').textContent = 'Ошибка сохранения: ' + (err.code === 'permission-denied' ? 'нет прав администратора' : err.message);
  } finally { $('saveBtn').disabled = false; }
};
