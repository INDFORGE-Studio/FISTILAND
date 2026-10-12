<div class="fl-page-hero fl-bg-d" markdown>

:material-shield-crown:

# Admin-Leitfaden

<p>Alles, was wir beim Betrieb eines SCUM-Servers geprüft haben, an einem Ort. Geschrieben für Spielversion 1.3.4.2.</p>

</div>

<div class="fl-facts">
<div><b>1.3.4.2</b><span>Spielversion</span></div>
<div><b>2.572</b><span>Item-Codes</span></div>
<div><b>7779</b><span>Port für direkte Verbindung (lokal)</span></div>
<div><b>2 Dateien</b><span>Einstellungen + Wirtschaft</span></div>
</div>


## :material-key: Admin werden

Trage deine SteamID64 (17 Ziffern, zu finden auf steamid.io) in `AdminUsers.ini` ein, eine pro Zeile. Die Datei wird beim Start des Servers gelesen, starte den Server also nach der Änderung neu. Danach gibst du die Befehle im Spiel-Chat ein, mit einem `#` davor.

## :material-console: Chat-Befehle

Status: **Getestet** heißt, wir haben den Befehl auf unserem Server ausgeführt. **Gemeldet** heißt, ein öffentlicher Leitfaden beschreibt ihn und wir haben ihn nicht getestet.

| Befehl | Was er macht | Status |
|---|---|---|
| `#ListPlayers` | Listet die Spieler online auf. | Getestet |
| `#ListItems` | Gibt alle Item-Codes deiner Spielversion (2.572 in 1.3.4.2) in der Logdatei des Spiels aus. | Getestet |
| `#spawnitem Apple`, `#spawnitem Water_05l` | Gibt dir ein Item anhand seines Codes. | Getestet |
| `#SetCurrencyBalance Normal 10000 Spielername` | Setzt das Geld eines Spielers. | Getestet |
| `#ChangeCurrencyBalance Gold 5 Spielername` | Ändert das Gold eines Spielers. | Getestet |
| `#NightBrightness 1` | Helligkeit der Nacht, von 0 (dunkel) bis 1 (hell). Nur für dich, nicht für den ganzen Server. | Getestet |
| `#SetTime 12` | Setzt die Tageszeit, von 0 bis 24. | Getestet |
| `#ListZombies`, `#ListAnimals` | Listet die Zombie- und Tiertypen auf. | Getestet |
| `#ListSpawnedVehicles`, `#ListSpawnedArmedNPCs` | Listet, was in der Welt lebt. Das Ergebnis erscheint nur im Chat, nicht im Log. | Getestet |
| `#MapTeleport` | Teleport über die Karte. | Aufgelistet, nicht getestet |
| `#SetImmortality true` / `false` | Schadensimmunität an, dann aus. | Gemeldet |
| `#SetFamePoints 500 Spielername` | Setzt die Fame Points eines Spielers. | Gemeldet |
| `#SetGodMode` | Sofortiges Bauen, keine Unverwundbarkeit. | Gemeldet |
| `#heal` | Gibt es in 1.3.4.2 nicht. | Nicht verfügbar |

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

Jede Datei gibt es in zwei Versionen, damit du sie vergleichen kannst. **FISTILAND** ist die Datei, die unser Server benutzt. **Standard** ist der Ausgangspunkt, wenn du bei null anfangen willst.

| Datei | Welche | Was es ist |
|---|---|---|
| [ServerSettings_FISTILAND.ini](downloads/ServerSettings_FISTILAND.ini) | **Unsere** | Die Einstellungen des FISTILAND-Servers. |
| [ServerSettings_Nitrado-default.ini](downloads/ServerSettings_Nitrado-default.ini) | **Standard** | Die Datei, mit der ein neuer Nitrado-Server startet, unverändert. |
| [EconomyOverride_FISTILAND.json](downloads/EconomyOverride_FISTILAND.json) | **Unsere** | Händlereinstellungen von FISTILAND: keine Fame-Anforderung, Händler immer mit Ware und Geld, feste Preise. |
| [EconomyOverride_game-default.json](downloads/EconomyOverride_game-default.json) | **Standard** | Die Händlerdatei mit den Startwerten des Spiels. |

Serveradresse, Ports und Passwort sind aus diesen Kopien entfernt. Behalte beim Hochladen deine eigenen.
