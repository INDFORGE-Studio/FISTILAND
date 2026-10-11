<div class="fl-page-hero fl-bg-e" markdown>

:material-shield-account:

# Виживання

<p>Легкий шар поверх PvP: ночі короткі, клопоти невеликі, а транспорт обмежений.</p>

</div>

<div class="fl-facts">
<div><b>05:00</b><span>Схід сонця</span></div>
<div><b>22:30</b><span>Захід сонця</span></div>
<div><b>x0.5</b><span>Витрата пального</span></div>
<div><b>10 днів</b><span>До прибирання невикористаного транспорту</span></div>
</div>


## :material-weather-night: День і ніч

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `StartTimeOfDay` | 08:00:00 | Ігровий час під час запуску сервера. |
| `TimeOfDaySpeed` | 3.84 | Ігровий час іде в 3,84 раза швидше за реальний (повна доба триває близько 6 год 15 хв). |
| `SunriseTime` | 05:00:00 | Схід сонця. |
| `SunsetTime` | 22:30:00 | Захід сонця. |
| `NighttimeDarkness` | 0 | Рівень темряви вночі, встановлений на найнижче значення для найсвітліших ночей. |
| `EnableFog` | True | Туман відображається. |

## :material-heart-pulse: Тіло та предмети

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `BodySimulationSpeedMultiplier` | 2.5 | Швидкість травлення та інших процесів у тілі. |
| `StaminaDrainOnJumpMultiplier` | 0.5 | Витрата витривалості на стрибок. |
| `StaminaDrainOnClimbMultiplier` | 0.5 | Витрата витривалості на лазіння. |
| `DisableExhaustion` | False | Виснаження накопичується як зазвичай. |
| `ItemDecayDamageMultiplier` | 0.5 | Швидкість зношування предметів з часом. |
| `FoodDecayDamageMultiplier` | 0.5 | Швидкість псування їжі. |
| `WeaponDecayDamageOnFiring` | 0.5 | Знос зброї за постріл. |
| `MaintainItemsExpirationTime` | 360:00:00 | Час до закінчення терміну дії недоторканих предметів догляду (ліжка тощо). |
| `BedrollVisibilityTimer` | 1 | Час, упродовж якого спальний мішок лишається видимим іншим після виходу з гри. |
| `RadiationEnabled` | True | Зони радіації активні. |

## :material-car: Транспорт

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `BicycleMaxAmount` | 40 | Велосипеди на мапі. |
| `RagerMaxAmount`, `WolfswagenMaxAmount`, `LaikaMaxAmount`, `RisMaxAmount`, `TractorMaxAmount`, `SidecarBikeMaxAmount` | 10 | Максимум кожної моделі. |
| `CruiserMaxAmount` | 15 | Cruiser на мапі. |
| `RagerMaxFunctionalAmount`, `WolfswagenMaxFunctionalAmount`, `LaikaMaxFunctionalAmount`, `RisMaxFunctionalAmount`, `SidecarBikeMaxFunctionalAmount` | 8 | Максимум із робочим двигуном. |
| `CruiserMaxFunctionalAmount` | 12 | Cruiser із робочим двигуном. |
| `DirtbikeMaxAmount` / `DirtbikeMaxFunctionalAmount` | 20 / 15 | Кросові мотоцикли. |
| `MotorboatMaxAmount`, `DinghyMaxAmount`, `SUPMaxAmount` | 11, 14, 20 | Човни та дошки для SUP. |
| `WheelbarrowMaxAmount` | 20 | Тачки. |
| `KingletDusterMaxAmount`, `KingletMarinerMaxAmount` | 2, 1 | Літаки. |
| `...MinPurchasedAmount` (увесь транспорт) | 5 (Тачка 10, Kinglet Mariner і Duster 0) | Мінімальна кількість у торговців. |
| `MaximumTimeOfVehicleInactivity` | 240:00:00 | Невикористаний транспорт прибирається через 10 днів. |
| `MaximumTimeForVehiclesInForbiddenZones` | 02:00:00 | Транспорт, залишений у заборонених зонах, прибирається через 2 години. |

## :material-car-battery: Пальне та акумулятори транспорту

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `FuelDrainFromEngineMultiplier` | 0.5 | Витрата пального двигунами. |
| `BatteryDrainFromEngineMultiplier` | 0.1 | Розряд акумулятора двигунами. |
| `BatteryDrainFromDevicesMultiplier` | 0.7 | Розряд акумулятора електричними пристроями. |
| `BatteryDrainFromInactivityMultiplier` | 0.3 | Розряд акумулятора в простої. |
| `BatteryChargeWithAlternatorMultiplier` | 1.5 | Швидкість заряджання від генератора двигуна. |
| `BatteryChargeWithDynamoMultiplier` | 1.5 | Швидкість заряджання від динамо-генератора. |

## :material-paw: Тварини

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `AreAnimalsAllowedInWorld` | True | Тварини існують у світі. |
| `AnimalGlobalDensityMultiplier` | 1 | Загальна щільність тварин. |
| `MaxNonVirtualAnimalsInWorld` | 350 | Одночасно активні тварини. |
| `RabbitPrevalenceMultiplier` | 5 | Кролики. |
| `DeerPrevalenceMultiplier`, `GoatPrevalenceMultiplier` | 3 | Олені та кози. |
| `DonkeyPrevalenceMultiplier` | 2 | Віслюки. |
| `BoarPrevalenceMultiplier` | 1.5 | Дикі кабани. |
| `ChickenPrevalenceMultiplier`, `HorsePrevalenceMultiplier` | 1 | Кури та коні. |
| `BearPrevalenceMultiplier`, `WolfPrevalenceMultiplier` | 0.5 | Ведмеді та вовки. |
| `...MaxHealthMultiplier` (усі тварини) | 1 | Здоров'я тварин. |
| `MaxAllowedBirds` | 15 | Птахи (це налаштування наразі не діє в грі). |

---

[Усі сторінки налаштувань](overview.md#every-setting-explained) | [Повний список значень](all-settings.md)
