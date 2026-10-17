<div class="fl-page-hero fl-bg-d" markdown>

:material-chart-line:

# Progression

<p>Un multiplicateur ajuste l'expérience gagnée pour chaque compétence. Tout progresse au rythme standard, le tir à l'arc et la conduite un peu plus vite.</p>

</div>

<div class="fl-facts">
<div><b>x1.5</b><span>Tir à l'arc, conduite</span></div>
<div><b>x1</b><span>Toutes les autres compétences</span></div>
<div><b>50%</b><span>Renommée prise lors d'un kill</span></div>
</div>


## :material-chart-line: Expérience des compétences

| Multiplicateur | Compétences |
|---|---|
| **1.5** | Tir à l'arc (`ArcherySkillMultiplier`), Conduite (`DrivingSkillMultiplier`) |
| **1** | Vigilance, Cuisine, Endurance, Agriculture, Médecine, Armes de mêlée, Fusils, Course, Survie, Aviation, Bagarre, Camouflage, Démolition, Ingénierie, Armes de poing, Tir de précision, Discrétion, Vol, Moto |

Le nom du réglage est le nom de la compétence suivi de `SkillMultiplier`, par exemple `RiflesSkillMultiplier=1`.

## :material-star-circle: Autres réglages de progression

| Réglage | Valeur | Rôle |
|---|---|---|
| `EnableSelectedSkillsPromotion` | True | Les compétences mises en avant par la campagne en cours rapportent un bonus. |
| `AllowSkillGainInSafeZones` | False | Pas d'expérience dans les zones sûres, comme les zones de marchands. |
| `FameGainMultiplier` | 1 | Vitesse à laquelle les points de renommée sont gagnés. |
| `FamePointRewardOnKill` | 0.5 | Un tueur reçoit 50 % des points de renommée de sa victime. |
| `FamePointPenaltyOnKilled` | 0.5 | Un joueur tué par un autre joueur perd 50 % de ses points de renommée. |
| `FamePointPenaltyOnDeath` | 0.1 | Toute autre mort coûte 10 % des points de renommée. |
| `PlantHarvestExamineTimeMultiplier` | 1 | Temps pour récolter une plante. |
| `FirstPlantHarvestAdditionalChance` | 1 | Chance bonus à la première récolte d'une plante. |

---

[Toutes les pages de réglages](overview.md#every-setting-explained) | [Liste complète des valeurs](all-settings.md)
