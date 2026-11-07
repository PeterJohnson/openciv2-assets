param([ValidateSet('Debug','Release')][string]$Configuration='Release', [string]$Source=$env:ATLAS_REVIEW_SOURCE, [string]$Python=$env:ATLAS_REVIEW_PYTHON)
$ErrorActionPreference='Stop'
$repoRoot=(Resolve-Path (Join-Path $PSScriptRoot '../..')).Path
if (-not $Source) { throw 'Use python tools/review.py to configure the source checkout and revision first' }
$sourceRoot=(Resolve-Path -LiteralPath $Source).Path
$env:ATLAS_REVIEW_SOURCE=$sourceRoot
$out=Join-Path $repoRoot ('build/atlas-review/'+$Configuration)
New-Item -ItemType Directory -Force $out | Out-Null
if (-not $Python) { $Python=(Get-Command python -ErrorAction Stop).Source }
& $python (Join-Path $PSScriptRoot 'extract-windows.py')
if ($LASTEXITCODE -ne 0) { throw 'Renderer extraction failed' }
$vswhere='C:/Program Files (x86)/Microsoft Visual Studio/Installer/vswhere.exe'
$installation=& $vswhere -latest -products '*' -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -property installationPath
if (-not $installation) { throw 'MSVC x86 build tools are required' }
$vcvars=Join-Path $installation 'VC/Auxiliary/Build/vcvarsall.bat'
$flags=if($Configuration -eq 'Debug'){'/Od /Zi /RTC1 /MDd'}else{'/O2 /MD'}
$main=Join-Path $PSScriptRoot 'engine-main.cpp'
$exe=Join-Path $out 'atlas-engine.exe'
$obj=Join-Path $out 'atlas-engine.obj'
$pdb=Join-Path $out 'atlas-engine.pdb'
$command='cl /nologo /std:c++17 /EHsc /W3 '+$flags+' /D_CRT_SECURE_NO_WARNINGS /I"'+(Join-Path $repoRoot 'build/atlas-review/generated')+'" /I"'+(Join-Path $sourceRoot 'src/include')+'" "'+$main+'" /Fe:"'+$exe+'" /Fo:"'+$obj+'" /Fd:"'+$pdb+'" /link /MACHINE:X86'
$batch=Join-Path $out 'compile.cmd'
[IO.File]::WriteAllText($batch, '@echo off'+"`r`n"+'call "'+$vcvars+'" x86 >nul'+"`r`n"+$command+"`r`n"+'exit /b %errorlevel%'+"`r`n",[Text.UTF8Encoding]::new($false))
& cmd.exe /d /c $batch
if ($LASTEXITCODE -ne 0) { throw 'Standalone renderer build failed' }
Write-Output $exe

$main=Join-Path $PSScriptRoot 'window-main.cpp'
$exe=Join-Path $out 'atlas-windows.exe'
$obj=Join-Path $out 'atlas-windows.obj'
$pdb=Join-Path $out 'atlas-windows.pdb'
$command='cl /nologo /std:c++17 /EHsc /W3 '+$flags+' /D_CRT_SECURE_NO_WARNINGS /I"'+(Join-Path $repoRoot 'build/atlas-review/generated')+'" /I"'+(Join-Path $sourceRoot 'src/include')+'" "'+$main+'" /Fe:"'+$exe+'" /Fo:"'+$obj+'" /Fd:"'+$pdb+'" /link /MACHINE:X86'
[IO.File]::WriteAllText($batch, '@echo off'+"`r`n"+'call "'+$vcvars+'" x86 >nul'+"`r`n"+$command+"`r`n"+'exit /b %errorlevel%'+"`r`n",[Text.UTF8Encoding]::new($false))
& cmd.exe /d /c $batch
if ($LASTEXITCODE -ne 0) { throw 'Standalone window renderer build failed' }
Write-Output $exe
