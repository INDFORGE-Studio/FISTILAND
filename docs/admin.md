<div class="fl-page-hero fl-bg-d" markdown>

:material-shield-crown:

# Admin guide

<p>Everything we checked while running a SCUM server, with v1.3.4.2</p>

</div>

<div class="fl-facts">
<div><b>1.3.4.2</b><span>Game version</span></div>
<div><b>2,572</b><span>Item codes</span></div>
<div><b>7779</b><span>Direct connect port (local)</span></div>
<div><b>2 files</b><span>Settings + economy</span></div>
</div>


## :material-key: Become admin

Add your SteamID64 (17 digits, find it on steamid.io) to `AdminUsers.ini`, one per line. The file is read when the server starts, so restart the server after editing it. Then type commands in the in-game chat with a `#` first.

## :material-console: Chat commands

Status: **Tested** means we ran it on our server. **Reported** means a public guide describes it and we did not test it.

| Command | What it does | Status |
|---|---|---|
| `#ListPlayers` | Lists the players online. | Tested |
| `#ListItems` | Prints every item code of your game version (2,572 on 1.3.4.2) in the game's log file. | Tested |
| `#spawnitem Apple`, `#spawnitem Water_05l` | Gives you an item from its code. | Tested |
| `#SetCurrencyBalance Normal 10000 PlayerName` | Sets the money of a player. | Tested |
| `#ChangeCurrencyBalance Gold 5 PlayerName` | Changes the gold of a player. | Tested |
| `#NightBrightness 1` | Night brightness, from 0 (dark) to 1 (bright). Only for you, not the whole server. | Tested |
| `#SetTime 12` | Sets the time of day, from 0 to 24. | Tested |
| `#ListZombies`, `#ListAnimals` | Lists the zombie and animal types. | Tested |
| `#ListSpawnedVehicles`, `#ListSpawnedArmedNPCs` | Lists what is alive in the world. The result shows in the chat only, not in the log. | Tested |
| `#MapTeleport` | Teleport through the map. | Listed, not tested |
| `#SetImmortality true` / `false` | Damage immunity on, then off. | Reported |
| `#SetFamePoints 500 PlayerName` | Sets the fame points of a player. | Reported |
| `#SetGodMode` | Instant building, not invulnerability. | Reported |
| `#heal` | Does not exist on 1.3.4.2. | Not available |

## :material-monitor: Run a free local test server

1. In Steam, install the free **SCUM Server** tool.
2. Copy your `ServerSettings.ini` and `EconomyOverride.json` into the folder `SCUM\Saved\Config\WindowsServer` of the tool. Add `[TEST]` to the server name so you spot it.
3. Start `SCUMServer.exe -log -port=7777` from `SCUM\Binaries\Win64`. Loading the map takes about two minutes.
4. In the game, open the direct connect box and use `127.0.0.1:7779`. Port 7777 does not work there.
5. Stop the server with Ctrl+C in its window.

The server log is `SCUM\Saved\Logs\SCUM.log` in the tool folder. Your own game log, where command results show up, is in `%LOCALAPPDATA%\SCUM\Saved\Logs`.

## :material-file-cog: Settings files

| File | What it holds |
|---|---|
| `ServerSettings.ini` | All server settings (440 keys, ASCII text). |
| `EconomyOverride.json` | Trader settings and per-item prices. Every value is written as quoted text. |
| `AdminUsers.ini` | The admins, one SteamID64 per line. |

See the [settings pages](server/overview.md) for what each value does on FISTILAND.

## :material-download: Download the config files

Each file comes in two versions, so you can compare them. **FISTILAND** is the file our server runs. **SCUM** is the file as the game or Nitrado provides it, the starting point if you want to begin from scratch.

| File | Which one | What it is |
|---|---|---|
| [ServerSettings_FISTILAND.ini](downloads/ServerSettings_FISTILAND.ini){ download } | **FISTILAND** | The settings of the FISTILAND server. |
| [ServerSettings_SCUM.ini](downloads/ServerSettings_SCUM.ini){ download } | **SCUM** | The file a new Nitrado server starts with, untouched. |
| [EconomyOverride_FISTILAND.json](downloads/EconomyOverride_FISTILAND.json){ download } | **FISTILAND** | Trader settings of FISTILAND: no fame requirement, traders always stocked and funded, fixed prices. |
| [EconomyOverride_SCUM.json](downloads/EconomyOverride_SCUM.json){ download } | **SCUM** | The trader file with the values the game starts with. |
| [SCUM_item_codes_1.3.4.2.txt](downloads/SCUM_item_codes_1.3.4.2.txt){ download } | **Data** | All 2,572 item codes of game version 1.3.4.2, one per line (from the `#ListItems` command). |
| [Armory_SCUM_prices_A0.csv](downloads/Armory_SCUM_prices_A0.csv){ download } | **Data** | The Armory trader prices of the base game, read in game at outpost A0 (about 380 lines). |

The server address, ports and password are removed from these copies. Keep your own when you upload.
