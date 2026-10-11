<div class="fl-page-hero fl-bg-b" markdown>

:material-package-variant-closed:

# Eventos

<p>Los lanzamientos de suministros dan a cada escuadra una razón para salir de su base. Los mechs y las naves de desembarco están desactivados, así que los combates son entre jugadores.</p>

</div>

<div class="fl-facts">
<div><b>45-60 min</b><span>Entre lanzamientos de suministros</span></div>
<div><b>0</b><span>Mechs</span></div>
<div><b>9 min</b><span>Del aviso a la caída</span></div>
<div><b>20 min</b><span>Hasta que explota una caja sin abrir</span></div>
</div>


## :material-package-variant-closed: Lanzamientos de suministros

| Ajuste | Valor | Qué hace |
|---|---|---|
| `CargoDropCooldownMinimum` | 45 | Minutos mínimos entre dos lanzamientos de suministros. |
| `CargoDropCooldownMaximum` | 60 | Minutos máximos entre dos lanzamientos de suministros. |
| `CargoDropFallDelay` | 540 | Segundos entre el aviso y la caída. |
| `CargoDropFallDuration` | 60 | Segundos que tarda la caja en caer. |
| `CargoDropSelfdestructTime` | 1200 | Segundos hasta que explota una caja sin abrir. |
| `CargoDropZombieEncounterWeightMultiplier` | 0.3 | Peso del encuentro con zombis en un lanzamiento. |
| `CargoDropDropshipEncounterWeightMultiplier` | 0.01 | Peso del encuentro con una nave de desembarco en un lanzamiento. Prácticamente nunca se elige la nave. |

## :material-robot-off: Mechs y naves de desembarco

| Ajuste | Valor | Qué hace |
|---|---|---|
| `DisableSentrySpawning` | True | Sin mechs. |
| `EnableSentryRespawning` | False | Ningún mech vuelve en una nave de desembarco. |
| `EnableDropshipAbandonedBunkerEncounter` | False | Sin naves de desembarco en los búnkeres abandonados. |
| `DropshipAbandonedBunkerEncounterTriggerChance` | -1 | Valor por defecto del juego (sin uso mientras el encuentro esté desactivado). |
| `EnableDropshipBaseBuildingEncounter` | False | Ninguna nave ataca mientras construyes una base. |
| `BaseBuildingEncounterTriggerChance` | 0 | Sin encuentro durante la construcción de la base. |
| `BaseBuildingEncounterTriggerTimeMultiplier` | 1 | Momento de los encuentros de construcción de base. |
| `DropshipHealthMultiplier`, `SentryHealthMultiplier`, `BaseBuildingAttackerSentryHealthMultiplier` | 1 | Salud de las naves de desembarco y los centinelas. |
| `DropshipDamageMultiplier`, `SentryDamageMultiplier` | 1 | Daño de las naves de desembarco y los centinelas. |

## :material-calendar-star: Eventos del servidor

| Ajuste | Valor | Qué hace |
|---|---|---|
| `AllowEvents` | True | Los eventos están permitidos en el servidor. |
| `AllowVoting` | True | Los jugadores pueden votar. |
| `VotingDuration` | 60 | Duración de una votación en segundos. |
| `PlayerMinimalVotingInterest` | 0.5 | Proporción de jugadores que deben participar para que una votación cuente. |
| `PlayerPositiveVotePercentage` | 0.5 | Proporción de votos a favor necesaria para que pase. |

---

[Todas las páginas de ajustes](overview.md#every-setting-explained) | [Lista completa de valores](all-settings.md)
