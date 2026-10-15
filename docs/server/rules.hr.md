<div class="fl-page-hero fl-bg-d" markdown>

:material-gavel:

# Pravila

<p>Fer igra na prvom mjestu: bez nišana, bez pay-to-win paketa.</p>

</div>

<div class="fl-facts">
<div><b>14</b><span>Mjesta</span></div>
<div><b>1. + 3.</b><span>Dopušteni pogledi</span></div>
<div><b>Isklj.</b><span>Nišan</span></div>
<div><b>x1.3</b><span>Šteta među igračima</span></div>
</div>


## :material-gavel: Pravila za igrače

- **Zrakoplovi** služe samo za kretanje. Napadanje zrakoplovom nije dopušteno.
- **Mine** služe samo za obranu tvoje baze.

Ova dva pravila nisu postavke poslužitelja: oslanjaju se na to da ih igrači poštuju.

## :material-eye: Pogled i sučelje

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `AllowFirstPerson` | True | Pogled iz prvog lica je dopušten. |
| `AllowThirdPerson` | True | Treće lice je dopušteno: igrači mogu prebacivati između prvog i trećeg lica. |
| `AllowCrosshair` | False | Nema nišana. |
| `AllowMapScreen` | True | Zaslon karte je dostupan. |
| `HideKillNotification` | True | Igrači ne vide obavijest kad netko ubije nekoga. |
| `HideQuickAccessBar`, `HideLifeIndicators` | False | Oba elementa sučelja su prikazana. |

## :material-sword-cross: Borba

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `HumanToHumanDamageMultiplier` | 1.3 | Šteta među igračima. |
| `HumanToHumanArmedMeleeDamageMultiplier` | 1.3 | Šteta hladnim oružjem među igračima. |
| `HumanToHumanUnarmedMeleeDamageMultiplier` | 1 | Šteta golim rukama među igračima. |
| `HumanToHumanThrowingDamageMultiplier` | 1.3 | Šteta bacačkim oružjem među igračima. |
| `AllowMinesAndTraps` | True | Mine i zamke su dopuštene. |
| `AllowComa` | True | Igrači mogu pasti u komu prije smrti. |
| `AllowKillClaiming` | True | BCU ispada kad je igrač ubijen. |
| `LogSuicides` | True | Samoubojstva se bilježe. |

## :material-logout: Odjava i zaštita

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `LogoutTimer` | 120 | Sekunde prije nego igrač koji se odjavi napusti svijet. |
| `LogoutTimerWhileCaptured` | 120 | Isto, za svezanog igrača. |
| `EnableNewPlayerProtection` | True | Novi igrači su zaštićeni na početku. |
| `NewPlayerProtectionDuration` | 120 | Trajanje zaštite. |
| `PlaySafeIdProtection` | False | Pridruživanje ne zahtijeva PlaySafe ID. |

## :material-account: Likovi

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `DeleteInactiveUsers` | False | Neaktivni likovi se nikad ne brišu. |
| `DaysSinceLastLoginToBecomeInactive` | 30 | Dani bez prijave nakon kojih se igrač smatra neaktivnim. |
| `DeleteBannedUsers` | False | Likovi s banom se čuvaju. |

## :material-cash-remove: Paketi

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `EnableDigitalDeluxeStarterPack` | False | Deluxe Survival Pack ne može se koristiti. |
| `EnableDigitalDeluxeFreeGoldCard` | False | Besplatna zlatna kartica iz tog paketa ne može se preuzeti. |

## :material-server: Poslužitelj

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `MaxPlayers` | 14 | Mjesta za igrače. |
| `ServerPlaystyle` | PVP | Deklarirani stil igre. |
| `MaxServerTickRate` | 35 | Ažuriranja poslužitelja u sekundi s igračima na mreži. |
| `MinServerTickRate` | 5 | Ažuriranja poslužitelja u sekundi kad je prazan. |
| `MaxPingCheckEnabled` | True | Igrači s visokim pingom se uklanjaju. |
| `MaxPing` | 300 | Najviši dopušteni ping u milisekundama. |
| `MaxNumberOfConsecutiveHighPingReadings` | 5 | Loša mjerenja zaredom prije uklanjanja. |
| `WelcomeMessage` | FISTILAND PvP SERVER | Prikazuje se pri ulasku igrača. |
| `MessageOfTheDay` | More information on indforge-studio.github.io/FISTILAND | Poruka koja se ponavlja u chatu. |
| `MessageOfTheDayCooldown` | 30 | Minute između dva ponavljanja. |
| `AllowGlobalChat`, `AllowLocalChat`, `AllowSquadChat`, `AllowAdminChat` | True | Svi chat kanali su otvoreni. |
| `LimitGlobalChat` | False | Globalni chat nema ograničenja. |

---

[Sve stranice postavki poslužitelja](overview.md#every-setting-explained) | [Potpuni popis vrijednosti](all-settings.md)

--8<-- "abbr.hr.md"
