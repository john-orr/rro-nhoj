function deleteProcess(id) {
	var existingKey = $(`#existingKey${id}`).html();
	var existingValue = $(`#existingValue${id}`).html();
	BootstrapDialog.show({
		title: 'Warning',
		message: `Are you sure you want to delete this record? Key:<strong>${existingKey}</strong>, Value:<strong>${existingValue}</strong>`,
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