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
	postData('submit', newRecord, function () {
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
	postData('delete', {"_id":id}, function () {
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
		callback();
	}
}