$script = Get-Content "script.js" -Raw
$html = Get-Content "index.html" -Raw

$matches = [regex]::Matches($script, "getElementById\(['`""]([^'`""]+)['`""]\)")
$missing = @()
foreach ($m in $matches) {
    $id = $m.Groups[1].Value
    if ($html -notmatch "id=['`""]$id['`""]") {
        $missing += $id
    }
}
$missing | Select-Object -Unique
