<div class="fl-page-hero fl-bg-b" markdown>

:material-timer-sand:

# Respawn

<p>Un combat perdu coûte quelques minutes, pas une soirée. Les prix terminés par g se paient en or ; les autres, en points de renommée.</p>

</div>

<div class="fl-facts">
<div><b>30 s</b><span>Attente à l'abri</span></div>
<div><b>150</b><span>Prix à l'abri</span></div>
<div><b>100</b><span>Respawn aléatoire</span></div>
<div><b>250</b><span>Respawn en secteur</span></div>
<div><b>Off</b><span>Maladie du clonage</span></div>
</div>


## :material-parachute: Méthodes de respawn

| Réglage | Valeur | Rôle |
|---|---|---|
| `AllowSectorRespawn` | True | Réapparition dans un secteur choisi. |
| `AllowShelterRespawn` | True | Réapparition à votre abri. |
| `AllowSquadmateRespawn` | True | Réapparition à côté d'un membre de l'escouade. |
| `EnableSpawnOnGround` | False | Les nouvelles apparitions arrivent en parachute. |
| `AllowAutomaticParachuteOpening` | True | Le parachute s'ouvre automatiquement. |

## :material-cash: Prix

| Réglage | Valeur | Rôle |
|---|---|---|
| `RandomRespawnPrice` | 100 | Réapparition en un point aléatoire. |
| `SectorRespawnPrice` | 250 | Réapparition dans un secteur choisi. |
| `ShelterRespawnPrice` | 150 | Réapparition à votre abri dans une zone de drapeau. |
| `ShelterRespawnPriceOutsideFlagArea` | 2g | Réapparition à un abri hors d'une zone de drapeau. |
| `SquadRespawnPrice` | 2g | Réapparition à côté d'un membre de l'escouade. |
| `RandomPricePerSquadmateModifier`, `SectorPricePerSquadmateModifier`, `ShelterPricePerSquadmateModifier` | 0 | La taille de l'escouade ne change pas le prix. |

## :material-timer-sand: Temps d'attente

| Réglage | Valeur | Rôle |
|---|---|---|
| `RandomRespawnInitialTime` | 0 | Attente avant qu'un respawn aléatoire soit possible (secondes). |
| `SectorRespawnInitialTime` | 60 | Attente avant qu'un respawn en secteur soit possible (secondes). |
| `ShelterRespawnInitialTime` | 30 | Attente avant qu'un respawn à l'abri soit possible (secondes). |
| `SquadRespawnInitialTime` | 60 | Attente avant qu'un respawn d'escouade soit possible (secondes). |
| `RandomRespawnCooldown` | 0 | Attente supplémentaire après des morts répétées, respawn aléatoire. |
| `SectorRespawnCooldown` | 120 | Attente supplémentaire après des morts répétées, respawn en secteur. |
| `ShelterRespawnCooldown` | 120 | Attente supplémentaire après des morts répétées, respawn à l'abri. |
| `SquadRespawnCooldown` | 60 | Attente supplémentaire après des morts répétées, respawn d'escouade. |
| `RandomCooldownResetMultiplier` | 0 | Le délai du respawn aléatoire se réinitialise aussitôt. |
| `SectorCooldownResetMultiplier`, `ShelterCooldownResetMultiplier`, `SquadCooldownResetMultiplier` | 0.7 | Le délai se réinitialise après ce multiple du temps d'attente. |

## :material-skull: Suicide

| Réglage | Valeur | Rôle |
|---|---|---|
| `CommitSuicideInitialTime` | 30 | Secondes avant que la commande de suicide soit disponible. |
| `CommitSuicideCooldown` | 300 | Secondes avant de pouvoir la réutiliser. |
| `CommitSuicideCooldownResetMultiplier` | 1.25 | Vitesse de réinitialisation du délai de suicide. |

## :material-cog: Autres

| Réglage | Valeur | Rôle |
|---|---|---|
| `MaximumBaseProximityWhenSpawning` | 5000 | Distance aux drapeaux ennemis utilisée pour choisir un point d'apparition. |
| `CloningSicknessEnabled` | False | Pas de maladie du clonage après un respawn. |
| `PermadeathThreshold` | -7500 | Solde négatif à partir duquel un personnage est supprimé définitivement. |

---

[Toutes les pages de réglages](overview.md#every-setting-explained) | [Liste complète des valeurs](all-settings.md)
