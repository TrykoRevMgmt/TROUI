
var xhttp = new XMLHttpRequest();

var scriptData = {

		marketRent: '', 
		gainLossMR: '',
		trgtRent: '',
		trgtRentIncrease: '',
		trgtRentIncreasePct: ''

	}

//console.log(scriptData);	

document.getElementById("bDate").addEventListener("input", eLstnr);
document.getElementById("eDate").addEventListener("input", eLstnr);

function eLstnr(){
	var bDate = new Date(document.getElementById("bDate").value);
	bDate.setHours(24);
	bDate.setMinutes(0);
	bDate.setSeconds(0);
	var eDate = new Date(document.getElementById("eDate").value);
	eDate.setHours(24);
	eDate.setMinutes(0);
	eDate.setSeconds(0);

	//xhttp.onreadystatechange = function() {	
	//if (this.readyState == 4 && this.status == 200) {
	var response = JSON.parse(xhttp.responseText);
	var dataArr = Object.values(response);
	var scriptDataArr= Object.keys(scriptData)
	var TRORent = {
		"1BR-P":895, "2BR-P":950,"3BR-P":1150,
		"1BR-T":896, "2BR-T":951,"3BR-P":1151,
		"1BR(D)-P":897, "2BR(D)-P":952,"3BR(D)-P":1152,
		"1BR(D)-T":898, "2BR(D)-T":953,"3BR(D)-P":1153,
		"1BR-P(R)":995, "2BR-P(R)":1050,"3BR-P(R)":1250,
		"1BR-T(R)":996, "2BR-T(R)":1051,"3BR-P(R)":1251,
		"1BR(D)-P(R)":997, "2BR(D)-P(R)":1052,"3BR(D)-P(R)":1252,
		"1BR(D)-T(R)":998, "2BR(D)-T(R)":1053,"3BR(D)-P(R)":1253, 
	};
	
	for (var i = 0; i < dataArr.length; i++) {
		marketRent = TRORent[dataArr[i]['Floor Plan']];
		dataArr[i]["marketRent"] = marketRent;
		gainLossMR = dataArr[i]['marketRent'] - dataArr[i]['SQFT'];

		console.log(dataArr[i]['marketRent'],dataArr[i]['SQFT'], gainLossMR);

		//for (var ii = 0; ii < scriptDataArr.length; ii++) {
		//	var obj = dataArr[i]
		//	var value = '';
		//	obj[scriptDataArr[ii]] = value;
		//}
	}
	console.log(dataArr);
	var dataHeader = Object.keys(dataArr[1]);
	//console.log('dataHeader', dataHeader);

	var marketRent;
	var gainLossMR;
	var trgtRent;
	var trgtRentIncrease;
	var trgtRentIncreasePct;

	var header = '';
	var records = '';
	

	//set table rows	
	for (var i = 0; i < dataArr.length; i++) {
		records += '<tr id = record'+i+'></tr>';
	}
	document.getElementById('tableBody').innerHTML = records;

	//set table headers
	for (var i = 0; i < dataHeader.length; i++) {
		header += '<th>' + dataHeader[i] + '</th>';
	}
document.getElementById('tableHeader').innerHTML = header;

//populate data in table
for (var i = 0; i < dataArr.length; i++) {
	var data = '';
	moveIn = new Date(dataArr[i]["Move-In"]);moveIn.setHours(0);moveIn.setMinutes(0);moveIn.setSeconds(0);
	if (moveIn >= bDate && moveIn <= eDate) {
		//console.log(bDate,eDate);
		//console.log(moveIn,"yes");
		for (var ii = 0; ii < dataHeader.length; ii++) {
			data += '<td>' + dataArr[i][dataHeader[ii]] + '</td>';	
		}	
	}
	document.getElementById('record'+i).innerHTML = data;
}
//}
//}
}

xhttp.open("GET", "https://script.google.com/macros/s/AKfycbzSFDue3ULUpql5J8MAJyagYB-hlMDRUtASM4CN9tPkwA5UnTui/exec", true);
xhttp.send();

// Script to open and close sidebar when on tablets and phones
function w3_open() {
document.getElementById("mySidebar").style.display = "block";
document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
document.getElementById("mySidebar").style.display = "none";
document.getElementById("myOverlay").style.display = "none";
}
