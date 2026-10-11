<div class="fl-page-hero fl-bg-c" markdown>

:material-tag-multiple:

# Економіка

<p>Луту вдосталь, а торговці дешеві, тож ви екіпіруєтесь за кілька годин.</p>

</div>

<div class="fl-facts">
<div><b>x5</b><span>Луту</span></div>
<div><b>60 хв</b><span>Повторна поява луту, коли поруч нікого немає</span></div>
<div><b>x0.5</b><span>Ціна пального та води</span></div>
<div><b>5</b><span>Завдань на торговця за цикл</span></div>
<div><b>2</b><span>Активні завдання на торговця</span></div>
</div>


## :material-treasure-chest: Лут і повторна поява луту

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `SpawnerProbabilityMultiplier` | 5 | Імовірність появи предметів у світі (лут x5). |
| `ExamineSpawnerProbabilityMultiplier` | 5 | Імовірність того, що оглянутий контейнер дасть предмет. |
| `SpawnerExpirationTimeMultiplier` | 1 | Час повторної появи луту: світовий спавнер перевіряє знову через 60 хвилин (x1), якщо в радіусі 50 м немає гравців. |
| `ExamineSpawnerExpirationTimeMultiplier` | 1 | Те саме для оглянутих контейнерів: вони вирішують знову через 60 хвилин (x1) без гравців у радіусі 50 м. |
| `EnableItemCooldownGroups` | True | Рідкісні предмети ділять групи перезарядки, що обмежує фарм предметів. |
| `ItemCooldownGroupsDurationMultiplier` | 0.5 | Тривалість цих перезарядок. |
| `EnableLockedLootContainers` | True | Шафки у світі замкнені. |

## :material-gas-station: Пальне, вода й газ на станціях

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `WaterPricePerUnitMultiplier` | 0.5 | Ціна води. |
| `GasolinePricePerUnitMultiplier` | 0.5 | Ціна пального за літр. |
| `PropanePricePerUnitMultiplier` | 5 | Ціна пропану за літр. |
| `WaterPeriodicInitialAmountMultiplier`, `GasolinePeriodicInitialAmountMultiplier`, `PropanePeriodicInitialAmountMultiplier` | 1 | Початкова кількість у джерелі. |
| `...PeriodicMaxAmountMultiplier` (вода, бензин, пропан) | 1 | Максимальна кількість у джерелі. |
| `...PeriodicReplenishAmountMultiplier` та `...PeriodicReplenishIntervalMultiplier` | 1 | Кількість і швидкість поповнення з часом. |
| `...ProximityReplenishAmountMultiplier`, `...ProximityReplenishChanceMultiplier`, `...ProximityReplenishTimeoutMultiplier` | 1 | Поповнення, коли поруч гравець. |

## :material-clipboard-text: Завдання

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `QuestsEnabled` | True | Завдання доступні. |
| `MaxQuestsPerCyclePerTrader` | 5 | Завдання, які гравець може прийняти в одного торговця за цикл. |
| `MaxSimultaneousQuestsPerTrader` | 2 | Одночасно активні завдання на торговця. |
| `QuestsGlobalCycleDuration` | 23:59:59 | Тривалість одного циклу завдань. |
| `QuestsTraderRefillCooldown` | 03:00:00 | Завдання торговців оновлюються кожні 3 години. |
| `QuestsPhoneRefillCooldown` | 01:00:00 | Завдання по телефону оновлюються щогодини. |
| `QuestsNoticeBoardRefillCooldown` | 02:00:00 | Завдання на дошках оголошень оновлюються кожні 2 години. |
| `QuestRequirementsBlockTradeableItems` | False | Предмети завдань усе ще можна обмінювати. |

## :material-account-edit: Послуги

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `NameChangeCost` | 500 | Ціна зміни імені персонажа. |
| `NameChangeCooldown` | 168 | Години між змінами імені. |
| `DisableTimedGifts` | False | Сезонні подарунки лишаються активними. |
| `EnableDeenaOnServer` | True | Deena активна. |

---

[Усі сторінки налаштувань](overview.md#every-setting-explained) | [Повний список значень](all-settings.md)
