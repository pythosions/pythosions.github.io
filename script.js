document.addEventListener('DOMContentLoaded', function() {
    const bookmakersData = [
        {
            "id": 1,
            "logo": "/img/partners_logo/1.png",
            "rating": 4.9,
            "review_count": 325,
            "bonus_amount": 25000,
            "badge": "exclusive",
            "internal_link": "/bk/1",
            "external_link": "https://partner1.com",
            "verified": 1,
        },
        {
            "id": 2,
            "logo": "/img/partners_logo/2.png",
            "rating": 4.8,
            "review_count": 123,
            "bonus_amount": 101000,
            "badge": "no-deposit",
            "internal_link": "/bk/2",
            "external_link": "https://partner2.com",
            "verified": 1,
        },
        {
            "id": 3,
            "logo": "/img/partners_logo/3.png",
            "rating": 4.7,
            "review_count": 325,
            "bonus_amount": 10000,
            "badge": "",
            "internal_link": "/bk/3",
            "external_link": "https://partner3.com",
            "verified": 1,
        },
        {
            "id": 4,
            "logo": "/img/partners_logo/4.png",
            "rating": 4.6,
            "review_count": 43,
            "bonus_amount": 0,
            "badge": "",
            "internal_link": "/bk/4",
            "external_link": "https://partner4.com",
            "verified": 0,
        },
        {
            "id": 5,
            "logo": "/img/partners_logo/5.png",
            "rating": 5.0,
            "review_count": 34,
            "bonus_amount": 2500,
            "badge": "no-deposit",
            "internal_link": "/bk/5",
            "external_link": "https://partner5.com",
            "verified": 1,
        },
        {
            "id": 6,
            "logo": "/img/partners_logo/1.png",
            "rating": 4.5,
            "review_count": 109,
            "bonus_amount": 9900,
            "badge": "",
            "internal_link": "/bk/6",
            "external_link": "https://partner6.com",
            "verified": 1,
        }
    ];
    
    const tableBody = document.getElementById('table-body');

    // Функция для форматирования суммы бонуса
    function formatBonusAmount(amount) {
        if (amount === 0) return '';
        
        if (amount >= 1000) {
            const thousands = amount / 1000;
            const formatted = thousands % 1 === 0 ? 
                `${thousands}K` : 
                `${thousands.toFixed(1)}K`;
            return `${formatted} ₽`;
        }
        return `${amount} ₽`;
    }

    // Функция для создания звёзд рейтинга
// Функция для создания звёзд рейтинга
function createRatingStars(rating) {
    const starsContainer = document.createElement('div');
    starsContainer.classList.add('rating-stars');

    // Округляем рейтинг по новым правилам
    let roundedRating = Math.floor(rating); // Берем целую часть
    const decimalPart = rating % 1; // Берем дробную часть

    // Если дробная часть >= 0.6, округляем вверх, если 0.5 - вниз, если меньше 0.5 - вниз
    if (decimalPart > 0.5) {
        roundedRating += 1;
    }
    // Если дробная часть ровно 0.5, оставляем как есть (округляем вниз)

    // Определяем количество полных звезд
    let fullStars = roundedRating;

    for (let i = 0; i < 5; i++) {
        const starContainer = document.createElement('div');
        starContainer.classList.add('star-container');
        const star = document.createElement('img');
        star.src = i < fullStars ? '/img/UI/full_star.svg' : '/img/UI/empty_star.svg';
        star.classList.add('star');
        star.dataset.index = i;
        starContainer.appendChild(star);
        starsContainer.appendChild(starContainer);

        star.addEventListener('click', function(e) {
            createStarExplosion(starContainer);
        });
    }

    return starsContainer;
}

    // Функция для создания строки
    function createBookmakerRow(bookmaker) {
        const row = document.createElement('div');
        row.classList.add('flex-table-row');
        
        // Колонка логотипа
        const logoCol = document.createElement('div');
        logoCol.classList.add('flex-col-logo');
        
        const logoLink = document.createElement('a');
        logoLink.href = bookmaker.internal_link;
        
        const logoContainer = document.createElement('div');
        logoContainer.classList.add('logo-container');
        
        const logoImg = document.createElement('img');
        logoImg.src = bookmaker.logo;
        logoImg.alt = 'Логотип букмекера';
        logoImg.classList.add('bookmaker-logo');
        logoContainer.appendChild(logoImg);
        
        if (bookmaker.verified) {
            const verifiedBadge = document.createElement('img');
            verifiedBadge.src = '/img/UI/ok.svg';
            verifiedBadge.alt = 'Проверено';
            verifiedBadge.classList.add('verified-badge');
            logoContainer.appendChild(verifiedBadge);
        }
        
        logoLink.appendChild(logoContainer);
        logoCol.appendChild(logoLink);
        row.appendChild(logoCol);
        
        // Колонка рейтинга
        const ratingCol = document.createElement('div');
        ratingCol.classList.add('flex-col-rating');
        
        const ratingContainer = document.createElement('div');
        ratingContainer.style.display = 'flex';
        ratingContainer.style.alignItems = 'center';
        
        const stars = createRatingStars(bookmaker.rating);
        ratingContainer.appendChild(stars);
        
        const ratingValue = document.createElement('span');
        ratingValue.classList.add('rating-value');
        ratingValue.textContent = bookmaker.rating.toFixed(1);
        ratingContainer.appendChild(ratingValue);
        
        ratingCol.appendChild(ratingContainer);
        row.appendChild(ratingCol);
        
        // Колонка отзывов (обновленная)
        const reviewsCol = document.createElement('div');
        reviewsCol.classList.add('flex-col-reviews');
        
        // Обертка для иконки и количества отзывов
        const reviewWrap = document.createElement('div');
        reviewWrap.classList.add('review-wrap');
        
        // Иконка отзывов
        const reviewIcon = document.createElement('div');
        reviewIcon.classList.add('review-icon');
        // Можно добавить иконку через background-image в CSS или как content в псевдоэлементе
        
        // Количество отзывов
        const reviewCount = document.createElement('span');
        reviewCount.textContent = bookmaker.review_count;
        
        // Собираем элементы
        reviewWrap.appendChild(reviewIcon);
        reviewWrap.appendChild(reviewCount);
        reviewsCol.appendChild(reviewWrap);
        row.appendChild(reviewsCol);
        
        // Колонка бонуса
        const bonusCol = document.createElement('div');
        bonusCol.classList.add('flex-col-bonus');
        
        if (bookmaker.badge || bookmaker.bonus_amount === 0) {
            const badge = document.createElement('span');
            
            if (bookmaker.bonus_amount === 0) {
                badge.classList.add('badge', 'badge-no-bonus');
                badge.textContent = 'Нет бонуса';
            } else {
                badge.classList.add('badge', `badge-${bookmaker.badge}`);
                
                switch(bookmaker.badge) {
                    case 'exclusive':
                        badge.textContent = 'Эксклюзив';
                        break;
                    case 'no-deposit':
                        badge.textContent = 'Без депозита';
                        break;
                    default:
                        badge.textContent = 'Бонус';
                }
            }
            
            bonusCol.appendChild(badge);
        }
        
        // Обертка для иконки и суммы бонуса
        if (bookmaker.bonus_amount > 0) {
            const bonusWrap = document.createElement('div');
            bonusWrap.classList.add('bonus-wrap');
            
            // Иконка подарка
            const bonusIcon = document.createElement('div');
            bonusIcon.classList.add('bonus-icon');
            
            // Сумма бонуса
            const bonusAmount = document.createElement('span');
            bonusAmount.textContent = formatBonusAmount(bookmaker.bonus_amount);
            
            // Собираем элементы
            bonusWrap.appendChild(bonusIcon);
            bonusWrap.appendChild(bonusAmount);
            bonusCol.appendChild(bonusWrap);
        } else {
            const bonusAmount = document.createElement('span');
            bonusAmount.textContent = formatBonusAmount(bookmaker.bonus_amount);
            bonusCol.appendChild(bonusAmount);
        }
        
        row.appendChild(bonusCol);
        
        // Колонка действий
        const actionsCol = document.createElement('div');
        actionsCol.classList.add('flex-col-actions');
        
        const reviewBtn = document.createElement('a');
        reviewBtn.href = bookmaker.internal_link;
        reviewBtn.classList.add('btn', 'btn-review');
        reviewBtn.textContent = 'ОБЗОР';
        reviewBtn.target = '_blank';
        actionsCol.appendChild(reviewBtn);
        
        const siteBtn = document.createElement('a');
        siteBtn.href = bookmaker.external_link;
        siteBtn.classList.add('btn', 'btn-site');
        siteBtn.textContent = 'САЙТ';
        siteBtn.target = '_blank';
        actionsCol.appendChild(siteBtn);
        
        row.appendChild(actionsCol);
        
        return row;
    }

    // Заполняем таблицу данными
    bookmakersData.forEach(bookmaker => {
        tableBody.appendChild(createBookmakerRow(bookmaker));
    });
    
    // Функция для анимации взрыва звезды
    function createStarExplosion(starContainer) {
        const star = starContainer.querySelector('.star');
        star.classList.add('exploding');
        
        // Создаем искры
        for (let i = 0; i < 8; i++) {
            const spark = document.createElement('div');
            spark.classList.add('spark');
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 20 + Math.random() * 30;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            spark.style.setProperty('--tx', `${tx}px`);
            spark.style.setProperty('--ty', `${ty}px`);
            
            starContainer.appendChild(spark); // Добавляем искры в контейнер
            
            setTimeout(() => {
                spark.remove();
            }, 1000);
        }
        
        setTimeout(() => {
            star.classList.remove('exploding');
        }, 1000);
    }


        document.querySelector('.see-more').addEventListener('click', function(e) {
            e.preventDefault();
            
            amount = 5;
        
            fetchMoreBookmakers(amount)
            .then(response => {
                // Проверяем, есть ли данные и что это массив
                if (response.data && Array.isArray(response.data)) {
                    // Добавляем новых букмекеров в таблицу с задержкой
                    response.data.forEach((bookmaker, index) => {
                        setTimeout(() => {
                            // Преобразуем данные
                            bookmaker.rating = Number(bookmaker.rating);
                            bookmaker.review_count = Number(bookmaker.review_count);
                            bookmaker.bonus_amount = Number(bookmaker.bonus_amount);
                            bookmaker.verified = Boolean(bookmaker.verified);
                            
                            // Создаем и добавляем строку с анимацией
                            const newRow = createBookmakerRow(bookmaker);
                            newRow.classList.add('new-row');
                            tableBody.appendChild(newRow);
                            
                            // Добавляем visible после небольшой задержки для анимации
                            setTimeout(() => {
                                newRow.classList.add('visible');
                            }, 10);
                            
                            // Прокручиваем к последнему добавленному элементу только для последнего
                            if (index === response.data.length - 1) {
                                newRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            }
                        }, 175 * index); // Задержка увеличивается для каждого следующего элемента
                    });
                } else {
                    console.error('Invalid data format received:', response);
                }
            })
            .catch(error => {
                console.error('Error loading more bookmakers:', error);
                alert('Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже.');
            });
        });
});