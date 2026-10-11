<div class="fl-page-hero fl-bg-c" markdown>

:material-tag-multiple:

# Economía

<p>El botín es abundante y los comerciantes son baratos, así que te equipas en pocas horas.</p>

</div>

<div class="fl-facts">
<div><b>x5</b><span>Loot</span></div>
<div><b>60 min</b><span>Reaparición del botín cuando no hay nadie cerca</span></div>
<div><b>x0.5</b><span>Precio del combustible y el agua</span></div>
<div><b>5</b><span>Misiones por comerciante y ciclo</span></div>
<div><b>2</b><span>Misiones activas por comerciante</span></div>
</div>


## :material-treasure-chest: Botín y reaparición del botín

| Ajuste | Valor | Qué hace |
|---|---|---|
| `SpawnerProbabilityMultiplier` | 5 | Probabilidad de que aparezcan objetos sueltos en el mundo (el loot x5). |
| `ExamineSpawnerProbabilityMultiplier` | 5 | Probabilidad de que un contenedor examinado dé un objeto. |
| `SpawnerExpirationTimeMultiplier` | 1 | Tiempo de reaparición del botín: un generador del mundo vuelve a tirar tras 60 minutos (x1) sin ningún jugador a menos de 50 m. |
| `ExamineSpawnerExpirationTimeMultiplier` | 1 | Igual para los contenedores examinados: vuelven a decidir tras 60 minutos (x1) sin jugadores a menos de 50 m. |
| `EnableItemCooldownGroups` | True | Los objetos raros comparten grupos de enfriamiento, lo que limita el farmeo de objetos. |
| `ItemCooldownGroupsDurationMultiplier` | 0.5 | Duración de esos enfriamientos. |
| `EnableLockedLootContainers` | True | Las taquillas del mundo están cerradas con llave. |

## :material-gas-station: Combustible, agua y gas en las estaciones

| Ajuste | Valor | Qué hace |
|---|---|---|
| `WaterPricePerUnitMultiplier` | 0.5 | Precio del agua. |
| `GasolinePricePerUnitMultiplier` | 0.5 | Precio del combustible por litro. |
| `PropanePricePerUnitMultiplier` | 5 | Precio del propano por litro. |
| `WaterPeriodicInitialAmountMultiplier`, `GasolinePeriodicInitialAmountMultiplier`, `PropanePeriodicInitialAmountMultiplier` | 1 | Cantidad inicial en una fuente. |
| `...PeriodicMaxAmountMultiplier` (agua, gasolina, propano) | 1 | Cantidad máxima en una fuente. |
| `...PeriodicReplenishAmountMultiplier` y `...PeriodicReplenishIntervalMultiplier` | 1 | Cantidad y velocidad de recarga con el tiempo. |
| `...ProximityReplenishAmountMultiplier`, `...ProximityReplenishChanceMultiplier`, `...ProximityReplenishTimeoutMultiplier` | 1 | Recarga cuando hay un jugador cerca. |

## :material-clipboard-text: Misiones

| Ajuste | Valor | Qué hace |
|---|---|---|
| `QuestsEnabled` | True | Las misiones están disponibles. |
| `MaxQuestsPerCyclePerTrader` | 5 | Misiones que un jugador puede aceptar por comerciante y ciclo. |
| `MaxSimultaneousQuestsPerTrader` | 2 | Misiones activas a la vez por comerciante. |
| `QuestsGlobalCycleDuration` | 23:59:59 | Duración de un ciclo de misiones. |
| `QuestsTraderRefillCooldown` | 03:00:00 | Las misiones de los comerciantes se renuevan cada 3 horas. |
| `QuestsPhoneRefillCooldown` | 01:00:00 | Las misiones por teléfono se renuevan cada hora. |
| `QuestsNoticeBoardRefillCooldown` | 02:00:00 | Las misiones de los tablones de anuncios se renuevan cada 2 horas. |
| `QuestRequirementsBlockTradeableItems` | False | Los objetos de misión se pueden seguir intercambiando. |

## :material-account-edit: Servicios

| Ajuste | Valor | Qué hace |
|---|---|---|
| `NameChangeCost` | 500 | Precio por cambiar el nombre de un personaje. |
| `NameChangeCooldown` | 168 | Horas entre cambios de nombre. |
| `DisableTimedGifts` | False | Los regalos de temporada siguen activos. |
| `EnableDeenaOnServer` | True | Deena está activa. |

---

[Todas las páginas de ajustes](overview.md#every-setting-explained) | [Lista completa de valores](all-settings.md)
