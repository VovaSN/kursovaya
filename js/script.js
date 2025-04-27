 /*Слайдер для цены*/
 try {
  function initPriceRangeSlider() {
    // Проверяем, существует ли элемент на странице
    if ($("#slider-range").length) {
      $("#slider-range").slider({
        range: true,
        min: 40,
        max: 1200,
        values: [40, 1200],
        slide: function(event, ui) {
          $("#amount").val(ui.values[0] + " AZN - " + ui.values[1] + " AZN ");
        }
      });
      // Устанавливаем начальное значение
      $("#amount").val(
        $("#slider-range").slider("values", 0) + " AZN - " +
        $("#slider-range").slider("values", 1) + " AZN "
      );
    }
  }
  // Инициализируем слайдер при загрузке документа
  $(document).ready(function() {
    initPriceRangeSlider();
    const filterBox = document.querySelectorAll('.hotel-card');
  const spanBox = document.querySelectorAll('.filter-type');

  let activeFilterClass = 'all';

  function filterHotels(){
    const hotelPrice = document.querySelectorAll('.hotel-price');
    const minPrice = $("#slider-range").slider("values", 0);
    const maxPrice = $("#slider-range").slider("values", 1);
    filterBox.forEach((elem,index)=>{
        elem.classList.remove('hide');

          const matchCity = elem.classList.contains(activeFilterClass) || activeFilterClass === 'all';

          const price = parseInt(hotelPrice[index].innerText);
          const matchPrice = price >= minPrice && price <= maxPrice;

          if(!matchCity || !matchPrice){
              elem.classList.add('hide');
          }
    });
  }

  function filterCities(filterClass){
    spanBox.forEach(item => item.classList.remove('active'));
    const active = document.querySelector(`[data-f="${filterClass}"]`);
    if(active) active.classList.add('active');

      activeFilterClass = filterClass;
      filterHotels();
  }

  document.querySelector('.filter-section').addEventListener('click', event =>{
    if(event.target.className !== 'filter-type') return;

    let filterClass = event.target.dataset['f'];
    filterCities(filterClass);
    window.location.hash = filterClass;
  });

  if(window.location.hash){
    filterCities(window.location.hash.slice(1));
  }
  $(function () {
    $("#slider-range").on("slidechange", function () {
        filterHotels();
    });
});
  });
	
  //Фильтрация отеля

} catch(error) { console.log(error);}

try {
  //Фильтр вводимого текста в city input
document.querySelector('#city').oninput = function() {
  let val = this.value.trim();
  let cities = document.querySelectorAll('.city li');
  if(val != ''){
    cities.forEach(function(elem){
      if(elem.innerText.search(val) == -1){
        elem.classList.add('hide');
        elem.innerHTML = elem.innerText;
      }
        else{
          elem.classList.remove('hide');
          let str = elem.innerText;
          elem.innerHTML = insertMark(str, elem.innerText.search(val), val.length);
        }
      });
    }
    else{
      cities.forEach(function(elem){
        elem.classList.remove('hide');
        elem.innerHTML = elem.innerText;
        });
    }
  }
  //Подсветка найденного текста в city input
function insertMark(str, position, len){
  return str.slice(0,position)+'<mark style="background-color: #93f0ad;">'+str.slice(position, position+len)+'</mark>'+str.slice(position+len);
}

// Скрипт для работы календаря
$(document).ready(function () {
  const today = new Date();
  const maxDate = new Date('2026-12-31');

  // Инициализация "Заезд"
  $('#checkin').datepicker({
    format: 'dd.mm.yyyy',
    language: 'ru',
    startDate: today,
    endDate: maxDate,
    autoclose: true,
  }).on('changeDate', function (e) {
    const checkinDate = e.date;
    // Обновляем минимальную дату для выезда
    const minCheckoutDate = new Date(checkinDate);
    minCheckoutDate.setDate(minCheckoutDate.getDate() + 1);
    $('#checkout').datepicker('setStartDate', minCheckoutDate);

    const checkoutInput = $('#checkout input');
    const currentCheckoutDate = $('#checkout').datepicker('getDate');

    // Если дата выезда меньше даты заезда — обновляем её
    if (!currentCheckoutDate || currentCheckoutDate <= checkinDate) {
      let newCheckout = new Date(checkinDate);
      newCheckout.setDate(newCheckout.getDate() + 1); // +1 день
      $('#checkout').datepicker('setDate', newCheckout);
    }
  });
 // Инициализация "Выезда" с начальной датой = сегодня +1 день
  const initialCheckoutDate = new Date(today);
  initialCheckoutDate.setDate(initialCheckoutDate.getDate() + 1);
  
  $('#checkout').datepicker({
    format: 'dd.mm.yyyy',
    language: 'ru',
    startDate: initialCheckoutDate,
    endDate: maxDate,
    autoclose: true,
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const cityInput = document.getElementById('city');
  const cityItems = document.querySelectorAll('.city-dropdown li');
  
  // Click handler for city items
  cityItems.forEach(item => {
    item.addEventListener('click', function() {
      cityInput.value = this.textContent;
      document.querySelector('.city-dropdown').style.display = 'none';
    });
  });
  
  // Открыть выпадающий список когда инпут в "фокусе"
  cityInput.addEventListener('focus', function() {
    document.querySelector('.city-dropdown').style.display = 'block';
  });
  
  // Скрыть выпадающий список
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.city-input-container')) {
      document.querySelector('.city-dropdown').style.display = 'none';
    }
  });
});
function checkPrices(event) {
        event.preventDefault();
        let cities = document.querySelectorAll('.city li');
        const city = document.getElementById("city").value.trim();
        const checkin = document.querySelector('#checkin input').value;
        const checkout = document.querySelector('#checkout input').value;
        const guests = document.getElementById("guests").value;

        let filterClass;

        let cityFound = false;

        for(let i = 0; i < cities.length; i++){
          if(cities[i].innerText.trim() == city){
            cityFound = true;
            filterClass = cities[i].dataset['f'];
            break;
          }
        }
         if(cityFound){
          alert(`Проверка цен для:\nГород: ${city}\nС даты: ${checkin}\nПо: ${checkout}\nГостей: ${guests}`);
          window.open('search.html#' + filterClass,'_self');
         }else{
            alert('Неверно указан город!');
          }
}
} catch(error) {}

