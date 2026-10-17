<div class="fl-page-hero fl-bg-f" markdown>

:material-skull-crossbones:

# Nemici

<p>I veri avversari sono gli altri giocatori. Zombie e PNG armati ci sono per essere gestiti, non temuti.</p>

</div>

<div class="fl-facts">
<div><b>200</b><span>Zombie al massimo</span></div>
<div><b>x0.5</b><span>Salute degli zombie</span></div>
<div><b>x0.1</b><span>Salute dei PNG armati</span></div>
<div><b>2</b><span>Difficoltà dei PNG armati</span></div>
</div>


## :material-ghost: Zombie

Nelle impostazioni gli zombie si chiamano marionette (puppets).

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `MaxAllowedPuppets` | 200 | Zombie che possono esistere contemporaneamente. |
| `PuppetHealthMultiplier` | 0.5 | Salute degli zombie. |
| `PuppetRunningSpeedMultiplier` | 0.6 | Velocità di corsa degli zombie. |
| `ZombieDamageMultiplier` | 0.7 | Danno inflitto dagli zombie. |
| `EncounterBaseCharacterAmountMultiplier` | 1 | Numero di zombie per zona di incontro. |
| `EncounterExtraCharacterPerPlayerMultiplier`, `EncounterExtraCharacterPlayerCapMultiplier` | 1 | Zombie extra per i giocatori aggiuntivi nelle vicinanze. |
| `EncounterCharacterRespawnTimeMultiplier`, `EncounterCharacterRespawnBatchSizeMultiplier` | 1 | Velocità di ricomparsa e dimensione dei gruppi. |
| `EncounterNeverRespawnCharacters` | False | Gli zombie ricompaiono dopo essere stati uccisi. |
| `EncounterHordeActivationChanceMultiplier` | 0 | Il rumore non scatena mai un'orda. |
| `EnableLootPuppetHorde` | False | Nessuna orda compare alla morte di uno zombie da bottino. |
| `DisableLootPuppetSpawning` | False | Gli zombie da bottino possono comparire. |
| `DisableSuicidePuppetSpawning` | True | Nessuno zombie esplosivo. |
| `PuppetsCanOpenDoors`, `PuppetsCanVaultWindows` | True | Gli zombie aprono le porte e scavalcano le finestre. |
| `PuppetWorldEncounterSpawnWeightMultiplier`, `DropshipWorldEncounterSpawnWeightMultiplier` | 1 | Pesi degli incontri casuali del mondo. |

## :material-pistol: PNG armati

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `ArmedNPCDifficultyLevel` | 2 | Difficoltà media. |
| `ArmedNPCHealthMultiplier` | 0.1 | Salute: basta un solo proiettile ben piazzato. |
| `ArmedNPCDamageMultiplier` | 0.5 | Danno inflitto. |
| `ArmedNPCRunningSpeedMultiplier` | 0.9 | Velocità di corsa. |
| `ArmedNPCSpreadMultiplier` | 1.5 | Dispersione delle armi. |
| `ProbabilityForArmedNPCToDropItemFromHandsWhenSearched` | 1 | Un PNG perquisito lascia sempre cadere ciò che tiene in mano. |
| `MinimumDurabilityOfArmedNPCsDroppedItemFromHands` / `MaximumDurabilityOfArmedNPCsDroppedItemFromHands` | 0.2 / 0.3 | Condizione di quegli oggetti. |
| `MaxAllowedNPCs` | -1 | Nessun limite di PNG armati. |

## :material-robot-off: Mech

Non ci sono mech. L'impostazione `DisableSentrySpawning` è su True. Vedi [Eventi](events.md).

---

[Tutte le pagine delle impostazioni](overview.md#every-setting-explained) | [Elenco completo dei valori](all-settings.md)
