# TROUI
UI for google sheet based TRO revenue management

gitHUb pages https://trykorevmgmt.github.io/TROUI/.


dev notes: 
9/18/2018ap: market rate is set as simple static var. will have to develop into dynamic field (assuming tro integration), data entry fields or JSON input from other source before script cal go live.

9/18/2018ap: gainLossMR testing on sqft, need to adjust incoming JSON object with correct data.

TO-DO (9/18/2018ap)
		- Clean JSON data so test data will have same fields as future data.
		- build out remaining script data fields
		- Adjust date filter so main script will only run on filterd data.
		- sort function for table columns
		- postfuction for locked in renewals
	Update: (9/20/18ap) 	
		- update GAS Script to pull desired rown of data only.
		- convert fields pulling from var TroRent obj to TROdata
		- TRO data source and UI (current hard coded in script)  


