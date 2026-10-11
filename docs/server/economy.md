<div class="fl-page-hero fl-bg-c" markdown>

:material-tag-multiple:

# Economy

<p>Loot is plentiful and traders are cheap, so you gear up in a few hours.</p>

</div>

<div class="fl-facts">
<div><b>x5</b><span>Loot</span></div>
<div><b>x0.5</b><span>Fuel and water price</span></div>
<div><b>5</b><span>Quests per trader per cycle</span></div>
<div><b>2</b><span>Active quests per trader</span></div>
</div>


## :material-treasure-chest: Loot

| Setting | Value | What it does |
|---|---|---|
| `SpawnerProbabilityMultiplier` | 5 | Chance that loose items spawn in the world (the loot x5). |
| `ExamineSpawnerProbabilityMultiplier` | 5 | Chance that an examined container gives an item. |
| `SpawnerExpirationTimeMultiplier` | 1 | How long spawned world items last. |
| `ExamineSpawnerExpirationTimeMultiplier` | 1 | How long examine spawns last. |
| `EnableItemCooldownGroups` | True | Rare items share cooldown groups, which limits item farming. |
| `ItemCooldownGroupsDurationMultiplier` | 0.5 | Length of those cooldowns. |
| `EnableLockedLootContainers` | True | Lockers in the world are locked. |

## :material-gas-station: Fuel, water and gas at stations

| Setting | Value | What it does |
|---|---|---|
| `WaterPricePerUnitMultiplier` | 0.5 | Water price. |
| `GasolinePricePerUnitMultiplier` | 0.5 | Fuel price per litre. |
| `PropanePricePerUnitMultiplier` | 5 | Propane price per litre. |
| `WaterPeriodicInitialAmountMultiplier`, `GasolinePeriodicInitialAmountMultiplier`, `PropanePeriodicInitialAmountMultiplier` | 1 | Starting amount in a source. |
| `...PeriodicMaxAmountMultiplier` (water, gasoline, propane) | 1 | Maximum amount in a source. |
| `...PeriodicReplenishAmountMultiplier` and `...PeriodicReplenishIntervalMultiplier` | 1 | Refill amount and speed over time. |
| `...ProximityReplenishAmountMultiplier`, `...ProximityReplenishChanceMultiplier`, `...ProximityReplenishTimeoutMultiplier` | 1 | Refill when a player is nearby. |

## :material-clipboard-text: Quests

| Setting | Value | What it does |
|---|---|---|
| `QuestsEnabled` | True | Quests are available. |
| `MaxQuestsPerCyclePerTrader` | 5 | Quests a player can accept per trader per cycle. |
| `MaxSimultaneousQuestsPerTrader` | 2 | Quests active at once per trader. |
| `QuestsGlobalCycleDuration` | 23:59:59 | Length of one quest cycle. |
| `QuestsTraderRefillCooldown` | 03:00:00 | Trader quests refill every 3 hours. |
| `QuestsPhoneRefillCooldown` | 01:00:00 | Phone quests refill every hour. |
| `QuestsNoticeBoardRefillCooldown` | 02:00:00 | Notice-board quests refill every 2 hours. |
| `QuestRequirementsBlockTradeableItems` | False | Quest items can still be traded. |

## :material-account-edit: Services

| Setting | Value | What it does |
|---|---|---|
| `NameChangeCost` | 500 | Price to change a character's name. |
| `NameChangeCooldown` | 168 | Hours between name changes. |
| `DisableTimedGifts` | False | Seasonal gifts stay active. |
| `EnableDeenaOnServer` | True | Deena is active. |

---

[All server settings pages](overview.md#every-setting-explained) | [Full list of values](all-settings.md)
