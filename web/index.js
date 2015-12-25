$(document).ready(function () {	
	keyElement = $('#key');
	valueElement = $('#value');
	
	refreshData();
})

function submitData() {
	keyInput = keyElement.val();
	valueInput = valueElement.val();
	newRecord = {
		"key":keyInput,
		"value":valueInput
	};
	postData('submit', newRecord, function (response) {
		if (response.code === 0) {
			showAlert('failureAlert');
		} else if (response.code === 1) {
			showAlert('submitSuccessAlert');
		}
		keyElement.val('');
		valueElement.val('');
		refreshData();
	});
}

function refreshData() {
	console.log("Getting records...");
	$.getJSON('records', function (records, status) {
		console.log(`Got:${JSON.stringify(records)}`);
		target = $('#container');
		target.empty();
		records.forEach(function (record) {
			target.append(`<tr><td>${record.key}</td><td>${record.value}</td><td><button type="button" class="btn btn-danger" onclick="deleteRecord('${record._id}')">Delete</button></td></tr>`);
		});
	});
}

function deleteRecord(id) {
	console.log()
	postData('delete', {"_id":id}, function (response) {
		if (response.code === 0) {
			showAlert('failureAlert');
		} else if (response.code === 1) {
			showAlert('deleteSuccessAlert');
		}
		refreshData();
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