<div class="fl-page-hero fl-bg-b" markdown>

:material-timer-sand:

# Respawn

<p>Uno scontro perso costa minuti, non una serata. I prezzi che finiscono con g si pagano in oro; gli altri, in punti fama.</p>

</div>

<div class="fl-facts">
<div><b>30 s</b><span>Attesa al rifugio</span></div>
<div><b>150</b><span>Prezzo al rifugio</span></div>
<div><b>100</b><span>Respawn casuale</span></div>
<div><b>250</b><span>Respawn in un settore</span></div>
<div><b>No</b><span>Malattia da clonazione</span></div>
</div>


## :material-parachute: Metodi di respawn

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `AllowSectorRespawn` | True | Respawn in un settore scelto. |
| `AllowShelterRespawn` | True | Respawn al tuo rifugio. |
| `AllowSquadmateRespawn` | True | Respawn accanto a un membro della squadra. |
| `EnableSpawnOnGround` | False | I nuovi spawn arrivano con il paracadute. |
| `AllowAutomaticParachuteOpening` | True | Il paracadute si apre automaticamente. |

## :material-cash: Prezzi

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `RandomRespawnPrice` | 100 | Respawn in un punto casuale. |
| `SectorRespawnPrice` | 250 | Respawn in un settore scelto. |
| `ShelterRespawnPrice` | 150 | Respawn al tuo rifugio all'interno di un'area di bandiera. |
| `ShelterRespawnPriceOutsideFlagArea` | 2g | Respawn a un rifugio fuori da un'area di bandiera. |
| `SquadRespawnPrice` | 2g | Respawn accanto a un membro della squadra. |
| `RandomPricePerSquadmateModifier`, `SectorPricePerSquadmateModifier`, `ShelterPricePerSquadmateModifier` | 0 | La dimensione della squadra non cambia il prezzo. |

## :material-timer-sand: Tempi di attesa

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `RandomRespawnInitialTime` | 0 | Attesa prima che sia possibile un respawn casuale (secondi). |
| `SectorRespawnInitialTime` | 60 | Attesa prima che sia possibile un respawn in un settore (secondi). |
| `ShelterRespawnInitialTime` | 30 | Attesa prima che sia possibile un respawn al rifugio (secondi). |
| `SquadRespawnInitialTime` | 60 | Attesa prima che sia possibile un respawn di squadra (secondi). |
| `RandomRespawnCooldown` | 0 | Attesa extra dopo morti ripetute, respawn casuale. |
| `SectorRespawnCooldown` | 120 | Attesa extra dopo morti ripetute, respawn in un settore. |
| `ShelterRespawnCooldown` | 120 | Attesa extra dopo morti ripetute, respawn al rifugio. |
| `SquadRespawnCooldown` | 60 | Attesa extra dopo morti ripetute, respawn di squadra. |
| `RandomCooldownResetMultiplier` | 0 | Il tempo di recupero del respawn casuale si azzera subito. |
| `SectorCooldownResetMultiplier`, `ShelterCooldownResetMultiplier`, `SquadCooldownResetMultiplier` | 0.7 | Il tempo di recupero si azzera dopo questo multiplo del tempo di recupero. |

## :material-skull: Suicidio

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `CommitSuicideInitialTime` | 30 | Secondi prima che il comando di suicidio sia disponibile. |
| `CommitSuicideCooldown` | 300 | Secondi prima di poterlo usare di nuovo. |
| `CommitSuicideCooldownResetMultiplier` | 1.25 | Quanto in fretta si azzera il tempo di recupero del suicidio. |

## :material-cog: Altro

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `MaximumBaseProximityWhenSpawning` | 5000 | Distanza dalle bandiere nemiche usata nella scelta del punto di spawn. |
| `CloningSicknessEnabled` | False | Nessuna malattia da clonazione dopo il respawn. |
| `PermadeathThreshold` | -7500 | Saldo negativo oltre il quale un personaggio viene eliminato in modo permanente. |

---

[Tutte le pagine delle impostazioni](overview.md#every-setting-explained) | [Elenco completo dei valori](all-settings.md)
