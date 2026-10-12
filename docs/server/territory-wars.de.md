<div class="fl-page-hero fl-bg-a" markdown>

:material-flag-variant:

# Gebiet

<p>Ein Server für Basis gegen Basis: Um das Gelände, das du hältst, wird gekämpft. Jeder Wert unten stammt direkt aus der ServerSettings.ini des Servers.</p>

</div>

<div class="fl-facts">
<div><b>3</b><span>Flaggen pro Spieler</span></div>
<div><b>300</b><span>Elemente pro Flagge</span></div>
<div><b>2</b><span>Geschütztürme pro Basis</span></div>
<div><b>24 h</b><span>Flaggeneroberung</span></div>
<div><b>8 h</b><span>Offline-Raid-Schutz</span></div>
<div><b>10</b><span>Truppgröße</span></div>
</div>


## :material-flag: Flaggen und Eroberung

| Einstellung | Wert | Wirkung |
|---|---|---|
| `AllowMultipleFlagsPerPlayer` | True | Ein Spieler kann mehr als eine Flagge aufstellen. |
| `NumberOfAllowedFlagsPerPlayer` | 3 | Flaggen, die jeder Spieler aufstellen darf. |
| `FlagOvertakeDuration` | 24:00:00 | Zeit, die zum Erobern einer feindlichen Flagge nötig ist. |
| `AllowFlagPlacementOnBBElements` | False | Flaggen können nicht auf Basisbau-Elemente gesetzt werden. |
| `UseMapBaseBuildingRestriction` | True | Von der Karte vorgegebene Bauverbotszonen gelten. |
| `UseBuildingProximityRestrictions` | True | Mindestabstände zwischen Basen gelten. |
| `DisableBaseBuilding` | False | Basisbau ist erlaubt. |

## :material-wall: Basisgröße

| Einstellung | Wert | Wirkung |
|---|---|---|
| `MaximumAmountOfElementsPerFlag` | 300 | Basiselemente, die in einen Flaggenbereich passen. |
| `ExtraElementsPerFlagForAdditionalSquadMember` | 17 | Zusätzliche Elemente pro Flagge für jedes Truppmitglied nach dem ersten. |
| `MaximumNumberOfExpandedElementsPerFlag` | 75 | Zusätzliche Elemente, die Basis-Erweiterungssets hinzufügen können. |
| `TurretMaxAmountPerFlagArea` | 2 | Erlaubte Geschütztürme pro Flaggenbereich. |
| `TurretStartDecayingIfFlagAreaHasMoreThan` | 2 | Geschütztürme über dieser Zahl verfallen schneller. |
| `AllowWallPlacementOnHalfAndLowWalls` | True | Wände können auf halbhohe und niedrige Wände gesetzt werden. |
| `AllowFloorPlacementOnHalfAndLowWalls` | False | Böden können nicht auf halbhohe und niedrige Wände gesetzt werden. |
| `WeaponRackMaxAmountPerFlagArea`, `WallWeaponRackMaxAmountPerFlagArea`, `WellMaxAmountPerFlagArea`, `OvenMaxAmountPerFlagArea`, `GardenMaxAmountPerFlagArea`, `SmokerMaxAmountPerFlagArea` | -1 | Keine Begrenzung für diese Objekte. |
| `TombstoneMaxAmountPerSquad` | -1 | Keine Begrenzung von Grabsteinen pro Trupp. |

## :material-timer-sand: Verfall

| Einstellung | Wert | Wirkung |
|---|---|---|
| `BaseElementsDecayRateMultiplier` | 0.5 | Geschwindigkeit, mit der nicht gewartete Basiselemente verfallen. Die Referenzzeit beträgt 672 Stunden; 0.5 dehnt sie auf 1344 Stunden (56 Tage). |
| `ChestAcquisitionDuration` | 24 | Stunden, bis eine feindliche Kiste in deinem Flaggenbereich dir gehört. |

## :material-shield-lock: Raid-Schutz

| Einstellung | Wert | Wirkung |
|---|---|---|
| `RaidProtectionType` | 1 | Offline-Schutz: Eine Basis ist geschützt, wenn alle ihre Mitglieder offline sind. |
| `RaidProtectionOfflineProtectionStartDelay` | 00:30:00 | Die Basis bleibt nach dem Abmelden des letzten Spielers 30 Minuten angreifbar. |
| `RaidProtectionOfflineMaxProtectionTime` | 08:00:00 | Maximale Dauer des Schutzes. |
| `RaidProtectionEnableLog` | False | Raid-Schutz-Ereignisse werden nicht protokolliert. |

## :material-account-group: Trupps

| Einstellung | Wert | Wirkung |
|---|---|---|
| `SquadMemberCountAtIntLevel1` bis `SquadMemberCountAtIntLevel5` | 10 | Trupps haben auf jeder Intelligenzstufe 10 Spieler. |
| `RTSquadProbationDuration` | 1 | Bewährungsstunden für ein Mitglied, das einen Trupp verlässt und wieder beitritt. |
| `SquadMemberCountLimitForPunishment` | 2 | Größter früherer Trupp, dessen Mitglieder keine Gefangenenstrafe erhalten. |
| `SquadMoneyPenaltyPerPrevSquadMember`, `SquadFamePointsPenaltyPerPrevSquadMember` | 0 | Kein Geld- oder Ruhmabzug beim Truppwechsel. |
| `EnableSquadMemberNameWidget` | True | Die Namen der Truppmitglieder werden über ihren Köpfen angezeigt (nur Truppmitglieder, nie Gegner). |

## :material-target: Geschütztürme

Geschütztürme greifen Gefangene, Puppets (Zombies), Fahrzeuge, Wächter, Tiere und bewaffnete NPCs an (`TurretsAttackPrisoners`, `TurretsAttackPuppets`, `TurretsAttackVehicles`, `TurretsAttackSentries`, `TurretsAttackAnimals`, `TurretsAttackArmedNPCs`, alle True).

## :material-hammer: Basisschaden

| Einstellung | Wert | Wirkung |
|---|---|---|
| `LockProtectionDamageMultiplier` | 1 | Schaden, den Schlösser an Personen verursachen, die beim Knacken scheitern. |
| `BaseBuildingDestructionLogDamageThreshold` | 20 | Schadensstufe, ab der die Zerstörung einer Basis protokolliert wird. |

## :material-link-variant: Verwandte Seiten

[Regeln](rules.md) behandelt Luftfahrzeuge und Minen. [Respawn](respawn.md) behandelt das Respawnen am Unterschlupf.

---

[Alle Einstellungsseiten](overview.md#every-setting-explained) | [Vollständige Werteliste](all-settings.md)
