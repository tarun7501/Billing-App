[Setup]
AppName=BillingApp
AppVersion=1.0
DefaultDirName={autopf}\BillingApp
DefaultGroupName=BillingApp
OutputBaseFilename=BillingAppInstaller
Compression=lzma
SolidCompression=yes

[Files]
Source: "publish\*"; DestDir: "{app}"; Flags: recursesubdirs createallsubdirs

[Icons]
Name: "{group}\BillingApp"; Filename: "{app}\Billing.Api.exe"
Name: "{commondesktop}\BillingApp"; Filename: "{app}\Billing.Api.exe"

[Run]
Filename: "{app}\Billing.Api.exe"; Description: "Launch BillingApp"; Flags: nowait postinstall skipifsilent
