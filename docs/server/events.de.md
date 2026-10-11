<div class="fl-page-hero fl-bg-b" markdown>

:material-package-variant-closed:

# Ereignisse

<p>Versorgungsabwürfe geben jedem Trupp einen Grund, seine Basis zu verlassen. Mechs und Landungsschiffe sind aus, die Kämpfe bleiben also unter Spielern.</p>

</div>

<div class="fl-facts">
<div><b>45-60 min</b><span>Zwischen Versorgungsabwürfen</span></div>
<div><b>0</b><span>Mechs</span></div>
<div><b>9 min</b><span>Von der Ankündigung bis zum Fall</span></div>
<div><b>20 min</b><span>Bis eine ungeöffnete Kiste explodiert</span></div>
</div>


## :material-package-variant-closed: Versorgungsabwürfe

| Einstellung | Wert | Wirkung |
|---|---|---|
| `CargoDropCooldownMinimum` | 45 | Mindestminuten zwischen zwei Versorgungsabwürfen. |
| `CargoDropCooldownMaximum` | 60 | Höchstminuten zwischen zwei Versorgungsabwürfen. |
| `CargoDropFallDelay` | 540 | Sekunden zwischen der Ankündigung und dem Fall. |
| `CargoDropFallDuration` | 60 | Sekunden, die die Kiste zum Fallen braucht. |
| `CargoDropSelfdestructTime` | 1200 | Sekunden, bis eine ungeöffnete Kiste explodiert. |
| `CargoDropZombieEncounterWeightMultiplier` | 0.3 | Gewicht der Zombie-Begegnung bei einem Abwurf. |
| `CargoDropDropshipEncounterWeightMultiplier` | 0.01 | Gewicht der Landungsschiff-Begegnung bei einem Abwurf. Das Landungsschiff wird praktisch nie gewählt. |

## :material-robot-off: Mechs und Landungsschiffe

| Einstellung | Wert | Wirkung |
|---|---|---|
| `DisableSentrySpawning` | True | Keine Mechs. |
| `EnableSentryRespawning` | False | Kein Mech kehrt per Landungsschiff zurück. |
| `EnableDropshipAbandonedBunkerEncounter` | False | Kein Landungsschiff an verlassenen Bunkern. |
| `DropshipAbandonedBunkerEncounterTriggerChance` | -1 | Spielstandard (ungenutzt, solange die Begegnung aus ist). |
| `EnableDropshipBaseBuildingEncounter` | False | Kein Landungsschiff greift an, während du eine Basis baust. |
| `BaseBuildingEncounterTriggerChance` | 0 | Keine Begegnung beim Basisbau. |
| `BaseBuildingEncounterTriggerTimeMultiplier` | 1 | Zeitpunkt von Basisbau-Begegnungen. |
| `DropshipHealthMultiplier`, `SentryHealthMultiplier`, `BaseBuildingAttackerSentryHealthMultiplier` | 1 | Gesundheit von Landungsschiffen und Wächtern. |
| `DropshipDamageMultiplier`, `SentryDamageMultiplier` | 1 | Schaden von Landungsschiffen und Wächtern. |

## :material-calendar-star: Server-Ereignisse

| Einstellung | Wert | Wirkung |
|---|---|---|
| `AllowEvents` | True | Ereignisse sind auf dem Server erlaubt. |
| `AllowVoting` | True | Spieler können abstimmen. |
| `VotingDuration` | 60 | Dauer einer Abstimmung in Sekunden. |
| `PlayerMinimalVotingInterest` | 0.5 | Anteil der Spieler, die teilnehmen müssen, damit eine Abstimmung zählt. |
| `PlayerPositiveVotePercentage` | 0.5 | Anteil der Ja-Stimmen, der zum Bestehen nötig ist. |

---

[Alle Einstellungsseiten](overview.md#every-setting-explained) | [Vollständige Werteliste](all-settings.md)
