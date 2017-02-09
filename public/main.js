var tt = {};

tt.form = function($form) {
    $form.on('submit', function(e) {
	var values = {}, $inputs;
	
	e.preventDefault();
	$inputs = $form.find('select, textarea, input');
	$inputs.each(function(key, el) {
	    var name = el.name;
	    var value = el.value;
	    if(name) {
		values[name] = value;
	    }
	});

	window.localStorage.setItem('ticket', JSON.stringify(values));
    });
};

tt.list = function($list) {
    var values = JSON.parse(window.localStorage.getItem('ticket'));
    var title = values.details;
    var user = values.name;
    
    var template = '<li class="ticket-list__item"><h4 class="ticket-list__title">'+title+'</h4><span class="ticket-list__user">'+user+'</span></li>';

    if(values) {
	$list.html(template);
    }
};

tt.main = function() {
    var $form = $('#ticket-form');
    var $list = $('#ticket-list');
    tt.form($form);
    tt.list($list);
};

$(document).ready(function() {
    tt.main();
});
