<div class="fl-page-hero fl-bg-d" markdown>

:material-shield-crown:

# Vodič za administratore

<p>Sve što smo provjerili vodeći SCUM poslužitelj</p>

</div>

<div class="fl-facts">
<div><b>1.3.4.2</b><span>Verzija igre</span></div>
<div><b>2.572</b><span>Šifre predmeta</span></div>
<div><b>7779</b><span>Port izravnog spajanja (lokalno)</span></div>
<div><b>6 datoteka</b><span>Za preuzimanje</span></div>
</div>


## :material-key: Postani admin

Dodaj svoj SteamID64 (17 znamenki, pronađi ga na steamid.io) u `AdminUsers.ini`, po jedan u svaki redak. Datoteka se čita pri pokretanju poslužitelja, pa ga nakon uređivanja ponovno pokreni. Zatim upisuj naredbe u chat u igri s `#` na početku.

## :material-console: Naredbe u chatu

Status: **Valid** znači da smo u igri provjerili da radi. **Unverified** znači da je naredbu naveo javni vodič ili igra, ali je nismo provjerili u igri. U primjerima su iznosi, ime igrača i šifre predmeta samo primjeri: promijeni ih prema potrebi.

| Naredba | Status | Što radi |
|---|---|---|
| `#ListPlayers` | <span class="fl-st fl-st-ok">:material-check-decagram: Valid</span> | Ispisuje igrače na mreži. |
| `#ListItems` | <span class="fl-st fl-st-ok">:material-check-decagram: Valid</span> | Ispisuje svaku šifru predmeta tvoje verzije igre (2.572 na 1.3.4.2) u log datoteku igre. |
| `#spawnitem Apple`<br>`#spawnitem Water_05l` | <span class="fl-st fl-st-ok">:material-check-decagram: Valid</span> | Daje ti predmet prema njegovoj šifri. Koristi bilo koju šifru s popisa predmeta (vidi preuzimanja ispod). |
| `#SetCurrencyBalance Normal 10000 PlayerName` | <span class="fl-st fl-st-ok">:material-check-decagram: Valid</span> | Postavlja novac igrača. `Normal` je obični novac, a `10000` iznos: promijeni ga u bilo koji broj (500, 100000...). |
| `#ChangeCurrencyBalance Gold 5 PlayerName` | <span class="fl-st fl-st-ok">:material-check-decagram: Valid</span> | Mijenja zlato igrača. `Gold` je valuta, a `5` iznos: promijeni ga po želji. |
| `#NightBrightness 1` | <span class="fl-st fl-st-ok">:material-check-decagram: Valid</span> | Svjetlina noći, od 0 (mračno) do 1 (svijetlo). Samo za tebe, ne za cijeli poslužitelj. |
| `#SetTime 12` | <span class="fl-st fl-st-ok">:material-check-decagram: Valid</span> | Postavlja doba dana, od 0 do 24. |
| `#ListZombies`<br>`#ListAnimals` | <span class="fl-st fl-st-ok">:material-check-decagram: Valid</span> | Ispisuje vrste zombija i životinja. |
| `#ListSpawnedVehicles`<br>`#ListSpawnedArmedNPCs` | <span class="fl-st fl-st-ok">:material-check-decagram: Valid</span> | Ispisuje što je živo u svijetu. Rezultat se prikazuje samo u chatu, ne u logu. |
| `#MapTeleport` | <span class="fl-st fl-st-rep">:material-help-circle-outline: Unverified</span> | Teleportiranje preko karte. |
| `#SetImmortality true`<br>`#SetImmortality false` | <span class="fl-st fl-st-rep">:material-help-circle-outline: Unverified</span> | Imunitet na štetu uključen, zatim isključen. |
| `#SetFamePoints 500 PlayerName` | <span class="fl-st fl-st-rep">:material-help-circle-outline: Unverified</span> | Postavlja bodove slave igrača. |
| `#SetGodMode` | <span class="fl-st fl-st-rep">:material-help-circle-outline: Unverified</span> | Trenutna gradnja, a ne neranjivost. |

## :material-monitor: Pokretanje SCUM poslužitelja: na iznajmljenom poslužitelju ili lokalno

Dvije datoteke postavki rade jednako posvuda: poslužitelj ih čita pri pokretanju, pa zaustavi poslužitelj, zamijeni datoteke i ponovno ga pokreni.

### Iznajmljeni poslužitelj

Na iznajmljenom poslužitelju prenesi svoje `ServerSettings.ini` i `EconomyOverride.json` preko stranice datoteka ili postavki svog hostinga dok je poslužitelj zaustavljen, a zatim ga ponovno pokreni. Zasloni se razlikuju od hostinga do hostinga, pa u pomoći svog hostinga provjeri gdje datoteke idu.

### Lokalni poslužitelj [besplatno]

Lokalni poslužitelj na tvom računalu omogućuje ti besplatno igranje online s prijateljima, na primjer, ili čak isprobavanje postavki i/ili cijena prije nego što pustiš veći poslužitelj:

1. U Steamu instaliraj besplatni alat **SCUM Server**.
2. Kopiraj svoje `ServerSettings.ini` i `EconomyOverride.json` u mapu `SCUM\Saved\Config\WindowsServer` alata. Daj poslužitelju ime da ga lakše uočiš (mi smo svojem dodali `[TEST]`).
3. Pokreni `SCUMServer.exe -log -port=7777` iz mape `SCUM\Binaries\Win64`. Učitavanje karte traje oko dvije minute.
4. U igri otvori okvir za izravno spajanje i upiši `127.0.0.1:7779`. To je kod nas radilo s poslužiteljem pokrenutim s `-port=7777`: port za spajanje bio je 7779, dva iznad porta igre, a upis 7777 nije radio. Testirano na istom računalu kao i igra; s drugom vrijednošću `-port` port se može razlikovati.
5. Zaustavi poslužitelj s Ctrl+C u njegovu prozoru.

Log poslužitelja je `SCUM\Saved\Logs\SCUM.log` u mapi alata. Tvoj vlastiti log igre, u kojem se vide rezultati naredbi, nalazi se u `%LOCALAPPDATA%\SCUM\Saved\Logs`.

## :material-file-cog: Datoteke postavki

| Datoteka | Što sadrži |
|---|---|
| `ServerSettings.ini` | Sve postavke poslužitelja (440 ključeva, ASCII tekst). |
| `EconomyOverride.json` | Postavke trgovaca i cijene po predmetu. Svaka vrijednost zapisana je kao tekst u navodnicima. |
| `AdminUsers.ini` | Admini, po jedan SteamID64 u retku. |

Pogledaj [stranice postavki](server/overview.md) da vidiš što svaka vrijednost radi na FISTILAND-u.

## :material-download: Preuzmi konfiguracijske datoteke

Svaka datoteka dolazi u dvije verzije, da ih možeš usporediti. **FISTILAND** su verzije koje koristi naš poslužitelj. A **SCUM** su verzije kakve igra daje prema zadanim postavkama, pa su i dobra polazna točka ako želiš krenuti od nule.

| Datoteka | Koja | Što je |
|---|---|---|
| [ServerSettings_FISTILAND.ini](downloads/ServerSettings_FISTILAND.ini){ download="ServerSettings_FISTILAND.ini" } | <span class="fl-st fl-wh-fl">:material-shield-star: FISTILAND</span> | Postavke FISTILAND poslužitelja. |
| [ServerSettings_SCUM.ini](downloads/ServerSettings_SCUM.ini){ download="ServerSettings_SCUM.ini" } | <span class="fl-st fl-wh-sc">:material-gamepad-variant: SCUM</span> | Zadane postavke. |
| [EconomyOverride_FISTILAND.json](downloads/EconomyOverride_FISTILAND.json){ download="EconomyOverride_FISTILAND.json" } | <span class="fl-st fl-wh-fl">:material-shield-star: FISTILAND</span> | Postavke trgovaca FISTILAND-a: bez zahtjeva za slavom, trgovci uvijek opskrbljeni i s novcem, fiksne cijene. |
| [EconomyOverride_SCUM.json](downloads/EconomyOverride_SCUM.json){ download="EconomyOverride_SCUM.json" } | <span class="fl-st fl-wh-sc">:material-gamepad-variant: SCUM</span> | Datoteka trgovaca s vrijednostima s kojima igra počinje. |
| [SCUM_item_codes_1.3.4.2.txt](downloads/SCUM_item_codes_1.3.4.2.txt){ download="SCUM_item_codes_1.3.4.2.txt" } | <span class="fl-st fl-wh-da">:material-database: Data</span> | Svih 2.572 šifre predmeta igre verzije 1.3.4.2, po jedna u retku (iz naredbe `#ListItems`). |
| [Armory_SCUM_prices_A0.csv](downloads/Armory_SCUM_prices_A0.csv){ download="Armory_SCUM_prices_A0.csv" } | <span class="fl-st fl-wh-da">:material-database: Data</span> | Cijene trgovca Armory iz osnovne igre, pročitane u igri na ispostavi A0 (oko 380 redaka). |

:material-alert: Iz svih datoteka dostupnih za preuzimanje namjerno su uklonjeni adresa poslužitelja, portovi i lozinke; ne zaboravi učiniti isto ako kasnije podijeliš vlastite datoteke.
