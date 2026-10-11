<div class="fl-page-hero fl-bg-e" markdown>

:material-shield-account:

# Sopravvivenza

<p>Uno strato leggero sopra il PvP: le notti sono brevi, le faccende sono piccole e i veicoli sono limitati.</p>

</div>

<div class="fl-facts">
<div><b>05:00</b><span>Alba</span></div>
<div><b>22:30</b><span>Tramonto</span></div>
<div><b>x0.5</b><span>Consumo di carburante</span></div>
<div><b>10 giorni</b><span>Prima che un veicolo inutilizzato venga rimosso</span></div>
</div>


## :material-weather-night: Giorno e notte

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `StartTimeOfDay` | 08:00:00 | Ora di gioco all'avvio del server. |
| `TimeOfDaySpeed` | 3.84 | Il tempo di gioco scorre 3,84 volte più veloce del tempo reale (un giorno intero dura circa 6 h 15 min). |
| `SunriseTime` | 05:00:00 | Alba. |
| `SunsetTime` | 22:30:00 | Tramonto. |
| `NighttimeDarkness` | 0 | Livello di oscurità della notte, impostato al valore più basso per le notti più luminose. |
| `EnableFog` | True | La nebbia viene mostrata. |

## :material-heart-pulse: Corpo e oggetti

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `BodySimulationSpeedMultiplier` | 2.5 | Velocità della digestione e degli altri processi del corpo. |
| `StaminaDrainOnJumpMultiplier` | 0.5 | Costo di resistenza di un salto. |
| `StaminaDrainOnClimbMultiplier` | 0.5 | Costo di resistenza di una scalata. |
| `DisableExhaustion` | False | L'esaurimento si accumula normalmente. |
| `ItemDecayDamageMultiplier` | 0.5 | Velocità con cui gli oggetti si consumano nel tempo. |
| `FoodDecayDamageMultiplier` | 0.5 | Velocità con cui il cibo si deteriora. |
| `WeaponDecayDamageOnFiring` | 0.5 | Usura dell'arma a ogni colpo. |
| `MaintainItemsExpirationTime` | 360:00:00 | Tempo prima che scadano gli oggetti di manutenzione non toccati (letti e simili). |
| `BedrollVisibilityTimer` | 1 | Tempo in cui un sacco a pelo resta visibile agli altri dopo la disconnessione. |
| `RadiationEnabled` | True | Le zone di radiazione sono attive. |

## :material-car: Veicoli

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `BicycleMaxAmount` | 40 | Biciclette sulla mappa. |
| `RagerMaxAmount`, `WolfswagenMaxAmount`, `LaikaMaxAmount`, `RisMaxAmount`, `TractorMaxAmount`, `SidecarBikeMaxAmount` | 10 | Massimo di ogni modello. |
| `CruiserMaxAmount` | 15 | Cruiser sulla mappa. |
| `RagerMaxFunctionalAmount`, `WolfswagenMaxFunctionalAmount`, `LaikaMaxFunctionalAmount`, `RisMaxFunctionalAmount`, `SidecarBikeMaxFunctionalAmount` | 8 | Massimo con il motore funzionante. |
| `CruiserMaxFunctionalAmount` | 12 | Cruiser con il motore funzionante. |
| `DirtbikeMaxAmount` / `DirtbikeMaxFunctionalAmount` | 20 / 15 | Moto da cross. |
| `MotorboatMaxAmount`, `DinghyMaxAmount`, `SUPMaxAmount` | 11, 14, 20 | Barche e tavole da paddle. |
| `WheelbarrowMaxAmount` | 20 | Carriole. |
| `KingletDusterMaxAmount`, `KingletMarinerMaxAmount` | 2, 1 | Aerei. |
| `...MinPurchasedAmount` (tutti i veicoli) | 5 (Carriola 10, Kinglet Mariner e Duster 0) | Numero minimo disponibile presso i mercanti. |
| `MaximumTimeOfVehicleInactivity` | 240:00:00 | Un veicolo inutilizzato viene rimosso dopo 10 giorni. |
| `MaximumTimeForVehiclesInForbiddenZones` | 02:00:00 | I veicoli lasciati nelle zone vietate vengono rimossi dopo 2 ore. |

## :material-car-battery: Carburante e batterie dei veicoli

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `FuelDrainFromEngineMultiplier` | 0.5 | Consumo di carburante dei motori. |
| `BatteryDrainFromEngineMultiplier` | 0.1 | Consumo di batteria dei motori. |
| `BatteryDrainFromDevicesMultiplier` | 0.7 | Consumo di batteria dei dispositivi elettrici. |
| `BatteryDrainFromInactivityMultiplier` | 0.3 | Consumo di batteria da fermo. |
| `BatteryChargeWithAlternatorMultiplier` | 1.5 | Velocità di carica con un alternatore. |
| `BatteryChargeWithDynamoMultiplier` | 1.5 | Velocità di carica con un generatore. |

## :material-paw: Animali

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `AreAnimalsAllowedInWorld` | True | Gli animali esistono nel mondo. |
| `AnimalGlobalDensityMultiplier` | 1 | Densità complessiva degli animali. |
| `MaxNonVirtualAnimalsInWorld` | 350 | Animali attivi contemporaneamente. |
| `RabbitPrevalenceMultiplier` | 5 | Conigli. |
| `DeerPrevalenceMultiplier`, `GoatPrevalenceMultiplier` | 3 | Cervi e capre. |
| `DonkeyPrevalenceMultiplier` | 2 | Asini. |
| `BoarPrevalenceMultiplier` | 1.5 | Cinghiali. |
| `ChickenPrevalenceMultiplier`, `HorsePrevalenceMultiplier` | 1 | Galline e cavalli. |
| `BearPrevalenceMultiplier`, `WolfPrevalenceMultiplier` | 0.5 | Orsi e lupi. |
| `...MaxHealthMultiplier` (tutti gli animali) | 1 | Salute degli animali. |
| `MaxAllowedBirds` | 15 | Uccelli (questa impostazione al momento non ha alcun effetto nel gioco). |

---

[Tutte le pagine delle impostazioni](overview.md#every-setting-explained) | [Elenco completo dei valori](all-settings.md)
