<div class="fl-page-hero fl-bg-d" markdown>

:material-chart-line:

# Progressione

<p>L'equipaggiamento arriva in fretta, le abilità richiedono più tempo. Un moltiplicatore regola l'esperienza guadagnata per ogni abilità.</p>

</div>

<div class="fl-facts">
<div><b>x1.5</b><span>Tiro con l'arco, guida, moto</span></div>
<div><b>x1</b><span>Medicina, mischia, fucili</span></div>
<div><b>x0.5</b><span>Tutte le altre abilità</span></div>
<div><b>50%</b><span>Fama sottratta con un'uccisione</span></div>
</div>


## :material-chart-line: Esperienza delle abilità

| Moltiplicatore | Abilità |
|---|---|
| **1.5** | Tiro con l'arco (`ArcherySkillMultiplier`), Guida (`DrivingSkillMultiplier`), Moto (`MotorcycleSkillMultiplier`) |
| **1** | Percezione, Cucina, Resistenza, Agricoltura, Medicina, Armi da mischia, Fucili, Corsa, Sopravvivenza |
| **0.5** | Aviazione, Rissa, Mimetismo, Demolizione, Ingegneria, Pistole, Tiro di precisione, Furtività, Furto |

Il nome dell'impostazione è il nome dell'abilità seguito da `SkillMultiplier`, per esempio `RiflesSkillMultiplier=1`.

## :material-star-circle: Altre impostazioni di progressione

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `EnableSelectedSkillsPromotion` | True | Le abilità messe in evidenza dalla campagna in corso danno un bonus. |
| `AllowSkillGainInSafeZones` | False | Nessuna esperienza nelle zone sicure, come le aree dei mercanti. |
| `FameGainMultiplier` | 1 | Velocità con cui si guadagnano i punti fama. |
| `FamePointRewardOnKill` | 0.5 | Chi uccide riceve il 50% dei punti fama della vittima. |
| `FamePointPenaltyOnKilled` | 0.5 | Un giocatore ucciso da un altro giocatore perde il 50% dei suoi punti fama. |
| `FamePointPenaltyOnDeath` | 0.1 | Ogni altra morte costa il 10% dei punti fama. |
| `PlantHarvestExamineTimeMultiplier` | 1 | Tempo per raccogliere una pianta. |
| `FirstPlantHarvestAdditionalChance` | 1 | Probabilità bonus al primo raccolto di una pianta. |

---

[Tutte le pagine delle impostazioni](overview.md#every-setting-explained) | [Elenco completo dei valori](all-settings.md)
