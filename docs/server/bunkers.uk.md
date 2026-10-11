<div class="fl-page-hero fl-bg-a" markdown>

:material-key-variant:

# Бункери

<p>Карти доступу відчиняють об'єкти Killbox і Apex, найкращий лут на мапі. Покинуті бункери відкриваються самі на певний час, а потім знову зачиняються.</p>

</div>

<div class="fl-facts">
<div><b>6</b><span>Карт Killbox</span></div>
<div><b>6</b><span>Карт Apex</span></div>
<div><b>3</b><span>Бункери відкриті одночасно</span></div>
<div><b>12 год</b><span>Час відкриття бункера</span></div>
</div>


## :material-key-variant: Карти доступу

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `MaxAllowedKillboxKeycards` | 6 | Карти Killbox, які можна знайти загалом. |
| `MaxAllowedKillboxKeycards_PoliceStation` | 3 | Карти Killbox у поліцейських дільницях. |
| `MaxAllowedKillboxKeycards_RadiationZone` | 1 | Карти Killbox у зоні радіації. |
| `MaxAllowedApexFacilityKeycards` | 6 | Карти Apex Facility, які можна знайти загалом. |
| `MaxAllowedApexFacilityKeycards_PoliceStation` | 3 | Карти Apex у поліцейських дільницях. |
| `MaxAllowedApexFacilityKeycards_RadiationZone` | 1 | Карти Apex у зоні радіації. |
| `KillboxDefuseFailureBonus` | 0.2 | Додаткові секунди від невдалої спроби розмінування. |
| `EnableBCULocking` | True | Термінали BCU можна блокувати. |

## :material-radioactive: Покинуті бункери

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `AbandonedBunkerMaxSimultaneouslyActive` | 3 | Бункери, відкриті одночасно. |
| `AbandonedBunkerActiveDurationHours` | 12 | Години, упродовж яких бункер лишається відкритим після природної активації. |
| `AbandonedBunkerKeyCardActiveDurationHours` | 3 | Години, упродовж яких бункер лишається відкритим після активації картою. |
| `AbandonedBunkerBCUTerminalCooldown` | 24:00:00 | Перезарядка терміналів BCU всередині. |
| `AbandonedBunkerResetArmoryLockersOnActivationOnly` | True | Шафки збройової поповнюються лише під час активації бункера. |
| `SecretBunkerKeyCardActiveDurationHours` | 0.5 | Години, упродовж яких таємний бункер лишається відкритим після активації картою. |
| `AbandonedBunkerCommotionThreshold`, `AbandonedBunkerCommotionThresholdPerPlayerExtra`, `AbandonedBunkerEnemyActivationThreshold`, `AbandonedBunkerEnemyActivationThresholdPerPlayerExtra` | -1 | Пороги шуму використовують вбудовані значення гри. |
| `LogoutTimerInBunker` | 30000 | Секунди до зникнення гравця, який вийшов з гри в бункері. |

---

[Усі сторінки налаштувань](overview.md#every-setting-explained) | [Повний список значень](all-settings.md)
