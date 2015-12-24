$(document).ready(function () {	
	keyElement = $('#key');
	valueElement = $('#value');
	
	refreshData();
})

function submitData() {
	keyInput = keyElement.val();
	valueInput = valueElement.val();
	requestData = `{"key":"${keyInput}","value":"${valueInput}"}`;
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'postData', true);
	xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	xhr.send(requestData);
	xhr.onloadend = function () {
		keyElement.val('');
		valueElement.val('');
  };
}

function refreshData() {
	$.getJSON('records', function (records, status) {
		console.log(`records:${JSON.stringify(records)}`);
		target = $('#container');
		target.empty();
		records.forEach(function (record) {
			target.append(`<tr><td>${record.key}</td><td>${record.value}</td></tr>`);
		});
	});
}