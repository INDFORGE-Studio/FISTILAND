<div class="fl-page-hero fl-bg-a" markdown>

:material-key-variant:

# Bunkry

<p>Karty dostępu otwierają obiekty Killbox i Apex, najlepszy loot na mapie. Opuszczone bunkry same otwierają się na jakiś czas, a potem znów się zamykają.</p>

</div>

<div class="fl-facts">
<div><b>6</b><span>Kart Killbox</span></div>
<div><b>6</b><span>Kart Apex</span></div>
<div><b>3</b><span>Bunkry otwarte naraz</span></div>
<div><b>12 h</b><span>Czas otwarcia bunkra</span></div>
</div>


## :material-key-variant: Karty dostępu

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `MaxAllowedKillboxKeycards` | 6 | Karty Killbox, które można znaleźć łącznie. |
| `MaxAllowedKillboxKeycards_PoliceStation` | 3 | Karty Killbox na posterunkach policji. |
| `MaxAllowedKillboxKeycards_RadiationZone` | 1 | Karty Killbox w strefie radiacji. |
| `MaxAllowedApexFacilityKeycards` | 6 | Karty Apex Facility, które można znaleźć łącznie. |
| `MaxAllowedApexFacilityKeycards_PoliceStation` | 3 | Karty Apex na posterunkach policji. |
| `MaxAllowedApexFacilityKeycards_RadiationZone` | 1 | Karty Apex w strefie radiacji. |
| `KillboxDefuseFailureBonus` | 0.2 | Dodatkowe sekundy dodawane przez nieudaną próbę rozbrojenia. |
| `EnableBCULocking` | True | Terminale BCU można zablokować. |

## :material-radioactive: Opuszczone bunkry

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `AbandonedBunkerMaxSimultaneouslyActive` | 3 | Bunkry otwarte w tym samym czasie. |
| `AbandonedBunkerActiveDurationHours` | 12 | Godziny, przez które bunkier pozostaje otwarty po naturalnej aktywacji. |
| `AbandonedBunkerKeyCardActiveDurationHours` | 3 | Godziny, przez które bunkier pozostaje otwarty po aktywacji kartą. |
| `AbandonedBunkerBCUTerminalCooldown` | 24:00:00 | Czas odnowienia terminali BCU w środku. |
| `AbandonedBunkerResetArmoryLockersOnActivationOnly` | True | Szafki zbrojowni uzupełniają się tylko przy aktywacji bunkra. |
| `SecretBunkerKeyCardActiveDurationHours` | 0.5 | Godziny, przez które tajny bunkier pozostaje otwarty po aktywacji kartą. |
| `AbandonedBunkerCommotionThreshold`, `AbandonedBunkerCommotionThresholdPerPlayerExtra`, `AbandonedBunkerEnemyActivationThreshold`, `AbandonedBunkerEnemyActivationThresholdPerPlayerExtra` | -1 | Progi hałasu używają wbudowanych wartości gry. |
| `LogoutTimerInBunker` | 30000 | Sekundy, zanim gracz wylogowujący się w bunkrze zniknie. |

---

[Wszystkie strony ustawień serwera](overview.md#every-setting-explained) | [Pełna lista wartości](all-settings.md)
