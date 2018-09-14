// parses test page of SS creates valid JSON object. Key is set up as record index
function doGet(){
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
 
  var sheet = ss.getSheetByName('TROUI');
  var data = sheet.getDataRange();
  var testData = ss.getSheetByName('test');
  var key;
  var value;
  var lastRow = testData.getLastRow();
  var lastCol = testData.getLastColumn();
  var testArr = testData.getRange(2,1,lastRow-1,lastCol).getValues();
  var headers  = testData.getDataRange().getValues().shift();
  var JSONObj = {} ;
  
  Logger.log(testArr[1][1]);
  Logger.log(headers[1]);
  
  for(var i = 0; i < testArr.length; i++){
      var obj = {} ;
      for(var ii = 0; ii < headers.length; ii++ ){
        key = headers[ii];
        value = testArr[i][ii];
        obj[key] = value;
      }  
    JSONObj[i]= obj;
  }
  var myJSON = JSON.stringify(JSONObj);
  Logger.log(myJSON);
   return ContentService.createTextOutput(JSON.stringify(JSONObj))
   .setMimeType(ContentService.MimeType.JSON);
  
}


//function doGet() {
  
  //var JSONFile = {};
  
//  var cal = data.getValues();
  
  //Logger.log(cal);
  
 // JSONFile.cal = makeObject(cal);

  //Logger.log(JSONFile.cal)
  //return ContentService.createTextOutput(JSON.stringify(JSONFile))
  //.setMimeType(ContentService.MimeType.JSON);
  
//}

//function makeObject(multiArr){
  //var obj = {};
  
  //var headers = multiArr.shift();
  //Logger.log(multiArr);
 
  //for(var i =0; i < headers.length; i++){
    //obj[headers[i]] =multiArr.map(function(app){
      //Logger.log('this is app');
      //Logger.log(app);
      //return app[i];
      
    //});  
  //}
  
 // return obj;
//}









