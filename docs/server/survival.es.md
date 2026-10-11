<div class="fl-page-hero fl-bg-e" markdown>

:material-shield-account:

# Supervivencia

<p>Una capa ligera sobre el PvP: las noches son cortas, las tareas son pequeñas y los vehículos están limitados.</p>

</div>

<div class="fl-facts">
<div><b>05:00</b><span>Amanecer</span></div>
<div><b>22:30</b><span>Atardecer</span></div>
<div><b>x0.5</b><span>Consumo de combustible</span></div>
<div><b>10 días</b><span>Hasta que se retira un vehículo sin usar</span></div>
</div>


## :material-weather-night: Día y noche

| Ajuste | Valor | Qué hace |
|---|---|---|
| `StartTimeOfDay` | 08:00:00 | Hora del juego al iniciar el servidor. |
| `TimeOfDaySpeed` | 3.84 | El tiempo del juego corre 3,84 veces más rápido que el tiempo real (un día completo dura unas 6 h 15 min). |
| `SunriseTime` | 05:00:00 | Amanecer. |
| `SunsetTime` | 22:30:00 | Atardecer. |
| `NighttimeDarkness` | 0 | Nivel de oscuridad de la noche, fijado en el valor más bajo para las noches más claras. |
| `EnableFog` | True | Se muestra la niebla. |

## :material-heart-pulse: Cuerpo y objetos

| Ajuste | Valor | Qué hace |
|---|---|---|
| `BodySimulationSpeedMultiplier` | 2.5 | Velocidad de la digestión y otros procesos del cuerpo. |
| `StaminaDrainOnJumpMultiplier` | 0.5 | Coste de resistencia al saltar. |
| `StaminaDrainOnClimbMultiplier` | 0.5 | Coste de resistencia al trepar. |
| `DisableExhaustion` | False | El agotamiento se acumula con normalidad. |
| `ItemDecayDamageMultiplier` | 0.5 | Velocidad a la que se desgastan los objetos con el tiempo. |
| `FoodDecayDamageMultiplier` | 0.5 | Velocidad a la que se estropea la comida. |
| `WeaponDecayDamageOnFiring` | 0.5 | Desgaste del arma por disparo. |
| `MaintainItemsExpirationTime` | 360:00:00 | Tiempo hasta que caducan los objetos de mantenimiento sin tocar (camas y similares). |
| `BedrollVisibilityTimer` | 1 | Tiempo que un saco de dormir sigue visible para otros tras desconectarse. |
| `RadiationEnabled` | True | Las zonas de radiación están activas. |

## :material-car: Vehículos

| Ajuste | Valor | Qué hace |
|---|---|---|
| `BicycleMaxAmount` | 40 | Bicicletas en el mapa. |
| `RagerMaxAmount`, `WolfswagenMaxAmount`, `LaikaMaxAmount`, `RisMaxAmount`, `TractorMaxAmount`, `SidecarBikeMaxAmount` | 10 | Máximo de cada modelo. |
| `CruiserMaxAmount` | 15 | Cruiser en el mapa. |
| `RagerMaxFunctionalAmount`, `WolfswagenMaxFunctionalAmount`, `LaikaMaxFunctionalAmount`, `RisMaxFunctionalAmount`, `SidecarBikeMaxFunctionalAmount` | 8 | Máximo con el motor en marcha. |
| `CruiserMaxFunctionalAmount` | 12 | Cruiser con el motor en marcha. |
| `DirtbikeMaxAmount` / `DirtbikeMaxFunctionalAmount` | 20 / 15 | Motos de cross. |
| `MotorboatMaxAmount`, `DinghyMaxAmount`, `SUPMaxAmount` | 11, 14, 20 | Barcos y tablas de paddle. |
| `WheelbarrowMaxAmount` | 20 | Carretillas. |
| `KingletDusterMaxAmount`, `KingletMarinerMaxAmount` | 2, 1 | Aeronaves. |
| `...MinPurchasedAmount` (todos los vehículos) | 5 (Carretilla 10, Kinglet Mariner y Duster 0) | Mínimo disponible en los comerciantes. |
| `MaximumTimeOfVehicleInactivity` | 240:00:00 | Un vehículo sin usar se retira a los 10 días. |
| `MaximumTimeForVehiclesInForbiddenZones` | 02:00:00 | Los vehículos dejados en zonas prohibidas se retiran a las 2 horas. |

## :material-car-battery: Combustible y baterías de los vehículos

| Ajuste | Valor | Qué hace |
|---|---|---|
| `FuelDrainFromEngineMultiplier` | 0.5 | Consumo de combustible de los motores. |
| `BatteryDrainFromEngineMultiplier` | 0.1 | Consumo de batería de los motores. |
| `BatteryDrainFromDevicesMultiplier` | 0.7 | Consumo de batería de los aparatos eléctricos. |
| `BatteryDrainFromInactivityMultiplier` | 0.3 | Consumo de batería en reposo. |
| `BatteryChargeWithAlternatorMultiplier` | 1.5 | Velocidad de carga con un alternador. |
| `BatteryChargeWithDynamoMultiplier` | 1.5 | Velocidad de carga con un generador. |

## :material-paw: Animales

| Ajuste | Valor | Qué hace |
|---|---|---|
| `AreAnimalsAllowedInWorld` | True | Los animales existen en el mundo. |
| `AnimalGlobalDensityMultiplier` | 1 | Densidad global de animales. |
| `MaxNonVirtualAnimalsInWorld` | 350 | Animales activos a la vez. |
| `RabbitPrevalenceMultiplier` | 5 | Conejos. |
| `DeerPrevalenceMultiplier`, `GoatPrevalenceMultiplier` | 3 | Ciervos y cabras. |
| `DonkeyPrevalenceMultiplier` | 2 | Burros. |
| `BoarPrevalenceMultiplier` | 1.5 | Jabalíes. |
| `ChickenPrevalenceMultiplier`, `HorsePrevalenceMultiplier` | 1 | Gallinas y caballos. |
| `BearPrevalenceMultiplier`, `WolfPrevalenceMultiplier` | 0.5 | Osos y lobos. |
| `...MaxHealthMultiplier` (todos los animales) | 1 | Salud de los animales. |
| `MaxAllowedBirds` | 15 | Aves (este ajuste no tiene ningún efecto actualmente en el juego). |

---

[Todas las páginas de ajustes](overview.md#every-setting-explained) | [Lista completa de valores](all-settings.md)
