var raw = '', params = [], run_init = true, old = {};
$.get('list.php', function(data) {
	for(key in data.list) {
		val = data.list[key];
		$('#list').append($("<option></option>")
          .attr("value",val)
          .text(val));
	}
	init();
});
function loadTpl(init) {
	$.get('list.php', {id:$('#list').val()}, function(data) {
		run_init = true;
		localStorage.id = $('#list').val()
		raw = data.data ? data.data : ''
		parseparams();
		render(false)
	});
}
function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}
function clearparams() {
	$('#params tbody textarea').val('')
}
function parseparams() {
	params = [];
	var reg = /\{\{(.+?)\}\}/g;
	match = reg.exec(raw)
	found = false
	while (match != null) {
	  params[match[1]] = true;
	  match = reg.exec(raw);
      found++;
	}
	$('#params tbody').html('')
	if(run_init) {
		old = localStorage.fields ? JSON.parse(localStorage.fields) : {}
	}
	if(found) {
		$('#params tbody').append(tr = $("<tr></tr>"))
		tr.append($('<td colspan="2"></td>').append($('<button>Clear</button>').on('click', clearparams)))
	}
	for(key in params) {
		$('#params tbody').append(tr = $("<tr></tr>"))

		tr.append($('<th></th>')
          .text(key));

		tr.append($('<td></td>').append($('<textarea></textarea>').attr('id', 'input-' + key).val(run_init ? old[key] : '')))
	}
}
function init() {
	id = localStorage.id || 'null';
	if(id != 'null') $('#list').val(id);
	loadTpl();
}
function render(save_list) {
	var source = raw;
	var template = Handlebars.compile(source, {noEscape:true});
	context = {};
	save = {}
	for(key in params) {
		context[key] = run_init && old[key]? old[key] : ($('#input-' + key).val() ? $('#input-' + key).val() : '{{' + key + '}}')
		if(run_init && old[key] || $('#input-' + key).val()) {
			save[key] = run_init ? old[key] : $('#input-' + key).val()
		}
	}
	run_init = false;
	old = {}
	if(save_list) localStorage.fields = JSON.stringify(save)
	var html = template(context);
	$('#raw-copy').val(html).css('display', html.length ? 'block' : 'none');
	auto_grow(document.getElementById('raw-copy'))
	html = marked(html);
	document.getElementById('content').innerHTML = html;
}
$(document).delegate('textarea', 'keyup', function() { render(true) });
$(document).delegate('#list', 'change', loadTpl);