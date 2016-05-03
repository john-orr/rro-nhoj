function submitData() {	
	var keyElement = $('#key');
	var valueElement = $('#value');
	var keyInput = listOptions[keyElement.val()];
	var valueInput = valueElement.val();
	var newRecord = {
		key:keyInput,
		value:valueInput
	};
	validateRecord(newRecord, function () {
		showAlert('workingAlert');
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
	});
}

$('#value').live("keypress", function(e) {
    if (e.keyCode == 13) {
        submitData();
    }
});