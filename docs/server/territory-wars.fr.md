<div class="fl-page-hero fl-bg-a" markdown>

:material-flag-variant:

# Territoire

<p>Un serveur de base contre base : le terrain que vous tenez est ce pour quoi vous vous battez. Chaque valeur ci-dessous vient directement du ServerSettings.ini du serveur.</p>

</div>

<div class="fl-facts">
<div><b>3</b><span>Drapeaux par joueur</span></div>
<div><b>200</b><span>Éléments par drapeau</span></div>
<div><b>2</b><span>Tourelles par base</span></div>
<div><b>24 h</b><span>Capture de drapeau</span></div>
<div><b>8 h</b><span>Protection hors ligne contre les raids</span></div>
<div><b>4</b><span>Taille d'escouade</span></div>
</div>


## :material-flag: Drapeaux et capture

| Réglage | Valeur | Rôle |
|---|---|---|
| `AllowMultipleFlagsPerPlayer` | True | Un joueur peut poser plusieurs drapeaux. |
| `NumberOfAllowedFlagsPerPlayer` | 3 | Drapeaux que chaque joueur peut poser. |
| `FlagOvertakeDuration` | 24:00:00 | Temps nécessaire pour capturer un drapeau ennemi. |
| `AllowFlagPlacementOnBBElements` | False | Les drapeaux ne peuvent pas être posés sur des éléments de construction de base. |
| `UseMapBaseBuildingRestriction` | True | Les zones où la carte interdit de construire sont appliquées. |
| `UseBuildingProximityRestrictions` | True | Les distances minimales entre bases sont appliquées. |
| `DisableBaseBuilding` | False | La construction de base est autorisée. |

## :material-wall: Taille des bases

| Réglage | Valeur | Rôle |
|---|---|---|
| `MaximumAmountOfElementsPerFlag` | 200 | Éléments de base qui tiennent dans une zone de drapeau. |
| `ExtraElementsPerFlagForAdditionalSquadMember` | 25 | Éléments supplémentaires par drapeau pour chaque membre d'escouade après le premier. |
| `MaximumNumberOfExpandedElementsPerFlag` | 75 | Éléments supplémentaires que les kits d'extension de base peuvent ajouter. |
| `TurretMaxAmountPerFlagArea` | 2 | Tourelles autorisées par zone de drapeau. |
| `TurretStartDecayingIfFlagAreaHasMoreThan` | 2 | Au-delà de ce nombre, les tourelles se dégradent plus vite. |
| `AllowWallPlacementOnHalfAndLowWalls` | True | Les murs peuvent être posés sur des murs bas et mi-hauteur. |
| `AllowFloorPlacementOnHalfAndLowWalls` | False | Les sols ne peuvent pas être posés sur des murs bas et mi-hauteur. |
| `WeaponRackMaxAmountPerFlagArea`, `WallWeaponRackMaxAmountPerFlagArea`, `WellMaxAmountPerFlagArea`, `OvenMaxAmountPerFlagArea`, `GardenMaxAmountPerFlagArea`, `SmokerMaxAmountPerFlagArea` | -1 | Aucune limite pour ces objets. |
| `TombstoneMaxAmountPerSquad` | -1 | Aucune limite de pierres tombales par escouade. |

## :material-timer-sand: Dégradation

| Réglage | Valeur | Rôle |
|---|---|---|
| `BaseElementsDecayRateMultiplier` | 0.5 | Vitesse à laquelle les éléments de base non entretenus se dégradent. Le délai de référence est de 672 heures ; 0.5 le porte à 1344 heures (56 jours). |
| `ChestAcquisitionDuration` | 24 | Heures avant qu'un coffre ennemi situé dans votre zone de drapeau vous appartienne. |

## :material-shield-lock: Protection contre les raids

| Réglage | Valeur | Rôle |
|---|---|---|
| `RaidProtectionType` | 1 | Protection hors ligne : une base est protégée quand tous ses membres sont hors ligne. |
| `RaidProtectionOfflineProtectionStartDelay` | 00:30:00 | La base reste vulnérable 30 minutes après la déconnexion du dernier joueur. |
| `RaidProtectionOfflineMaxProtectionTime` | 08:00:00 | Durée maximale de la protection. |
| `RaidProtectionEnableLog` | False | Les événements de protection contre les raids ne sont pas journalisés. |

## :material-account-group: Escouades

| Réglage | Valeur | Rôle |
|---|---|---|
| `SquadMemberCountAtIntLevel1` à `SquadMemberCountAtIntLevel5` | 4 | Les escouades comptent 4 joueurs à chaque niveau d'intelligence. |
| `RTSquadProbationDuration` | 1 | Heures de probation pour un membre qui quitte puis rejoint une escouade. |
| `SquadMemberCountLimitForPunishment` | 2 | Plus grande ancienne escouade dont les membres n'ont pas de pénalité de prisonnier. |
| `SquadMoneyPenaltyPerPrevSquadMember`, `SquadFamePointsPenaltyPerPrevSquadMember` | 0 | Aucune pénalité d'argent ni de renommée en changeant d'escouade. |
| `EnableSquadMemberNameWidget` | False | Les noms des coéquipiers ne s'affichent pas au-dessus de leur tête. |

## :material-target: Tourelles

Les tourelles attaquent les prisonniers, les marionnettes (zombies), les véhicules, les sentinelles, les animaux et les PNJ armés (`TurretsAttackPrisoners`, `TurretsAttackPuppets`, `TurretsAttackVehicles`, `TurretsAttackSentries`, `TurretsAttackAnimals`, `TurretsAttackArmedNPCs`, tous à True).

## :material-hammer: Dégâts de base

| Réglage | Valeur | Rôle |
|---|---|---|
| `LockProtectionDamageMultiplier` | 1 | Dégâts infligés par les serrures à ceux qui échouent à les crocheter. |
| `BaseBuildingDestructionLogDamageThreshold` | 20 | Niveau de dégâts au-delà duquel la destruction de base est journalisée. |

## :material-link-variant: Pages liées

[Règles](rules.md) traite des avions et des mines. [Respawn](respawn.md) traite des réapparitions à l'abri.

---

[Toutes les pages de réglages](overview.md#every-setting-explained) | [Liste complète des valeurs](all-settings.md)
