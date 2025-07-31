// mock-api.js

// Функция для форматирования суммы бонуса (дублируем из основного скрипта)
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

// Функция для генерации случайных букмекеров
function generateRandomBookmakers(count) {
    const badges = ['exclusive', 'no-deposit', ''];
    const logos = [
        "/img/partners_logo/1.png",
        "/img/partners_logo/2.png",
        "/img/partners_logo/3.png",
        "/img/partners_logo/4.png",
        "/img/partners_logo/5.png",
    ];
    
    const newBookmakers = [];
    
    for (let i = 0; i < count; i++) {
        const randomBadge = badges[Math.floor(Math.random() * badges.length)];
        const randomBonus = randomBadge === '' ? 
            Math.floor(Math.random() * 10000) : 
            Math.floor(Math.random() * 100000);
            const rating = Math.floor(Math.random() * 11) * 0.5;
        
        newBookmakers.push({
            "id": 100 + i,
            "logo": logos[Math.floor(Math.random() * logos.length)],
            "rating": rating, // Оставляем как сгенерированное значение
            "review_count": Math.floor(Math.random() * 500),
            "bonus_amount": randomBonus,
            "badge": randomBadge,
            "internal_link": `/bk/${100 + i}`,
            "external_link": `https://partner${100 + i}.com`,
            "verified": Math.random() > 0.3 ? 1 : 0,
        });
    }
    
    return newBookmakers;
}

// Функция для эмуляции AJAX-запроса
function fetchMoreBookmakers(count) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                status: 200,
                data: generateRandomBookmakers(count)
            });
        }, 500);
    });
}