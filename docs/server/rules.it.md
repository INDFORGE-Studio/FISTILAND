<div class="fl-page-hero fl-bg-d" markdown>

:material-gavel:

# Regole

<p>Prima di tutto il fair play: solo prima persona, nessun mirino, nessun pacchetto pay-to-win.</p>

</div>

<div class="fl-facts">
<div><b>14</b><span>Slot</span></div>
<div><b>1ª pers.</b><span>Unica visuale</span></div>
<div><b>No</b><span>Mirino</span></div>
<div><b>x1.3</b><span>Danno tra giocatori</span></div>
</div>


## :material-gavel: Regole per i giocatori

- Gli **aerei** servono solo per spostarsi. Fare raid con un aereo non è consentito.
- Le **mine** servono solo per difendere la tua base.

Queste due sono regole, non impostazioni del server: si basano sul rispetto da parte dei giocatori.

## :material-eye: Visuale e interfaccia

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `AllowFirstPerson` | True | La visuale in prima persona è consentita. |
| `AllowThirdPerson` | False | La terza persona è disattivata. |
| `AllowCrosshair` | False | Nessun mirino. |
| `AllowMapScreen` | True | La schermata della mappa è disponibile. |
| `HideKillNotification` | True | I giocatori non vedono una notifica quando qualcuno ne uccide un altro. |
| `HideQuickAccessBar`, `HideLifeIndicators` | False | Entrambi gli elementi dell'interfaccia sono mostrati. |

## :material-sword-cross: Combattimento

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `HumanToHumanDamageMultiplier` | 1.3 | Danno tra giocatori. |
| `HumanToHumanArmedMeleeDamageMultiplier` | 1.3 | Danno delle armi da mischia tra giocatori. |
| `HumanToHumanUnarmedMeleeDamageMultiplier` | 1 | Danno a mani nude tra giocatori. |
| `HumanToHumanThrowingDamageMultiplier` | 1.3 | Danno delle armi da lancio tra giocatori. |
| `AllowMinesAndTraps` | True | Mine e trappole sono consentite. |
| `AllowComa` | True | I giocatori possono cadere in coma prima di morire. |
| `AllowKillClaiming` | True | Cade un BCU quando un giocatore viene ucciso. |
| `LogSuicides` | True | I suicidi vengono registrati. |

## :material-logout: Disconnessione e protezione

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `LogoutTimer` | 120 | Secondi prima che un giocatore che si disconnette lasci il mondo. |
| `LogoutTimerWhileCaptured` | 120 | Lo stesso, per un giocatore legato. |
| `EnableNewPlayerProtection` | True | I nuovi giocatori sono protetti all'inizio. |
| `NewPlayerProtectionDuration` | 120 | Durata della protezione. |
| `PlaySafeIdProtection` | False | Per entrare non serve un ID PlaySafe. |

## :material-account: Personaggi

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `DeleteInactiveUsers` | False | I personaggi inattivi non vengono mai eliminati. |
| `DaysSinceLastLoginToBecomeInactive` | 30 | Giorni senza accesso prima che un giocatore sia considerato inattivo. |
| `DeleteBannedUsers` | False | I personaggi bannati vengono conservati. |

## :material-cash-remove: Pacchetti

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `EnableDigitalDeluxeStarterPack` | False | Il Deluxe Survival Pack non può essere usato. |
| `EnableDigitalDeluxeFreeGoldCard` | False | La carta oro gratuita di quel pacchetto non può essere riscattata. |

## :material-server: Server

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `MaxPlayers` | 14 | Posti per i giocatori. |
| `ServerPlaystyle` | PVP | Stile di gioco dichiarato. |
| `MaxServerTickRate` | 35 | Aggiornamenti del server al secondo con giocatori online. |
| `MinServerTickRate` | 5 | Aggiornamenti del server al secondo quando è vuoto. |
| `MaxPingCheckEnabled` | True | I giocatori con ping alto vengono rimossi. |
| `MaxPing` | 300 | Ping massimo consentito in millisecondi. |
| `MaxNumberOfConsecutiveHighPingReadings` | 5 | Letture cattive consecutive prima della rimozione. |
| `WelcomeMessage` | FISTILAND PvP SERVER | Mostrato quando un giocatore entra. |
| `MessageOfTheDay` | More information on discord.gg/RHkNGk6ZQN | Messaggio ripetuto nella chat. |
| `MessageOfTheDayCooldown` | 30 | Minuti tra due ripetizioni. |
| `AllowGlobalChat`, `AllowLocalChat`, `AllowSquadChat`, `AllowAdminChat` | True | Tutti i canali di chat sono aperti. |
| `LimitGlobalChat` | False | La chat globale non ha restrizioni. |

---

[Tutte le pagine delle impostazioni](overview.md#every-setting-explained) | [Elenco completo dei valori](all-settings.md)
