// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  $("#currentDay").text(moment().format("MMMM Do YYYY, h:mm:ss a")); //display current date and time

  var currentHour = moment().hours()
  var timeBlocks = $('textarea')

  timeBlocks.each(function () {
    var timeBlockId = $(this).attr('id')

    if (currentHour > timeBlockId) {
      $(this).addClass('past')
    } else if (currentHour == timeBlockId) {
      $(this).removeClass('past')
      $(this).addClass('present')
    } else {
      $(this).removeClass('past')
      $(this).removeClass('present')
      $(this).addClass('future')
    }
  })

  $(".saveBtn").on("click", function () {
    $('#notify').addClass('show');
    setTimeout(function(){
      $('#notify').removeClass('show');
    }, 2000);
    var clickedBtn = $(this).attr('id')

    var textValue = $(this).siblings('textarea').val()

    var data = {
      id: clickedBtn,
      value: textValue
    }

    var storage = JSON.parse(localStorage.getItem('scheduleTask')) || []

    storage.push(data)
    localStorage.setItem('scheduleTask', JSON.stringify(storage))

    showHistory()

  })

  function showHistory() {
    var storage = JSON.parse(localStorage.getItem('scheduleTask'))
    if (storage === null) {
      return
    } else {

      timeBlocks.each(function () {
        var blockId = $(this).attr('id')
        for (var i = 0; i < storage.length; i++) {
          if (blockId === storage[i].id) {
            var textValue = storage[i].value
            $(`#${i + 9}`).text(textValue)
          }

        }
      })

    }



  }

  showHistory()

})
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

