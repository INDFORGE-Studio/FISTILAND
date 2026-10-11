<div class="fl-page-hero fl-bg-a" markdown>

:material-key-variant:

# Bunker

<p>Le tessere di accesso aprono le strutture Killbox e Apex, il miglior bottino della mappa. I bunker abbandonati si aprono da soli per un po' e poi si richiudono.</p>

</div>

<div class="fl-facts">
<div><b>6</b><span>Tessere Killbox</span></div>
<div><b>6</b><span>Tessere Apex</span></div>
<div><b>3</b><span>Bunker aperti contemporaneamente</span></div>
<div><b>12 h</b><span>Tempo di apertura di un bunker</span></div>
</div>


## :material-key-variant: Tessere di accesso

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `MaxAllowedKillboxKeycards` | 6 | Tessere Killbox che si possono trovare in totale. |
| `MaxAllowedKillboxKeycards_PoliceStation` | 3 | Tessere Killbox nelle stazioni di polizia. |
| `MaxAllowedKillboxKeycards_RadiationZone` | 1 | Tessere Killbox nella zona di radiazione. |
| `MaxAllowedApexFacilityKeycards` | 6 | Tessere Apex Facility che si possono trovare in totale. |
| `MaxAllowedApexFacilityKeycards_PoliceStation` | 3 | Tessere Apex nelle stazioni di polizia. |
| `MaxAllowedApexFacilityKeycards_RadiationZone` | 1 | Tessere Apex nella zona di radiazione. |
| `KillboxDefuseFailureBonus` | 0.2 | Secondi extra aggiunti da un tentativo di disinnesco fallito. |
| `EnableBCULocking` | True | I terminali BCU possono essere bloccati. |

## :material-radioactive: Bunker abbandonati

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `AbandonedBunkerMaxSimultaneouslyActive` | 3 | Bunker aperti contemporaneamente. |
| `AbandonedBunkerActiveDurationHours` | 12 | Ore in cui un bunker resta aperto dopo un'attivazione naturale. |
| `AbandonedBunkerKeyCardActiveDurationHours` | 3 | Ore in cui un bunker resta aperto dopo un'attivazione con tessera. |
| `AbandonedBunkerBCUTerminalCooldown` | 24:00:00 | Tempo di recupero dei terminali BCU all'interno. |
| `AbandonedBunkerResetArmoryLockersOnActivationOnly` | True | Gli armadietti dell'armeria si riempiono solo quando un bunker viene attivato. |
| `SecretBunkerKeyCardActiveDurationHours` | 0.5 | Ore in cui un bunker segreto resta aperto dopo un'attivazione con tessera. |
| `AbandonedBunkerCommotionThreshold`, `AbandonedBunkerCommotionThresholdPerPlayerExtra`, `AbandonedBunkerEnemyActivationThreshold`, `AbandonedBunkerEnemyActivationThresholdPerPlayerExtra` | -1 | Le soglie di rumore usano i valori integrati del gioco. |
| `LogoutTimerInBunker` | 30000 | Secondi prima che un giocatore che si disconnette in un bunker scompaia. |

---

[Tutte le pagine delle impostazioni](overview.md#every-setting-explained) | [Elenco completo dei valori](all-settings.md)
