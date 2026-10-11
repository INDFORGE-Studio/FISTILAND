# Bunkers

Access cards open the Killbox and Apex facilities, the best loot on the map. Abandoned bunkers open on their own for a while, then close again.

## Access cards

| Setting | Value | What it does |
|---|---|---|
| `MaxAllowedKillboxKeycards` | 6 | Killbox cards that can be found in total. |
| `MaxAllowedKillboxKeycards_PoliceStation` | 3 | Killbox cards in police stations. |
| `MaxAllowedKillboxKeycards_RadiationZone` | 1 | Killbox cards in the radiation zone. |
| `MaxAllowedApexFacilityKeycards` | 6 | Apex Facility cards that can be found in total. |
| `MaxAllowedApexFacilityKeycards_PoliceStation` | 3 | Apex cards in police stations. |
| `MaxAllowedApexFacilityKeycards_RadiationZone` | 1 | Apex cards in the radiation zone. |
| `KillboxDefuseFailureBonus` | 0.2 | Extra seconds added by a failed defusing attempt. |
| `EnableBCULocking` | True | BCU terminals can be locked. |

## Abandoned bunkers

| Setting | Value | What it does |
|---|---|---|
| `AbandonedBunkerMaxSimultaneouslyActive` | 3 | Bunkers open at the same time. |
| `AbandonedBunkerActiveDurationHours` | 12 | Hours a bunker stays open after a natural activation. |
| `AbandonedBunkerKeyCardActiveDurationHours` | 3 | Hours a bunker stays open after a card activation. |
| `AbandonedBunkerBCUTerminalCooldown` | 24:00:00 | Cooldown of the BCU terminals inside. |
| `AbandonedBunkerResetArmoryLockersOnActivationOnly` | True | Armory lockers refill only when a bunker is activated. |
| `SecretBunkerKeyCardActiveDurationHours` | 0.5 | Hours a secret bunker stays open after a card activation. |
| `AbandonedBunkerCommotionThreshold`, `AbandonedBunkerCommotionThresholdPerPlayerExtra`, `AbandonedBunkerEnemyActivationThreshold`, `AbandonedBunkerEnemyActivationThresholdPerPlayerExtra` | -1 | Noise thresholds use the game's built-in values. |
| `LogoutTimerInBunker` | 30000 | Seconds before a player logging out in a bunker disappears. |
