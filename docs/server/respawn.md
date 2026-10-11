# Respawn

A lost fight costs minutes, not an evening. Prices ending in **g** are paid in gold; the others are paid in fame points.

## Respawn methods

| Setting | Value | What it does |
|---|---|---|
| `AllowSectorRespawn` | True | Respawn in a chosen sector. |
| `AllowShelterRespawn` | True | Respawn at your shelter. |
| `AllowSquadmateRespawn` | True | Respawn next to a squad member. |
| `EnableSpawnOnGround` | False | New spawns arrive by parachute. |
| `AllowAutomaticParachuteOpening` | True | The parachute opens automatically. |

## Prices

| Setting | Value | What it does |
|---|---|---|
| `RandomRespawnPrice` | 100 | Respawn at a random point. |
| `SectorRespawnPrice` | 250 | Respawn in a chosen sector. |
| `ShelterRespawnPrice` | 150 | Respawn at your shelter inside a flag area. |
| `ShelterRespawnPriceOutsideFlagArea` | 2g | Respawn at a shelter outside a flag area. |
| `SquadRespawnPrice` | 2g | Respawn next to a squad member. |
| `RandomPricePerSquadmateModifier`, `SectorPricePerSquadmateModifier`, `ShelterPricePerSquadmateModifier` | 0 | Squad size does not change the price. |

## Waiting times

| Setting | Value | What it does |
|---|---|---|
| `RandomRespawnInitialTime` | 0 | Wait before a random respawn is possible (seconds). |
| `SectorRespawnInitialTime` | 60 | Wait before a sector respawn is possible (seconds). |
| `ShelterRespawnInitialTime` | 30 | Wait before a shelter respawn is possible (seconds). |
| `SquadRespawnInitialTime` | 60 | Wait before a squad respawn is possible (seconds). |
| `RandomRespawnCooldown` | 0 | Extra wait after repeated deaths, random respawn. |
| `SectorRespawnCooldown` | 120 | Extra wait after repeated deaths, sector respawn. |
| `ShelterRespawnCooldown` | 120 | Extra wait after repeated deaths, shelter respawn. |
| `SquadRespawnCooldown` | 60 | Extra wait after repeated deaths, squad respawn. |
| `RandomCooldownResetMultiplier` | 0 | Random respawn cooldown resets at once. |
| `SectorCooldownResetMultiplier`, `ShelterCooldownResetMultiplier`, `SquadCooldownResetMultiplier` | 0.7 | The cooldown resets after this multiple of the cooldown time. |

## Suicide

| Setting | Value | What it does |
|---|---|---|
| `CommitSuicideInitialTime` | 30 | Seconds before the suicide command is available. |
| `CommitSuicideCooldown` | 300 | Seconds before it can be used again. |
| `CommitSuicideCooldownResetMultiplier` | 1.25 | How fast the suicide cooldown resets. |

## Other

| Setting | Value | What it does |
|---|---|---|
| `MaximumBaseProximityWhenSpawning` | 5000 | Distance to enemy flags used when choosing a spawn point. |
| `CloningSicknessEnabled` | False | No cloning sickness after respawning. |
| `PermadeathThreshold` | -7500 | Negative account balance at which a character is permanently deleted. |

---

[All server settings pages](overview.md#every-setting-explained) | [Full list of values](all-settings.md)
