<div class="fl-page-hero fl-bg-e" markdown>

:material-shield-account:

# Survie

<p>Une couche légère par-dessus le PvP : les nuits sont courtes, les corvées sont petites et les véhicules sont limités.</p>

</div>

<div class="fl-facts">
<div><b>05:00</b><span>Lever du soleil</span></div>
<div><b>22:30</b><span>Coucher du soleil</span></div>
<div><b>x0.5</b><span>Consommation de carburant</span></div>
<div><b>10 jours</b><span>Avant le retrait d'un véhicule inutilisé</span></div>
</div>


## :material-weather-night: Jour et nuit

| Réglage | Valeur | Rôle |
|---|---|---|
| `StartTimeOfDay` | 08:00:00 | Heure en jeu au démarrage du serveur. |
| `TimeOfDaySpeed` | 3.84 | Le temps en jeu s'écoule 3,84 fois plus vite que le temps réel (un jour complet dure environ 6 h 15 min). |
| `SunriseTime` | 05:00:00 | Lever du soleil. |
| `SunsetTime` | 22:30:00 | Coucher du soleil. |
| `NighttimeDarkness` | 0 | Niveau d'obscurité de la nuit, laissé à la valeur par défaut du jeu. Les nuits restent sombres, pensez à une lampe. |
| `EnableFog` | True | Le brouillard est affiché. |

## :material-heart-pulse: Corps et objets

| Réglage | Valeur | Rôle |
|---|---|---|
| `BodySimulationSpeedMultiplier` | 2.5 | Vitesse de la digestion et des autres processus du corps. |
| `StaminaDrainOnJumpMultiplier` | 0.5 | Coût en endurance d'un saut. |
| `StaminaDrainOnClimbMultiplier` | 0.5 | Coût en endurance d'une escalade. |
| `DisableExhaustion` | False | L'épuisement s'accumule normalement. |
| `ItemDecayDamageMultiplier` | 0.5 | Vitesse d'usure des objets avec le temps. |
| `FoodDecayDamageMultiplier` | 0.5 | Vitesse à laquelle la nourriture se gâte. |
| `WeaponDecayDamageOnFiring` | 0.5 | Usure de l'arme à chaque tir. |
| `MaintainItemsExpirationTime` | 360:00:00 | Délai avant l'expiration des objets d'entretien non touchés (lits et similaires). |
| `BedrollVisibilityTimer` | 1 | Temps pendant lequel un sac de couchage reste visible des autres après la déconnexion. |
| `RadiationEnabled` | True | Les zones de radiation sont actives. |

## :material-car: Véhicules

| Réglage | Valeur | Rôle |
|---|---|---|
| `BicycleMaxAmount` | 40 | Vélos sur la carte. |
| `RagerMaxAmount`, `WolfswagenMaxAmount`, `LaikaMaxAmount`, `RisMaxAmount`, `TractorMaxAmount`, `SidecarBikeMaxAmount` | 10 | Maximum de chaque modèle. |
| `CruiserMaxAmount` | 15 | Cruisers sur la carte. |
| `RagerMaxFunctionalAmount`, `WolfswagenMaxFunctionalAmount`, `LaikaMaxFunctionalAmount`, `RisMaxFunctionalAmount`, `SidecarBikeMaxFunctionalAmount` | 8 | Maximum avec un moteur en état de marche. |
| `CruiserMaxFunctionalAmount` | 12 | Cruisers avec un moteur en état de marche. |
| `DirtbikeMaxAmount` / `DirtbikeMaxFunctionalAmount` | 20 / 15 | Motocross. |
| `MotorboatMaxAmount`, `DinghyMaxAmount`, `SUPMaxAmount` | 11, 14, 20 | Bateaux et paddles. |
| `WheelbarrowMaxAmount` | 20 | Brouettes. |
| `KingletDusterMaxAmount`, `KingletMarinerMaxAmount` | 2, 1 | Aéronefs. |
| `...MinPurchasedAmount` (tous les véhicules) | 5 (Brouette 10, Kinglet Mariner et Duster 0) | Nombre minimum disponible chez les marchands. |
| `MaximumTimeOfVehicleInactivity` | 240:00:00 | Un véhicule inutilisé est retiré au bout de 10 jours. |
| `MaximumTimeForVehiclesInForbiddenZones` | 02:00:00 | Les véhicules laissés en zone interdite sont retirés au bout de 2 heures. |

## :material-car-battery: Carburant et batteries des véhicules

| Réglage | Valeur | Rôle |
|---|---|---|
| `FuelDrainFromEngineMultiplier` | 0.5 | Consommation de carburant des moteurs. |
| `BatteryDrainFromEngineMultiplier` | 0.1 | Consommation de batterie des moteurs. |
| `BatteryDrainFromDevicesMultiplier` | 0.7 | Consommation de batterie des appareils électriques. |
| `BatteryDrainFromInactivityMultiplier` | 0.3 | Consommation de batterie à l'arrêt. |
| `BatteryChargeWithAlternatorMultiplier` | 1.5 | Vitesse de charge par un alternateur. |
| `BatteryChargeWithDynamoMultiplier` | 1.5 | Vitesse de charge par un générateur. |

## :material-paw: Animaux

| Réglage | Valeur | Rôle |
|---|---|---|
| `AreAnimalsAllowedInWorld` | True | Les animaux existent dans le monde. |
| `AnimalGlobalDensityMultiplier` | 1 | Densité globale d'animaux. |
| `MaxNonVirtualAnimalsInWorld` | 350 | Animaux actifs en même temps. |
| `RabbitPrevalenceMultiplier` | 5 | Lapins. |
| `DeerPrevalenceMultiplier`, `GoatPrevalenceMultiplier` | 3 | Cerfs et chèvres. |
| `DonkeyPrevalenceMultiplier` | 2 | Ânes. |
| `BoarPrevalenceMultiplier` | 1.5 | Sangliers. |
| `ChickenPrevalenceMultiplier`, `HorsePrevalenceMultiplier` | 1 | Poules et chevaux. |
| `BearPrevalenceMultiplier`, `WolfPrevalenceMultiplier` | 0.5 | Ours et loups. |
| `...MaxHealthMultiplier` (tous les animaux) | 1 | Santé des animaux. |
| `MaxAllowedBirds` | 15 | Oiseaux (ce réglage n'a actuellement aucun effet dans le jeu). |

---

[Toutes les pages de réglages](overview.md#every-setting-explained) | [Liste complète des valeurs](all-settings.md)
