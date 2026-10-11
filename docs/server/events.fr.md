<div class="fl-page-hero fl-bg-b" markdown>

:material-package-variant-closed:

# Événements

<p>Les largages de ravitaillement donnent à chaque escouade une raison de quitter sa base. Les mécas et les vaisseaux sont désactivés : les combats restent entre joueurs.</p>

</div>

<div class="fl-facts">
<div><b>45-60 min</b><span>Entre deux largages</span></div>
<div><b>0</b><span>Mécas</span></div>
<div><b>9 min</b><span>De l'annonce à la chute</span></div>
<div><b>20 min</b><span>Avant qu'une caisse fermée explose</span></div>
</div>


## :material-package-variant-closed: Largages de ravitaillement

| Réglage | Valeur | Rôle |
|---|---|---|
| `CargoDropCooldownMinimum` | 45 | Minutes minimum entre deux largages. |
| `CargoDropCooldownMaximum` | 60 | Minutes maximum entre deux largages. |
| `CargoDropFallDelay` | 540 | Secondes entre l'annonce et la chute. |
| `CargoDropFallDuration` | 60 | Secondes que met la caisse à tomber. |
| `CargoDropSelfdestructTime` | 1200 | Secondes avant qu'une caisse non ouverte explose. |
| `CargoDropZombieEncounterWeightMultiplier` | 0.3 | Poids de la rencontre de zombies lors d'un largage. |
| `CargoDropDropshipEncounterWeightMultiplier` | 0.01 | Poids de la rencontre avec un vaisseau lors d'un largage. Le vaisseau n'est pratiquement jamais choisi. |

## :material-robot-off: Mécas et vaisseaux

| Réglage | Valeur | Rôle |
|---|---|---|
| `DisableSentrySpawning` | True | Pas de mécas. |
| `EnableSentryRespawning` | False | Aucun méca ne revient par vaisseau. |
| `EnableDropshipAbandonedBunkerEncounter` | False | Pas de vaisseau aux bunkers abandonnés. |
| `DropshipAbandonedBunkerEncounterTriggerChance` | -1 | Valeur par défaut du jeu (inutilisée tant que la rencontre est désactivée). |
| `EnableDropshipBaseBuildingEncounter` | False | Pas de vaisseau qui attaque pendant que vous construisez une base. |
| `BaseBuildingEncounterTriggerChance` | 0 | Pas de rencontre pendant la construction de base. |
| `BaseBuildingEncounterTriggerTimeMultiplier` | 1 | Moment des rencontres de construction de base. |
| `DropshipHealthMultiplier`, `SentryHealthMultiplier`, `BaseBuildingAttackerSentryHealthMultiplier` | 1 | Santé des vaisseaux et des sentinelles. |
| `DropshipDamageMultiplier`, `SentryDamageMultiplier` | 1 | Dégâts des vaisseaux et des sentinelles. |

## :material-calendar-star: Événements du serveur

| Réglage | Valeur | Rôle |
|---|---|---|
| `AllowEvents` | True | Les événements sont autorisés sur le serveur. |
| `AllowVoting` | True | Les joueurs peuvent voter. |
| `VotingDuration` | 60 | Durée d'un vote en secondes. |
| `PlayerMinimalVotingInterest` | 0.5 | Part des joueurs qui doivent participer pour qu'un vote compte. |
| `PlayerPositiveVotePercentage` | 0.5 | Part de votes pour nécessaire pour l'emporter. |

---

[Toutes les pages de réglages](overview.md#every-setting-explained) | [Liste complète des valeurs](all-settings.md)
