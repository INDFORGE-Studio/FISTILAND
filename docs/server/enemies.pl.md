<div class="fl-page-hero fl-bg-f" markdown>

:material-skull-crossbones:

# Wrogowie

<p>Prawdziwi przeciwnicy to inni gracze. Zombie i uzbrojone NPC są po to, by sobie z nimi radzić, a nie się ich bać.</p>

</div>

<div class="fl-facts">
<div><b>200</b><span>Zombie maksymalnie</span></div>
<div><b>x0.5</b><span>Zdrowie zombie</span></div>
<div><b>x0.1</b><span>Zdrowie uzbrojonego NPC</span></div>
<div><b>2</b><span>Trudność uzbrojonego NPC</span></div>
</div>


## :material-ghost: Zombie

W ustawieniach zombie nazywane są marionetkami (puppets).

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `MaxAllowedPuppets` | 200 | Zombie, które mogą istnieć jednocześnie. |
| `PuppetHealthMultiplier` | 0.5 | Zdrowie zombie. |
| `PuppetRunningSpeedMultiplier` | 0.6 | Prędkość biegu zombie. |
| `ZombieDamageMultiplier` | 0.7 | Obrażenia zadawane przez zombie. |
| `EncounterBaseCharacterAmountMultiplier` | 1 | Liczba zombie na strefę spotkania. |
| `EncounterExtraCharacterPerPlayerMultiplier`, `EncounterExtraCharacterPlayerCapMultiplier` | 1 | Dodatkowe zombie za kolejnych graczy w pobliżu. |
| `EncounterCharacterRespawnTimeMultiplier`, `EncounterCharacterRespawnBatchSizeMultiplier` | 1 | Tempo odradzania i wielkość grupy. |
| `EncounterNeverRespawnCharacters` | False | Zombie odradzają się po zabiciu. |
| `EncounterHordeActivationChanceMultiplier` | 0 | Hałas nigdy nie wywołuje hordy. |
| `EnableLootPuppetHorde` | False | Horda nie pojawia się po śmierci zombie z lootem. |
| `DisableLootPuppetSpawning` | False | Zombie z lootem mogą się pojawiać. |
| `DisableSuicidePuppetSpawning` | True | Brak wybuchowych zombie. |
| `PuppetsCanOpenDoors`, `PuppetsCanVaultWindows` | True | Zombie otwierają drzwi i przechodzą przez okna. |
| `PuppetWorldEncounterSpawnWeightMultiplier`, `DropshipWorldEncounterSpawnWeightMultiplier` | 1 | Wagi losowych spotkań w świecie. |

## :material-pistol: Uzbrojone NPC

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `ArmedNPCDifficultyLevel` | 2 | Średni poziom trudności. |
| `ArmedNPCHealthMultiplier` | 0.1 | Zdrowie: wystarczy jedna dobrze umieszczona kula. |
| `ArmedNPCDamageMultiplier` | 0.5 | Zadawane obrażenia. |
| `ArmedNPCRunningSpeedMultiplier` | 0.9 | Prędkość biegu. |
| `ArmedNPCSpreadMultiplier` | 1 | Rozrzut broni. |
| `ProbabilityForArmedNPCToDropItemFromHandsWhenSearched` | 1 | Przeszukane NPC zawsze upuszcza to, co trzyma. |
| `MinimumDurabilityOfArmedNPCsDroppedItemFromHands` / `MaximumDurabilityOfArmedNPCsDroppedItemFromHands` | 0.2 / 0.3 | Stan tych przedmiotów. |
| `MaxAllowedNPCs` | -1 | Brak limitu uzbrojonych NPC. |

## :material-robot-off: Mechy

Mechów nie ma. Ustawienie `DisableSentrySpawning` ma wartość True. Zobacz [Wydarzenia](events.md).

---

[Wszystkie strony ustawień serwera](overview.md#every-setting-explained) | [Pełna lista wartości](all-settings.md)
