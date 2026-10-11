<div class="fl-page-hero fl-bg-c" markdown>

:material-tag-multiple:

# Économie

<p>Le butin est abondant et les marchands sont bon marché : on s'équipe en quelques heures.</p>

</div>

<div class="fl-facts">
<div><b>x5</b><span>Loot</span></div>
<div><b>x0.5</b><span>Prix du carburant et de l'eau</span></div>
<div><b>5</b><span>Quêtes par marchand et par cycle</span></div>
<div><b>2</b><span>Quêtes actives par marchand</span></div>
</div>


## :material-treasure-chest: Butin

| Réglage | Valeur | Rôle |
|---|---|---|
| `SpawnerProbabilityMultiplier` | 5 | Chance que des objets apparaissent au sol dans le monde (le loot x5). |
| `ExamineSpawnerProbabilityMultiplier` | 5 | Chance qu'un conteneur examiné donne un objet. |
| `SpawnerExpirationTimeMultiplier` | 1 | Durée de vie des objets apparus dans le monde. |
| `ExamineSpawnerExpirationTimeMultiplier` | 1 | Durée de vie des objets obtenus en examinant. |
| `EnableItemCooldownGroups` | True | Les objets rares partagent des groupes de délai, ce qui limite le farm d'objets. |
| `ItemCooldownGroupsDurationMultiplier` | 0.5 | Durée de ces délais. |
| `EnableLockedLootContainers` | True | Les casiers du monde sont verrouillés. |

## :material-gas-station: Carburant, eau et gaz en station

| Réglage | Valeur | Rôle |
|---|---|---|
| `WaterPricePerUnitMultiplier` | 0.5 | Prix de l'eau. |
| `GasolinePricePerUnitMultiplier` | 0.5 | Prix du carburant au litre. |
| `PropanePricePerUnitMultiplier` | 5 | Prix du propane au litre. |
| `WaterPeriodicInitialAmountMultiplier`, `GasolinePeriodicInitialAmountMultiplier`, `PropanePeriodicInitialAmountMultiplier` | 1 | Quantité de départ dans une source. |
| `...PeriodicMaxAmountMultiplier` (eau, essence, propane) | 1 | Quantité maximale dans une source. |
| `...PeriodicReplenishAmountMultiplier` et `...PeriodicReplenishIntervalMultiplier` | 1 | Quantité et vitesse de remplissage au fil du temps. |
| `...ProximityReplenishAmountMultiplier`, `...ProximityReplenishChanceMultiplier`, `...ProximityReplenishTimeoutMultiplier` | 1 | Remplissage quand un joueur est à proximité. |

## :material-clipboard-text: Quêtes

| Réglage | Valeur | Rôle |
|---|---|---|
| `QuestsEnabled` | True | Les quêtes sont disponibles. |
| `MaxQuestsPerCyclePerTrader` | 5 | Quêtes qu'un joueur peut accepter par marchand et par cycle. |
| `MaxSimultaneousQuestsPerTrader` | 2 | Quêtes actives en même temps par marchand. |
| `QuestsGlobalCycleDuration` | 23:59:59 | Durée d'un cycle de quêtes. |
| `QuestsTraderRefillCooldown` | 03:00:00 | Les quêtes des marchands se renouvellent toutes les 3 heures. |
| `QuestsPhoneRefillCooldown` | 01:00:00 | Les quêtes par téléphone se renouvellent toutes les heures. |
| `QuestsNoticeBoardRefillCooldown` | 02:00:00 | Les quêtes des panneaux d'affichage se renouvellent toutes les 2 heures. |
| `QuestRequirementsBlockTradeableItems` | False | Les objets de quête peuvent toujours être échangés. |

## :material-account-edit: Services

| Réglage | Valeur | Rôle |
|---|---|---|
| `NameChangeCost` | 500 | Prix pour changer le nom d'un personnage. |
| `NameChangeCooldown` | 168 | Heures entre deux changements de nom. |
| `DisableTimedGifts` | False | Les cadeaux saisonniers restent actifs. |
| `EnableDeenaOnServer` | True | Deena est active. |

---

[Toutes les pages de réglages](overview.md#every-setting-explained) | [Liste complète des valeurs](all-settings.md)
