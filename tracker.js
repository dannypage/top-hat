$(document).ready(function () {
  'use strict';

  var dude = {
    time: {
      minutes: 0,
      seconds: 0,
      hours: 0
    },
    active: false
  };

  var not_dude = {
    time: {
      minutes: 0,
      seconds: 0,
      hours: 0
    },
    active: false
  };

  var dude_t;
  var not_dude_t;

  var $ans = $('#ans');
  var $dude = $('#dude');
  var $not_dude = $('#not-dude');

  function num_pad(num) {
    if (num < 10) {
      return '0' + num;
    } else {
      return num;
    }
  }

  function add(tally, display_sel) {
    tally.seconds++;
    if (tally.seconds >= 60) {
      tally.minutes++;
      tally.seconds = 0;
    }
    if (tally.minutes >= 60) {
      tally.hours++;
      tally.minutes = 0;
    }

    if (tally.hours !== 0) {
      $(display_sel).html(num_pad(tally.hours) + ':' + num_pad(tally.minutes) + ':' + num_pad(tally.seconds));
    } else {
      $(display_sel).html(num_pad(tally.minutes) + ':' + num_pad(tally.seconds));
    }

    var d_tot = (dude.time.hours * 3600) + (dude.time.minutes * 60) + dude.time.seconds;
    var l_tot = (not_dude.time.hours * 3600) + (not_dude.time.minutes * 60) + not_dude.time.seconds;
    var pct = parseInt(d_tot / (d_tot + l_tot) * 100, 10);
    $ans.html('<span id="pct">' + pct + '</span>% red');
  }

  $dude.click(function() {

    $dude.toggleClass('pressed');

    if (dude.active === true) {
      dude.active = false;
      clearInterval(dude_t);
    } else {
      dude.active = true;
      if (not_dude.active === true) {
        $not_dude.toggleClass('pressed');
        not_dude.active = false;
        clearInterval(not_dude_t);
      }
      dude_t = setInterval(function() {
        add(dude.time, '#dude-display');
      }, 1000);
    }

  });

  $not_dude.click(function() {

    $not_dude.toggleClass('pressed');

    if (not_dude.active === true) {
      not_dude.active = false;
      clearInterval(not_dude_t);
    } else {
      not_dude.active = true;
      if (dude.active === true) {
        $dude.toggleClass('pressed');
        dude.active = false;
        clearInterval(dude_t);
      }
      not_dude_t = setInterval(function() {
        add(not_dude.time, '#not-dude-display');
      }, 1000);
    }
  });

  $('body').keydown(function(e) {
    if (e.keyCode === 37) { // left
      $dude.trigger('click');
    } else if (e.keyCode === 39) { //right
      $not_dude.trigger('click');
    }
  });

});
