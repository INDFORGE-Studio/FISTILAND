<div class="fl-page-hero fl-bg-d" markdown>

:material-gavel:

# Zasady

<p>Fair play przede wszystkim: bez celownika, bez pakietów pay-to-win.</p>

</div>

<div class="fl-facts">
<div><b>14</b><span>Miejsc</span></div>
<div><b>1. + 3.</b><span>Dozwolone widoki</span></div>
<div><b>Wył.</b><span>Celownik</span></div>
<div><b>x1.3</b><span>Obrażenia między graczami</span></div>
</div>


## :material-gavel: Zasady dla graczy

- **Statki powietrzne** służą wyłącznie do przemieszczania się. Rajdy przy użyciu statku powietrznego są zabronione.
- **Miny** służą wyłącznie do obrony twojej bazy.

Te dwie zasady nie są ustawieniami serwera: opierają się na tym, że gracze je przestrzegają.

## :material-eye: Widok i interfejs

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `AllowFirstPerson` | True | Widok z pierwszej osoby jest dozwolony. |
| `AllowThirdPerson` | True | Trzecia osoba jest dozwolona: gracze mogą przełączać się między pierwszą a trzecią osobą. |
| `AllowCrosshair` | False | Brak celownika. |
| `AllowMapScreen` | True | Ekran mapy jest dostępny. |
| `HideKillNotification` | True | Gracze nie widzą powiadomienia, gdy ktoś kogoś zabije. |
| `HideQuickAccessBar`, `HideLifeIndicators` | False | Oba elementy interfejsu są wyświetlane. |

## :material-sword-cross: Walka

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `HumanToHumanDamageMultiplier` | 1.3 | Obrażenia między graczami. |
| `HumanToHumanArmedMeleeDamageMultiplier` | 1.3 | Obrażenia bronią białą między graczami. |
| `HumanToHumanUnarmedMeleeDamageMultiplier` | 1 | Obrażenia bez broni między graczami. |
| `HumanToHumanThrowingDamageMultiplier` | 1.3 | Obrażenia bronią miotaną między graczami. |
| `AllowMinesAndTraps` | True | Miny i pułapki są dozwolone. |
| `AllowComa` | True | Gracze mogą wpaść w śpiączkę przed śmiercią. |
| `AllowKillClaiming` | True | BCU wypada, gdy gracz zostanie zabity. |
| `LogSuicides` | True | Samobójstwa są rejestrowane. |

## :material-logout: Wylogowanie i ochrona

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `LogoutTimer` | 120 | Sekundy, zanim gracz, który się wylogował, opuści świat. |
| `LogoutTimerWhileCaptured` | 120 | To samo dla związanego gracza. |
| `EnableNewPlayerProtection` | True | Nowi gracze są chronieni na starcie. |
| `NewPlayerProtectionDuration` | 120 | Długość ochrony. |
| `PlaySafeIdProtection` | False | Dołączenie nie wymaga PlaySafe ID. |

## :material-account: Postacie

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `DeleteInactiveUsers` | False | Nieaktywne postacie nigdy nie są usuwane. |
| `DaysSinceLastLoginToBecomeInactive` | 30 | Dni bez logowania, po których gracz jest uznawany za nieaktywnego. |
| `DeleteBannedUsers` | False | Postacie z banem są zachowywane. |

## :material-cash-remove: Pakiety

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `EnableDigitalDeluxeStarterPack` | False | Deluxe Survival Pack nie może być użyty. |
| `EnableDigitalDeluxeFreeGoldCard` | False | Darmowa złota karta z tego pakietu nie może zostać odebrana. |

## :material-server: Serwer

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `MaxPlayers` | 14 | Miejsca dla graczy. |
| `ServerPlaystyle` | PVP | Deklarowany styl gry. |
| `MaxServerTickRate` | 35 | Aktualizacje serwera na sekundę przy graczach online. |
| `MinServerTickRate` | 5 | Aktualizacje serwera na sekundę, gdy jest pusty. |
| `MaxPingCheckEnabled` | True | Gracze z wysokim pingiem są usuwani. |
| `MaxPing` | 300 | Najwyższy dozwolony ping w milisekundach. |
| `MaxNumberOfConsecutiveHighPingReadings` | 5 | Złe odczyty z rzędu przed usunięciem. |
| `WelcomeMessage` | FISTILAND PvP SERVER | Wyświetlana po dołączeniu gracza. |
| `MessageOfTheDay` | More information on indforge-studio.github.io/FISTILAND | Wiadomość powtarzana na czacie. |
| `MessageOfTheDayCooldown` | 30 | Minuty między dwoma powtórzeniami. |
| `AllowGlobalChat`, `AllowLocalChat`, `AllowSquadChat`, `AllowAdminChat` | True | Wszystkie kanały czatu są otwarte. |
| `LimitGlobalChat` | False | Czat globalny nie ma ograniczeń. |

---

[Wszystkie strony ustawień serwera](overview.md#every-setting-explained) | [Pełna lista wartości](all-settings.md)
