// Список материалов

$(document).ready(function() {
    // Скрываем все списки при загрузке
    $('.tool__list').hide();
    
    // Клик по кнопке дропдауна
    $('.tool__btn').click(function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        const $btn = $(this);
        const $currentDropdown = $btn.closest('.tool__dropdown');
        const $currentList = $currentDropdown.find('.tool__list');
        
        // Проверяем, открыт ли уже этот дропдаун
        const isCurrentlyOpen = $currentDropdown.hasClass('active');
        
        // Закрываем ВСЕ дропдауны
        $('.tool__dropdown').removeClass('active');
        $('.tool__list').hide();
        
        // Если текущий дропдаун не был открыт - открываем его
        if (!isCurrentlyOpen) {
            $currentDropdown.addClass('active');
            $currentList.show();
        }
    });
    
    // Закрытие при клике вне дропдаунов
    $(document).click(function(e) {
        // Если клик не по кнопке и не по дропдауну
        if (!$(e.target).closest('.tool__dropdown').length && 
            !$(e.target).hasClass('tool__btn')) {
            $('.tool__dropdown').removeClass('active');
            $('.tool__list').hide();
        }
    });
});

// Курс валют

$(document).ready(function() {
    const RATE = 70;
    
    $('.tarif__btn').click(function() {
        const $btn = $(this);
        const $tarif = $btn.closest('.tarif');
        const $price = $tarif.find('.tarif__price');
        const $rubBtn = $tarif.find('.tarif__rub');
        const $usdBtn = $tarif.find('.tarif__usd');
        
        // Если кнопка уже активна - выходим
        if ($btn.hasClass('is-active')) {
            return;
        }
        
        // Получаем цену в рублях
        let rubPrice = $price.data('rub');
        if (!rubPrice) {
            rubPrice = parseInt($price.text().replace(/\D/g, ''));
            $price.data('rub', rubPrice);
        }
        
        if ($btn.hasClass('tarif__rub')) {
            // Показываем рубли
            $price.text(rubPrice.toLocaleString('ru-RU') + ' ₽');
            
            // Обновляем кнопки
            $rubBtn.addClass('tarif__btn--active');
            $usdBtn.removeClass('tarif__btn--active');
        } else {
            // Показываем доллары
            const usdPrice = Math.round(rubPrice / RATE).toFixed(2);
            $price.text('$' + usdPrice);
            
            // Обновляем кнопки
            $usdBtn.addClass('tarif__btn--active');
            $rubBtn.removeClass('tarif__btn--active');
        }
    });
    
    // Инициализация
    $('.tarif__price').each(function() {
        const $price = $(this);
        const rubPrice = parseInt($price.text().replace(/\D/g, ''));
        $price.data('rub', rubPrice);
    });
});

// Аккордеон

$(document).ready(function() {
    // Переключение только классов, анимация в CSS
    $('.question__title').click(function() {
        const $item = $(this).closest('.faq__item');
        
        // Закрываем все другие
        $('.faq__item').not($item).removeClass('active');
        
        // Переключаем текущий
        $item.toggleClass('active');
    });
});