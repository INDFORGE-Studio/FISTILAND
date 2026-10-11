<div class="fl-page-hero fl-bg-b" markdown>

:material-timer-sand:

# Respawn

<p>Ein verlorener Kampf kostet Minuten, keinen ganzen Abend. Preise mit einem g am Ende werden in Gold bezahlt, die anderen in Ruhmpunkten.</p>

</div>

<div class="fl-facts">
<div><b>30 s</b><span>Wartezeit am Unterschlupf</span></div>
<div><b>150</b><span>Preis am Unterschlupf</span></div>
<div><b>100</b><span>Zufalls-Respawn</span></div>
<div><b>250</b><span>Sektor-Respawn</span></div>
<div><b>Aus</b><span>Klonkrankheit</span></div>
</div>


## :material-parachute: Respawn-Methoden

| Einstellung | Wert | Wirkung |
|---|---|---|
| `AllowSectorRespawn` | True | Respawn in einem gewählten Sektor. |
| `AllowShelterRespawn` | True | Respawn an deinem Unterschlupf. |
| `AllowSquadmateRespawn` | True | Respawn neben einem Truppmitglied. |
| `EnableSpawnOnGround` | False | Neue Spawns kommen per Fallschirm an. |
| `AllowAutomaticParachuteOpening` | True | Der Fallschirm öffnet sich automatisch. |

## :material-cash: Preise

| Einstellung | Wert | Wirkung |
|---|---|---|
| `RandomRespawnPrice` | 100 | Respawn an einem zufälligen Punkt. |
| `SectorRespawnPrice` | 250 | Respawn in einem gewählten Sektor. |
| `ShelterRespawnPrice` | 150 | Respawn an deinem Unterschlupf innerhalb eines Flaggenbereichs. |
| `ShelterRespawnPriceOutsideFlagArea` | 2g | Respawn an einem Unterschlupf außerhalb eines Flaggenbereichs. |
| `SquadRespawnPrice` | 2g | Respawn neben einem Truppmitglied. |
| `RandomPricePerSquadmateModifier`, `SectorPricePerSquadmateModifier`, `ShelterPricePerSquadmateModifier` | 0 | Die Truppgröße ändert den Preis nicht. |

## :material-timer-sand: Wartezeiten

| Einstellung | Wert | Wirkung |
|---|---|---|
| `RandomRespawnInitialTime` | 0 | Wartezeit, bis ein Zufalls-Respawn möglich ist (Sekunden). |
| `SectorRespawnInitialTime` | 60 | Wartezeit, bis ein Sektor-Respawn möglich ist (Sekunden). |
| `ShelterRespawnInitialTime` | 30 | Wartezeit, bis ein Respawn am Unterschlupf möglich ist (Sekunden). |
| `SquadRespawnInitialTime` | 60 | Wartezeit, bis ein Trupp-Respawn möglich ist (Sekunden). |
| `RandomRespawnCooldown` | 0 | Zusätzliche Wartezeit nach wiederholten Toden, Zufalls-Respawn. |
| `SectorRespawnCooldown` | 120 | Zusätzliche Wartezeit nach wiederholten Toden, Sektor-Respawn. |
| `ShelterRespawnCooldown` | 120 | Zusätzliche Wartezeit nach wiederholten Toden, Respawn am Unterschlupf. |
| `SquadRespawnCooldown` | 60 | Zusätzliche Wartezeit nach wiederholten Toden, Trupp-Respawn. |
| `RandomCooldownResetMultiplier` | 0 | Die Abklingzeit des Zufalls-Respawns wird sofort zurückgesetzt. |
| `SectorCooldownResetMultiplier`, `ShelterCooldownResetMultiplier`, `SquadCooldownResetMultiplier` | 0.7 | Die Abklingzeit wird nach diesem Vielfachen der Abklingzeit zurückgesetzt. |

## :material-skull: Selbstmord

| Einstellung | Wert | Wirkung |
|---|---|---|
| `CommitSuicideInitialTime` | 30 | Sekunden, bis der Selbstmord-Befehl verfügbar ist. |
| `CommitSuicideCooldown` | 300 | Sekunden, bis er erneut verwendet werden kann. |
| `CommitSuicideCooldownResetMultiplier` | 1.25 | Wie schnell die Selbstmord-Abklingzeit zurückgesetzt wird. |

## :material-cog: Sonstiges

| Einstellung | Wert | Wirkung |
|---|---|---|
| `MaximumBaseProximityWhenSpawning` | 5000 | Abstand zu feindlichen Flaggen, der bei der Wahl eines Spawnpunkts verwendet wird. |
| `CloningSicknessEnabled` | False | Keine Klonkrankheit nach dem Respawn. |
| `PermadeathThreshold` | -7500 | Negativer Kontostand, ab dem ein Charakter endgültig gelöscht wird. |

---

[Alle Einstellungsseiten](overview.md#every-setting-explained) | [Vollständige Werteliste](all-settings.md)
