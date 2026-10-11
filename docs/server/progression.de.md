<div class="fl-page-hero fl-bg-d" markdown>

:material-chart-line:

# Fortschritt

<p>Ausrüstung kommt schnell, Fertigkeiten brauchen länger. Ein Multiplikator skaliert die für jede Fertigkeit gewonnene Erfahrung.</p>

</div>

<div class="fl-facts">
<div><b>x1.5</b><span>Bogenschießen, Fahren, Motorrad</span></div>
<div><b>x1</b><span>Medizin, Nahkampf, Gewehre</span></div>
<div><b>x0.5</b><span>Alle anderen Fertigkeiten</span></div>
<div><b>50%</b><span>Ruhm, der bei einem Kill genommen wird</span></div>
</div>


## :material-chart-line: Fertigkeitserfahrung

| Multiplikator | Fertigkeiten |
|---|---|
| **1.5** | Bogenschießen (`ArcherySkillMultiplier`), Fahren (`DrivingSkillMultiplier`), Motorrad (`MotorcycleSkillMultiplier`) |
| **1** | Aufmerksamkeit, Kochen, Ausdauer, Landwirtschaft, Medizin, Nahkampfwaffen, Gewehre, Laufen, Überleben |
| **0.5** | Luftfahrt, Faustkampf, Tarnung, Sprengstoff, Technik, Handfeuerwaffen, Scharfschießen, Schleichen, Diebstahl |

Der Name der Einstellung ist der Name der Fertigkeit gefolgt von `SkillMultiplier`, zum Beispiel `RiflesSkillMultiplier=1`.

## :material-star-circle: Weitere Fortschrittseinstellungen

| Einstellung | Wert | Wirkung |
|---|---|---|
| `EnableSelectedSkillsPromotion` | True | Fertigkeiten, die die aktuelle Kampagne hervorhebt, bringen einen Bonus. |
| `AllowSkillGainInSafeZones` | False | Keine Erfahrung in sicheren Zonen wie Händlerbereichen. |
| `FameGainMultiplier` | 1 | Geschwindigkeit, mit der Ruhmpunkte gesammelt werden. |
| `FamePointRewardOnKill` | 0.5 | Ein Killer erhält 50 % der Ruhmpunkte des Opfers. |
| `FamePointPenaltyOnKilled` | 0.5 | Ein von einem anderen Spieler getöteter Spieler verliert 50 % seiner Ruhmpunkte. |
| `FamePointPenaltyOnDeath` | 0.1 | Jeder andere Tod kostet 10 % der Ruhmpunkte. |
| `PlantHarvestExamineTimeMultiplier` | 1 | Zeit zum Ernten einer Pflanze. |
| `FirstPlantHarvestAdditionalChance` | 1 | Bonuschance bei der ersten Ernte einer Pflanze. |

---

[Alle Einstellungsseiten](overview.md#every-setting-explained) | [Vollständige Werteliste](all-settings.md)
