<div class="fl-page-hero fl-bg-f" markdown>

:material-skull-crossbones:

# Ennemis

<p>Les vrais adversaires sont les autres joueurs. Les zombies et les PNJ armés sont là pour être gérés, pas pour faire peur.</p>

</div>

<div class="fl-facts">
<div><b>200</b><span>Zombies au maximum</span></div>
<div><b>x0.5</b><span>Santé des zombies</span></div>
<div><b>x0.1</b><span>Santé des PNJ armés</span></div>
<div><b>2</b><span>Difficulté des PNJ armés</span></div>
</div>


## :material-ghost: Zombies

Les zombies s'appellent des marionnettes (puppets) dans les réglages.

| Réglage | Valeur | Rôle |
|---|---|---|
| `MaxAllowedPuppets` | 200 | Zombies pouvant exister en même temps. |
| `PuppetHealthMultiplier` | 0.5 | Santé des zombies. |
| `PuppetRunningSpeedMultiplier` | 0.6 | Vitesse de course des zombies. |
| `ZombieDamageMultiplier` | 0.7 | Dégâts infligés par les zombies. |
| `EncounterBaseCharacterAmountMultiplier` | 1 | Nombre de zombies par zone de rencontre. |
| `EncounterExtraCharacterPerPlayerMultiplier`, `EncounterExtraCharacterPlayerCapMultiplier` | 1 | Zombies supplémentaires pour les joueurs proches en plus. |
| `EncounterCharacterRespawnTimeMultiplier`, `EncounterCharacterRespawnBatchSizeMultiplier` | 1 | Vitesse de réapparition et taille des groupes. |
| `EncounterNeverRespawnCharacters` | False | Les zombies réapparaissent après avoir été tués. |
| `EncounterHordeActivationChanceMultiplier` | 0 | Le bruit ne déclenche jamais de horde. |
| `EnableLootPuppetHorde` | False | Aucune horde n'apparaît à la mort d'un zombie de butin. |
| `DisableLootPuppetSpawning` | False | Les zombies de butin peuvent apparaître. |
| `DisableSuicidePuppetSpawning` | True | Pas de zombies explosifs. |
| `PuppetsCanOpenDoors`, `PuppetsCanVaultWindows` | True | Les zombies ouvrent les portes et passent par les fenêtres. |
| `PuppetWorldEncounterSpawnWeightMultiplier`, `DropshipWorldEncounterSpawnWeightMultiplier` | 1 | Pondérations des rencontres aléatoires du monde. |

## :material-pistol: PNJ armés

| Réglage | Valeur | Rôle |
|---|---|---|
| `ArmedNPCDifficultyLevel` | 2 | Difficulté moyenne. |
| `ArmedNPCHealthMultiplier` | 0.1 | Santé : une seule balle bien placée suffit. |
| `ArmedNPCDamageMultiplier` | 0.5 | Dégâts infligés. |
| `ArmedNPCRunningSpeedMultiplier` | 0.9 | Vitesse de course. |
| `ArmedNPCSpreadMultiplier` | 1 | Dispersion des armes. |
| `ProbabilityForArmedNPCToDropItemFromHandsWhenSearched` | 1 | Un PNJ fouillé lâche toujours ce qu'il tient. |
| `MinimumDurabilityOfArmedNPCsDroppedItemFromHands` / `MaximumDurabilityOfArmedNPCsDroppedItemFromHands` | 0.2 / 0.3 | État de ces objets. |
| `MaxAllowedNPCs` | -1 | Aucune limite de PNJ armés. |

## :material-robot-off: Mécas

Il n'y a pas de mécas. Le réglage `DisableSentrySpawning` est à True. Voir [Événements](events.md).

---

[Toutes les pages de réglages](overview.md#every-setting-explained) | [Liste complète des valeurs](all-settings.md)
