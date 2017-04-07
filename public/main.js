var tt = {};

tt.form = function($form, tickets) {
  $form.on('submit', function(e) {
    var values = {};
    var $inputs;

    e.preventDefault();
    $inputs = $form.find('select, textarea, input');
      $inputs.each(function(key, el) {
      var name = el.name,
          value = el.value;
      if(name) {
        values[name] = value;
      }
    });

    var ticketlist = [];
    if(tickets) {
      ticketlist = JSON.parse(tickets);
    }
    ticketlist.push(values);

    window.localStorage.setItem(
      'ticket',
      JSON.stringify(ticketlist)
    );

    window.location.reload();
  });
};

tt.gensum = function(string) {
  var summary;
  var truncated = false;

  if(string.indexOf('\n') != -1) {
    summary = string.split('\n')[0];
    truncated = true;
  } else {
    summary = string;
  }

  if(summary.length > 35) {
    summary = summary.substr(0, 35);
    truncated = true;
  }

  if(truncated) {
    summary = summary + '\u2026';
  }
  return summary;
}

tt.list = function($list, values) {
  var tickets = JSON.parse(values);

  for(var x in tickets) {
    var current = tickets[x],
        title   = tt.gensum(current.details),
        user    = current.name

    var template = (`
      <li class="ticket-list__item-${x}">
        <h4 class="ticket-list__title"></h4>
        <span class="ticket-list__user"></span>
      </li>
    `);

    $list.append(template);
    var $current = $(`.ticket-list__item-${x}`);
    $current.children('.ticket-list__title').text(title);
    $current.children('.ticket-list__user').text(user);
  }
};

tt.main = function() {
  var $form = $('#ticket-form'),
      $list = $('#ticket-list');
  var tickets = window.localStorage.getItem('ticket');
  tt.form($form, tickets);
  if(tickets) {
      tt.list($list, tickets);
  }
};

$(document).ready(function() {
  tt.main();
});
