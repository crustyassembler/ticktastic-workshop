var $form = $('#ticket-form')

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
