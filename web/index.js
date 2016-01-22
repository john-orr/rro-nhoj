$(document).ready(function () {	
	refreshData();
})

function submitData() {
	showAlert('workingAlert');		
	var keyElement = $('#key');
	var valueElement = $('#value');
	var keyInput = keyElement.val();
	var valueInput = valueElement.val();
	var newRecord = {
		key:keyInput,
		value:valueInput
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
	postData('delete', {id:id}, function (response) {
		if (response.code === 0) {
			showAlert('failureAlert');
		} else if (response.code === 1) {
			showAlert('deleteSuccessAlert');
		}
		refreshData();
	});
}

function showViewMode(id) {
	$(`#viewMode${id}`).show();
	$(`#updateMode${id}`).hide();
}

function showUpdateMode(id) {
	$(`#viewMode${id}`).hide();
	$(`#updateMode${id}`).show();
}

function updateRecordProcess(id) {
	var newKey = $(`#newKey${id}`).val();
	var newValue = $(`#newValue${id}`).val();
	var oldKey = $(`#oldKey${id}`).html();
	var oldValue = $(`#oldValue${id}`).html();
	BootstrapDialog.show({
		title: 'Warning',
		message: `You are about to change a record. The values <b>${oldKey}</b> and <b>${oldValue}</b> will be overwritten with <b>${newKey}</b> and <b>${newValue}</b>. Are you sure?`,
		type: BootstrapDialog.TYPE_WARNING,
		buttons: [{
			label: 'No, please cancel',
			action: function (dialog){
				dialog.close();
				showViewMode(id);
			}
		}, {
			label: "Yes, I'm sure",
			cssClass: 'btn-success',
			action: function (dialog) {
				dialog.close();
				updateRecord(id, newKey, newValue);
			}
		}]
	});
}

function updateRecord(id, key, value) {
	var newRecord = {id:id,key:key,value:value};
	postData('update', newRecord, function (response) {
		if (response.code === 0) {
			showAlert('failureAlert');
		} else if (response.code === 1) {
			showAlert('updateSuccessAlert');
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