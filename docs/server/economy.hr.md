<div class="fl-page-hero fl-bg-c" markdown>

:material-tag-multiple:

# Ekonomija

<p>Loota ima u izobilju, a trgovci su jeftini, pa se opremiš za nekoliko sati.</p>

</div>

<div class="fl-facts">
<div><b>x5</b><span>Loot</span></div>
<div><b>60 min</b><span>Obnova loota kad nikoga nema u blizini</span></div>
<div><b>x0.5</b><span>Cijena goriva i vode</span></div>
<div><b>5</b><span>Zadataka po trgovcu po ciklusu</span></div>
<div><b>2</b><span>Aktivna zadatka po trgovcu</span></div>
</div>


## :material-treasure-chest: Loot i obnova loota

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `SpawnerProbabilityMultiplier` | 5 | Šansa da se predmeti pojave u svijetu (loot x5). |
| `ExamineSpawnerProbabilityMultiplier` | 5 | Šansa da pregledani spremnik da predmet. |
| `SpawnerExpirationTimeMultiplier` | 1 | Vrijeme obnove loota: izvor u svijetu ponovno baca za novi loot nakon 60 minuta (x1) ako nijedan igrač nije unutar 50 m. |
| `ExamineSpawnerExpirationTimeMultiplier` | 1 | Isto za pregledane spremnike: ponovno odlučuju nakon 60 minuta (x1) ako nijedan igrač nije unutar 50 m. |
| `EnableItemCooldownGroups` | True | Rijetki predmeti dijele skupine čekanja, što ograničava farmanje predmeta. |
| `ItemCooldownGroupsDurationMultiplier` | 0.5 | Trajanje tih čekanja. |
| `EnableLockedLootContainers` | True | Ormarići u svijetu su zaključani. |

## :material-gas-station: Gorivo, voda i plin na postajama

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `WaterPricePerUnitMultiplier` | 0.5 | Cijena vode. |
| `GasolinePricePerUnitMultiplier` | 0.5 | Cijena goriva po litri. |
| `PropanePricePerUnitMultiplier` | 5 | Cijena propana po litri. |
| `WaterPeriodicInitialAmountMultiplier`, `GasolinePeriodicInitialAmountMultiplier`, `PropanePeriodicInitialAmountMultiplier` | 1 | Početna količina u izvoru. |
| `...PeriodicMaxAmountMultiplier` (voda, benzin, propan) | 1 | Najveća količina u izvoru. |
| `...PeriodicReplenishAmountMultiplier` i `...PeriodicReplenishIntervalMultiplier` | 1 | Količina i brzina nadopunjavanja tijekom vremena. |
| `...ProximityReplenishAmountMultiplier`, `...ProximityReplenishChanceMultiplier`, `...ProximityReplenishTimeoutMultiplier` | 1 | Nadopunjavanje kad je igrač u blizini. |

## :material-clipboard-text: Zadaci

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `QuestsEnabled` | True | Zadaci su dostupni. |
| `MaxQuestsPerCyclePerTrader` | 5 | Zadaci koje igrač može prihvatiti po trgovcu po ciklusu. |
| `MaxSimultaneousQuestsPerTrader` | 2 | Zadaci aktivni istodobno po trgovcu. |
| `QuestsGlobalCycleDuration` | 23:59:59 | Trajanje jednog ciklusa zadataka. |
| `QuestsTraderRefillCooldown` | 03:00:00 | Zadaci trgovaca obnavljaju se svaka 3 sata. |
| `QuestsPhoneRefillCooldown` | 01:00:00 | Zadaci s telefona obnavljaju se svaki sat. |
| `QuestsNoticeBoardRefillCooldown` | 02:00:00 | Zadaci s oglasne ploče obnavljaju se svaka 2 sata. |
| `QuestRequirementsBlockTradeableItems` | False | Predmeti iz zadataka i dalje se mogu mijenjati. |

## :material-account-edit: Usluge

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `NameChangeCost` | 500 | Cijena promjene imena lika. |
| `NameChangeCooldown` | 168 | Sati između promjena imena. |
| `DisableTimedGifts` | False | Sezonski pokloni ostaju aktivni. |
| `EnableDeenaOnServer` | True | Deena je aktivna. |

---

[Sve stranice postavki poslužitelja](overview.md#every-setting-explained) | [Potpuni popis vrijednosti](all-settings.md)
