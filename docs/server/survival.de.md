<div class="fl-page-hero fl-bg-e" markdown>

:material-shield-account:

# Überleben

<p>Eine leichte Schicht über dem PvP: Die Nächte sind kurz, die Pflichten klein und die Fahrzeuge begrenzt.</p>

</div>

<div class="fl-facts">
<div><b>05:00</b><span>Sonnenaufgang</span></div>
<div><b>22:30</b><span>Sonnenuntergang</span></div>
<div><b>x0.5</b><span>Treibstoffverbrauch</span></div>
<div><b>10 Tage</b><span>Bis ein ungenutztes Fahrzeug entfernt wird</span></div>
</div>


## :material-weather-night: Tag und Nacht

| Einstellung | Wert | Wirkung |
|---|---|---|
| `StartTimeOfDay` | 08:00:00 | Spielzeit beim Start des Servers. |
| `TimeOfDaySpeed` | 3.84 | Die Spielzeit läuft 3,84-mal schneller als die Echtzeit (ein ganzer Tag dauert etwa 6 h 15 min). |
| `SunriseTime` | 05:00:00 | Sonnenaufgang. |
| `SunsetTime` | 22:30:00 | Sonnenuntergang. |
| `NighttimeDarkness` | 0 | Dunkelheit der Nacht, auf dem Standardwert des Spiels belassen. Die Nächte bleiben dunkel, nehmt eine Lampe mit. |
| `EnableFog` | True | Nebel wird dargestellt. |

<div class="fl-day">
<div class="fl-day__bar" role="img" aria-label="00:00-05:00 , 05:00-22:30 , 22:30-24:00 "><i class="n1"></i><i class="d"></i><i class="n2"></i></div>
<div class="fl-day__ticks" aria-hidden="true"><span class="t0">00:00</span><span class="t1">05:00</span><span class="t2">22:30</span><span class="t3">24:00</span></div>
<div class="fl-facts">
<div><b>4 h 33</b><span></span></div>
<div><b>1 h 42</b><span></span></div>
<div><b>6 h 15</b><span></span></div>
</div>
</div>

## :material-heart-pulse: Körper und Gegenstände

| Einstellung | Wert | Wirkung |
|---|---|---|
| `BodySimulationSpeedMultiplier` | 2.5 | Geschwindigkeit der Verdauung und anderer Körperprozesse. |
| `StaminaDrainOnJumpMultiplier` | 0.5 | Ausdauerkosten beim Springen. |
| `StaminaDrainOnClimbMultiplier` | 0.5 | Ausdauerkosten beim Klettern. |
| `DisableExhaustion` | False | Erschöpfung baut sich normal auf. |
| `ItemDecayDamageMultiplier` | 0.5 | Geschwindigkeit, mit der sich Gegenstände mit der Zeit abnutzen. |
| `FoodDecayDamageMultiplier` | 0.5 | Geschwindigkeit, mit der Nahrung verdirbt. |
| `WeaponDecayDamageOnFiring` | 0.5 | Waffenverschleiß pro Schuss. |
| `MaintainItemsExpirationTime` | 360:00:00 | Zeit, bis unberührte Wartungsgegenstände (Betten und Ähnliches) ablaufen. |
| `BedrollVisibilityTimer` | 1 | Zeit, in der ein Schlafsack nach dem Abmelden für andere sichtbar bleibt. |
| `RadiationEnabled` | True | Strahlungszonen sind aktiv. |

## :material-car: Fahrzeuge

| Einstellung | Wert | Wirkung |
|---|---|---|
| `BicycleMaxAmount` | 40 | Fahrräder auf der Karte. |
| `RagerMaxAmount`, `WolfswagenMaxAmount`, `LaikaMaxAmount`, `RisMaxAmount`, `TractorMaxAmount`, `SidecarBikeMaxAmount` | 10 | Höchstzahl jedes Modells. |
| `CruiserMaxAmount` | 15 | Cruiser auf der Karte. |
| `RagerMaxFunctionalAmount`, `WolfswagenMaxFunctionalAmount`, `LaikaMaxFunctionalAmount`, `RisMaxFunctionalAmount`, `SidecarBikeMaxFunctionalAmount` | 8 | Höchstzahl mit funktionierendem Motor. |
| `CruiserMaxFunctionalAmount` | 12 | Cruiser mit funktionierendem Motor. |
| `DirtbikeMaxAmount` / `DirtbikeMaxFunctionalAmount` | 20 / 15 | Geländemotorräder. |
| `MotorboatMaxAmount`, `DinghyMaxAmount`, `SUPMaxAmount` | 11, 14, 20 | Boote und Stand-up-Paddleboards. |
| `WheelbarrowMaxAmount` | 20 | Schubkarren. |
| `KingletDusterMaxAmount`, `KingletMarinerMaxAmount` | 2, 1 | Luftfahrzeuge. |
| `...MinPurchasedAmount` (alle Fahrzeuge) | 5 (Schubkarre 10, Kinglet Mariner und Duster 0) | Mindestanzahl, die bei Händlern verfügbar ist. |
| `MaximumTimeOfVehicleInactivity` | 240:00:00 | Ein ungenutztes Fahrzeug wird nach 10 Tagen entfernt. |
| `MaximumTimeForVehiclesInForbiddenZones` | 02:00:00 | In Sperrzonen zurückgelassene Fahrzeuge werden nach 2 Stunden entfernt. |

## :material-car-battery: Treibstoff und Batterien von Fahrzeugen

| Einstellung | Wert | Wirkung |
|---|---|---|
| `FuelDrainFromEngineMultiplier` | 0.5 | Treibstoffverbrauch der Motoren. |
| `BatteryDrainFromEngineMultiplier` | 0.1 | Batterieverbrauch der Motoren. |
| `BatteryDrainFromDevicesMultiplier` | 0.7 | Batterieverbrauch elektrischer Geräte. |
| `BatteryDrainFromInactivityMultiplier` | 0.3 | Batterieverbrauch im Stillstand. |
| `BatteryChargeWithAlternatorMultiplier` | 1.5 | Ladegeschwindigkeit durch eine Lichtmaschine. |
| `BatteryChargeWithDynamoMultiplier` | 1.5 | Ladegeschwindigkeit durch einen Generator. |

## :material-paw: Tiere

| Einstellung | Wert | Wirkung |
|---|---|---|
| `AreAnimalsAllowedInWorld` | True | Tiere existieren in der Welt. |
| `AnimalGlobalDensityMultiplier` | 1 | Gesamtdichte der Tiere. |
| `MaxNonVirtualAnimalsInWorld` | 350 | Gleichzeitig aktive Tiere. |
| `RabbitPrevalenceMultiplier` | 5 | Kaninchen. |
| `DeerPrevalenceMultiplier`, `GoatPrevalenceMultiplier` | 3 | Hirsche und Ziegen. |
| `DonkeyPrevalenceMultiplier` | 2 | Esel. |
| `BoarPrevalenceMultiplier` | 1.5 | Wildschweine. |
| `ChickenPrevalenceMultiplier`, `HorsePrevalenceMultiplier` | 1 | Hühner und Pferde. |
| `BearPrevalenceMultiplier`, `WolfPrevalenceMultiplier` | 0.5 | Bären und Wölfe. |
| `...MaxHealthMultiplier` (alle Tiere) | 1 | Gesundheit der Tiere. |
| `MaxAllowedBirds` | 15 | Vögel (diese Einstellung hat im Spiel derzeit keine Wirkung). |

---

[Alle Einstellungsseiten](overview.md#every-setting-explained) | [Vollständige Werteliste](all-settings.md)
