$(document).ready(function () {	
	refreshData();
})

function refreshData() {
	console.log("Getting records...");
	$.getJSON('records', function (records, status) {
		console.log(`Got:${JSON.stringify(records)}`);
		var target = $('#container');
		target.empty();
		var source = $('#tableRowTemplate').html();
		var template = Handlebars.compile(source);
		records.forEach(function (record) {
			var context = {key:record.key, value:record.value, id:record._id};
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