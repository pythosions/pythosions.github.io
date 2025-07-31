document.addEventListener('DOMContentLoaded', function() {
    const bookmakersData = [
        { "id": 1, "logo": "/img/partners_logo/1.png", "rating": 4.9, "review_count": 325, "bonus_amount": 25000, "badge": "exclusive", "internal_link": "/bk/1", "external_link": "https://partner1.com", "verified": 1 },
        { "id": 2, "logo": "/img/partners_logo/2.png", "rating": 4.8, "review_count": 123, "bonus_amount": 101000, "badge": "no-deposit", "internal_link": "/bk/2", "external_link": "https://partner2.com", "verified": 1 },
        { "id": 3, "logo": "/img/partners_logo/3.png", "rating": 4.7, "review_count": 325, "bonus_amount": 10000, "badge": "", "internal_link": "/bk/3", "external_link": "https://partner3.com", "verified": 1 },
        { "id": 4, "logo": "/img/partners_logo/4.png", "rating": 4.6, "review_count": 43, "bonus_amount": 0, "badge": "", "internal_link": "/bk/4", "external_link": "https://partner4.com", "verified": 0 },
        { "id": 5, "logo": "/img/partners_logo/5.png", "rating": 5.0, "review_count": 34, "bonus_amount": 2500, "badge": "no-deposit", "internal_link": "/bk/5", "external_link": "https://partner5.com", "verified": 1 },
        { "id": 6, "logo": "/img/partners_logo/1.png", "rating": 4.5, "review_count": 109, "bonus_amount": 9900, "badge": "", "internal_link": "/bk/6", "external_link": "https://partner6.com", "verified": 1 }
    ];

    const tableBody = document.getElementById('table-body');

    const formatBonusAmount = (amount) => {
        if (!amount) return '';
        if (amount < 1000) return `${amount} ₽`;

        const thousands = amount / 1000;
        const value = thousands % 1 === 0 ? thousands : thousands.toFixed(1);
        return `${value}K ₽`;
    };
    
    const createStarExplosion = (starContainer) => {
        const star = starContainer.querySelector('.star');
        if (star.classList.contains('exploding')) return;

        star.classList.add('exploding');
        for (let i = 0; i < 8; i++) {
            const spark = document.createElement('div');
            spark.classList.add('spark');
            const angle = Math.random() * Math.PI * 2;
            const distance = 20 + Math.random() * 30;
            spark.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
            spark.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
            starContainer.appendChild(spark);
            spark.addEventListener('animationend', () => spark.remove());
        }
        star.addEventListener('animationend', () => star.classList.remove('exploding'), { once: true });
    };

    const createRatingStars = (rating) => {
        const container = document.createElement('div');
        container.classList.add('rating-stars');
        const fullStars = Math.round(rating);

        for (let i = 0; i < 5; i++) {
            const starContainer = document.createElement('div');
            starContainer.classList.add('star-container');
            
            const star = document.createElement('img');
            star.src = i < fullStars ? '/img/UI/full_star.svg' : '/img/UI/empty_star.svg';
            star.alt = i < fullStars ? 'Full Star' : 'Empty Star';
            star.classList.add('star');
            star.addEventListener('click', () => createStarExplosion(starContainer));
            
            starContainer.appendChild(star);
            container.appendChild(starContainer);
        }
        return container;
    };

    const createBookmakerRow = (bookmaker) => {
        const { logo, internal_link, external_link, verified, rating, review_count, bonus_amount, badge: badgeType } = bookmaker;
        
        const row = document.createElement('div');
        row.classList.add('flex-table-row');

        // Logo Column
        const logoCol = document.createElement('div');
        logoCol.classList.add('flex-col-logo');
        const logoLink = document.createElement('a');
        logoLink.href = internal_link;
        const logoContainer = document.createElement('div');
        logoContainer.classList.add('logo-container');
        const logoImg = document.createElement('img');
        logoImg.src = logo;
        logoImg.alt = 'Логотип букмекера';
        logoImg.classList.add('bookmaker-logo');
        logoContainer.appendChild(logoImg);
        if (verified) {
            const verifiedBadge = document.createElement('img');
            verifiedBadge.src = '/img/UI/ok.svg';
            verifiedBadge.alt = 'Проверено';
            verifiedBadge.classList.add('verified-badge');
            logoContainer.appendChild(verifiedBadge);
        }
        logoLink.appendChild(logoContainer);
        logoCol.appendChild(logoLink);

        // Rating Column
        const ratingCol = document.createElement('div');
        ratingCol.classList.add('flex-col-rating');
        const ratingContainer = document.createElement('div');
        ratingContainer.classList.add('rating-container');
        const ratingValue = document.createElement('span');
        ratingValue.classList.add('rating-value');
        ratingValue.textContent = rating.toFixed(1);
        ratingContainer.append(createRatingStars(rating), ratingValue);
        ratingCol.appendChild(ratingContainer);

        // Reviews Column
        const reviewsCol = document.createElement('div');
        reviewsCol.classList.add('flex-col-reviews');
        const reviewWrap = document.createElement('div');
        reviewWrap.classList.add('review-wrap');
        const reviewIcon = document.createElement('div');
        reviewIcon.classList.add('review-icon');
        const reviewCountSpan = document.createElement('span');
        reviewCountSpan.textContent = review_count;
        reviewWrap.append(reviewIcon, reviewCountSpan);
        reviewsCol.appendChild(reviewWrap);

        // Bonus Column
        const bonusCol = document.createElement('div');
        bonusCol.classList.add('flex-col-bonus');
        if (bonus_amount > 0) {
            if (badgeType) {
                const badge = document.createElement('span');
                badge.classList.add('badge', `badge-${badgeType}`);
                const badgeTextMap = { 'exclusive': 'Эксклюзив', 'no-deposit': 'Без депозита' };
                badge.textContent = badgeTextMap[badgeType] || 'Бонус';
                bonusCol.appendChild(badge);
            }
            const bonusWrap = document.createElement('div');
            bonusWrap.classList.add('bonus-wrap');
            const bonusIcon = document.createElement('div');
            bonusIcon.classList.add('bonus-icon');
            const bonusAmountSpan = document.createElement('span');
            bonusAmountSpan.textContent = formatBonusAmount(bonus_amount);
            bonusWrap.append(bonusIcon, bonusAmountSpan);
            bonusCol.appendChild(bonusWrap);
        } else {
            const noBonusBadge = document.createElement('span');
            noBonusBadge.classList.add('badge', 'badge-no-bonus');
            noBonusBadge.textContent = 'Нет бонуса';
            bonusCol.appendChild(noBonusBadge);
        }

        // Actions Column
        const actionsCol = document.createElement('div');
        actionsCol.classList.add('flex-col-actions');
        const reviewBtn = document.createElement('a');
        reviewBtn.href = internal_link;
        reviewBtn.target = '_blank';
        reviewBtn.classList.add('btn', 'btn-review');
        reviewBtn.textContent = 'ОБЗОР';
        const siteBtn = document.createElement('a');
        siteBtn.href = external_link;
        siteBtn.target = '_blank';
        siteBtn.classList.add('btn', 'btn-site');
        siteBtn.textContent = 'САЙТ';
        actionsCol.append(reviewBtn, siteBtn);

        row.append(logoCol, ratingCol, reviewsCol, bonusCol, actionsCol);
        return row;
    };

    bookmakersData.forEach(bookmaker => {
        tableBody.appendChild(createBookmakerRow(bookmaker));
    });

    const handleLoadMoreClick = async (e) => {
        e.preventDefault();
        const button = e.currentTarget;
        button.disabled = true; // Prevent multiple clicks

        const amount = 5;
        try {
            // Assume fetchMoreBookmakers is defined elsewhere and returns a Promise
            // that resolves to an object like { data: [...] }
            const response = await fetchMoreBookmakers(amount);
            
            if (!response?.data?.length) {
                console.warn('No more data to load.');
                button.textContent = 'Больше нет';
                return;
            }
            
            response.data.forEach((bookmaker, index) => {
                // Staggered reveal for a smooth loading effect
                setTimeout(() => {
                    const sanitizedBookmaker = {
                        ...bookmaker,
                        rating: Number(bookmaker.rating) || 0,
                        review_count: Number(bookmaker.review_count) || 0,
                        bonus_amount: Number(bookmaker.bonus_amount) || 0,
                        verified: Boolean(bookmaker.verified),
                    };

                    const newRow = createBookmakerRow(sanitizedBookmaker);
                    newRow.classList.add('new-row');
                    tableBody.appendChild(newRow);

                    // Use rAF for smoother animation trigger
                    requestAnimationFrame(() => {
                        newRow.classList.add('visible');
                    });

                    if (index === response.data.length - 1) {
                        newRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        button.disabled = false; // Re-enable after the last item is processed
                    }
                }, 175 * index);
            });
        } catch (error) {
            console.error('Failed to load more bookmakers:', error);
            alert('Произошла ошибка при загрузке данных.');
            button.disabled = false;
        }
    };
    
    // Attach the same handler to multiple elements
    const loadMoreElements = document.querySelectorAll('.see-more, #full-container');
    loadMoreElements.forEach(element => {
        element.addEventListener('click', handleLoadMoreClick);
    });
});