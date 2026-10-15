<div class="fl-page-hero fl-bg-c" markdown>

:material-tag-multiple:

# Ekonomia

<p>Lootu jest pod dostatkiem, a handlarze są tani, więc skompletujesz sprzęt w kilka godzin.</p>

</div>

<div class="fl-facts">
<div><b>x5</b><span>Loot</span></div>
<div><b>60 min</b><span>Odnowienie lootu, gdy nikogo nie ma w pobliżu</span></div>
<div><b>x0.5</b><span>Cena paliwa i wody</span></div>
<div><b>5</b><span>Zadań na handlarza w cyklu</span></div>
<div><b>2</b><span>Aktywne zadania na handlarza</span></div>
</div>


## :material-treasure-chest: Loot i odnawianie lootu

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `SpawnerProbabilityMultiplier` | 5 | Szansa, że przedmioty pojawią się w świecie (loot x5). |
| `ExamineSpawnerProbabilityMultiplier` | 5 | Szansa, że przeszukany pojemnik da przedmiot. |
| `SpawnerExpirationTimeMultiplier` | 1 | Czas odnowienia lootu: źródło w świecie losuje nowy loot po 60 minutach (x1), jeśli żaden gracz nie jest w promieniu 50 m. |
| `ExamineSpawnerExpirationTimeMultiplier` | 1 | To samo dla przeszukanych pojemników: decydują ponownie po 60 minutach (x1), jeśli żaden gracz nie jest w promieniu 50 m. |
| `EnableItemCooldownGroups` | True | Rzadkie przedmioty dzielą grupy czasu odnowienia, co ogranicza farmienie przedmiotów. |
| `ItemCooldownGroupsDurationMultiplier` | 0.5 | Długość tych czasów odnowienia. |
| `EnableLockedLootContainers` | True | Szafki w świecie są zamknięte. |

## :material-gas-station: Paliwo, woda i gaz na stacjach

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `WaterPricePerUnitMultiplier` | 0.5 | Cena wody. |
| `GasolinePricePerUnitMultiplier` | 0.5 | Cena paliwa za litr. |
| `PropanePricePerUnitMultiplier` | 5 | Cena propanu za litr. |
| `WaterPeriodicInitialAmountMultiplier`, `GasolinePeriodicInitialAmountMultiplier`, `PropanePeriodicInitialAmountMultiplier` | 1 | Początkowa ilość w źródle. |
| `...PeriodicMaxAmountMultiplier` (woda, benzyna, propan) | 1 | Maksymalna ilość w źródle. |
| `...PeriodicReplenishAmountMultiplier` i `...PeriodicReplenishIntervalMultiplier` | 1 | Ilość i tempo uzupełniania w czasie. |
| `...ProximityReplenishAmountMultiplier`, `...ProximityReplenishChanceMultiplier`, `...ProximityReplenishTimeoutMultiplier` | 1 | Uzupełnianie, gdy gracz jest w pobliżu. |

## :material-clipboard-text: Zadania

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `QuestsEnabled` | True | Zadania są dostępne. |
| `MaxQuestsPerCyclePerTrader` | 5 | Zadania, które gracz może przyjąć od jednego handlarza w cyklu. |
| `MaxSimultaneousQuestsPerTrader` | 2 | Zadania aktywne jednocześnie u jednego handlarza. |
| `QuestsGlobalCycleDuration` | 23:59:59 | Długość jednego cyklu zadań. |
| `QuestsTraderRefillCooldown` | 03:00:00 | Zadania handlarzy odnawiają się co 3 godziny. |
| `QuestsPhoneRefillCooldown` | 01:00:00 | Zadania z telefonu odnawiają się co godzinę. |
| `QuestsNoticeBoardRefillCooldown` | 02:00:00 | Zadania z tablicy ogłoszeń odnawiają się co 2 godziny. |
| `QuestRequirementsBlockTradeableItems` | False | Przedmioty z zadań nadal można wymieniać. |

## :material-account-edit: Usługi

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `NameChangeCost` | 500 | Cena zmiany nazwy postaci. |
| `NameChangeCooldown` | 168 | Godziny między zmianami nazwy. |
| `DisableTimedGifts` | False | Sezonowe prezenty pozostają aktywne. |
| `EnableDeenaOnServer` | True | Deena jest aktywna. |

---

[Wszystkie strony ustawień serwera](overview.md#every-setting-explained) | [Pełna lista wartości](all-settings.md)
