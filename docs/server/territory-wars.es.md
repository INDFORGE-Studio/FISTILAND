<div class="fl-page-hero fl-bg-a" markdown>

:material-flag-variant:

# Territorio

<p>Un servidor de base contra base: el terreno que controlas es por lo que peleas. Cada valor de abajo viene directamente del ServerSettings.ini del servidor.</p>

</div>

<div class="fl-facts">
<div><b>3</b><span>Banderas por jugador</span></div>
<div><b>300</b><span>Elementos por bandera</span></div>
<div><b>2</b><span>Torretas por base</span></div>
<div><b>24 h</b><span>Captura de bandera</span></div>
<div><b>8 h</b><span>Protección sin conexión contra asaltos</span></div>
<div><b>10</b><span>Tamaño de escuadra</span></div>
</div>


## :material-flag: Banderas y captura

| Ajuste | Valor | Qué hace |
|---|---|---|
| `AllowMultipleFlagsPerPlayer` | True | Un jugador puede colocar más de una bandera. |
| `NumberOfAllowedFlagsPerPlayer` | 3 | Banderas que cada jugador puede colocar. |
| `FlagOvertakeDuration` | 24:00:00 | Tiempo necesario para capturar una bandera enemiga. |
| `AllowFlagPlacementOnBBElements` | False | Las banderas no se pueden colocar sobre elementos de construcción de base. |
| `UseMapBaseBuildingRestriction` | True | Se aplican las zonas donde el mapa prohíbe construir. |
| `UseBuildingProximityRestrictions` | True | Se aplican las distancias mínimas entre bases. |
| `DisableBaseBuilding` | False | Se permite construir bases. |

## :material-wall: Tamaño de las bases

| Ajuste | Valor | Qué hace |
|---|---|---|
| `MaximumAmountOfElementsPerFlag` | 300 | Elementos de base que caben en el área de una bandera. |
| `ExtraElementsPerFlagForAdditionalSquadMember` | 17 | Elementos extra por bandera por cada miembro de la escuadra después del primero. |
| `MaximumNumberOfExpandedElementsPerFlag` | 75 | Elementos extra que pueden añadir los kits de ampliación de base. |
| `TurretMaxAmountPerFlagArea` | 2 | Torretas permitidas por área de bandera. |
| `TurretStartDecayingIfFlagAreaHasMoreThan` | 2 | Las torretas por encima de este número se deterioran más rápido. |
| `AllowWallPlacementOnHalfAndLowWalls` | True | Se pueden colocar muros sobre muros bajos y de media altura. |
| `AllowFloorPlacementOnHalfAndLowWalls` | False | No se pueden colocar suelos sobre muros bajos y de media altura. |
| `WeaponRackMaxAmountPerFlagArea`, `WallWeaponRackMaxAmountPerFlagArea`, `WellMaxAmountPerFlagArea`, `OvenMaxAmountPerFlagArea`, `GardenMaxAmountPerFlagArea`, `SmokerMaxAmountPerFlagArea` | -1 | Sin límite para estos objetos. |
| `TombstoneMaxAmountPerSquad` | -1 | Sin límite de lápidas por escuadra. |

## :material-timer-sand: Deterioro

| Ajuste | Valor | Qué hace |
|---|---|---|
| `BaseElementsDecayRateMultiplier` | 0.5 | Velocidad a la que se deterioran los elementos de base sin mantenimiento. El tiempo de referencia es de 672 horas; 0.5 lo alarga a 1344 horas (56 días). |
| `ChestAcquisitionDuration` | 24 | Horas hasta que un cofre enemigo dentro de tu área de bandera pasa a ser tuyo. |

## :material-shield-lock: Protección contra asaltos

| Ajuste | Valor | Qué hace |
|---|---|---|
| `RaidProtectionType` | 1 | Protección sin conexión: una base está protegida cuando todos sus miembros están desconectados. |
| `RaidProtectionOfflineProtectionStartDelay` | 00:30:00 | La base sigue siendo vulnerable durante 30 minutos tras la desconexión del último jugador. |
| `RaidProtectionOfflineMaxProtectionTime` | 08:00:00 | Duración máxima de la protección. |
| `RaidProtectionEnableLog` | False | Los eventos de protección contra asaltos no se registran. |

## :material-account-group: Escuadras

| Ajuste | Valor | Qué hace |
|---|---|---|
| `SquadMemberCountAtIntLevel1` a `SquadMemberCountAtIntLevel5` | 10 | Las escuadras son de 10 jugadores en todos los niveles de inteligencia. |
| `RTSquadProbationDuration` | 1 | Horas de prueba para un miembro que deja una escuadra y vuelve a unirse. |
| `SquadMemberCountLimitForPunishment` | 2 | Mayor escuadra anterior cuyos miembros no sufren penalización de prisionero. |
| `SquadMoneyPenaltyPerPrevSquadMember`, `SquadFamePointsPenaltyPerPrevSquadMember` | 0 | Sin penalización de dinero ni de fama por cambiar de escuadra. |
| `EnableSquadMemberNameWidget` | True | Los nombres de los miembros de la escuadra se muestran sobre sus cabezas (solo la escuadra, nunca los enemigos). |

## :material-target: Torretas

Las torretas atacan a prisioneros, marionetas (zombis), vehículos, centinelas, animales y PNJ armados (`TurretsAttackPrisoners`, `TurretsAttackPuppets`, `TurretsAttackVehicles`, `TurretsAttackSentries`, `TurretsAttackAnimals`, `TurretsAttackArmedNPCs`, todos en True).

## :material-hammer: Daño a las bases

| Ajuste | Valor | Qué hace |
|---|---|---|
| `LockProtectionDamageMultiplier` | 1 | Daño que causan las cerraduras a quien falla al forzarlas. |
| `BaseBuildingDestructionLogDamageThreshold` | 20 | Nivel de daño a partir del cual se registra la destrucción de la base. |

## :material-link-variant: Páginas relacionadas

[Reglas](rules.md) trata de las aeronaves y las minas. [Reaparición](respawn.md) trata de las reapariciones en el refugio.

---

[Todas las páginas de ajustes](overview.md#every-setting-explained) | [Lista completa de valores](all-settings.md)
