$path = "src\data\events\technorion.json"
$json = Get-Content $path -Raw | ConvertFrom-Json
foreach ($event in $json) {
    if ($event.details -ne $null) {
        $event.details.date = "Feb 19-21, 2026"
        $event.details.time = "9:30 AM"
    }
}
$json | ConvertTo-Json -Depth 10 | Set-Content $path
