var timer = null,
    total_seconds = 0,
    current_second = 0,
    current_workout = 1,
    row2 = '-75%',
    row3 = '-160%',
    whistle, whistle2, finished,
    data = ['Jumping jacks', 'Wall sit', 'Push-up', 'Abdominal crunch', 'Step-up onto chair', 'Squat', 'Triceps dip on chair', 'Plank', 'High knees running in place', 'Lunge', 'Push-up and rotation', 'Side plank'];

function each_second(){
  current_second++;
  total_seconds++;

  var min = Math.floor(total_seconds/60), sec = total_seconds - min * 60;
  if (sec < 10){ sec = '0' + sec; }
  $('#timer').text(min + ':' + sec);

  if (current_second === 30){
    take_break();
  }
  if (current_second === 40){
    step_workout();
  }
}

function take_break(){
  //$('#title').text('Quick break...');
  current_workout++;
  $('#popupBreak').popup('open');
  $('#popupBreak h4').text('BREAK!  Up next... ' + data[current_workout-1]);
  $('#workout_image').css('left', '-' + ((current_workout-1) * 100) + '%');
  $('#title').text(current_workout + '. ' + data[current_workout-1]);
  whistle2.play();
}

function step_workout(){
  $('#popupBreak').popup('close');
  current_second = 0;
  if (current_workout === 12){
    // finished
    $('#title').text('You\'re done!  Great work!');
    $('#start_stop').trigger('tap');
    clearInterval(timer);
    timer = null;
    finished.play();
  } else {
    whistle.play();
  }
}

function reset_workout(){
  clearInterval(timer);
  timer = null;
  total_seconds = 0;
  current_second = 0;
  current_workout = 1;
  $('#title').text('1. ' + data[0]);
  $('#workout_image').css({'top': '10%', 'left': '0'});
  $('#timer').text('0:00');
}



$(function(){
  whistle = $('#whistle').get(0);
  whistle2 = $('#whistle2').get(0);
  finished = $('#finished').get(0);
  $('#start_stop').on('tap', function(event){
    event.preventDefault();
    if (timer === null){
      // start workout
      whistle.play();
      timer = setInterval(each_second, 1000);
      $(this).find('.ui-btn-text').text('STOP');
    } else {
      $(this).find('.ui-btn-text').text('START');
      clearInterval(timer);
      timer = null;
      // stop workout
      timer = null;
    }
    return false;
  });
  $('#reset').on('tap', function(event){
    event.preventDefault();
    reset_workout();
    return false;
  });

  // prevent scrolling
  document.ontouchmove = function(e){ 
    e.preventDefault(); 
  }

});