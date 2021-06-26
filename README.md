# PreludeOperator_QuickCheck
Simple Powershell Prelude Operator Quick Check

In this example, we will use `boomtown.ngrok.io` There are a couple ways to redirect HTTP.  
You should replace this with either your ngork instance or your redirector.
The preferred method is a Gateway Redirector.

[Cloudy with a chance of redirectors](https://feed.prelude.org/p/cloudy-with-a-chance-of-redirectors)


## Create a TTP

![Screen Shot 2021-06-25 at 7 37 13 PM](https://user-images.githubusercontent.com/83469949/123498507-82999200-d5ed-11eb-9abd-978f77c68445.png)

## Create an Adversary - Add The TTP

![Screen Shot 2021-06-25 at 7 43 38 PM](https://user-images.githubusercontent.com/83469949/123498525-a8269b80-d5ed-11eb-8a93-941325cca89b.png)

## Ensure Your Prelude Operator is Reachable over HTTP

Ngrok Example - 

`ngrok http --region=us --hostname=boomtown.ngrok.io 80`


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

$response = Invoke-RestMethod -Uri "https://bdoomtown.ngrok.io" -Method Post -Body $delivery -ContentType "application/json"
```

You should have a call back

## Deploy The Adversary To Your BoomTown Range

![Screen Shot 2021-06-25 at 7 47 08 PM](https://user-images.githubusercontent.com/83469949/123498694-d5c01480-d5ee-11eb-9008-bf83052a4b97.png)


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


## Conclusion

The aim here is to help ensure you are up and running quick. Once you pass the check you are ready to start deploying more aggressive tests.

This is pretty ugly, and can be better, but its a start ;-) Feedback Welcome.

