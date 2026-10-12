<div class="fl-page-hero fl-bg-d" markdown>

:material-shield-crown:

# Guida admin

<p>Tutto ciò che abbiamo verificato gestendo un server SCUM</p>

</div>

<div class="fl-facts">
<div><b>1.3.4.2</b><span>Versione del gioco</span></div>
<div><b>2.572</b><span>Codici oggetto</span></div>
<div><b>7779</b><span>Porta di connessione diretta (locale)</span></div>
<div><b>6 file</b><span>Da scaricare</span></div>
</div>


## :material-key: Diventare admin

Aggiungi il tuo SteamID64 (17 cifre, si trova su steamid.io) in `AdminUsers.ini`, uno per riga. Il file viene letto all'avvio del server, quindi riavvialo dopo la modifica. Poi scrivi i comandi nella chat di gioco, con un `#` davanti.

## :material-console: Comandi della chat

Stato: **Testato** significa che l'abbiamo eseguito sul nostro server. **Segnalato** significa che una guida pubblica lo descrive e che non l'abbiamo testato. Negli esempi, gli importi, il nome del giocatore e i codici oggetto sono solo esempi: cambiali a seconda di ciò che ti serve.

| Comando | Stato | Cosa fa |
|---|---|---|
| `#ListPlayers` | Testato | Elenca i giocatori online. |
| `#ListItems` | Testato | Scrive tutti i codici oggetto della tua versione (2.572 in 1.3.4.2) nel log del gioco. |
| `#spawnitem Apple`<br>`#spawnitem Water_05l` | Testato | Ti dà un oggetto dal suo codice. Usa qualsiasi codice dell'elenco oggetti (vedi i download qui sotto). |
| `#SetCurrencyBalance Normal 10000 NomeGiocatore` | Testato | Imposta i soldi di un giocatore. `Normal` è il denaro normale e `10000` l'importo: cambialo con il numero che vuoi (500, 100000...). |
| `#ChangeCurrencyBalance Gold 5 NomeGiocatore` | Testato | Cambia l'oro di un giocatore. `Gold` è la valuta e `5` l'importo: cambialo come vuoi. |
| `#NightBrightness 1` | Testato | Luminosità della notte, da 0 (buio) a 1 (chiaro). Solo per te, non per tutto il server. |
| `#SetTime 12` | Testato | Imposta l'ora del giorno, da 0 a 24. |
| `#ListZombies`<br>`#ListAnimals` | Testato | Elenca i tipi di zombie e di animali. |
| `#ListSpawnedVehicles`<br>`#ListSpawnedArmedNPCs` | Testato | Elenca ciò che è vivo nel mondo. Il risultato appare solo nella chat, non nel log. |
| `#MapTeleport` | In elenco, non testato | Teletrasporto tramite la mappa. |
| `#SetImmortality true`<br>`#SetImmortality false` | Segnalato | Immunità ai danni, attivata e poi disattivata. |
| `#SetFamePoints 500 NomeGiocatore` | Segnalato | Imposta i punti fama di un giocatore. |
| `#SetGodMode` | Segnalato | Costruzione istantanea, non invulnerabilità. |
| `#heal` | Non disponibile | Non esiste in 1.3.4.2. |

## :material-monitor: Avviare e gestire un server SCUM: su uno dedicato o in locale gratis

1. In Steam, installa lo strumento gratuito **SCUM Server**.
2. Copia il tuo `ServerSettings.ini` e il tuo `EconomyOverride.json` nella cartella `SCUM\Saved\Config\WindowsServer` dello strumento. Aggiungi `[TEST]` al nome del server per riconoscerlo.
3. Avvia `SCUMServer.exe -log -port=7777` da `SCUM\Binaries\Win64`. Il caricamento della mappa richiede circa due minuti.
4. Nel gioco, apri la casella di connessione diretta e inserisci `127.0.0.1:7779`. Con noi ha funzionato con un server avviato con `-port=7777`: la porta di connessione era la 7779, due in più della porta di gioco, e la 7777 non funzionava. Testato sullo stesso PC del gioco; con un altro valore di `-port`, la porta può cambiare.
5. Ferma il server con Ctrl+C nella sua finestra.

Il log del server è `SCUM\Saved\Logs\SCUM.log` nella cartella dello strumento. Il log del tuo gioco, dove compaiono i risultati dei comandi, è in `%LOCALAPPDATA%\SCUM\Saved\Logs`.

## :material-file-cog: File delle impostazioni

| File | Cosa contiene |
|---|---|
| `ServerSettings.ini` | Tutte le impostazioni del server (440 chiavi, testo ASCII). |
| `EconomyOverride.json` | Impostazioni dei mercanti e prezzi per oggetto. Ogni valore è scritto come testo tra virgolette. |
| `AdminUsers.ini` | Gli admin, un SteamID64 per riga. |

Vedi le [pagine delle impostazioni](server/overview.md) per cosa fa ogni valore su FISTILAND.

## :material-download: Scaricare i file di configurazione

Ogni file esiste in due versioni, così puoi confrontarle. **FISTILAND** sono le versioni che usa il nostro server. E **SCUM** sono le versioni così come le fornisce il gioco per impostazione predefinita, e quindi anche un buon punto di partenza per ricominciare da zero.

| File | Quale | Cos'è |
|---|---|---|
| [ServerSettings_FISTILAND.ini](downloads/ServerSettings_FISTILAND.ini){ download="ServerSettings_FISTILAND.ini" } | **FISTILAND** | Le impostazioni del server FISTILAND. |
| [ServerSettings_SCUM.ini](downloads/ServerSettings_SCUM.ini){ download="ServerSettings_SCUM.ini" } | **SCUM** | Il file con cui parte un nuovo server Nitrado, intatto. |
| [EconomyOverride_FISTILAND.json](downloads/EconomyOverride_FISTILAND.json){ download="EconomyOverride_FISTILAND.json" } | **FISTILAND** | Impostazioni dei mercanti di FISTILAND: nessun requisito di fama, mercanti sempre riforniti e con fondi, prezzi fissi. |
| [EconomyOverride_SCUM.json](downloads/EconomyOverride_SCUM.json){ download="EconomyOverride_SCUM.json" } | **SCUM** | Il file dei mercanti con i valori iniziali del gioco. |
| [SCUM_item_codes_1.3.4.2.txt](downloads/SCUM_item_codes_1.3.4.2.txt){ download="SCUM_item_codes_1.3.4.2.txt" } | **Dati** | I 2.572 codici oggetto della versione 1.3.4.2 del gioco, uno per riga (dal comando `#ListItems`). |
| [Armory_SCUM_prices_A0.csv](downloads/Armory_SCUM_prices_A0.csv){ download="Armory_SCUM_prices_A0.csv" } | **Dati** | I prezzi del mercante Armory del gioco base, letti in gioco all'avamposto A0 (circa 380 righe). |

:material-alert: In tutti i file disponibili per il download, l'indirizzo del server, le porte e le password sono stati rimossi di proposito; non dimenticare di fare lo stesso se poi condividi i tuoi file.
