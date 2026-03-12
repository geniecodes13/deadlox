$ErrorActionPreference = "Stop"
$exePath = "c:\Users\hp\OneDrive\Documents\projects\dl2..0\cpp_game\build\deadlox_game.exe"
$outputFile = "c:\Users\hp\OneDrive\Documents\projects\dl2..0\cpp_output.txt"

# Run the executable and capture output
$process = Start-Process -FilePath $exePath -NoNewWindow -Wait -PassThru -RedirectStandardOutput $outputFile -RedirectStandardError "$outputFile.err"

Write-Host "Exit code: $($process.ExitCode)"
Write-Host "Output saved to: $outputFile"

if (Test-Path $outputFile) {
    Get-Content $outputFile
}

