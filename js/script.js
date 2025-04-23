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
    $('#checkout').datepicker('setStartDate', checkinDate);

    const checkoutInput = $('#checkout input');
    const currentCheckoutDate = $('#checkout').datepicker('getDate');

    // Если дата выезда меньше даты заезда — обновляем её
    if (!currentCheckoutDate || currentCheckoutDate <= checkinDate) {
      let newCheckout = new Date(checkinDate);
      newCheckout.setDate(newCheckout.getDate() + 1); // +1 день
      $('#checkout').datepicker('setDate', newCheckout);
    }
  });

  // Инициализация "Выезда"
  $('#checkout').datepicker({
    format: 'dd.mm.yyyy',
    language: 'ru',
    startDate: today,
    endDate: maxDate,
    autoclose: true,
  });
});
function checkPrices(event) {
        event.preventDefault();
        const city = document.getElementById("city").value;
        const checkin = document.querySelector('#checkin input').value;
        const checkout = document.querySelector('#checkout input').value;
        const guests = document.getElementById("guests").value;
      
        alert(`Проверка цен для:\nГород: ${city}\nС даты: ${checkin}\nПо: ${checkout}\nГостей: ${guests}`);
      }