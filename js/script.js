/* 

Data Types

Different types of response to $.ajax() call are subjected to different kinds of pre-processing before being passed to the success handler. 
The type of pre-processing depends by default upon the Content-Type of the response, but can be set explicitly using the dataType option. 
If the dataType option is provided, the Content-Type header of the response will be disregarded.

The available data types are text, html, xml, json, jsonp, and script.

If text or html is specified, no pre-processing occurs. The data is simply passed on to the success handler, and made available through the responseText property of the jqXHR object.

If xml is specified, the response is parsed using jQuery.parseXML before being passed, as an XMLDocument, to the success handler. 
The XML document is made available through the responseXML property of the jqXHR object.

If json is specified, the response is parsed using jQuery.parseJSON before being passed, as an object, to the success handler. 
The parsed JSON object is made available through the responseJSON property of the jqXHR object.

If script is specified, $.ajax() will execute the JavaScript that is received from the server before passing it on to the success handler as a string.

If jsonp is specified, $.ajax() will automatically append a query string parameter of (by default) callback=? to the URL.
The jsonp and jsonpCallback properties of the settings passed to $.ajax() can be used to specify, respectively, the name of the query string parameter
and the name of the JSONP callback function. The server should return valid JavaScript that passes the JSON response into the callback function. 
$.ajax() will execute the returned JavaScript, calling the JSONP callback function, before passing the JSON object contained in the response to the $.ajax() success handler.

*/


$(function() {

	var url = 'https://restcountries.eu/rest/v1/name/',
		urlFlag = 'https://restcountries.eu/data/',
		countriesList = $('#countries'),
		capitalsList = $('#capitals'),
		subregionsList = $('#subregions'),
		currenciesList = $('#currencies');
	


	$('#search').click(searchCountries);

	function searchCountries() {

		var countryName = $('#country-name').val(); // val() to value wpisane w input

		if(!countryName.length) countryName = 'Poland'; 
		// length = 0 generuje wartosc warunku 'false'(bo countryName nie ma dlugosci), ! zmienia na 'true'. pomijamy {} w ifie

		$.ajax({

			dataType: 'json',
			url: url + countryName,
			method: 'GET',
			success: showCountriesList 
			/* ta fcja showCountriesList ma wbudowany parametr zawierajacy odpowiedz serwera(obiekt js), 
			tak dziala metoda $.ajax(). mozemy ten parametr nazwac dowolnie, js bedzie wiedzial czym on jest.
			W zaleznosci od tego jaki typ danych przychodzi w odpowiedzi, moze podlegac on preprocesowaniu w jquery do 
			obiektu js.

			 */

		});

		
	}



	function showCountriesList(response) {

		countriesList.empty();
		capitalsList.empty();
		subregionsList.empty();
		currenciesList.empty();

		response.forEach(function(item) {
		 // Here is the code that will execute on each successive item in the collection. A single item is hidden under an 'item' variable.

			$('<li>').text(item.name).appendTo(countriesList); // name to atrybut obiektu 	
			$('<li>').text(item.capital).appendTo(capitalsList);
			$('<li>').text(item.subregion).appendTo(subregionsList);
			$('<li>').text(item.currencies).appendTo(currenciesList);

   		});
		
	}

});