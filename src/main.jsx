import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ShoppingBag, Menu, X, ArrowUpRight, Instagram, Mail, MapPin, Plus, Minus, Trash2, SlidersHorizontal, Flower2, Heart, Check } from 'lucide-react'
import { products } from './products'
import './style.css'

const money = n => new Intl.NumberFormat('uk-UA').format(n) + ' ₴'
const categories = ['Усі букети', 'Класичні букети', 'Авторські букети', 'Композиції в коробках', 'Сезонні колекції', 'Для особливих подій']

function App() {
  const [cart,setCart] = useState([])
  const [category,setCategory] = useState('Усі букети')
  const [sort,setSort] = useState('popular')
  const [search,setSearch] = useState('')
  const [drawer,setDrawer] = useState(false)
  const [menu,setMenu] = useState(false)
  const [notice,setNotice] = useState('')
  const [customSent,setCustomSent] = useState(false)

  const filtered = useMemo(() => {
    let list = products.filter(p => (category === 'Усі букети' || p.category === category) && p.name.toLowerCase().includes(search.toLowerCase()))
    if(sort === 'low') list = [...list].sort((a,b)=>a.price-b.price)
    if(sort === 'high') list = [...list].sort((a,b)=>b.price-a.price)
    return list
  },[category,sort,search])
  const count = cart.reduce((s,p)=>s+p.qty,0)
  const total = cart.reduce((s,p)=>s+p.price*p.qty,0)
  const add = p => {
    setCart(old => old.some(x=>x.id===p.id) ? old.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x) : [...old,{...p,qty:1}])
    setNotice('Додано до кошика')
    setTimeout(()=>setNotice(''),2200)
  }
  const changeQty = (id,delta) => setCart(old=>old.map(p=>p.id===id?{...p,qty:p.qty+delta}:p).filter(p=>p.qty>0))
  const checkout = e => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const lines = cart.map(p=>`${p.name} — ${p.qty} шт. × ${money(p.price)} = ${money(p.qty*p.price)}`).join('\\n')
    const body = `Доброго дня! Хочу оформити замовлення ValiLily.\\n\\n${lines}\\n\\nРазом: ${money(total)}\\nІм'я: ${data.get('name')}\\nТелефон: ${data.get('phone')}\\nДоставка/самовивіз: ${data.get('delivery')}\\nАдреса/коментар: ${data.get('address')||'Не вказано'}`
    window.location.href = `mailto:v.koval_femp_16_24_b_d@knute.edu.ua?subject=${encodeURIComponent('Замовлення ValiLily')}&body=${encodeURIComponent(body)}`
  }
  const customOrder = e => {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    const body = `Доброго дня! Хочу індивідуальне замовлення ValiLily.\\nІм'я: ${d.get('name')}\\nТелефон: ${d.get('phone')}\\nПривід: ${d.get('occasion')}\\nБюджет: ${d.get('budget')}\\nПобажання: ${d.get('details')}`
    window.location.href = `mailto:v.koval_femp_16_24_b_d@knute.edu.ua?subject=${encodeURIComponent('Індивідуальне замовлення ValiLily')}&body=${encodeURIComponent(body)}`
    setCustomSent(true)
  }
  const go = id => { document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); setMenu(false); setDrawer(false) }

  return <div className="site">
    <div className="topline">КВІТИ, СТВОРЕНІ З ЛЮБОВ’Ю ДО ДЕТАЛЕЙ <span>КИЇВ · ДОСТАВКА ТА САМОВИВІЗ</span></div>
    <header className="header">
      <button className="icon-btn mobile-menu" onClick={()=>setMenu(!menu)} aria-label="Відкрити меню">{menu?<X/>:<Menu/>}</button>
      <nav className={`nav ${menu?'nav-open':''}`}><a onClick={()=>go('catalog')}>Каталог</a><a onClick={()=>go('about')}>Про нас</a><a onClick={()=>go('custom')}>Індивідуальне замовлення</a></nav>
      <a className="wordmark" onClick={()=>go('home')}>ValiLily<span>FLOWER STUDIO</span></a>
      <div className="header-actions"><a className="insta" href="https://www.instagram.com/" target="_blank" rel="noreferrer"><Instagram size={17}/></a><button className="cart-trigger" onClick={()=>setDrawer(true)}><ShoppingBag size={18}/><span>Кошик</span><b>{count}</b></button></div>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><span></span> FLOWERS WITH MEANING</p>
          <h1>Квіти, що<br/><em>говорять</em> за вас.</h1>
          <p className="hero-text">Авторські букети та композиції, створені з увагою до вашої історії, настрою й особливого моменту.</p>
          <div className="hero-buttons"><button className="primary" onClick={()=>go('catalog')}>Обрати букет <ArrowUpRight size={17}/></button><button className="text-link" onClick={()=>go('custom')}>Створити свій букет</button></div>
          <div className="hero-note"><span>01 / 03</span><i></i> PERSONAL FLOWER STORIES</div>
        </div>
        <div className="hero-image"><img src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1400&q=90" alt="Вишукана композиція з ніжних квітів"/><div className="image-stamp">made with<br/><b>love & care</b></div><div className="hero-caption">THE ART OF GIVING FLOWERS <span>VALILILY · KYIV</span></div></div>
      </section>

      <section className="promise-strip"><div><span>01</span><p><b>Авторський підхід</b><small>Кожна композиція має характер</small></p></div><div><span>02</span><p><b>Увага до деталей</b><small>Від добору квітів до пакування</small></p></div><div><span>03</span><p><b>Турботлива доставка</b><small>Узгоджуємо час і побажання</small></p></div></section>

      <section className="catalog section" id="catalog">
        <div className="section-heading"><div><p className="eyebrow">OUR FLOWER COLLECTION</p><h2>Знайдіть <em>свої</em> квіти</h2></div><p className="section-intro">Композиції для моментів, які хочеться запам’ятати.</p></div>
        <div className="catalog-tools"><div className="chips">{categories.map(c=><button key={c} className={category===c?'chip active':'chip'} onClick={()=>setCategory(c)}>{c}</button>)}</div><div className="filters"><input aria-label="Пошук букетів" placeholder="Знайти букет..." value={search} onChange={e=>setSearch(e.target.value)}/><select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Сортування"><option value="popular">За замовчуванням</option><option value="low">Спочатку дешевші</option><option value="high">Спочатку дорожчі</option></select><SlidersHorizontal size={16}/></div></div>
        <div className="product-grid">{filtered.map((p,i)=><article className="product" key={p.id}><div className="product-photo"><img src={p.image} alt={p.name} loading="lazy"/><span className="product-index">0{i+1}</span><button className="quick-add" onClick={()=>add(p)} aria-label={`Додати ${p.name}`}><Plus size={19}/></button></div><div className="product-info"><div><p className="product-category">{p.category}</p><h3>{p.name}</h3></div><b>{money(p.price)}</b></div><p className="product-desc">{p.description}</p></article>)}</div>
        {filtered.length===0&&<p className="empty">За вашим запитом нічого не знайдено. Спробуйте змінити фільтр.</p>}
        <p className="catalog-footnote">* Склад сезонних квітів може змінюватися залежно від наявності. Усі заміни попередньо погоджуються з клієнтом.</p>
      </section>

      <section className="story section" id="about"><div className="story-image"><img src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=1100&q=85" alt="Флористична композиція у світлих тонах"/><span>THE VALILILY MOOD</span></div><div className="story-copy"><p className="eyebrow">A LITTLE ABOUT US</p><h2>Не просто квіти.<br/><em>Відчуття,</em> які залишаються.</h2><p>ValiLily — квіткова майстерня, де кожна композиція починається з вашої ідеї. Ми поєднуємо квіти, відтінки та фактури, щоб створити букет, який точно відповідає нагоді й людині.</p><p>Нам близька краса в деталях: уважна консультація, прозора вартість, дбайливе оформлення та фото готової композиції перед відправленням.</p><button className="under-link" onClick={()=>go('custom')}>Розповісти про свою ідею <ArrowUpRight size={16}/></button><div className="signature">ValiLily <span>flower studio</span></div></div></section>

      <section className="custom section" id="custom"><div className="custom-heading"><p className="eyebrow">MADE JUST FOR YOU</p><h2>Букет за <em>вашим</em><br/>сценарієм</h2><p>Розкажіть, для кого й з якого приводу потрібні квіти. Ми допоможемо підібрати композицію під ваш стиль і бюджет.</p><div className="custom-benefits"><span><Check size={15}/> Підбір під бюджет</span><span><Check size={15}/> Узгодження деталей</span><span><Check size={15}/> Фото перед відправленням</span></div></div>
        <form className="custom-form" onSubmit={customOrder}><div className="form-title">Розкажіть, що задумали <span>01 — 04</span></div><label>Ваше ім’я<input name="name" required placeholder="Як до вас звертатися?"/></label><label>Номер телефону<input name="phone" required type="tel" placeholder="+38 (0__) ___ __ __"/></label><div className="form-row"><label>Привід<select name="occasion"><option>День народження</option><option>Побачення / річниця</option><option>Подяка</option><option>Весілля / подія</option><option>Без особливого приводу</option></select></label><label>Бюджет<select name="budget"><option>До 1 500 грн</option><option>1 500–2 500 грн</option><option>2 500–4 000 грн</option><option>Від 4 000 грн</option></select></label></div><label>Побажання<textarea name="details" rows="3" placeholder="Улюблені квіти, кольори, дата..."/></label><button className="primary submit" type="submit">Надіслати запит <ArrowUpRight size={17}/></button><small className="form-note">Натискаючи кнопку, ви відкриєте поштову програму з підготовленим листом.</small></form>
      </section>

      <section className="delivery"><div className="delivery-inner"><p className="eyebrow">DELIVERY IN KYIV</p><h2>Важливе має<br/><em>приїхати вчасно.</em></h2><div className="delivery-items"><div><MapPin/><b>Київ</b><span>Кур’єрська доставка за погодженням</span></div><div><Flower2/><b>Самовивіз</b><span>Час і місце узгоджуємо під час замовлення</span></div><div><Heart/><b>З турботою</b><span>Фото готового букета перед відправленням</span></div></div></div></section>
    </main>

    <footer className="footer"><div className="footer-main"><div className="footer-brand"><a className="wordmark" onClick={()=>go('home')}>ValiLily<span>FLOWER STUDIO</span></a><p>Квіти, створені з любов’ю<br/>до деталей.</p></div><div><p className="footer-label">НАВІГАЦІЯ</p><a onClick={()=>go('catalog')}>Каталог</a><a onClick={()=>go('about')}>Про нас</a><a onClick={()=>go('custom')}>Індивідуальне замовлення</a></div><div><p className="footer-label">ЗВ’ЯЗОК</p><a href="mailto:v.koval_femp_16_24_b_d@knute.edu.ua">Електронна пошта</a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a><span>Київ, Україна</span></div></div><div className="footer-bottom"><span>© 2026 Коваль Валерія. Усі права захищені.</span><span>Сайт розроблено за допомогою ChatGPT для Коваль Валерії.</span><a href="mailto:v.koval_femp_16_24_b_d@knute.edu.ua">v.koval_femp_16_24_b_d@knute.edu.ua</a></div></footer>

    {drawer&&<div className="overlay" onMouseDown={e=>e.target===e.currentTarget&&setDrawer(false)}><aside className="cart-drawer"><div className="drawer-head"><div><p className="eyebrow">YOUR SELECTION</p><h2>Ваш кошик <span>({count})</span></h2></div><button className="icon-btn" onClick={()=>setDrawer(false)}><X/></button></div>{cart.length===0?<div className="cart-empty"><ShoppingBag size={34}/><h3>Кошик поки порожній</h3><p>Оберіть композицію, яка вам до душі.</p><button className="primary" onClick={()=>{setDrawer(false);go('catalog')}}>До каталогу</button></div>:<><div className="cart-lines">{cart.map(p=><div className="cart-line" key={p.id}><img src={p.image} alt=""/><div className="line-info"><b>{p.name}</b><span>{money(p.price)}</span><div className="qty"><button onClick={()=>changeQty(p.id,-1)}><Minus size={13}/></button><span>{p.qty}</span><button onClick={()=>changeQty(p.id,1)}><Plus size={13}/></button><button className="remove" onClick={()=>changeQty(p.id,-p.qty)}><Trash2 size={13}/></button></div></div></div>)}</div><div className="cart-total"><div><span>Разом</span><b>{money(total)}</b></div><p>Вартість доставки узгоджується окремо.</p><form onSubmit={checkout} className="checkout"><label>Ваше ім’я<input name="name" required placeholder="Ім’я"/></label><label>Телефон<input name="phone" required type="tel" placeholder="+38..."/></label><label>Спосіб отримання<select name="delivery"><option>Кур’єрська доставка</option><option>Самовивіз (за погодженням)</option></select></label><label>Адреса / коментар<input name="address" placeholder="Район, адреса або побажання"/></label><button className="primary submit" type="submit">Оформити замовлення <ArrowUpRight size={16}/></button><small>Заявка буде підготовлена у вашій поштовій програмі.</small></form></div></>}</aside></div>}
    {notice&&<div className="toast"><Check size={16}/>{notice}</div>}
  </div>
}
createRoot(document.getElementById('root')).render(<App/>)
