<div class="fl-page-hero fl-bg-f" markdown>

:material-skull-crossbones:

# Вороги

<p>Справжні суперники: інші гравці. Зомбі та озброєні NPC існують для того, щоб із ними впоратися, а не щоб їх боятися.</p>

</div>

<div class="fl-facts">
<div><b>200</b><span>Зомбі щонайбільше</span></div>
<div><b>x0.5</b><span>Здоров'я зомбі</span></div>
<div><b>x0.1</b><span>Здоров'я озброєних NPC</span></div>
<div><b>2</b><span>Складність озброєних NPC</span></div>
</div>


## :material-ghost: Зомбі

У налаштуваннях зомбі називаються маріонетками (puppets).

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `MaxAllowedPuppets` | 200 | Зомбі, які можуть існувати одночасно. |
| `PuppetHealthMultiplier` | 0.5 | Здоров'я зомбі. |
| `PuppetRunningSpeedMultiplier` | 0.6 | Швидкість бігу зомбі. |
| `ZombieDamageMultiplier` | 0.7 | Шкода, яку завдають зомбі. |
| `EncounterBaseCharacterAmountMultiplier` | 1 | Кількість зомбі на зону зустрічі. |
| `EncounterExtraCharacterPerPlayerMultiplier`, `EncounterExtraCharacterPlayerCapMultiplier` | 1 | Додаткові зомбі за додаткових гравців поруч. |
| `EncounterCharacterRespawnTimeMultiplier`, `EncounterCharacterRespawnBatchSizeMultiplier` | 1 | Швидкість повторної появи та розмір груп. |
| `EncounterNeverRespawnCharacters` | False | Зомбі з'являються знову після вбивства. |
| `EncounterHordeActivationChanceMultiplier` | 0 | Шум ніколи не викликає орду. |
| `EnableLootPuppetHorde` | False | Орда не з'являється, коли гине зомбі з лутом. |
| `DisableLootPuppetSpawning` | False | Зомбі з лутом можуть з'являтися. |
| `DisableSuicidePuppetSpawning` | True | Жодних вибухових зомбі. |
| `PuppetsCanOpenDoors`, `PuppetsCanVaultWindows` | True | Зомбі відчиняють двері та перелазять через вікна. |
| `PuppetWorldEncounterSpawnWeightMultiplier`, `DropshipWorldEncounterSpawnWeightMultiplier` | 1 | Ваги випадкових зустрічей у світі. |

## :material-pistol: Озброєні NPC

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `ArmedNPCDifficultyLevel` | 2 | Середня складність. |
| `ArmedNPCHealthMultiplier` | 0.1 | Здоров'я: достатньо однієї влучної кулі. |
| `ArmedNPCDamageMultiplier` | 0.5 | Завдана шкода. |
| `ArmedNPCRunningSpeedMultiplier` | 0.9 | Швидкість бігу. |
| `ArmedNPCSpreadMultiplier` | 1 | Розкид зброї. |
| `ProbabilityForArmedNPCToDropItemFromHandsWhenSearched` | 1 | Обшуканий NPC завжди випускає те, що тримає в руках. |
| `MinimumDurabilityOfArmedNPCsDroppedItemFromHands` / `MaximumDurabilityOfArmedNPCsDroppedItemFromHands` | 0.2 / 0.3 | Стан цих предметів. |
| `MaxAllowedNPCs` | -1 | Кількість озброєних NPC не обмежена. |

## :material-robot-off: Мехи

Мехів немає. Налаштування `DisableSentrySpawning` має значення True. Див. [Події](events.md).

---

[Усі сторінки налаштувань](overview.md#every-setting-explained) | [Повний список значень](all-settings.md)
