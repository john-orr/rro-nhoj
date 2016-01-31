function validateRecord(record, callback) {
	if (!record.key || record.key === '' || record.value === '') {
		BootstrapDialog.show({
			title: 'Invalid record',
			message: 'The record is invalid; Neither Key nor Value can be empty.',
			type: BootstrapDialog.TYPE_INFO,
			buttons: [{
				label: 'Ok',
				action: function (dialog) {
					dialog.close();
				}
			}]
		});
	} else {
		callback();
	}
}