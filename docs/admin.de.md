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

Status: **Gültig** heißt, wir haben im Spiel geprüft, dass er funktioniert. **Ungeprüft** heißt, ein öffentlicher Leitfaden oder das Spiel nennt ihn, aber wir haben ihn im Spiel nicht geprüft. In den Beispielen sind Beträge, Spielername und Item-Codes nur Beispiele: ändere sie nach Bedarf.

| Befehl | Status | Was er macht |
|---|---|---|
| `#ListPlayers` | <span class="fl-st fl-st-ok">:material-check-decagram: Gültig</span> | Listet die Spieler online auf. |
| `#ListItems` | <span class="fl-st fl-st-ok">:material-check-decagram: Gültig</span> | Gibt alle Item-Codes deiner Spielversion (2.572 in 1.3.4.2) in der Logdatei des Spiels aus. |
| `#spawnitem Apple`<br>`#spawnitem Water_05l` | <span class="fl-st fl-st-ok">:material-check-decagram: Gültig</span> | Gibt dir ein Item anhand seines Codes. Nimm einen beliebigen Code aus der Item-Liste (siehe Downloads unten). |
| `#SetCurrencyBalance Normal 10000 Spielername` | <span class="fl-st fl-st-ok">:material-check-decagram: Gültig</span> | Setzt das Geld eines Spielers. `Normal` ist das normale Geld und `10000` der Betrag: ändere ihn auf jede Zahl (500, 100000 ...). |
| `#ChangeCurrencyBalance Gold 5 Spielername` | <span class="fl-st fl-st-ok">:material-check-decagram: Gültig</span> | Ändert das Gold eines Spielers. `Gold` ist die Währung und `5` der Betrag: ändere ihn nach Belieben. |
| `#NightBrightness 1` | <span class="fl-st fl-st-ok">:material-check-decagram: Gültig</span> | Helligkeit der Nacht, von 0 (dunkel) bis 1 (hell). Nur für dich, nicht für den ganzen Server. |
| `#SetTime 12` | <span class="fl-st fl-st-ok">:material-check-decagram: Gültig</span> | Setzt die Tageszeit, von 0 bis 24. |
| `#ListZombies`<br>`#ListAnimals` | <span class="fl-st fl-st-ok">:material-check-decagram: Gültig</span> | Listet die Zombie- und Tiertypen auf. |
| `#ListSpawnedVehicles`<br>`#ListSpawnedArmedNPCs` | <span class="fl-st fl-st-ok">:material-check-decagram: Gültig</span> | Listet, was in der Welt lebt. Das Ergebnis erscheint nur im Chat, nicht im Log. |
| `#MapTeleport` | <span class="fl-st fl-st-rep">:material-help-circle-outline: Ungeprüft</span> | Teleport über die Karte. |
| `#SetImmortality true`<br>`#SetImmortality false` | <span class="fl-st fl-st-rep">:material-help-circle-outline: Ungeprüft</span> | Schadensimmunität an, dann aus. |
| `#SetFamePoints 500 Spielername` | <span class="fl-st fl-st-rep">:material-help-circle-outline: Ungeprüft</span> | Setzt die Fame Points eines Spielers. |
| `#SetGodMode` | <span class="fl-st fl-st-rep">:material-help-circle-outline: Ungeprüft</span> | Sofortiges Bauen, keine Unverwundbarkeit. |

## :material-monitor: Einen SCUM-Server starten und betreiben: auf einem gemieteten Server oder lokal

Die beiden Einstellungsdateien funktionieren überall gleich: Der Server liest sie beim Start. Stoppe also den Server, ersetze die Dateien und starte ihn neu.

### Gemieteter Server

Lade bei einem gemieteten Server deine `ServerSettings.ini` und `EconomyOverride.json` über die Datei- oder Einstellungsseite des Anbieters hoch, während der Server gestoppt ist, und starte ihn dann neu. Die Oberflächen unterscheiden sich je nach Anbieter; schau in die Hilfe deines Anbieters, wo die Dateien hingehören.

### Lokaler Server [kostenlos]

Ein lokaler Server auf deinem eigenen PC erlaubt es dir zum Beispiel, kostenlos online mit deinen Freunden zu spielen oder sogar deine Einstellungen und/oder Preise auszuprobieren, bevor ein größerer Server online geht:

1. Installiere in Steam das kostenlose Tool **SCUM Server**.
2. Kopiere deine `ServerSettings.ini` und `EconomyOverride.json` in den Ordner `SCUM\Saved\Config\WindowsServer` des Tools. Gib deinem Server einen Namen, damit du ihn erkennst (wir haben bei unserem `[TEST]` ergänzt).
3. Starte `SCUMServer.exe -log -port=7777` aus `SCUM\Binaries\Win64`. Das Laden der Karte dauert etwa zwei Minuten.
4. Öffne im Spiel das Feld für die direkte Verbindung und gib `127.0.0.1:7779` ein. So hat es bei uns mit einem Server funktioniert, der mit `-port=7777` gestartet wurde: Der Verbindungsport war 7779, also zwei mehr als der Spielport, und 7777 schlug fehl. Getestet auf demselben PC wie das Spiel; bei einem anderen `-port`-Wert kann der Port abweichen.
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

Jede Datei gibt es in zwei Versionen, damit du sie vergleichen kannst. **FISTILAND** sind die Versionen, die unser Server benutzt. Und **SCUM** sind die Versionen so, wie das Spiel sie standardmäßig liefert, und damit auch ein guter Ausgangspunkt, wenn du bei null anfangen willst.

| Datei | Welche | Was es ist |
|---|---|---|
| [ServerSettings_FISTILAND.ini](downloads/ServerSettings_FISTILAND.ini){ download="ServerSettings_FISTILAND.ini" } | <span class="fl-st fl-wh-fl">:material-shield-star: FISTILAND</span> | Die Einstellungen des FISTILAND-Servers. |
| [ServerSettings_SCUM.ini](downloads/ServerSettings_SCUM.ini){ download="ServerSettings_SCUM.ini" } | <span class="fl-st fl-wh-sc">:material-gamepad-variant: SCUM</span> | Die Datei, mit der ein neuer gemieteter Server startet, unverändert. |
| [EconomyOverride_FISTILAND.json](downloads/EconomyOverride_FISTILAND.json){ download="EconomyOverride_FISTILAND.json" } | <span class="fl-st fl-wh-fl">:material-shield-star: FISTILAND</span> | Händlereinstellungen von FISTILAND: keine Fame-Anforderung, Händler immer mit Ware und Geld, feste Preise. |
| [EconomyOverride_SCUM.json](downloads/EconomyOverride_SCUM.json){ download="EconomyOverride_SCUM.json" } | <span class="fl-st fl-wh-sc">:material-gamepad-variant: SCUM</span> | Die Händlerdatei mit den Startwerten des Spiels. |
| [SCUM_item_codes_1.3.4.2.txt](downloads/SCUM_item_codes_1.3.4.2.txt){ download="SCUM_item_codes_1.3.4.2.txt" } | <span class="fl-st fl-wh-da">:material-database: Daten</span> | Alle 2.572 Item-Codes der Spielversion 1.3.4.2, einer pro Zeile (aus dem Befehl `#ListItems`). |
| [Armory_SCUM_prices_A0.csv](downloads/Armory_SCUM_prices_A0.csv){ download="Armory_SCUM_prices_A0.csv" } | <span class="fl-st fl-wh-da">:material-database: Daten</span> | Die Preise des Armory-Händlers im Basisspiel, im Spiel am Außenposten A0 abgelesen (etwa 380 Zeilen). |

:material-alert: Bei allen zum Download angebotenen Dateien wurden Serveradresse, Ports und Passwörter absichtlich entfernt; vergiss nicht, dasselbe zu tun, wenn du deine eigenen Dateien später weitergibst.
