<div class="fl-page-hero fl-bg-a" markdown>

:material-key-variant:

# Bunkers

<p>Les cartes d'accès ouvrent les installations Killbox et Apex, le meilleur butin de la carte. Les bunkers abandonnés s'ouvrent d'eux-mêmes pendant un moment, puis se referment.</p>

</div>

<div class="fl-facts">
<div><b>6</b><span>Cartes Killbox</span></div>
<div><b>6</b><span>Cartes Apex</span></div>
<div><b>3</b><span>Bunkers ouverts en même temps</span></div>
<div><b>12 h</b><span>Durée d'ouverture d'un bunker</span></div>
</div>


## :material-key-variant: Cartes d'accès

| Réglage | Valeur | Rôle |
|---|---|---|
| `MaxAllowedKillboxKeycards` | 6 | Cartes Killbox que l'on peut trouver au total. |
| `MaxAllowedKillboxKeycards_PoliceStation` | 3 | Cartes Killbox dans les commissariats. |
| `MaxAllowedKillboxKeycards_RadiationZone` | 1 | Cartes Killbox dans la zone de radiation. |
| `MaxAllowedApexFacilityKeycards` | 6 | Cartes Apex Facility que l'on peut trouver au total. |
| `MaxAllowedApexFacilityKeycards_PoliceStation` | 3 | Cartes Apex dans les commissariats. |
| `MaxAllowedApexFacilityKeycards_RadiationZone` | 1 | Cartes Apex dans la zone de radiation. |
| `KillboxDefuseFailureBonus` | 0.2 | Secondes ajoutées par une tentative de désamorçage ratée. |
| `EnableBCULocking` | True | Les terminaux BCU peuvent être verrouillés. |

## :material-radioactive: Bunkers abandonnés

| Réglage | Valeur | Rôle |
|---|---|---|
| `AbandonedBunkerMaxSimultaneouslyActive` | 3 | Bunkers ouverts en même temps. |
| `AbandonedBunkerActiveDurationHours` | 12 | Heures pendant lesquelles un bunker reste ouvert après une activation naturelle. |
| `AbandonedBunkerKeyCardActiveDurationHours` | 3 | Heures pendant lesquelles un bunker reste ouvert après une activation par carte. |
| `AbandonedBunkerBCUTerminalCooldown` | 24:00:00 | Délai des terminaux BCU à l'intérieur. |
| `AbandonedBunkerResetArmoryLockersOnActivationOnly` | True | Les casiers d'armurerie ne se remplissent qu'à l'activation d'un bunker. |
| `SecretBunkerKeyCardActiveDurationHours` | 0.5 | Heures pendant lesquelles un bunker secret reste ouvert après une activation par carte. |
| `AbandonedBunkerCommotionThreshold`, `AbandonedBunkerCommotionThresholdPerPlayerExtra`, `AbandonedBunkerEnemyActivationThreshold`, `AbandonedBunkerEnemyActivationThresholdPerPlayerExtra` | -1 | Les seuils de bruit utilisent les valeurs intégrées du jeu. |
| `LogoutTimerInBunker` | 30000 | Secondes avant qu'un joueur déconnecté dans un bunker disparaisse. |

---

[Toutes les pages de réglages](overview.md#every-setting-explained) | [Liste complète des valeurs](all-settings.md)
