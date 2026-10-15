<div class="fl-page-hero fl-bg-d" markdown>

:material-shield-crown:

# Poradnik administratora

<p>Wszystko, co sprawdziliśmy, prowadząc serwer SCUM</p>

</div>

<div class="fl-facts">
<div><b>1.3.4.2</b><span>Wersja gry</span></div>
<div><b>2 572</b><span>Kody przedmiotów</span></div>
<div><b>7779</b><span>Port bezpośredniego połączenia (lokalnie)</span></div>
<div><b>6 plików</b><span>Do pobrania</span></div>
</div>


## :material-key: Zostań adminem

Dodaj swój SteamID64 (17 cyfr, znajdziesz go na steamid.io) do `AdminUsers.ini`, po jednym w wierszu. Plik jest odczytywany przy starcie serwera, więc po edycji zrestartuj serwer. Następnie wpisuj polecenia na czacie w grze, zaczynając od `#`.

## :material-console: Polecenia czatu

Status: **Valid** oznacza, że sprawdziliśmy w grze, że działa. **Unverified** oznacza, że polecenie wymienia publiczny poradnik lub gra, ale nie sprawdziliśmy go w grze. W przykładach kwoty, nazwa gracza i kody przedmiotów są tylko przykładami: zmień je według potrzeb.

| Polecenie | Status | Co robi |
|---|---|---|
| `#ListPlayers` | <span class="fl-st fl-st-ok">:material-check-decagram: Valid</span> | Wyświetla graczy online. |
| `#ListItems` | <span class="fl-st fl-st-ok">:material-check-decagram: Valid</span> | Zapisuje w pliku logu gry każdy kod przedmiotu twojej wersji gry (2 572 w 1.3.4.2). |
| `#spawnitem Apple`<br>`#spawnitem Water_05l` | <span class="fl-st fl-st-ok">:material-check-decagram: Valid</span> | Daje ci przedmiot według jego kodu. Użyj dowolnego kodu z listy przedmiotów (zobacz pliki do pobrania poniżej). |
| `#SetCurrencyBalance Normal 10000 PlayerName` | <span class="fl-st fl-st-ok">:material-check-decagram: Valid</span> | Ustawia pieniądze gracza. `Normal` to zwykła waluta, a `10000` to kwota: zmień ją na dowolną liczbę (500, 100000...). |
| `#ChangeCurrencyBalance Gold 5 PlayerName` | <span class="fl-st fl-st-ok">:material-check-decagram: Valid</span> | Zmienia złoto gracza. `Gold` to waluta, a `5` to kwota: zmień ją według uznania. |
| `#NightBrightness 1` | <span class="fl-st fl-st-ok">:material-check-decagram: Valid</span> | Jasność nocy, od 0 (ciemno) do 1 (jasno). Tylko dla ciebie, nie dla całego serwera. |
| `#SetTime 12` | <span class="fl-st fl-st-ok">:material-check-decagram: Valid</span> | Ustawia porę dnia, od 0 do 24. |
| `#ListZombies`<br>`#ListAnimals` | <span class="fl-st fl-st-ok">:material-check-decagram: Valid</span> | Wyświetla typy zombie i zwierząt. |
| `#ListSpawnedVehicles`<br>`#ListSpawnedArmedNPCs` | <span class="fl-st fl-st-ok">:material-check-decagram: Valid</span> | Wyświetla to, co żyje w świecie. Wynik pokazuje się tylko na czacie, nie w logu. |
| `#MapTeleport` | <span class="fl-st fl-st-rep">:material-help-circle-outline: Unverified</span> | Teleportacja przez mapę. |
| `#SetImmortality true`<br>`#SetImmortality false` | <span class="fl-st fl-st-rep">:material-help-circle-outline: Unverified</span> | Odporność na obrażenia włączona, potem wyłączona. |
| `#SetFamePoints 500 PlayerName` | <span class="fl-st fl-st-rep">:material-help-circle-outline: Unverified</span> | Ustawia punkty sławy gracza. |
| `#SetGodMode` | <span class="fl-st fl-st-rep">:material-help-circle-outline: Unverified</span> | Natychmiastowa budowa, a nie nietykalność. |

## :material-monitor: Uruchomienie serwera SCUM: na serwerze hostowanym lub lokalnie

Dwa pliki ustawień działają wszędzie tak samo: serwer odczytuje je przy starcie, więc zatrzymaj serwer, podmień pliki, a potem uruchom go ponownie.

### Serwer hostowany

Na wynajętym serwerze prześlij swoje `ServerSettings.ini` i `EconomyOverride.json` przez stronę plików lub ustawień hostingu, gdy serwer jest zatrzymany, a potem uruchom go ponownie. Ekrany różnią się w zależności od hostingu, więc sprawdź w pomocy swojego hostingu, gdzie trafiają pliki.

### Serwer lokalny [za darmo]

Serwer lokalny na własnym komputerze pozwala na przykład grać online za darmo ze znajomymi, a nawet wypróbować ustawienia i/lub ceny, zanim uruchomisz większy serwer:

1. W Steamie zainstaluj darmowe narzędzie **SCUM Server**.
2. Skopiuj swoje `ServerSettings.ini` i `EconomyOverride.json` do folderu `SCUM\Saved\Config\WindowsServer` narzędzia. Nadaj serwerowi nazwę, aby łatwo go dostrzec (do naszego dodaliśmy `[TEST]`).
3. Uruchom `SCUMServer.exe -log -port=7777` z `SCUM\Binaries\Win64`. Wczytanie mapy zajmuje około dwóch minut.
4. W grze otwórz okno bezpośredniego połączenia i wpisz `127.0.0.1:7779`. U nas zadziałało to z serwerem uruchomionym z `-port=7777`: port połączenia to 7779, dwa więcej niż port gry, a wpisanie 7777 nie działało. Testowane na tym samym komputerze co gra; przy innej wartości `-port` port może być inny.
5. Zatrzymaj serwer klawiszami Ctrl+C w jego oknie.

Log serwera to `SCUM\Saved\Logs\SCUM.log` w folderze narzędzia. Twój własny log gry, w którym widać wyniki poleceń, znajduje się w `%LOCALAPPDATA%\SCUM\Saved\Logs`.

## :material-file-cog: Pliki ustawień

| Plik | Co zawiera |
|---|---|
| `ServerSettings.ini` | Wszystkie ustawienia serwera (440 kluczy, tekst ASCII). |
| `EconomyOverride.json` | Ustawienia handlarzy i ceny poszczególnych przedmiotów. Każda wartość jest zapisana jako tekst w cudzysłowie. |
| `AdminUsers.ini` | Admini, po jednym SteamID64 w wierszu. |

Zobacz [strony ustawień](server/overview.md), aby dowiedzieć się, co robi każda wartość na FISTILAND.

## :material-download: Pobierz pliki konfiguracyjne

Każdy plik występuje w dwóch wersjach, abyś mógł je porównać. **FISTILAND** to wersje używane przez nasz serwer. A **SCUM** to wersje takie, jakie gra dostarcza domyślnie, więc także dobry punkt wyjścia, jeśli chcesz zacząć od zera.

| Plik | Która | Czym jest |
|---|---|---|
| [ServerSettings_FISTILAND.ini](downloads/ServerSettings_FISTILAND.ini){ download="ServerSettings_FISTILAND.ini" } | <span class="fl-st fl-wh-fl">:material-shield-star: FISTILAND</span> | Ustawienia serwera FISTILAND. |
| [ServerSettings_SCUM.ini](downloads/ServerSettings_SCUM.ini){ download="ServerSettings_SCUM.ini" } | <span class="fl-st fl-wh-sc">:material-gamepad-variant: SCUM</span> | Ustawienia domyślne. |
| [EconomyOverride_FISTILAND.json](downloads/EconomyOverride_FISTILAND.json){ download="EconomyOverride_FISTILAND.json" } | <span class="fl-st fl-wh-fl">:material-shield-star: FISTILAND</span> | Ustawienia handlarzy FISTILAND: bez wymagań sławy, handlarze zawsze zaopatrzeni i z gotówką, stałe ceny. |
| [EconomyOverride_SCUM.json](downloads/EconomyOverride_SCUM.json){ download="EconomyOverride_SCUM.json" } | <span class="fl-st fl-wh-sc">:material-gamepad-variant: SCUM</span> | Plik handlarzy z wartościami, z którymi startuje gra. |
| [SCUM_item_codes_1.3.4.2.txt](downloads/SCUM_item_codes_1.3.4.2.txt){ download="SCUM_item_codes_1.3.4.2.txt" } | <span class="fl-st fl-wh-da">:material-database: Data</span> | Wszystkie 2 572 kody przedmiotów gry w wersji 1.3.4.2, po jednym w wierszu (z polecenia `#ListItems`). |
| [Armory_SCUM_prices_A0.csv](downloads/Armory_SCUM_prices_A0.csv){ download="Armory_SCUM_prices_A0.csv" } | <span class="fl-st fl-wh-da">:material-database: Data</span> | Ceny handlarza Armory z gry podstawowej, odczytane w grze na posterunku A0 (około 380 wierszy). |

:material-alert: Ze wszystkich plików dostępnych do pobrania celowo usunięto adres serwera, porty i hasła; nie zapomnij zrobić tego samego, jeśli później udostępnisz własne pliki.
