<div class="fl-page-hero fl-bg-e" markdown>

:material-shield-account:

# Przetrwanie

<p>Lekka warstwa nad PvP: noce są krótkie, obowiązki drobne, a pojazdy ograniczone.</p>

</div>

<div class="fl-facts">
<div><b>05:00</b><span>Wschód słońca</span></div>
<div><b>22:30</b><span>Zachód słońca</span></div>
<div><b>x0.5</b><span>Zużycie paliwa</span></div>
<div><b>10 dni</b><span>Zanim nieużywany pojazd zostanie usunięty</span></div>
</div>


## :material-weather-night: Dzień i noc

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `StartTimeOfDay` | 08:00:00 | Czas w grze przy starcie serwera. |
| `TimeOfDaySpeed` | 3.84 | Czas w grze płynie 3.84 razy szybciej niż rzeczywisty (cała doba trwa około 6 h 15 min). |
| `SunriseTime` | 05:00:00 | Wschód słońca. |
| `SunsetTime` | 22:30:00 | Zachód słońca. |
| `NighttimeDarkness` | 0 | Poziom nocnej ciemności, pozostawiony na domyślnym ustawieniu gry. Noce pozostają ciemne, więc weź światło. |
| `EnableFog` | True | Mgła jest renderowana. |

<div class="fl-day">
<div class="fl-day__bar" role="img" aria-label="00:00-05:00 , 05:00-22:30 , 22:30-24:00 "><i class="n1"></i><i class="d"></i><i class="n2"></i></div>
<div class="fl-day__ticks" aria-hidden="true"><span class="t0">00:00</span><span class="t1">05:00</span><span class="t2">22:30</span><span class="t3">24:00</span></div>
<div class="fl-facts">
<div><b>4 h 33</b><span></span></div>
<div><b>1 h 42</b><span></span></div>
<div><b>6 h 15</b><span></span></div>
</div>
</div>

## :material-heart-pulse: Ciało i przedmioty

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `BodySimulationSpeedMultiplier` | 2.5 | Tempo trawienia i innych procesów w organizmie. |
| `StaminaDrainOnJumpMultiplier` | 0.5 | Koszt wytrzymałości skoku. |
| `StaminaDrainOnClimbMultiplier` | 0.5 | Koszt wytrzymałości wspinaczki. |
| `DisableExhaustion` | False | Wyczerpanie narasta normalnie. |
| `ItemDecayDamageMultiplier` | 0.5 | Tempo, w jakim przedmioty zużywają się z czasem. |
| `FoodDecayDamageMultiplier` | 0.5 | Tempo psucia się jedzenia. |
| `WeaponDecayDamageOnFiring` | 0.5 | Zużycie broni na strzał. |
| `MaintainItemsExpirationTime` | 360:00:00 | Czas, po którym wygasają nietknięte przedmioty konserwowane (łóżka i podobne). |
| `BedrollVisibilityTimer` | 1 | Czas, przez który śpiwór pozostaje widoczny dla innych po wylogowaniu. |
| `RadiationEnabled` | True | Strefy radiacji są aktywne. |

## :material-car: Pojazdy

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `BicycleMaxAmount` | 40 | Rowery na mapie. |
| `RagerMaxAmount`, `WolfswagenMaxAmount`, `LaikaMaxAmount`, `RisMaxAmount`, `TractorMaxAmount`, `SidecarBikeMaxAmount` | 10 | Maksimum każdego modelu. |
| `CruiserMaxAmount` | 15 | Cruisery na mapie. |
| `RagerMaxFunctionalAmount`, `WolfswagenMaxFunctionalAmount`, `LaikaMaxFunctionalAmount`, `RisMaxFunctionalAmount`, `SidecarBikeMaxFunctionalAmount` | 8 | Maksimum z działającym silnikiem. |
| `CruiserMaxFunctionalAmount` | 12 | Cruisery z działającym silnikiem. |
| `DirtbikeMaxAmount` / `DirtbikeMaxFunctionalAmount` | 20 / 15 | Motocykle terenowe. |
| `MotorboatMaxAmount`, `DinghyMaxAmount`, `SUPMaxAmount` | 11, 14, 20 | Łodzie i deski wiosłowe. |
| `WheelbarrowMaxAmount` | 20 | Taczki. |
| `KingletDusterMaxAmount`, `KingletMarinerMaxAmount` | 2, 1 | Statki powietrzne. |
| `...MinPurchasedAmount` (wszystkie pojazdy) | 5 (Wheelbarrow 10, Kinglet Mariner i Duster 0) | Minimalna liczba dostępna u handlarzy. |
| `MaximumTimeOfVehicleInactivity` | 240:00:00 | Nieużywany pojazd jest usuwany po 10 dniach. |
| `MaximumTimeForVehiclesInForbiddenZones` | 02:00:00 | Pojazdy pozostawione w strefach zakazanych są usuwane po 2 godzinach. |

## :material-car-battery: Paliwo i akumulatory pojazdów

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `FuelDrainFromEngineMultiplier` | 0.5 | Zużycie paliwa przez silniki. |
| `BatteryDrainFromEngineMultiplier` | 0.1 | Zużycie akumulatora przez silniki. |
| `BatteryDrainFromDevicesMultiplier` | 0.7 | Zużycie akumulatora przez urządzenia elektryczne. |
| `BatteryDrainFromInactivityMultiplier` | 0.3 | Zużycie akumulatora podczas postoju. |
| `BatteryChargeWithAlternatorMultiplier` | 1.5 | Szybkość ładowania z alternatora. |
| `BatteryChargeWithDynamoMultiplier` | 1.5 | Szybkość ładowania z generatora. |

## :material-paw: Zwierzęta

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `AreAnimalsAllowedInWorld` | True | Zwierzęta istnieją w świecie. |
| `AnimalGlobalDensityMultiplier` | 1 | Ogólna gęstość zwierząt. |
| `MaxNonVirtualAnimalsInWorld` | 350 | Zwierzęta aktywne w tym samym czasie. |
| `RabbitPrevalenceMultiplier` | 5 | Króliki. |
| `DeerPrevalenceMultiplier`, `GoatPrevalenceMultiplier` | 3 | Jelenie i kozy. |
| `DonkeyPrevalenceMultiplier` | 2 | Osły. |
| `BoarPrevalenceMultiplier` | 1.5 | Dziki. |
| `ChickenPrevalenceMultiplier`, `HorsePrevalenceMultiplier` | 1 | Kury i konie. |
| `BearPrevalenceMultiplier`, `WolfPrevalenceMultiplier` | 0.5 | Niedźwiedzie i wilki. |
| `...MaxHealthMultiplier` (wszystkie zwierzęta) | 1 | Zdrowie zwierząt. |
| `MaxAllowedBirds` | 15 | Ptaki (to ustawienie obecnie nie ma wpływu w grze). |

---

[Wszystkie strony ustawień serwera](overview.md#every-setting-explained) | [Pełna lista wartości](all-settings.md)
