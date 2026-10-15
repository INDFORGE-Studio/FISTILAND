<div class="fl-page-hero fl-bg-b" markdown>

:material-package-variant-closed:

# Događaji

<p>Zračni tereti daju svakoj ekipi razlog da napusti svoju bazu. Mechovi i desantne letjelice su isključeni, pa se borbe vode među igračima.</p>

</div>

<div class="fl-facts">
<div><b>45-60 min</b><span>Između zračnih tereta</span></div>
<div><b>0</b><span>Mechova</span></div>
<div><b>9 min</b><span>Od najave do pada</span></div>
<div><b>20 min</b><span>Prije nego neotvoren sanduk eksplodira</span></div>
</div>


## :material-package-variant-closed: Zračni tereti

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `CargoDropCooldownMinimum` | 45 | Najmanje minuta između dva zračna tereta. |
| `CargoDropCooldownMaximum` | 60 | Najviše minuta između dva zračna tereta. |
| `CargoDropFallDelay` | 540 | Sekunde između najave i pada. |
| `CargoDropFallDuration` | 60 | Sekunde koliko sanduk pada. |
| `CargoDropSelfdestructTime` | 1200 | Sekunde prije nego neotvoren sanduk eksplodira. |
| `CargoDropZombieEncounterWeightMultiplier` | 0.3 | Težina susreta sa zombijima na mjestu pada. |
| `CargoDropDropshipEncounterWeightMultiplier` | 0.01 | Težina susreta s desantnom letjelicom na mjestu pada. Desantna letjelica praktički nikad nije odabrana. |

## :material-robot-off: Mechovi i desantne letjelice

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `DisableSentrySpawning` | True | Nema mechova. |
| `EnableSentryRespawning` | False | Nijedan mech se ne vraća desantnom letjelicom. |
| `EnableDropshipAbandonedBunkerEncounter` | False | Nema desantne letjelice kod napuštenih bunkera. |
| `DropshipAbandonedBunkerEncounterTriggerChance` | -1 | Zadana vrijednost igre (ne koristi se dok je susret isključen). |
| `EnableDropshipBaseBuildingEncounter` | False | Nema napada desantne letjelice dok gradiš bazu. |
| `BaseBuildingEncounterTriggerChance` | 0 | Nema susreta pri gradnji baze. |
| `BaseBuildingEncounterTriggerTimeMultiplier` | 1 | Vremenski raspored susreta pri gradnji baze. |
| `DropshipHealthMultiplier`, `SentryHealthMultiplier`, `BaseBuildingAttackerSentryHealthMultiplier` | 1 | Zdravlje desantnih letjelica i stražara. |
| `DropshipDamageMultiplier`, `SentryDamageMultiplier` | 1 | Šteta desantnih letjelica i stražara. |

## :material-calendar-star: Događaji poslužitelja

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `AllowEvents` | True | Događaji su dopušteni na poslužitelju. |
| `AllowVoting` | True | Igrači mogu glasati. |
| `VotingDuration` | 60 | Trajanje glasanja u sekundama. |
| `PlayerMinimalVotingInterest` | 0.5 | Udio igrača koji moraju sudjelovati da bi glasanje vrijedilo. |
| `PlayerPositiveVotePercentage` | 0.5 | Udio glasova za potreban za prolaz. |

---

[Sve stranice postavki poslužitelja](overview.md#every-setting-explained) | [Potpuni popis vrijednosti](all-settings.md)
