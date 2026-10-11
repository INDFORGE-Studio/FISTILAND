<div class="fl-page-hero fl-bg-c" markdown>

:material-tag-multiple:

# Wirtschaft

<p>Loot gibt es reichlich und Händler sind günstig, sodass du in wenigen Stunden ausgerüstet bist.</p>

</div>

<div class="fl-facts">
<div><b>x5</b><span>Loot</span></div>
<div><b>x0.5</b><span>Preis für Treibstoff und Wasser</span></div>
<div><b>5</b><span>Quests pro Händler und Zyklus</span></div>
<div><b>2</b><span>Aktive Quests pro Händler</span></div>
</div>


## :material-treasure-chest: Loot

| Einstellung | Wert | Wirkung |
|---|---|---|
| `SpawnerProbabilityMultiplier` | 5 | Chance, dass lose Gegenstände in der Welt erscheinen (das Loot x5). |
| `ExamineSpawnerProbabilityMultiplier` | 5 | Chance, dass ein untersuchter Behälter einen Gegenstand ergibt. |
| `SpawnerExpirationTimeMultiplier` | 1 | Wie lange erschienene Weltgegenstände bleiben. |
| `ExamineSpawnerExpirationTimeMultiplier` | 1 | Wie lange beim Untersuchen erscheinende Gegenstände bleiben. |
| `EnableItemCooldownGroups` | True | Seltene Gegenstände teilen sich Abklinggruppen, was das Farmen von Gegenständen begrenzt. |
| `ItemCooldownGroupsDurationMultiplier` | 0.5 | Dauer dieser Abklingzeiten. |
| `EnableLockedLootContainers` | True | Spinde in der Welt sind verschlossen. |

## :material-gas-station: Treibstoff, Wasser und Gas an Tankstellen

| Einstellung | Wert | Wirkung |
|---|---|---|
| `WaterPricePerUnitMultiplier` | 0.5 | Wasserpreis. |
| `GasolinePricePerUnitMultiplier` | 0.5 | Treibstoffpreis pro Liter. |
| `PropanePricePerUnitMultiplier` | 5 | Propanpreis pro Liter. |
| `WaterPeriodicInitialAmountMultiplier`, `GasolinePeriodicInitialAmountMultiplier`, `PropanePeriodicInitialAmountMultiplier` | 1 | Anfangsmenge in einer Quelle. |
| `...PeriodicMaxAmountMultiplier` (Wasser, Benzin, Propan) | 1 | Höchstmenge in einer Quelle. |
| `...PeriodicReplenishAmountMultiplier` und `...PeriodicReplenishIntervalMultiplier` | 1 | Menge und Geschwindigkeit der Auffüllung im Zeitverlauf. |
| `...ProximityReplenishAmountMultiplier`, `...ProximityReplenishChanceMultiplier`, `...ProximityReplenishTimeoutMultiplier` | 1 | Auffüllung, wenn ein Spieler in der Nähe ist. |

## :material-clipboard-text: Quests

| Einstellung | Wert | Wirkung |
|---|---|---|
| `QuestsEnabled` | True | Quests sind verfügbar. |
| `MaxQuestsPerCyclePerTrader` | 5 | Quests, die ein Spieler pro Händler und Zyklus annehmen kann. |
| `MaxSimultaneousQuestsPerTrader` | 2 | Gleichzeitig aktive Quests pro Händler. |
| `QuestsGlobalCycleDuration` | 23:59:59 | Dauer eines Quest-Zyklus. |
| `QuestsTraderRefillCooldown` | 03:00:00 | Händler-Quests werden alle 3 Stunden aufgefüllt. |
| `QuestsPhoneRefillCooldown` | 01:00:00 | Telefon-Quests werden jede Stunde aufgefüllt. |
| `QuestsNoticeBoardRefillCooldown` | 02:00:00 | Quests am Schwarzen Brett werden alle 2 Stunden aufgefüllt. |
| `QuestRequirementsBlockTradeableItems` | False | Quest-Gegenstände können weiterhin gehandelt werden. |

## :material-account-edit: Dienste

| Einstellung | Wert | Wirkung |
|---|---|---|
| `NameChangeCost` | 500 | Preis für die Namensänderung eines Charakters. |
| `NameChangeCooldown` | 168 | Stunden zwischen zwei Namensänderungen. |
| `DisableTimedGifts` | False | Saisonale Geschenke bleiben aktiv. |
| `EnableDeenaOnServer` | True | Deena ist aktiv. |

---

[Alle Einstellungsseiten](overview.md#every-setting-explained) | [Vollständige Werteliste](all-settings.md)
