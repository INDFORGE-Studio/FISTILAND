<div class="fl-page-hero fl-bg-a" markdown>

:material-flag-variant:

# Territory

<p>A base-versus-base server: the ground you hold is what you fight for. Every value below comes straight from the server's ServerSettings.ini.</p>

</div>

<div class="fl-facts">
<div><b>3</b><span>Flags per player</span></div>
<div><b>200</b><span>Elements per flag</span></div>
<div><b>2</b><span>Turrets per base</span></div>
<div><b>24 h</b><span>Flag capture</span></div>
<div><b>8 h</b><span>Offline raid protection</span></div>
<div><b>4</b><span>Squad size</span></div>
</div>


## :material-flag: Flags and capture

| Setting | Value | What it does |
|---|---|---|
| `AllowMultipleFlagsPerPlayer` | True | A player can place more than one flag. |
| `NumberOfAllowedFlagsPerPlayer` | 3 | Flags each player may place. |
| `FlagOvertakeDuration` | 24:00:00 | Time needed to capture an enemy flag. |
| `AllowFlagPlacementOnBBElements` | False | Flags cannot be placed on base-building elements. |
| `UseMapBaseBuildingRestriction` | True | Map-defined no-build areas are enforced. |
| `UseBuildingProximityRestrictions` | True | Minimum distances between bases are enforced. |
| `DisableBaseBuilding` | False | Base building is allowed. |

## :material-wall: Base size

| Setting | Value | What it does |
|---|---|---|
| `MaximumAmountOfElementsPerFlag` | 200 | Base elements that fit in one flag area. |
| `ExtraElementsPerFlagForAdditionalSquadMember` | 25 | Extra elements per flag for each squad member after the first. |
| `MaximumNumberOfExpandedElementsPerFlag` | 75 | Extra elements that base expansion kits can add. |
| `TurretMaxAmountPerFlagArea` | 2 | Turrets allowed per flag area. |
| `TurretStartDecayingIfFlagAreaHasMoreThan` | 2 | Turrets above this number decay faster. |
| `AllowWallPlacementOnHalfAndLowWalls` | True | Walls can be placed on half and low walls. |
| `AllowFloorPlacementOnHalfAndLowWalls` | False | Floors cannot be placed on half and low walls. |
| `WeaponRackMaxAmountPerFlagArea`, `WallWeaponRackMaxAmountPerFlagArea`, `WellMaxAmountPerFlagArea`, `OvenMaxAmountPerFlagArea`, `GardenMaxAmountPerFlagArea`, `SmokerMaxAmountPerFlagArea` | -1 | No limit on these objects. |
| `TombstoneMaxAmountPerSquad` | -1 | No limit on tombstones per squad. |

## :material-timer-sand: Decay

| Setting | Value | What it does |
|---|---|---|
| `BaseElementsDecayRateMultiplier` | 0.5 | Speed at which unmaintained base elements decay. The reference decay time is 672 hours; 0.5 stretches it to 1344 hours (56 days). |
| `ChestAcquisitionDuration` | 24 | Hours before an enemy chest inside your flag area becomes yours. |

## :material-shield-lock: Raid protection

| Setting | Value | What it does |
|---|---|---|
| `RaidProtectionType` | 1 | Offline protection: a base is protected when everyone from it is offline. |
| `RaidProtectionOfflineProtectionStartDelay` | 00:30:00 | The base stays vulnerable for 30 minutes after the last player logs out. |
| `RaidProtectionOfflineMaxProtectionTime` | 08:00:00 | Maximum length of the protection. |
| `RaidProtectionEnableLog` | False | Raid protection events are not logged. |

## :material-account-group: Squads

| Setting | Value | What it does |
|---|---|---|
| `SquadMemberCountAtIntLevel1` to `SquadMemberCountAtIntLevel5` | 4 | Squads hold 4 players at every intelligence level. |
| `RTSquadProbationDuration` | 1 | Probation hours for a member who leaves and rejoins a squad. |
| `SquadMemberCountLimitForPunishment` | 2 | Largest former squad whose members face no prisoner penalty. |
| `SquadMoneyPenaltyPerPrevSquadMember`, `SquadFamePointsPenaltyPerPrevSquadMember` | 0 | No money or fame penalty for changing squads. |
| `EnableSquadMemberNameWidget` | True | Squad members' names are shown above their heads (squad members only, never enemies). |

## :material-target: Turrets

Turrets attack prisoners, puppets (zombies), vehicles, sentries, animals and armed NPCs (`TurretsAttackPrisoners`, `TurretsAttackPuppets`, `TurretsAttackVehicles`, `TurretsAttackSentries`, `TurretsAttackAnimals`, `TurretsAttackArmedNPCs`, all True).

## :material-hammer: Base damage

| Setting | Value | What it does |
|---|---|---|
| `LockProtectionDamageMultiplier` | 1 | Damage dealt by locks to people who fail to pick them. |
| `BaseBuildingDestructionLogDamageThreshold` | 20 | Damage level above which base destruction is logged. |

## :material-link-variant: Related pages

[Rules](rules.md) covers aircraft and mines. [Respawn](respawn.md) covers shelter respawns.

---

[All server settings pages](overview.md#every-setting-explained) | [Full list of values](all-settings.md)
