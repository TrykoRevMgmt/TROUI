
var xhttp = new XMLHttpRequest();

//Event Listners that run script when action is completed ??add for bucket adjustemtns?
document.getElementById("bDate").addEventListener("input", eLstnr);
document.getElementById("eDate").addEventListener("input", eLstnr);

//Sample JSON Objects. To be replaced with JSON calls from backEnd in the future.
	var TRORent = {
		"1BR-P":895, "2BR-P":950,"3BR-P":1150,
		"1BR-T":896, "2BR-T":951,"3BR-P":1151,
		"1BR(D)-P":897, "2BR(D)-P":952,"3BR(D)-P":1152,
		"1BR(D)-T":898, "2BR(D)-T":953,"3BR(D)-P":1153,
		"1BR-P(R)":995, "2BR-P(R)":1050,"3BR-P(R)":1250,
		"1BR-T(R)":996, "2BR-T(R)":1051,"3BR-P(R)":1251,
		"1BR(D)-P-R":997, "2BR(D)-P-R":1052,"3BR(D)-P-R":1252,
		"1BR(D)-T-R":998, "2BR(D)-T-R":1053,"3BR(D)-P-R":1253,
	};

	var TROData ={

		"rentGroup" : [
			"1BD",
			"1BD(R)",
			"2BD",
			"2BD(R)",
			"3BD",
		],

		"floorPlan" :{
			"1BR-P":{"baseRent": 895, "rentGroup": "1BD"}, 
			"2BR-P":{"baseRent": 950, "rentGroup": "1BD"},
			"3BR-P":{"baseRent": 1150, "rentGroup": "1BD"},
			"1BR-T":{"baseRent": 896, "rentGroup": "1BD"},
			"2BR-T":{"baseRent": 951, "rentGroup": "1BD"},
			"3BR-P":{"baseRent": 1151, "rentGroup": "1BD"},
			"1BR(D)-P":{"baseRent": 897, "rentGroup": "1BD"},
			"2BR(D)-P":{"baseRent": 952, "rentGroup": "1BD"},
			"3BR(D)-P":{"baseRent": 1152, "rentGroup": "1BD"},
			"1BR(D)-T":{"baseRent": 898, "rentGroup": "1BD"},
			"2BR(D)-T":{"baseRent": 953, "rentGroup": "1BD"},
			"3BR(D)-P":{"baseRent": 1153, "rentGroup": "1BD"},
			"1BR-P(R)":{"baseRent": 995, "rentGroup": "1BD"},
			"2BR-P(R)":{"baseRent": 1050, "rentGroup": "1BD"},
			"3BR-P(R)":{"baseRent": 1250, "rentGroup": "1BD"},
			"1BR-T(R)":{"baseRent": 996, "rentGroup": "1BD"},
			"2BR-T(R)":{"baseRent": 1051, "rentGroup": "1BD"},
			"3BR-P(R)":{"baseRent": 1251, "rentGroup": "1BD"},
			"1BR(D)-P-R":{"baseRent": 997, "rentGroup": "1BD"},
			"2BR(D)-P-R":{"baseRent": 1052, "rentGroup": "1BD"},
			"3BR(D)-P-R":{"baseRent": 1252, "rentGroup": "1BD"},
			"1BR(D)-T-R":{"baseRent": 998, "rentGroup": "1BD"},
			"2BR(D)-T-R":{"baseRent": 1053, "rentGroup": "1BD"},
			"3BR(D)-P-R":{"baseRent": 1253, "rentGroup": "1BD"},
		}
	}

	var priceBucket = {
		"1BD":{
			"highRange":[
				document.getElementById("highRange0").value,
				document.getElementById("highRange1").value,
				document.getElementById("highRange2").value,
			],
			"lowRange": [
				document.getElementById("lowRange0").value,
				document.getElementById("lowRange1").value,
				document.getElementById("lowRange2").value,
			],
			"trgtRent":[
				document.getElementById("target0").value,
				document.getElementById("target1").value,
				document.getElementById("target2").value,
			],
			"min":[
				document.getElementById("min0").value,
				document.getElementById("min1").value,
				document.getElementById("min2").value,
			],
			"max":[
				document.getElementById("max0").value,
				document.getElementById("max1").value,
				document.getElementById("max2").value,
			],
		},
		"1BD(R)":{
			"highRange":'',
			"lowRange":'',
			"target":'',
			"min":'',
			"max":'',
		},
		"2BD":{
			"highRange":'',
			"lowRange":'',
			"target":'',
			"min":'',
			"max":'',
		},
		"2BD(R)":{
			"highRange":'',
			"lowRange":'',
			"target":'',
			"min":'',
			"max":'',
		},
		"3BD":{
			"highRange":'',
			"lowRange":'',
			"target":'',
			"min":'',
			"max":'',
		},
	}	
//End Sample JSON Objects

//Main Function
function eLstnr(){
	var bDate = new Date(document.getElementById("bDate").value);
		bDate.setHours(24);
		bDate.setMinutes(0);
		bDate.setSeconds(0);
	var eDate = new Date(document.getElementById("eDate").value);
		eDate.setHours(24);
		eDate.setMinutes(0);
		eDate.setSeconds(0);

	//saved script to use when sheet loads instead of on event.
		//xhttp.onreadystatechange = function() {	
			//if (this.readyState == 4 && this.status == 200) {}}

	var response = JSON.parse(xhttp.responseText);
	var dataArr = Object.values(response);

	// Adds script data to dataArr var
	for (let i = 0; i < dataArr.length; i++) {
		let marketRent = TRORent[dataArr[i].Unit_Type];
		let currentRent = dataArr[i].Current_Rent;
		let gainLossMR = Number((((marketRent - currentRent) / marketRent)*100).toFixed(1));
		let rentGroup = TROData.floorPlan[dataArr[i].Unit_Type].rentGroup;
		let rateDiscount;
		let minIncrease;  	
		let maxIncrease; 
		let trgtIncrease;
		let trgtRentIncrease;
		let trgtRent;
		let trgtRentIncreasePct;
		
		if (
			gainLossMR > Number(priceBucket[rentGroup].highRange[0]) 
			&& 
			gainLossMR < Number(priceBucket[rentGroup].lowRange[0])
			){
				rateDiscount =  (Number(priceBucket[rentGroup].trgtRent[0]) / 100);
				minIncrease = (Number(priceBucket[rentGroup].min[0]) / 100) * currentRent;
				maxIncrease = (Number(priceBucket[rentGroup].max[0]) / 100) * currentRent;
				trgtIncrease = (marketRent - currentRent) * rateDiscount;

				if (trgtIncrease < minIncrease) {
					trgtRentIncrease = minIncrease;
				}else if (trgtIncrease > maxIncrease) {
					trgtRentIncrease = maxIncrease;
				}else trgtRentIncrease = trgtIncrease;

				trgtRent = trgtRentIncrease + currentRent;
				trgtRentIncreasePct = trgtRentIncrease / dataArr[i].Current_Rent;
								
		}else if (
			gainLossMR > Number(priceBucket[rentGroup].highRange[1]) 
			&& 
			gainLossMR < Number(priceBucket[rentGroup].lowRange[1])
			) {
				rateDiscount =  (Number(priceBucket[rentGroup].trgtRent[1]) / 100);
				minIncrease = (Number(priceBucket[rentGroup].min[1]) / 100) * currentRent;
				maxIncrease = (Number(priceBucket[rentGroup].max[1]) / 100) * currentRent;
				trgtIncrease = (marketRent - currentRent) * rateDiscount;

			if (trgtIncrease < minIncrease) {
				trgtRentIncrease = minIncrease;
			}else if (trgtIncrease > maxIncrease) {
				trgtRentIncrease = maxIncrease;
			}else trgtRentIncrease = trgtIncrease;

			trgtRent = trgtRentIncrease + currentRent;
			trgtRentIncreasePct = trgtRentIncrease / dataArr[i].Current_Rent;		
							
		}else if (
			gainLossMR > Number(priceBucket[rentGroup].highRange[2]) 
			&& 
			gainLossMR < Number(priceBucket[rentGroup].lowRange[2])
			) {
				rateDiscount =  (Number(priceBucket[rentGroup].trgtRent[2]) / 100);
				minIncrease = (Number(priceBucket[rentGroup].min[2]) / 100) * currentRent;
				maxIncrease = (Number(priceBucket[rentGroup].max[2]) / 100) * currentRent;
				trgtIncrease = (marketRent - currentRent) * rateDiscount;

			if (trgtIncrease < minIncrease) {
				trgtRentIncrease = minIncrease;
			}else if (trgtIncrease > maxIncrease) {
				trgtRentIncrease = maxIncrease;
			}else trgtRentIncrease = trgtIncrease;

			trgtRent = trgtRentIncrease + currentRent;
			trgtRentIncreasePct = trgtRentIncrease / dataArr[i].Current_Rent;
			
		}else{
			console.log("fail");
		}

		//Add data to Obj
		dataArr[i]["marketRent"] = marketRent;
		dataArr[i]["gainLossMR"] = gainLossMR;
		dataArr[i]["New_Rent"] = trgtRent;
		dataArr[i]["Increase_Amount"] = trgtRentIncrease;
		dataArr[i]["Increase_Pct"] = trgtRentIncreasePct;
	}
	
	// Create HTML Table
	var dataHeader = Object.keys(dataArr[1]);
	var records = '';
	var header = '';

	//set table rows	
	for (var i = 0; i < dataArr.length; i++) {
		records += '<tr id = record'+i+'></tr>';
	}
	document.getElementById('tableBody').innerHTML = records;

	//set table headers
	console.log(dataHeader);
	for (var i = 0; i < dataHeader.length; i++) {
		header += '<th>' + dataHeader[i] + '</th>';
		console.log(dataHeader[i]);
	}
	document.getElementById('tableHeader').innerHTML = header;

	//populate data in table
	for (var i = 0; i < dataArr.length; i++) {
		var data = '';
		moveIn = new Date(dataArr[i]["Lease_End"]);moveIn.setHours(0);moveIn.setMinutes(0);moveIn.setSeconds(0);
		if (moveIn >= bDate && moveIn <= eDate) {
			for (var ii = 0; ii < dataHeader.length; ii++) {
				console.log("data arr : ", dataArr[i],"dataHeader : ", dataHeader[ii])
				data += '<td>' + dataArr[i][dataHeader[ii]] + '</td>';	
			}	
		}
		document.getElementById('record'+i).innerHTML = data;
	}
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
