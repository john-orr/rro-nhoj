$(document).ready(function () {	
	keyElement = $('#key');
	valueElement = $('#value');
	
	refreshData();
})

function submitData() {
	showAlert('workingAlert');
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
			target.append(`<tr><td>${record.key}</td><td>${record.value}</td><td><button type="button" class="btn btn-danger" onclick="deleteProcess('${record._id}')">Delete</button></td></tr>`);
		});
	});
}

function deleteProcess(id) {
	BootstrapDialog.show({
		title: 'Warning',
		message: 'Are you sure you want to delete this record?',
		type: BootstrapDialog.TYPE_WARNING,
		buttons: [{
			label: 'No, please cancel',
			action: function (dialog){
				dialog.close();
			}
		}, {
			label: "Yes, I'm sure",
			cssClass: 'btn-danger',
			action: function (dialog) {
				dialog.close();
				deleteRecord(id);
			}
		}]
	});
}

function deleteRecord(id) {
	showAlert('workingAlert');
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