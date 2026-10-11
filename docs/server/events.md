<div class="fl-page-hero fl-bg-b" markdown>

:material-package-variant-closed:

# Events

<p>Cargo drops give every squad a reason to leave its base. Mechs and dropships are off, so the fights stay between players.</p>

</div>

<div class="fl-facts">
<div><b>45-60 min</b><span>Between cargo drops</span></div>
<div><b>0</b><span>Mechs</span></div>
<div><b>9 min</b><span>From announcement to fall</span></div>
<div><b>20 min</b><span>Before an unopened crate explodes</span></div>
</div>


## :material-package-variant-closed: Cargo drops

| Setting | Value | What it does |
|---|---|---|
| `CargoDropCooldownMinimum` | 45 | Minimum minutes between two cargo drops. |
| `CargoDropCooldownMaximum` | 60 | Maximum minutes between two cargo drops. |
| `CargoDropFallDelay` | 540 | Seconds between the announcement and the fall. |
| `CargoDropFallDuration` | 60 | Seconds the crate takes to fall. |
| `CargoDropSelfdestructTime` | 1200 | Seconds before an unopened crate explodes. |
| `CargoDropZombieEncounterWeightMultiplier` | 0.3 | Weight of the zombie encounter at a drop. |
| `CargoDropDropshipEncounterWeightMultiplier` | 0.01 | Weight of the dropship encounter at a drop. The dropship is practically never chosen. |

## :material-robot-off: Mechs and dropships

| Setting | Value | What it does |
|---|---|---|
| `DisableSentrySpawning` | True | No mechs. |
| `EnableSentryRespawning` | False | No mech returns by dropship. |
| `EnableDropshipAbandonedBunkerEncounter` | False | No dropship at abandoned bunkers. |
| `DropshipAbandonedBunkerEncounterTriggerChance` | -1 | Game default (unused while the encounter is off). |
| `EnableDropshipBaseBuildingEncounter` | False | No dropship raiding while you build a base. |
| `BaseBuildingEncounterTriggerChance` | 0 | No base-building encounter. |
| `BaseBuildingEncounterTriggerTimeMultiplier` | 1 | Timing of base-building encounters. |
| `DropshipHealthMultiplier`, `SentryHealthMultiplier`, `BaseBuildingAttackerSentryHealthMultiplier` | 1 | Health of dropships and sentries. |
| `DropshipDamageMultiplier`, `SentryDamageMultiplier` | 1 | Damage of dropships and sentries. |

## :material-calendar-star: Server events

| Setting | Value | What it does |
|---|---|---|
| `AllowEvents` | True | Events are allowed on the server. |
| `AllowVoting` | True | Players can vote. |
| `VotingDuration` | 60 | Length of a vote in seconds. |
| `PlayerMinimalVotingInterest` | 0.5 | Share of players that must take part for a vote to count. |
| `PlayerPositiveVotePercentage` | 0.5 | Share of yes votes needed to pass. |

---

[All server settings pages](overview.md#every-setting-explained) | [Full list of values](all-settings.md)
