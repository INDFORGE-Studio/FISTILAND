<div class="fl-page-hero fl-bg-b" markdown>

:material-package-variant-closed:

# Eventi

<p>I lanci di rifornimenti danno a ogni squadra un motivo per lasciare la propria base. Mech e navi d'assalto sono disattivati, quindi gli scontri restano tra giocatori.</p>

</div>

<div class="fl-facts">
<div><b>45-60 min</b><span>Tra un lancio di rifornimenti e l'altro</span></div>
<div><b>0</b><span>Mech</span></div>
<div><b>9 min</b><span>Dall'annuncio alla caduta</span></div>
<div><b>20 min</b><span>Prima che una cassa chiusa esploda</span></div>
</div>


## :material-package-variant-closed: Lanci di rifornimenti

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `CargoDropCooldownMinimum` | 45 | Minuti minimi tra due lanci di rifornimenti. |
| `CargoDropCooldownMaximum` | 60 | Minuti massimi tra due lanci di rifornimenti. |
| `CargoDropFallDelay` | 540 | Secondi tra l'annuncio e la caduta. |
| `CargoDropFallDuration` | 60 | Secondi che la cassa impiega a cadere. |
| `CargoDropSelfdestructTime` | 1200 | Secondi prima che una cassa non aperta esploda. |
| `CargoDropZombieEncounterWeightMultiplier` | 0.3 | Peso dell'incontro con gli zombie a un lancio. |
| `CargoDropDropshipEncounterWeightMultiplier` | 0.01 | Peso dell'incontro con una nave d'assalto a un lancio. La nave non viene praticamente mai scelta. |

## :material-robot-off: Mech e navi d'assalto

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `DisableSentrySpawning` | True | Nessun mech. |
| `EnableSentryRespawning` | False | Nessun mech torna con una nave d'assalto. |
| `EnableDropshipAbandonedBunkerEncounter` | False | Nessuna nave d'assalto ai bunker abbandonati. |
| `DropshipAbandonedBunkerEncounterTriggerChance` | -1 | Valore predefinito del gioco (inutilizzato finché l'incontro è disattivato). |
| `EnableDropshipBaseBuildingEncounter` | False | Nessuna nave d'assalto attacca mentre costruisci una base. |
| `BaseBuildingEncounterTriggerChance` | 0 | Nessun incontro durante la costruzione della base. |
| `BaseBuildingEncounterTriggerTimeMultiplier` | 1 | Momento degli incontri di costruzione della base. |
| `DropshipHealthMultiplier`, `SentryHealthMultiplier`, `BaseBuildingAttackerSentryHealthMultiplier` | 1 | Salute di navi d'assalto e sentinelle. |
| `DropshipDamageMultiplier`, `SentryDamageMultiplier` | 1 | Danno di navi d'assalto e sentinelle. |

## :material-calendar-star: Eventi del server

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `AllowEvents` | True | Gli eventi sono consentiti sul server. |
| `AllowVoting` | True | I giocatori possono votare. |
| `VotingDuration` | 60 | Durata di una votazione in secondi. |
| `PlayerMinimalVotingInterest` | 0.5 | Quota di giocatori che devono partecipare perché una votazione valga. |
| `PlayerPositiveVotePercentage` | 0.5 | Quota di voti favorevoli necessaria per passare. |

---

[Tutte le pagine delle impostazioni](overview.md#every-setting-explained) | [Elenco completo dei valori](all-settings.md)
