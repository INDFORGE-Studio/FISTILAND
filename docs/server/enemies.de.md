<div class="fl-page-hero fl-bg-f" markdown>

:material-skull-crossbones:

# Gegner

<p>Die wahren Gegner sind andere Spieler. Zombies und bewaffnete NPCs sind dazu da, erledigt zu werden, nicht um gefürchtet zu werden.</p>

</div>

<div class="fl-facts">
<div><b>200</b><span>Zombies höchstens</span></div>
<div><b>x0.5</b><span>Zombie-Gesundheit</span></div>
<div><b>x0.1</b><span>Gesundheit bewaffneter NPCs</span></div>
<div><b>2</b><span>Schwierigkeit bewaffneter NPCs</span></div>
</div>


## :material-ghost: Zombies

Zombies heißen in den Einstellungen Puppets.

| Einstellung | Wert | Wirkung |
|---|---|---|
| `MaxAllowedPuppets` | 200 | Zombies, die gleichzeitig existieren können. |
| `PuppetHealthMultiplier` | 0.5 | Zombie-Gesundheit. |
| `PuppetRunningSpeedMultiplier` | 0.6 | Laufgeschwindigkeit der Zombies. |
| `ZombieDamageMultiplier` | 0.7 | Schaden, den Zombies verursachen. |
| `EncounterBaseCharacterAmountMultiplier` | 1 | Anzahl der Zombies pro Begegnungszone. |
| `EncounterExtraCharacterPerPlayerMultiplier`, `EncounterExtraCharacterPlayerCapMultiplier` | 1 | Zusätzliche Zombies für weitere Spieler in der Nähe. |
| `EncounterCharacterRespawnTimeMultiplier`, `EncounterCharacterRespawnBatchSizeMultiplier` | 1 | Respawn-Geschwindigkeit und Gruppengröße. |
| `EncounterNeverRespawnCharacters` | False | Zombies erscheinen nach dem Töten erneut. |
| `EncounterHordeActivationChanceMultiplier` | 0 | Lärm löst nie eine Horde aus. |
| `EnableLootPuppetHorde` | False | Beim Tod eines Loot-Zombies erscheint keine Horde. |
| `DisableLootPuppetSpawning` | False | Loot-Zombies können erscheinen. |
| `DisableSuicidePuppetSpawning` | True | Keine explodierenden Zombies. |
| `PuppetsCanOpenDoors`, `PuppetsCanVaultWindows` | True | Zombies öffnen Türen und klettern durch Fenster. |
| `PuppetWorldEncounterSpawnWeightMultiplier`, `DropshipWorldEncounterSpawnWeightMultiplier` | 1 | Gewichtungen für zufällige Weltbegegnungen. |

## :material-pistol: Bewaffnete NPCs

| Einstellung | Wert | Wirkung |
|---|---|---|
| `ArmedNPCDifficultyLevel` | 2 | Mittlere Schwierigkeit. |
| `ArmedNPCHealthMultiplier` | 0.1 | Gesundheit: Eine einzige gut platzierte Kugel genügt. |
| `ArmedNPCDamageMultiplier` | 0.5 | Verursachter Schaden. |
| `ArmedNPCRunningSpeedMultiplier` | 0.7 | Laufgeschwindigkeit. |
| `ArmedNPCSpreadMultiplier` | 1 | Streuung der Waffen. |
| `ProbabilityForArmedNPCToDropItemFromHandsWhenSearched` | 1 | Ein durchsuchter NPC lässt immer fallen, was er in den Händen hält. |
| `MinimumDurabilityOfArmedNPCsDroppedItemFromHands` / `MaximumDurabilityOfArmedNPCsDroppedItemFromHands` | 0.2 / 0.3 | Zustand dieser Gegenstände. |
| `MaxAllowedNPCs` | -1 | Keine Begrenzung bewaffneter NPCs. |

## :material-robot-off: Mechs

Es gibt keine Mechs. Die Einstellung `DisableSentrySpawning` steht auf True. Siehe [Ereignisse](events.md).

---

[Alle Einstellungsseiten](overview.md#every-setting-explained) | [Vollständige Werteliste](all-settings.md)
