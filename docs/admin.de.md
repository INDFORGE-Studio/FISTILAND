<div class="fl-page-hero fl-bg-d" markdown>

:material-shield-crown:

# Admin-Leitfaden

<p>Alles, was wir auf einem SCUM-Server geprüft haben</p>

</div>

<div class="fl-facts">
<div><b>1.3.4.2</b><span>Spielversion</span></div>
<div><b>2.572</b><span>Item-Codes</span></div>
<div><b>7779</b><span>Port für direkte Verbindung (lokal)</span></div>
<div><b>6 Dateien</b><span>Zum Download</span></div>
</div>


## :material-key: Admin werden

Trage deine SteamID64 (17 Ziffern, zu finden auf steamid.io) in `AdminUsers.ini` ein, eine pro Zeile. Die Datei wird beim Start des Servers gelesen, starte den Server also nach der Änderung neu. Danach gibst du die Befehle im Spiel-Chat ein, mit einem `#` davor.

## :material-console: Chat-Befehle

Status: **Getestet** heißt, wir haben den Befehl auf unserem Server ausgeführt. **Gemeldet** heißt, ein öffentlicher Leitfaden beschreibt ihn und wir haben ihn nicht getestet. In den Beispielen sind Beträge, Spielername und Item-Codes nur Beispiele: ändere sie nach Bedarf.

| Befehl | Status | Was er macht |
|---|---|---|
| `#ListPlayers` | Getestet | Listet die Spieler online auf. |
| `#ListItems` | Getestet | Gibt alle Item-Codes deiner Spielversion (2.572 in 1.3.4.2) in der Logdatei des Spiels aus. |
| `#spawnitem Apple`<br>`#spawnitem Water_05l` | Getestet | Gibt dir ein Item anhand seines Codes. Nimm einen beliebigen Code aus der Item-Liste (siehe Downloads unten). |
| `#SetCurrencyBalance Normal 10000 Spielername` | Getestet | Setzt das Geld eines Spielers. `Normal` ist das normale Geld und `10000` der Betrag: ändere ihn auf jede Zahl (500, 100000 ...). |
| `#ChangeCurrencyBalance Gold 5 Spielername` | Getestet | Ändert das Gold eines Spielers. `Gold` ist die Währung und `5` der Betrag: ändere ihn nach Belieben. |
| `#NightBrightness 1` | Getestet | Helligkeit der Nacht, von 0 (dunkel) bis 1 (hell). Nur für dich, nicht für den ganzen Server. |
| `#SetTime 12` | Getestet | Setzt die Tageszeit, von 0 bis 24. |
| `#ListZombies`<br>`#ListAnimals` | Getestet | Listet die Zombie- und Tiertypen auf. |
| `#ListSpawnedVehicles`<br>`#ListSpawnedArmedNPCs` | Getestet | Listet, was in der Welt lebt. Das Ergebnis erscheint nur im Chat, nicht im Log. |
| `#MapTeleport` | Aufgelistet, nicht getestet | Teleport über die Karte. |
| `#SetImmortality true`<br>`#SetImmortality false` | Gemeldet | Schadensimmunität an, dann aus. |
| `#SetFamePoints 500 Spielername` | Gemeldet | Setzt die Fame Points eines Spielers. |
| `#SetGodMode` | Gemeldet | Sofortiges Bauen, keine Unverwundbarkeit. |
| `#heal` | Nicht verfügbar | Gibt es in 1.3.4.2 nicht. |

## :material-monitor: Einen kostenlosen lokalen Testserver betreiben

1. Installiere in Steam das kostenlose Tool **SCUM Server**.
2. Kopiere deine `ServerSettings.ini` und `EconomyOverride.json` in den Ordner `SCUM\Saved\Config\WindowsServer` des Tools. Füge dem Servernamen `[TEST]` hinzu, damit du ihn erkennst.
3. Starte `SCUMServer.exe -log -port=7777` aus `SCUM\Binaries\Win64`. Das Laden der Karte dauert etwa zwei Minuten.
4. Öffne im Spiel das Feld für die direkte Verbindung und gib `127.0.0.1:7779` ein. Port 7777 funktioniert dort nicht.
5. Beende den Server mit Strg+C in seinem Fenster.

Das Serverlog ist `SCUM\Saved\Logs\SCUM.log` im Ordner des Tools. Das Log deines eigenen Spiels, in dem die Ergebnisse der Befehle erscheinen, liegt in `%LOCALAPPDATA%\SCUM\Saved\Logs`.

## :material-file-cog: Einstellungsdateien

| Datei | Was sie enthält |
|---|---|
| `ServerSettings.ini` | Alle Servereinstellungen (440 Schlüssel, ASCII-Text). |
| `EconomyOverride.json` | Händlereinstellungen und Preise pro Item. Jeder Wert steht als Text in Anführungszeichen. |
| `AdminUsers.ini` | Die Admins, eine SteamID64 pro Zeile. |

Auf den [Einstellungsseiten](server/overview.md) steht, was jeder Wert auf FISTILAND bewirkt.

## :material-download: Konfigurationsdateien herunterladen

Jede Datei gibt es in zwei Versionen, damit du sie vergleichen kannst. **FISTILAND** ist die Datei, die unser Server benutzt. **SCUM** ist die Datei so, wie das Spiel oder Nitrado sie liefert, der Ausgangspunkt, wenn du bei null anfangen willst.

| Datei | Welche | Was es ist |
|---|---|---|
| [ServerSettings_FISTILAND.ini](downloads/ServerSettings_FISTILAND.ini){ download="ServerSettings_FISTILAND.ini" } | **FISTILAND** | Die Einstellungen des FISTILAND-Servers. |
| [ServerSettings_SCUM.ini](downloads/ServerSettings_SCUM.ini){ download="ServerSettings_SCUM.ini" } | **SCUM** | Die Datei, mit der ein neuer Nitrado-Server startet, unverändert. |
| [EconomyOverride_FISTILAND.json](downloads/EconomyOverride_FISTILAND.json){ download="EconomyOverride_FISTILAND.json" } | **FISTILAND** | Händlereinstellungen von FISTILAND: keine Fame-Anforderung, Händler immer mit Ware und Geld, feste Preise. |
| [EconomyOverride_SCUM.json](downloads/EconomyOverride_SCUM.json){ download="EconomyOverride_SCUM.json" } | **SCUM** | Die Händlerdatei mit den Startwerten des Spiels. |
| [SCUM_item_codes_1.3.4.2.txt](downloads/SCUM_item_codes_1.3.4.2.txt){ download="SCUM_item_codes_1.3.4.2.txt" } | **Daten** | Alle 2.572 Item-Codes der Spielversion 1.3.4.2, einer pro Zeile (aus dem Befehl `#ListItems`). |
| [Armory_SCUM_prices_A0.csv](downloads/Armory_SCUM_prices_A0.csv){ download="Armory_SCUM_prices_A0.csv" } | **Daten** | Die Preise des Armory-Händlers im Basisspiel, im Spiel am Außenposten A0 abgelesen (etwa 380 Zeilen). |

:material-alert: Bei allen zum Download angebotenen Dateien wurden Serveradresse, Ports und Passwörter absichtlich entfernt; vergiss nicht, dasselbe zu tun, wenn du deine eigenen Dateien später weitergibst.
