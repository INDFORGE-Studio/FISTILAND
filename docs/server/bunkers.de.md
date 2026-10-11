<div class="fl-page-hero fl-bg-a" markdown>

:material-key-variant:

# Bunker

<p>Zugangskarten öffnen die Killbox- und Apex-Anlagen, den besten Loot der Karte. Verlassene Bunker öffnen sich eine Weile von selbst und schließen sich dann wieder.</p>

</div>

<div class="fl-facts">
<div><b>6</b><span>Killbox-Karten</span></div>
<div><b>6</b><span>Apex-Karten</span></div>
<div><b>3</b><span>Gleichzeitig offene Bunker</span></div>
<div><b>12 h</b><span>Öffnungsdauer eines Bunkers</span></div>
</div>


## :material-key-variant: Zugangskarten

| Einstellung | Wert | Wirkung |
|---|---|---|
| `MaxAllowedKillboxKeycards` | 6 | Killbox-Karten, die insgesamt gefunden werden können. |
| `MaxAllowedKillboxKeycards_PoliceStation` | 3 | Killbox-Karten in Polizeiwachen. |
| `MaxAllowedKillboxKeycards_RadiationZone` | 1 | Killbox-Karten in der Strahlungszone. |
| `MaxAllowedApexFacilityKeycards` | 6 | Apex-Facility-Karten, die insgesamt gefunden werden können. |
| `MaxAllowedApexFacilityKeycards_PoliceStation` | 3 | Apex-Karten in Polizeiwachen. |
| `MaxAllowedApexFacilityKeycards_RadiationZone` | 1 | Apex-Karten in der Strahlungszone. |
| `KillboxDefuseFailureBonus` | 0.2 | Zusätzliche Sekunden durch einen gescheiterten Entschärfungsversuch. |
| `EnableBCULocking` | True | BCU-Terminals können gesperrt werden. |

## :material-radioactive: Verlassene Bunker

| Einstellung | Wert | Wirkung |
|---|---|---|
| `AbandonedBunkerMaxSimultaneouslyActive` | 3 | Gleichzeitig geöffnete Bunker. |
| `AbandonedBunkerActiveDurationHours` | 12 | Stunden, die ein Bunker nach einer natürlichen Aktivierung offen bleibt. |
| `AbandonedBunkerKeyCardActiveDurationHours` | 3 | Stunden, die ein Bunker nach einer Aktivierung per Karte offen bleibt. |
| `AbandonedBunkerBCUTerminalCooldown` | 24:00:00 | Abklingzeit der BCU-Terminals darin. |
| `AbandonedBunkerResetArmoryLockersOnActivationOnly` | True | Waffenspinde füllen sich nur auf, wenn ein Bunker aktiviert wird. |
| `SecretBunkerKeyCardActiveDurationHours` | 0.5 | Stunden, die ein geheimer Bunker nach einer Aktivierung per Karte offen bleibt. |
| `AbandonedBunkerCommotionThreshold`, `AbandonedBunkerCommotionThresholdPerPlayerExtra`, `AbandonedBunkerEnemyActivationThreshold`, `AbandonedBunkerEnemyActivationThresholdPerPlayerExtra` | -1 | Lärmschwellen verwenden die im Spiel eingebauten Werte. |
| `LogoutTimerInBunker` | 30000 | Sekunden, bis ein Spieler, der sich in einem Bunker abmeldet, verschwindet. |

---

[Alle Einstellungsseiten](overview.md#every-setting-explained) | [Vollständige Werteliste](all-settings.md)
