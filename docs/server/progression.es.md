<div class="fl-page-hero fl-bg-d" markdown>

:material-chart-line:

# Progresión

<p>El equipo llega rápido, las habilidades tardan más. Un multiplicador escala la experiencia ganada en cada habilidad.</p>

</div>

<div class="fl-facts">
<div><b>x1.5</b><span>Tiro con arco, conducción, motocicleta</span></div>
<div><b>x1</b><span>Medicina, cuerpo a cuerpo, rifles</span></div>
<div><b>x0.5</b><span>Todas las demás habilidades</span></div>
<div><b>50%</b><span>Fama que se quita en una baja</span></div>
</div>


## :material-chart-line: Experiencia de habilidades

| Multiplicador | Habilidades |
|---|---|
| **1.5** | Tiro con arco (`ArcherySkillMultiplier`), Conducción (`DrivingSkillMultiplier`), Motocicleta (`MotorcycleSkillMultiplier`) |
| **1** | Percepción, Cocina, Resistencia, Agricultura, Medicina, Armas cuerpo a cuerpo, Rifles, Carrera, Supervivencia |
| **0.5** | Aviación, Pelea, Camuflaje, Demolición, Ingeniería, Armas cortas, Francotirador, Sigilo, Robo |

El nombre del ajuste es el nombre de la habilidad seguido de `SkillMultiplier`, por ejemplo `RiflesSkillMultiplier=1`.

## :material-star-circle: Otros ajustes de progresión

| Ajuste | Valor | Qué hace |
|---|---|---|
| `EnableSelectedSkillsPromotion` | True | Las habilidades destacadas por la campaña actual dan una bonificación. |
| `AllowSkillGainInSafeZones` | False | Sin experiencia en zonas seguras, como las áreas de comerciantes. |
| `FameGainMultiplier` | 1 | Velocidad a la que se ganan puntos de fama. |
| `FamePointRewardOnKill` | 0.5 | Quien mata recibe el 50 % de los puntos de fama de la víctima. |
| `FamePointPenaltyOnKilled` | 0.5 | Un jugador al que mata otro jugador pierde el 50 % de sus puntos de fama. |
| `FamePointPenaltyOnDeath` | 0.1 | Cualquier otra muerte cuesta el 10 % de los puntos de fama. |
| `PlantHarvestExamineTimeMultiplier` | 1 | Tiempo para cosechar una planta. |
| `FirstPlantHarvestAdditionalChance` | 1 | Probabilidad extra en la primera cosecha de una planta. |

---

[Todas las páginas de ajustes](overview.md#every-setting-explained) | [Lista completa de valores](all-settings.md)
