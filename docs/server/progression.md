<div class="fl-page-hero fl-bg-d" markdown>

:material-chart-line:

# Progression

<p>Gear comes fast, skills take longer. A multiplier scales the experience earned for each skill.</p>

</div>

<div class="fl-facts">
<div><b>x1.5</b><span>Archery, driving, motorcycle</span></div>
<div><b>x1</b><span>Medical, melee, rifles</span></div>
<div><b>x0.5</b><span>All other skills</span></div>
<div><b>50%</b><span>Fame taken on a kill</span></div>
</div>


## :material-chart-line: Skill experience

| Multiplier | Skills |
|---|---|
| **1.5** | Archery (`ArcherySkillMultiplier`), Driving (`DrivingSkillMultiplier`), Motorcycle (`MotorcycleSkillMultiplier`) |
| **1** | Awareness, Cooking, Endurance, Farming, Medical, Melee weapons, Rifles, Running, Survival |
| **0.5** | Aviation, Brawling, Camouflage, Demolition, Engineering, Handgun, Sniping, Stealth, Thievery |

The setting name is the skill name followed by `SkillMultiplier`, for example `RiflesSkillMultiplier=1`.

## :material-star-circle: Other progression settings

| Setting | Value | What it does |
|---|---|---|
| `EnableSelectedSkillsPromotion` | True | Skills featured by the current campaign earn a bonus. |
| `AllowSkillGainInSafeZones` | False | No experience inside safe zones such as trader areas. |
| `FameGainMultiplier` | 1 | Speed at which fame points are earned. |
| `FamePointRewardOnKill` | 0.5 | A killer receives 50% of the victim's fame points. |
| `FamePointPenaltyOnKilled` | 0.5 | A player killed by another player loses 50% of their fame points. |
| `FamePointPenaltyOnDeath` | 0.1 | Any other death costs 10% of fame points. |
| `PlantHarvestExamineTimeMultiplier` | 1 | Time to harvest a plant. |
| `FirstPlantHarvestAdditionalChance` | 1 | Bonus chance on the first harvest of a plant. |

---

[All server settings pages](overview.md#every-setting-explained) | [Full list of values](all-settings.md)
