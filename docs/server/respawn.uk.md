<div class="fl-page-hero fl-bg-b" markdown>

:material-timer-sand:

# Відродження

<p>Програний бій коштує хвилини, а не цілий вечір. Ціни, що закінчуються на g, сплачуються золотом; решта: очками слави.</p>

</div>

<div class="fl-facts">
<div><b>30 с</b><span>Очікування в укритті</span></div>
<div><b>150</b><span>Ціна в укритті</span></div>
<div><b>100</b><span>Випадкове відродження</span></div>
<div><b>250</b><span>Відродження в секторі</span></div>
<div><b>Вимк.</b><span>Хвороба клонування</span></div>
</div>


## :material-parachute: Способи відродження

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `AllowSectorRespawn` | True | Відродження у вибраному секторі. |
| `AllowShelterRespawn` | True | Відродження у вашому укритті. |
| `AllowSquadmateRespawn` | True | Відродження поруч з учасником загону. |
| `EnableSpawnOnGround` | False | Нові гравці з'являються на парашуті. |
| `AllowAutomaticParachuteOpening` | True | Парашут розкривається автоматично. |

## :material-cash: Ціни

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `RandomRespawnPrice` | 100 | Відродження у випадковій точці. |
| `SectorRespawnPrice` | 250 | Відродження у вибраному секторі. |
| `ShelterRespawnPrice` | 150 | Відродження у вашому укритті всередині зони прапора. |
| `ShelterRespawnPriceOutsideFlagArea` | 2g | Відродження в укритті поза зоною прапора. |
| `SquadRespawnPrice` | 2g | Відродження поруч з учасником загону. |
| `RandomPricePerSquadmateModifier`, `SectorPricePerSquadmateModifier`, `ShelterPricePerSquadmateModifier` | 0 | Розмір загону не змінює ціну. |

## :material-timer-sand: Час очікування

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `RandomRespawnInitialTime` | 0 | Очікування до можливості випадкового відродження (секунди). |
| `SectorRespawnInitialTime` | 60 | Очікування до можливості відродження в секторі (секунди). |
| `ShelterRespawnInitialTime` | 30 | Очікування до можливості відродження в укритті (секунди). |
| `SquadRespawnInitialTime` | 60 | Очікування до можливості відродження біля загону (секунди). |
| `RandomRespawnCooldown` | 0 | Додаткове очікування після повторних смертей, випадкове відродження. |
| `SectorRespawnCooldown` | 120 | Додаткове очікування після повторних смертей, відродження в секторі. |
| `ShelterRespawnCooldown` | 120 | Додаткове очікування після повторних смертей, відродження в укритті. |
| `SquadRespawnCooldown` | 60 | Додаткове очікування після повторних смертей, відродження біля загону. |
| `RandomCooldownResetMultiplier` | 0 | Перезарядка випадкового відродження скидається одразу. |
| `SectorCooldownResetMultiplier`, `ShelterCooldownResetMultiplier`, `SquadCooldownResetMultiplier` | 0.7 | Перезарядка скидається після цього кратного від її тривалості. |

## :material-skull: Самогубство

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `CommitSuicideInitialTime` | 30 | Секунди до того, як команда самогубства стане доступною. |
| `CommitSuicideCooldown` | 300 | Секунди до її повторного використання. |
| `CommitSuicideCooldownResetMultiplier` | 1.25 | Як швидко скидається перезарядка самогубства. |

## :material-cog: Інше

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `MaximumBaseProximityWhenSpawning` | 5000 | Відстань до ворожих прапорів, що враховується при виборі точки появи. |
| `CloningSicknessEnabled` | False | Жодної хвороби клонування після відродження. |
| `PermadeathThreshold` | -7500 | Від'ємний баланс, за якого персонажа видаляють назавжди. |

---

[Усі сторінки налаштувань](overview.md#every-setting-explained) | [Повний список значень](all-settings.md)
