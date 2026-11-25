// 1. Бургер-меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('active'));
});

// 2. Фильтрация карточек клубов
const filterBtns = document.querySelectorAll('.filter-btn');
const clubCards = document.querySelectorAll('.club-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    clubCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// 3. Копирование тега клуба с уведомлением
const toast = document.getElementById('toast');
document.querySelectorAll('.tag-copy').forEach(btn => {
  btn.addEventListener('click', () => {
    const tag = btn.dataset.tag;
    navigator.clipboard.writeText(tag);
    toast.textContent = `Тег ${tag} скопирован в буфер!`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
  });
});

// 4. Вкладки расписания и турнирной сетки
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
  });
});

// Симулятор счёта финала для демонстрации интерактива
const simMatchBtn = document.getElementById('simMatchBtn');
const finalScore1 = document.getElementById('finalScore1');
const finalScore2 = document.getElementById('finalScore2');

simMatchBtn.addEventListener('click', () => {
  const results = [
    [2, 1],
    [1, 2],
    [2, 0],
    [0, 2]
  ];
  const randomScore = results[Math.floor(Math.random() * results.length)];
  finalScore1.textContent = randomScore[0];
  finalScore2.textContent = randomScore[1];
});

// 5. Модальное окно заявки с автовыбором клуба
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const selectedClubTitle = document.getElementById('selectedClubTitle');
const clubSelect = document.getElementById('clubSelect');

document.querySelectorAll('.open-modal').forEach(btn => {
  btn.addEventListener('click', () => {
    const clubName = btn.dataset.club || 'Dark Empire';
    selectedClubTitle.textContent = clubName;
    clubSelect.value = clubName;
    modal.classList.add('active');
  });
});

clubSelect.addEventListener('change', () => {
  selectedClubTitle.textContent = clubSelect.value;
});

function closeModal() {
  modal.classList.remove('active');
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Отправка анкеты
const joinForm = document.getElementById('joinForm');
const formSuccess = document.getElementById('formSuccess');

joinForm.addEventListener('submit', (e) => {
  e.preventDefault();
  joinForm.hidden = true;
  formSuccess.hidden = false;

  setTimeout(() => {
    closeModal();
    joinForm.reset();
    joinForm.hidden = false;
    formSuccess.hidden = true;
  }, 2200);
});
