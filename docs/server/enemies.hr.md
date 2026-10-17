<div class="fl-page-hero fl-bg-f" markdown>

:material-skull-crossbones:

# Neprijatelji

<p>Pravi protivnici su drugi igrači. Zombiji i naoružani NPC-ovi tu su da ih svladaš, a ne da ih se bojiš.</p>

</div>

<div class="fl-facts">
<div><b>200</b><span>Najviše zombija</span></div>
<div><b>x0.5</b><span>Zdravlje zombija</span></div>
<div><b>x0.1</b><span>Zdravlje naoružanog NPC-a</span></div>
<div><b>2</b><span>Težina naoružanog NPC-a</span></div>
</div>


## :material-ghost: Zombiji

U postavkama se zombiji zovu marionete (puppets).

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `MaxAllowedPuppets` | 200 | Zombiji koji mogu postojati istodobno. |
| `PuppetHealthMultiplier` | 0.5 | Zdravlje zombija. |
| `PuppetRunningSpeedMultiplier` | 0.6 | Brzina trčanja zombija. |
| `ZombieDamageMultiplier` | 0.7 | Šteta koju nanose zombiji. |
| `EncounterBaseCharacterAmountMultiplier` | 1 | Broj zombija po zoni susreta. |
| `EncounterExtraCharacterPerPlayerMultiplier`, `EncounterExtraCharacterPlayerCapMultiplier` | 1 | Dodatni zombiji za dodatne igrače u blizini. |
| `EncounterCharacterRespawnTimeMultiplier`, `EncounterCharacterRespawnBatchSizeMultiplier` | 1 | Brzina obnove i veličina skupine. |
| `EncounterNeverRespawnCharacters` | False | Zombiji se obnavljaju nakon što ih ubiješ. |
| `EncounterHordeActivationChanceMultiplier` | 0 | Buka nikad ne pokreće hordu. |
| `EnableLootPuppetHorde` | False | Ne pojavljuje se horda kad umre zombi s lootom. |
| `DisableLootPuppetSpawning` | False | Zombiji s lootom mogu se pojaviti. |
| `DisableSuicidePuppetSpawning` | True | Nema eksplozivnih zombija. |
| `PuppetsCanOpenDoors`, `PuppetsCanVaultWindows` | True | Zombiji otvaraju vrata i prelaze kroz prozore. |
| `PuppetWorldEncounterSpawnWeightMultiplier`, `DropshipWorldEncounterSpawnWeightMultiplier` | 1 | Težine nasumičnih susreta u svijetu. |

## :material-pistol: Naoružani NPC-ovi

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `ArmedNPCDifficultyLevel` | 2 | Srednja težina. |
| `ArmedNPCHealthMultiplier` | 0.1 | Zdravlje: dovoljan je jedan dobro smješten metak. |
| `ArmedNPCDamageMultiplier` | 0.5 | Nanesena šteta. |
| `ArmedNPCRunningSpeedMultiplier` | 0.9 | Brzina trčanja. |
| `ArmedNPCSpreadMultiplier` | 1.5 | Rasipanje oružja. |
| `ProbabilityForArmedNPCToDropItemFromHandsWhenSearched` | 1 | Pretražen NPC uvijek ispušta ono što drži. |
| `MinimumDurabilityOfArmedNPCsDroppedItemFromHands` / `MaximumDurabilityOfArmedNPCsDroppedItemFromHands` | 0.2 / 0.3 | Stanje tih predmeta. |
| `MaxAllowedNPCs` | -1 | Bez ograničenja naoružanih NPC-ova. |

## :material-robot-off: Mechovi

Nema mechova. Postavka `DisableSentrySpawning` je True. Pogledaj [Događaje](events.md).

---

[Sve stranice postavki poslužitelja](overview.md#every-setting-explained) | [Potpuni popis vrijednosti](all-settings.md)
