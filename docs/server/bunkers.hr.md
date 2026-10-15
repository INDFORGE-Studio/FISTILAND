<div class="fl-page-hero fl-bg-a" markdown>

:material-key-variant:

# Bunkeri

<p>Pristupne kartice otvaraju objekte Killbox i Apex, najbolji loot na karti. Napušteni bunkeri sami se otvore na neko vrijeme, a zatim se opet zatvore.</p>

</div>

<div class="fl-facts">
<div><b>6</b><span>Killbox kartica</span></div>
<div><b>6</b><span>Apex kartica</span></div>
<div><b>3</b><span>Bunkera otvorena istodobno</span></div>
<div><b>12 h</b><span>Vrijeme otvorenosti bunkera</span></div>
</div>


## :material-key-variant: Pristupne kartice

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `MaxAllowedKillboxKeycards` | 6 | Killbox kartice koje se ukupno mogu pronaći. |
| `MaxAllowedKillboxKeycards_PoliceStation` | 3 | Killbox kartice u policijskim postajama. |
| `MaxAllowedKillboxKeycards_RadiationZone` | 1 | Killbox kartice u zoni radijacije. |
| `MaxAllowedApexFacilityKeycards` | 6 | Apex Facility kartice koje se ukupno mogu pronaći. |
| `MaxAllowedApexFacilityKeycards_PoliceStation` | 3 | Apex kartice u policijskim postajama. |
| `MaxAllowedApexFacilityKeycards_RadiationZone` | 1 | Apex kartice u zoni radijacije. |
| `KillboxDefuseFailureBonus` | 0.2 | Dodatne sekunde koje dodaje neuspjeli pokušaj deaktivacije. |
| `EnableBCULocking` | True | BCU terminali mogu se zaključati. |

## :material-radioactive: Napušteni bunkeri

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `AbandonedBunkerMaxSimultaneouslyActive` | 3 | Bunkeri otvoreni istodobno. |
| `AbandonedBunkerActiveDurationHours` | 12 | Sati koliko bunker ostaje otvoren nakon prirodne aktivacije. |
| `AbandonedBunkerKeyCardActiveDurationHours` | 3 | Sati koliko bunker ostaje otvoren nakon aktivacije karticom. |
| `AbandonedBunkerBCUTerminalCooldown` | 24:00:00 | Vrijeme čekanja BCU terminala unutra. |
| `AbandonedBunkerResetArmoryLockersOnActivationOnly` | True | Ormarići oružarnice pune se samo pri aktivaciji bunkera. |
| `SecretBunkerKeyCardActiveDurationHours` | 0.5 | Sati koliko tajni bunker ostaje otvoren nakon aktivacije karticom. |
| `AbandonedBunkerCommotionThreshold`, `AbandonedBunkerCommotionThresholdPerPlayerExtra`, `AbandonedBunkerEnemyActivationThreshold`, `AbandonedBunkerEnemyActivationThresholdPerPlayerExtra` | -1 | Pragovi buke koriste ugrađene vrijednosti igre. |
| `LogoutTimerInBunker` | 30000 | Sekunde prije nego igrač koji se odjavi u bunkeru nestane. |

---

[Sve stranice postavki poslužitelja](overview.md#every-setting-explained) | [Potpuni popis vrijednosti](all-settings.md)

--8<-- "abbr.hr.md"
