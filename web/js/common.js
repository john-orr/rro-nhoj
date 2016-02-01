$(document).ready(function () {
	listOptions = new Object();
	// From form input to DB
	listOptions['NHI'] = 'Needed Household Item';
	listOptions['PUFB'] = 'Pick up from Blackrock';
	listOptions['SI'] = 'Shopping Item';
	listOptions['TD'] = 'To Do';
	// From DB to display
	listOptions['Needed Household Item'] = 'NHI';
	listOptions['Pick up from Blackrock'] = 'PUFB';
	listOptions['Shopping Item'] = 'SI';
	listOptions['To Do'] = 'TD';
	
	refreshData();
});

function refreshData() {
	console.log("Getting records...");
	$.getJSON('records', function (records, status) {
		console.log(`Got:${JSON.stringify(records)}`);
		var target = $('#container');
		target.empty();
		var source = $('#tableRowTemplate').html();
		var template = Handlebars.compile(source);
		records.forEach(function (record) {
			var nhi_selected = '';
			var pufb_selected = '';
			var si_selected = '';
			var td_selected = '';
			var keyId = listOptions[record.key];
			if (keyId === 'NHI') {
				nhi_selected = 'selected';
			} else if (keyId === 'PUFB') {
				pufb_selected = 'selected';
			} else if (keyId === 'SI') {
				si_selected = 'selected';
			} else if (keyId === 'TD') {
				td_selected = 'selected';
			}
			var context = {key:record.key, value:record.value, id:record._id, NHI_Selected:nhi_selected, PUFB_Selected:pufb_selected, SI_Selected:si_selected, TD_Selected:td_selected};
			var html = template(context);
			target.append(html);
		});
	});
}

function postData(url, jsonObject, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	console.log(`Posting:${JSON.stringify(jsonObject)} to '/${url}'`);
	xhr.send(JSON.stringify(jsonObject));
	xhr.onloadend = function () {
		console.log(`Response:${xhr.responseText}`);
		callback(JSON.parse(xhr.responseText));
	}
}

function showAlert(id) {
	$('.alert').each(function () {
		$(this).hide();
	})
	$(`#${id}`).show();
}

$(function(){
    $("[data-hide]").on("click", function(){
        $(this).closest("." + $(this).attr("data-hide")).hide();
    });
});