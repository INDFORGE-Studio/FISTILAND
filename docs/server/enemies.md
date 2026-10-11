<div class="fl-page-hero fl-bg-f" markdown>

:material-skull-crossbones:

# Enemies

<p>The real opponents are other players. Zombies and armed NPCs are there to be handled, not feared.</p>

</div>

<div class="fl-facts">
<div><b>200</b><span>Zombies at most</span></div>
<div><b>x0.5</b><span>Zombie health</span></div>
<div><b>x0.1</b><span>Armed NPC health</span></div>
<div><b>2</b><span>Armed NPC difficulty</span></div>
</div>


## :material-ghost: Zombies

Zombies are called puppets in the settings.

| Setting | Value | What it does |
|---|---|---|
| `MaxAllowedPuppets` | 200 | Zombies that can exist at the same time. |
| `PuppetHealthMultiplier` | 0.5 | Zombie health. |
| `PuppetRunningSpeedMultiplier` | 0.6 | Zombie running speed. |
| `ZombieDamageMultiplier` | 0.7 | Damage dealt by zombies. |
| `EncounterBaseCharacterAmountMultiplier` | 1 | Number of zombies per encounter zone. |
| `EncounterExtraCharacterPerPlayerMultiplier`, `EncounterExtraCharacterPlayerCapMultiplier` | 1 | Extra zombies for additional nearby players. |
| `EncounterCharacterRespawnTimeMultiplier`, `EncounterCharacterRespawnBatchSizeMultiplier` | 1 | Respawn speed and group size. |
| `EncounterNeverRespawnCharacters` | False | Zombies respawn after being killed. |
| `EncounterHordeActivationChanceMultiplier` | 0 | Noise never triggers a horde. |
| `EnableLootPuppetHorde` | False | No horde appears when a loot zombie dies. |
| `DisableLootPuppetSpawning` | False | Loot zombies can spawn. |
| `DisableSuicidePuppetSpawning` | True | No explosive zombies. |
| `PuppetsCanOpenDoors`, `PuppetsCanVaultWindows` | True | Zombies open doors and climb through windows. |
| `PuppetWorldEncounterSpawnWeightMultiplier`, `DropshipWorldEncounterSpawnWeightMultiplier` | 1 | Weights for random world encounters. |

## :material-pistol: Armed NPCs

| Setting | Value | What it does |
|---|---|---|
| `ArmedNPCDifficultyLevel` | 2 | Medium difficulty. |
| `ArmedNPCHealthMultiplier` | 0.1 | Health: a single well-placed bullet is enough. |
| `ArmedNPCDamageMultiplier` | 0.5 | Damage dealt. |
| `ArmedNPCRunningSpeedMultiplier` | 0.7 | Running speed. |
| `ArmedNPCSpreadMultiplier` | 1 | Weapon spread. |
| `ProbabilityForArmedNPCToDropItemFromHandsWhenSearched` | 1 | A searched NPC always drops what it holds. |
| `MinimumDurabilityOfArmedNPCsDroppedItemFromHands` / `MaximumDurabilityOfArmedNPCsDroppedItemFromHands` | 0.2 / 0.3 | Condition of those items. |
| `MaxAllowedNPCs` | -1 | No limit on armed NPCs. |

## :material-robot-off: Mechs

There are no mechs. The setting `DisableSentrySpawning` is True. See [Events](events.md).

---

[All server settings pages](overview.md#every-setting-explained) | [Full list of values](all-settings.md)
