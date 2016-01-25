function submitData() {
	showAlert('workingAlert');		
	var keyElement = $('#key');
	var valueElement = $('#value');
	var keyInput = listOptions[keyElement.val()];
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