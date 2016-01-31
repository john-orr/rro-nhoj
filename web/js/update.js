function showViewMode(id) {
	$(`#viewMode${id}`).show();
	$(`#updateMode${id}`).hide();
}

function showUpdateMode(id) {
	$(`#viewMode${id}`).hide();
	$(`#updateMode${id}`).show();
}

function updateProcess(id) {
	var newKey = listOptions[$(`#newKey${id}`).val()];
	var newValue = $(`#newValue${id}`).val();
	var oldKey = $(`#existingKey${id}`).html();
	var oldValue = $(`#existingValue${id}`).html();
	var newRecord = {id:id,key:newKey,value:newValue};
	validateRecord(newRecord, function () {
		BootstrapDialog.show({
			title: 'Warning',
			message: `You are about to change a record. The values <strong>${oldKey}</strong> and <strong>${oldValue}</strong> will be overwritten with <strong>${newKey}</strong> and <strong>${newValue}</strong>. Are you sure?`,
			type: BootstrapDialog.TYPE_WARNING,
			buttons: [{
				label: 'No, please cancel',
				action: function (dialog) {
					dialog.close();
					cancelUpdate(id);
				}
			}, {
				label: "Yes, I'm sure",
				cssClass: 'btn-success',
				action: function (dialog) {
					dialog.close();
					updateRecord(newRecord);
				}
			}]
		});
	});
}

function updateRecord(newRecord) {
	showAlert('workingAlert');
	postData('update', newRecord, function (response) {
		if (response.code === 0) {
			showAlert('failureAlert');
		} else if (response.code === 1) {
			showAlert('updateSuccessAlert');
		}
		refreshData();
	});
}

function cancelUpdate(id) {
	resetToOringinalValues(id);
	showViewMode(id);
}

function resetToOringinalValues(id) {
	$(`#newKey${id}`).val(listOptions[$(`#existingKey${id}`).html()]);
	$(`#newValue${id}`).val($(`#existingValue${id}`).html());
}