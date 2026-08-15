const scenes = [...document.querySelectorAll('.scene')];
const currentScene = document.querySelector('#currentScene');
const dots = document.querySelector('#dots');
let activeIndex = 0;

scenes.forEach((scene, index) => {
  const dot = document.createElement('button');
  dot.className = 'dot';
  dot.ariaLabel = `Экран ${index + 1}`;
  dot.addEventListener('click', () => scene.scrollIntoView({ behavior: 'smooth' }));
  dots.append(dot);
});

function go(delta) {
  const next = Math.max(0, Math.min(scenes.length - 1, activeIndex + delta));
  scenes[next].scrollIntoView({ behavior: 'smooth' });
}
document.querySelectorAll('[data-next]').forEach(btn => btn.addEventListener('click', () => go(1)));
document.querySelector('[data-prev]').addEventListener('click', () => go(-1));
document.addEventListener('keydown', e => {
  if (document.querySelector('#packageDialog').open) return;
  if (['ArrowDown', 'ArrowRight', 'PageDown'].includes(e.key)) { e.preventDefault(); go(1); }
  if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); go(-1); }
});

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  activeIndex = scenes.indexOf(entry.target);
  currentScene.textContent = String(activeIndex + 1).padStart(2, '0');
  document.querySelectorAll('.dot').forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
  entry.target.querySelector('.reveal')?.classList.add('visible');
}), {
  // Long scenes may never occupy half of a small viewport.
  threshold: .08,
  rootMargin: '0px 0px -8% 0px'
});
scenes.forEach(scene => observer.observe(scene));

// Keep the presentation readable in embedded or restricted browsers too.
scenes[0]?.querySelector('.reveal')?.classList.add('visible');
if (!('IntersectionObserver' in window)) {
  document.querySelectorAll('.reveal').forEach(item => item.classList.add('visible'));
}
// Safety net: presentation content is more important than entrance motion.
window.setTimeout(() => {
  document.querySelectorAll('.reveal').forEach(item => item.classList.add('visible'));
}, 1200);

const essentialStructure = [
  ['01 — Hero', 'Construction & rénovation à Nice et sur la Côte d’Azur.', 'Клиент сразу понимает, кто вы, чем занимаетесь и где работаете.'],
  ['02 — Services', 'Nos services', 'Коротко показываем основные направления работы.'],
  ['03 — Projects', 'Nos réalisations', 'Реальные проекты — один из главных факторов доверия.'],
  ['04 — Trust', 'Pourquoi nous choisir', 'Несколько понятных аргументов без длинной истории компании.'],
  ['05 — Process', 'Votre projet en quelques étapes.', 'Объясняем, что произойдёт после отправки заявки.'],
  ['06 — Contact', 'Vous avez un projet ?', 'Заканчиваем страницу понятным следующим шагом.']
];

function wireframe() { return `<div class="device-tabs"><button class="active" data-device="desktop">DESKTOP</button><button data-device="mobile">MOBILE</button></div><div class="wireframe-wrap"><div class="browser"><div class="browser-bar"><i></i><i></i><i></i></div><div class="wire-page"><div class="wf-hero"><div class="wf-copy"><b>Construction & rénovation<br>à Nice.</b><button>DEMANDER UN DEVIS</button></div><div class="wf-image"></div></div><div class="wf-title">Nos services</div><div class="wf-grid"><div class="wf-card">Rénovation</div><div class="wf-card">Construction</div><div class="wf-card">Aménagement</div><div class="wf-card">Travaux extérieurs</div></div><div class="wf-title">Nos réalisations</div><div class="wf-projects"><i></i><i></i><i></i></div><div class="wf-contact">Vous avez un projet ? &nbsp; →</div></div></div></div>`; }

function premiumWireframe() { return `<div class="device-tabs"><button class="active" data-device="desktop">DESKTOP</button><button data-device="mobile">MOBILE</button></div><div class="wireframe-wrap wireframe-wrap--premium"><div class="browser browser--premium"><div class="browser-bar"><i></i><i></i><i></i></div><div class="wire-page"><div class="pw-nav"><b>ENTREPRISE</b><span>Services &nbsp; Réalisations &nbsp; Contact</span></div><div class="pw-hero"><div class="pw-heading"><small>NICE · CÔTE D'AZUR</small><b>Construire.<br>Rénover.<br><em>Mieux habiter.</em></b><button>PARLER DE MON PROJET →</button></div><div class="pw-image"><span>PROJET / 01</span></div></div><div class="pw-intro"><small>NOTRE APPROCHE</small><p>Des espaces pensés<br>pour durer.</p><span>De la première idée à la livraison, un accompagnement clair et maîtrisé.</span></div><div class="pw-projects"><div class="pw-project pw-project--large"><i></i><b>Villa · Nice</b></div><div class="pw-project"><i></i><b>Appartement · Cannes</b></div><div class="pw-project"><i></i><b>Rénovation · Antibes</b></div></div><div class="pw-estimate"><small>VOTRE PROJET</small><b>Obtenez une première<br>estimation en quelques étapes.</b><button>COMMENCER →</button></div></div></div></div>`; }

function structureMarkup() { return essentialStructure.map(x => `<article><span>${x[0]}</span><h4 class="fr">${x[1]}</h4><p>${x[2]}</p></article>`).join(''); }

const templates = {
  essential: `<section class="detail-hero"><div><p class="detail-kicker">01 / Essentiel</p><h2>Профессиональный<br>Landing Page.<br>Без лишней сложности.</h2><p>Понятное присутствие компании в интернете и простой способ для потенциального клиента обратиться.</p></div></section><section class="detail-section soft"><div><p class="prototype-label">Структурный прототип</p><p class="prototype-note">Показывает логику и расположение блоков. Финальный дизайн создаётся после выбора визуального направления.</p>${wireframe()}</div></section><section class="detail-section"><div><p class="detail-kicker">Структура страницы</p><h3>Один ясный путь<br>к запросу devis.</h3><div class="structure-list">${structureMarkup()}</div></div></section><section class="detail-section soft"><div><p class="detail-kicker">Что входит</p><h3>Всё для уверенного запуска.</h3><div class="includes"><span>Структура Landing Page</span><span>UX/UI дизайн</span><span>Desktop + Mobile</span><span>Форма запроса</span><span>Помощь с контентом</span><span>Базовая подготовка для Google</span><span>Настройка и запуск</span></div></div></section>`,
  premium: `<section class="detail-hero"><div><p class="detail-kicker">02 / Premium</p><h2>Больше, чем<br>Landing Page.</h2><p>Сайт начинает помогать вам ещё до первого звонка. Клиент проходит короткий сценарий и понятно описывает свой проект.</p></div></section><section class="detail-section soft"><div><p class="detail-kicker">Ключевое отличие</p><h3>Online Preventivo</h3><p class="section-lead">Клиенту не нужно придумывать, что написать. Сайт задаёт правильные вопросы и собирает структурированный запрос.</p><div class="preventivo"><div class="phone-flow"><div class="progress-line"><i></i></div><small>ÉTAPE 1 SUR 6</small><h4>Quel est votre projet ?</h4><div class="choice selected">Rénovation complète</div><div class="choice">Appartement</div><div class="choice">Maison</div><div class="choice">Cuisine / Salle de bain</div><div class="choice">Autre</div></div><div class="flow-steps"><article><b>01</b><h5>Quel est votre projet ?</h5><p>Rénovation · Appartement · Maison · Cuisine · Autre</p></article><article><b>02</b><h5>Où se situe votre projet ?</h5><p>Ville · Code postal</p></article><article><b>03</b><h5>Quelle surface ?</h5><p>&lt; 30 m² · 30–60 · 60–100 · 100+</p></article><article><b>04</b><h5>Quand commencer ?</h5><p>Dès que possible · 1–3 mois · 3–6 mois</p></article><article><b>05</b><h5>Parlez-nous du projet.</h5><p>Description · Ajouter des photos</p></article><article><b>06</b><h5>Vos coordonnées</h5><p>Nom · Téléphone · E-mail</p></article></div></div></div></section><section class="detail-section"><div><p class="detail-kicker">После отправки</p><h3>Аккуратный PDF<br>вместо «форма отправлена».</h3><div class="pdf-flow"><span>Demande envoyée</span><i>→</i><span>Création du document</span><i>→</i><span>PDF prêt</span></div><div class="pdf-sheet"><small>VOTRE PROJET</small><h4>Récapitulatif<br>de votre demande</h4><div class="pdf-line"><span>Projet</span><b>Rénovation complète</b></div><div class="pdf-line"><span>Localisation</span><b>Nice · 06000</b></div><div class="pdf-line"><span>Surface</span><b>60–100 m²</b></div><div class="pdf-line"><span>Délais</span><b>1–3 mois</b></div><p>Votre demande sera étudiée afin de préparer un devis personnalisé.</p></div></div></section><section class="detail-section soft"><div><p class="detail-kicker">Польза для бизнеса</p><h3>Что меняется для вас?</h3><div class="benefit-grid"><article><b>Клиенту проще</b><p>Ему не нужно придумывать, что написать.</p></article><article><b>Больше информации</b><p>До звонка уже понятен тип и масштаб проекта.</p></article><article><b>Сильнее впечатление</b><p>Клиент получает фирменный PDF с итогами.</p></article></div></div></section><section class="detail-section"><div><p class="detail-kicker">Вторично, но приятно</p><h3>Лёгкая анимация</h3><p class="section-lead">Движение делает сайт современнее и приятнее — не отвлекая от заявки.</p><div class="motion-strip"><span>Image reveal</span><span>Text appearance</span><span>Project transition</span><span>Button interaction</span></div></div></section><section class="detail-section soft"><div><p class="prototype-label">Структурный прототип</p><p class="prototype-note">Это не финальный дизайн сайта. Прототип остаётся монохромным и показывает только структуру.</p>${wireframe()}</div></section>`
};

templates.premium = templates.premium
  .replace(wireframe(), premiumWireframe())
  .replace('Online Preventivo', 'Онлайн-смета')
  .replace('собирает структурированный запрос', 'собирает подробную заявку')
  .replace('Больше информации', 'Подробная заявка')
  .replace('Image reveal', 'Появление изображения')
  .replace('Text appearance', 'Появление текста')
  .replace('Project transition', 'Переход между проектами')
  .replace('Button interaction', 'Анимация кнопки')
  .replace(/<section class="detail-section"><div><p class="detail-kicker">Вторично, но приятно<\/p>[\s\S]*?<\/section>/, '');

templates.essential = templates.essential
  .replace('простой способ для потенциального клиента обратиться', 'простой способ для потенциального клиента отправить заявку')
  .replace('Один ясный путь<br>к запросу devis.', 'Понятный путь<br>к заявке на расчёт.');

const dialog = document.querySelector('#packageDialog');
const dialogContent = document.querySelector('#dialogContent');
document.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => {
  dialogContent.innerHTML = templates[button.dataset.open];
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.style.overflow = 'hidden';
  bindDeviceTabs();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });

function bindDeviceTabs() {
  document.querySelectorAll('.device-tabs').forEach(group => group.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => {
    group.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === btn));
    group.nextElementSibling.querySelector('.browser').classList.toggle('mobile', btn.dataset.device === 'mobile');
  })));
}
