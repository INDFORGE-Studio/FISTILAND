<div class="fl-page-hero fl-bg-d" markdown>

:material-gavel:

# Rules

<p>Fair play first: no crosshair, no pay-to-win packs.</p>

</div>

<div class="fl-facts">
<div><b>14</b><span>Slots</span></div>
<div><b>1st + 3rd</b><span>Views allowed</span></div>
<div><b>Off</b><span>Crosshair</span></div>
<div><b>x1.3</b><span>Player damage</span></div>
</div>


## :material-gavel: Player rules

- **Aircraft** are for getting around only. Raiding with an aircraft is not allowed.
- **Mines** are for defending your base only.

These two are rules, not server settings: they rely on players respecting them.

## :material-eye: View and interface

| Setting | Value | What it does |
|---|---|---|
| `AllowFirstPerson` | True | First-person view is allowed. |
| `AllowThirdPerson` | True | Third person is allowed: players can switch between first and third person. |
| `AllowCrosshair` | False | No crosshair. |
| `AllowMapScreen` | True | The map screen is available. |
| `HideKillNotification` | True | Players do not see a notification when someone kills someone else. |
| `HideQuickAccessBar`, `HideLifeIndicators` | False | Both interface elements are shown. |

## :material-sword-cross: Combat

| Setting | Value | What it does |
|---|---|---|
| `HumanToHumanDamageMultiplier` | 1.3 | Damage between players. |
| `HumanToHumanArmedMeleeDamageMultiplier` | 1.3 | Melee weapon damage between players. |
| `HumanToHumanUnarmedMeleeDamageMultiplier` | 1 | Unarmed damage between players. |
| `HumanToHumanThrowingDamageMultiplier` | 1.3 | Throwing weapon damage between players. |
| `AllowMinesAndTraps` | True | Mines and traps are allowed. |
| `AllowComa` | True | Players can fall into a coma before dying. |
| `AllowKillClaiming` | True | A BCU drops when a player is killed. |
| `LogSuicides` | True | Suicides are logged. |

## :material-logout: Logging out and protection

| Setting | Value | What it does |
|---|---|---|
| `LogoutTimer` | 120 | Seconds before a player who logs out leaves the world. |
| `LogoutTimerWhileCaptured` | 120 | Same, for a tied-up player. |
| `EnableNewPlayerProtection` | True | New players are protected at the start. |
| `NewPlayerProtectionDuration` | 120 | Length of the protection. |
| `PlaySafeIdProtection` | False | Joining does not require a PlaySafe ID. |

## :material-account: Characters

| Setting | Value | What it does |
|---|---|---|
| `DeleteInactiveUsers` | False | Inactive characters are never deleted. |
| `DaysSinceLastLoginToBecomeInactive` | 30 | Days without login before a player counts as inactive. |
| `DeleteBannedUsers` | False | Banned characters are kept. |

## :material-cash-remove: Packs

| Setting | Value | What it does |
|---|---|---|
| `EnableDigitalDeluxeStarterPack` | False | The Deluxe Survival Pack cannot be used. |
| `EnableDigitalDeluxeFreeGoldCard` | False | The free gold card of that pack cannot be claimed. |

## :material-server: Server

| Setting | Value | What it does |
|---|---|---|
| `MaxPlayers` | 14 | Player slots. |
| `ServerPlaystyle` | PVP | Declared play style. |
| `MaxServerTickRate` | 35 | Server updates per second with players online. |
| `MinServerTickRate` | 5 | Server updates per second when empty. |
| `MaxPingCheckEnabled` | True | Players with a high ping are removed. |
| `MaxPing` | 300 | Highest allowed ping in milliseconds. |
| `MaxNumberOfConsecutiveHighPingReadings` | 5 | Bad readings in a row before removal. |
| `WelcomeMessage` | FISTILAND PvP SERVER | Shown when a player joins. |
| `MessageOfTheDay` | More information on indforge-studio.github.io/FISTILAND | Message repeated in the chat. |
| `MessageOfTheDayCooldown` | 30 | Minutes between two repeats. |
| `AllowGlobalChat`, `AllowLocalChat`, `AllowSquadChat`, `AllowAdminChat` | True | All chat channels are open. |
| `LimitGlobalChat` | False | Global chat has no restriction. |

---

[All server settings pages](overview.md#every-setting-explained) | [Full list of values](all-settings.md)

--8<-- "abbr.en.md"
