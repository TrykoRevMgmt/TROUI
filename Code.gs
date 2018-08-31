//Jordan R vid first vid. create json from SS data.

var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName('Sheet1');
var range = sheet.getDataRange();

function addJSON(key,value,obj){
				obj[key]=value;
				return obj;
			}


function doGet() {
  
  var JSONFile = {};
  
  var cal = range.getValues();
  
  JSONFile.cal = makeObject(cal);

  //Logger.log(JSONFile.cal);
  return ContentService.createTextOutput(JSON.stringify(JSONFile))
  .setMimeType(ContentService.MimeType.JSON);
  
}

function makeObject(multiArr){
  var obj = {};
  
  var headers = multiArr.shift();
  
  for(var i =0; i < headers.length; i++){
    obj[headers[i]] =multiArr.map(function(app){
      return app[i];
    });  
  }
  
  return obj;
}









