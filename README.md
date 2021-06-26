# PreludeOperator_QuickCheck
Simple Powershell Prelude Operator Quick Check


## Create a TTP

![Screen Shot 2021-06-25 at 7 37 13 PM](https://user-images.githubusercontent.com/83469949/123498507-82999200-d5ed-11eb-9abd-978f77c68445.png)

## Create an Adversary - Add The TTP

![Screen Shot 2021-06-25 at 7 43 38 PM](https://user-images.githubusercontent.com/83469949/123498525-a8269b80-d5ed-11eb-8a93-941325cca89b.png)

## Ensure Your Prelude Operator is Reachable over HTTP

Ngrok Example 

`ngrok http 3391`

Deploy a Cloud Gateway Redirector

{TODO}

## Execute Checkin PowerShell

```
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

$response = Invoke-RestMethod -Uri "https://boomtown.ngrok.io" -Method Post -Body $delivery -ContentType "application/json"
```

You should have a call back

## Deploy The Adversary To Your BoomTown Range

![Screen Shot 2021-06-25 at 7 37 13 PM](https://user-images.githubusercontent.com/83469949/123498596-2c791e80-d5ee-11eb-9eba-983d6c4cbbcb.png)


## Run The PowerShell Simple Stager

```

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

$response = Invoke-RestMethod -Uri "https://boomtown.ngrok.io" -Method Post -Body $delivery -ContentType "application/json"
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
$response_delivery = Invoke-RestMethod -Uri "https://boomtown.ngrok.io" -Method Post -Body $deliveryResponse  -ContentType "application/json"
```

## Check Status

![Screen Shot 2021-06-25 at 7 49 29 PM](https://user-images.githubusercontent.com/83469949/123498652-909be280-d5ee-11eb-8a3c-afe20b6133af.png)

![Screen Shot 2021-06-25 at 7 49 41 PM](https://user-images.githubusercontent.com/83469949/123498655-9396d300-d5ee-11eb-8c23-b7c0e59111e6.png)
