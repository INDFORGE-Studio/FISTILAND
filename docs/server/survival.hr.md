<div class="fl-page-hero fl-bg-e" markdown>

:material-shield-account:

# Preživljavanje

<p>Lagani sloj povrh PvP-a: noći su kratke, obveze male, a vozila ograničena.</p>

</div>

<div class="fl-facts">
<div><b>05:00</b><span>Izlazak sunca</span></div>
<div><b>22:30</b><span>Zalazak sunca</span></div>
<div><b>x0.5</b><span>Potrošnja goriva</span></div>
<div><b>10 dana</b><span>Prije uklanjanja nekorištenog vozila</span></div>
</div>


## :material-weather-night: Dan i noć

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `StartTimeOfDay` | 08:00:00 | Vrijeme u igri pri pokretanju poslužitelja. |
| `TimeOfDaySpeed` | 3.84 | Vrijeme u igri teče 3.84 puta brže od stvarnog (cijeli dan traje oko 6 h 15 min). |
| `SunriseTime` | 05:00:00 | Izlazak sunca. |
| `SunsetTime` | 22:30:00 | Zalazak sunca. |
| `NighttimeDarkness` | 0 | Razina noćne tame, ostavljena na zadanoj vrijednosti igre. Noći ostaju mračne, pa ponesi svjetlo. |
| `EnableFog` | True | Magla se prikazuje. |

<div class="fl-day">
<div class="fl-day__bar" role="img" aria-label="00:00-05:00 , 05:00-22:30 , 22:30-24:00 "><i class="n1"></i><i class="d"></i><i class="n2"></i></div>
<div class="fl-day__ticks" aria-hidden="true"><span class="t0">00:00</span><span class="t1">05:00</span><span class="t2">22:30</span><span class="t3">24:00</span></div>
<div class="fl-facts">
<div><b>4 h 33</b><span></span></div>
<div><b>1 h 42</b><span></span></div>
<div><b>6 h 15</b><span></span></div>
</div>
</div>

## :material-heart-pulse: Tijelo i predmeti

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `BodySimulationSpeedMultiplier` | 2.5 | Brzina probave i drugih tjelesnih procesa. |
| `StaminaDrainOnJumpMultiplier` | 0.5 | Trošak izdržljivosti pri skakanju. |
| `StaminaDrainOnClimbMultiplier` | 0.5 | Trošak izdržljivosti pri penjanju. |
| `DisableExhaustion` | False | Iscrpljenost se normalno nakuplja. |
| `ItemDecayDamageMultiplier` | 0.5 | Brzina kojom se predmeti troše tijekom vremena. |
| `FoodDecayDamageMultiplier` | 0.5 | Brzina kojom se hrana kvari. |
| `WeaponDecayDamageOnFiring` | 0.5 | Trošenje oružja po hicu. |
| `MaintainItemsExpirationTime` | 360:00:00 | Vrijeme nakon kojeg istječu nedirnuti predmeti za održavanje (kreveti i slično). |
| `BedrollVisibilityTimer` | 1 | Vrijeme tijekom kojeg vreća za spavanje ostaje vidljiva drugima nakon odjave. |
| `RadiationEnabled` | True | Zone radijacije su aktivne. |

## :material-car: Vozila

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `BicycleMaxAmount` | 40 | Bicikli na karti. |
| `RagerMaxAmount`, `WolfswagenMaxAmount`, `LaikaMaxAmount`, `RisMaxAmount`, `TractorMaxAmount`, `SidecarBikeMaxAmount` | 10 | Najviše svakog modela. |
| `CruiserMaxAmount` | 15 | Cruiseri na karti. |
| `RagerMaxFunctionalAmount`, `WolfswagenMaxFunctionalAmount`, `LaikaMaxFunctionalAmount`, `RisMaxFunctionalAmount`, `SidecarBikeMaxFunctionalAmount` | 8 | Najviše s ispravnim motorom. |
| `CruiserMaxFunctionalAmount` | 12 | Cruiseri s ispravnim motorom. |
| `DirtbikeMaxAmount` / `DirtbikeMaxFunctionalAmount` | 20 / 15 | Terenski motocikli. |
| `MotorboatMaxAmount`, `DinghyMaxAmount`, `SUPMaxAmount` | 11, 14, 20 | Brodovi i daske za veslanje. |
| `WheelbarrowMaxAmount` | 20 | Ručna kolica. |
| `KingletDusterMaxAmount`, `KingletMarinerMaxAmount` | 2, 1 | Zrakoplovi. |
| `...MinPurchasedAmount` (sva vozila) | 5 (Wheelbarrow 10, Kinglet Mariner i Duster 0) | Najmanji broj dostupan kod trgovaca. |
| `MaximumTimeOfVehicleInactivity` | 240:00:00 | Nekorišteno vozilo uklanja se nakon 10 dana. |
| `MaximumTimeForVehiclesInForbiddenZones` | 02:00:00 | Vozila ostavljena u zabranjenim zonama uklanjaju se nakon 2 sata. |

## :material-car-battery: Gorivo i akumulatori vozila

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `FuelDrainFromEngineMultiplier` | 0.5 | Potrošnja goriva motora. |
| `BatteryDrainFromEngineMultiplier` | 0.1 | Potrošnja akumulatora zbog motora. |
| `BatteryDrainFromDevicesMultiplier` | 0.7 | Potrošnja akumulatora zbog električnih uređaja. |
| `BatteryDrainFromInactivityMultiplier` | 0.3 | Potrošnja akumulatora u mirovanju. |
| `BatteryChargeWithAlternatorMultiplier` | 1.5 | Brzina punjenja iz alternatora. |
| `BatteryChargeWithDynamoMultiplier` | 1.5 | Brzina punjenja iz generatora. |

## :material-paw: Životinje

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `AreAnimalsAllowedInWorld` | True | Životinje postoje u svijetu. |
| `AnimalGlobalDensityMultiplier` | 1 | Ukupna gustoća životinja. |
| `MaxNonVirtualAnimalsInWorld` | 350 | Životinje aktivne istodobno. |
| `RabbitPrevalenceMultiplier` | 5 | Zečevi. |
| `DeerPrevalenceMultiplier`, `GoatPrevalenceMultiplier` | 3 | Jeleni i koze. |
| `DonkeyPrevalenceMultiplier` | 2 | Magarci. |
| `BoarPrevalenceMultiplier` | 1.5 | Divlje svinje. |
| `ChickenPrevalenceMultiplier`, `HorsePrevalenceMultiplier` | 1 | Kokoši i konji. |
| `BearPrevalenceMultiplier`, `WolfPrevalenceMultiplier` | 0.5 | Medvjedi i vukovi. |
| `...MaxHealthMultiplier` (sve životinje) | 1 | Zdravlje životinja. |
| `MaxAllowedBirds` | 15 | Ptice (ova postavka trenutno nema učinka u igri). |

---

[Sve stranice postavki poslužitelja](overview.md#every-setting-explained) | [Potpuni popis vrijednosti](all-settings.md)
