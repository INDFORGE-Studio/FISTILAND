<div class="fl-page-hero fl-bg-e" markdown>

:material-shield-account:

# Survival

<p>A light layer on top of the PvP: nights are short, chores are small and vehicles are limited.</p>

</div>

<div class="fl-facts">
<div><b>05:00</b><span>Sunrise</span></div>
<div><b>22:30</b><span>Sunset</span></div>
<div><b>x0.5</b><span>Fuel use</span></div>
<div><b>10 days</b><span>Before an unused vehicle is removed</span></div>
</div>


## :material-weather-night: Day and night

| Setting | Value | What it does |
|---|---|---|
| `StartTimeOfDay` | 08:00:00 | In-game time when the server starts. |
| `TimeOfDaySpeed` | 3.84 | In-game time runs 3.84 times faster than real time (a full day lasts about 6 h 15 min). |
| `SunriseTime` | 05:00:00 | Sunrise. |
| `SunsetTime` | 22:30:00 | Sunset. |
| `NighttimeDarkness` | 0 | Night darkness level, set to the lowest value for the brightest nights. |
| `EnableFog` | True | Fog is rendered. |

## :material-heart-pulse: Body and items

| Setting | Value | What it does |
|---|---|---|
| `BodySimulationSpeedMultiplier` | 2.5 | Speed of digestion and other body processes. |
| `StaminaDrainOnJumpMultiplier` | 0.5 | Stamina cost of jumping. |
| `StaminaDrainOnClimbMultiplier` | 0.5 | Stamina cost of climbing. |
| `DisableExhaustion` | False | Exhaustion builds up normally. |
| `ItemDecayDamageMultiplier` | 0.5 | Speed at which items wear out over time. |
| `FoodDecayDamageMultiplier` | 0.5 | Speed at which food spoils. |
| `WeaponDecayDamageOnFiring` | 0.5 | Weapon wear per shot. |
| `MaintainItemsExpirationTime` | 360:00:00 | Time before untouched maintenance items (beds and similar) expire. |
| `BedrollVisibilityTimer` | 1 | Time a sleeping bag stays visible to others after logout. |
| `RadiationEnabled` | True | Radiation zones are active. |

## :material-car: Vehicles

| Setting | Value | What it does |
|---|---|---|
| `BicycleMaxAmount` | 40 | Bicycles on the map. |
| `RagerMaxAmount`, `WolfswagenMaxAmount`, `LaikaMaxAmount`, `RisMaxAmount`, `TractorMaxAmount`, `SidecarBikeMaxAmount` | 10 | Maximum of each model. |
| `CruiserMaxAmount` | 15 | Cruisers on the map. |
| `RagerMaxFunctionalAmount`, `WolfswagenMaxFunctionalAmount`, `LaikaMaxFunctionalAmount`, `RisMaxFunctionalAmount`, `SidecarBikeMaxFunctionalAmount` | 8 | Maximum with a working engine. |
| `CruiserMaxFunctionalAmount` | 12 | Cruisers with a working engine. |
| `DirtbikeMaxAmount` / `DirtbikeMaxFunctionalAmount` | 20 / 15 | Dirt bikes. |
| `MotorboatMaxAmount`, `DinghyMaxAmount`, `SUPMaxAmount` | 11, 14, 20 | Boats and paddle boards. |
| `WheelbarrowMaxAmount` | 20 | Wheelbarrows. |
| `KingletDusterMaxAmount`, `KingletMarinerMaxAmount` | 2, 1 | Aircraft. |
| `...MinPurchasedAmount` (all vehicles) | 5 (Wheelbarrow 10, Kinglet Mariner and Duster 0) | Minimum number available at traders. |
| `MaximumTimeOfVehicleInactivity` | 240:00:00 | An unused vehicle is removed after 10 days. |
| `MaximumTimeForVehiclesInForbiddenZones` | 02:00:00 | Vehicles left in forbidden zones are removed after 2 hours. |

## :material-car-battery: Vehicle fuel and batteries

| Setting | Value | What it does |
|---|---|---|
| `FuelDrainFromEngineMultiplier` | 0.5 | Fuel use by engines. |
| `BatteryDrainFromEngineMultiplier` | 0.1 | Battery use by engines. |
| `BatteryDrainFromDevicesMultiplier` | 0.7 | Battery use by electrical devices. |
| `BatteryDrainFromInactivityMultiplier` | 0.3 | Battery use while idle. |
| `BatteryChargeWithAlternatorMultiplier` | 1.5 | Charging speed from an alternator. |
| `BatteryChargeWithDynamoMultiplier` | 1.5 | Charging speed from a generator. |

## :material-paw: Animals

| Setting | Value | What it does |
|---|---|---|
| `AreAnimalsAllowedInWorld` | True | Animals exist in the world. |
| `AnimalGlobalDensityMultiplier` | 1 | Overall animal density. |
| `MaxNonVirtualAnimalsInWorld` | 350 | Animals active at the same time. |
| `RabbitPrevalenceMultiplier` | 5 | Rabbits. |
| `DeerPrevalenceMultiplier`, `GoatPrevalenceMultiplier` | 3 | Deer and goats. |
| `DonkeyPrevalenceMultiplier` | 2 | Donkeys. |
| `BoarPrevalenceMultiplier` | 1.5 | Boars. |
| `ChickenPrevalenceMultiplier`, `HorsePrevalenceMultiplier` | 1 | Chickens and horses. |
| `BearPrevalenceMultiplier`, `WolfPrevalenceMultiplier` | 0.5 | Bears and wolves. |
| `...MaxHealthMultiplier` (all animals) | 1 | Animal health. |
| `MaxAllowedBirds` | 15 | Birds (this setting currently has no effect in the game). |

---

[All server settings pages](overview.md#every-setting-explained) | [Full list of values](all-settings.md)
