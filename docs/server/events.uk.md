<div class="fl-page-hero fl-bg-b" markdown>

:material-package-variant-closed:

# Події

<p>Повітряні скиди дають кожному загону привід залишити свою базу. Мехи та десантні кораблі вимкнені, тож бої лишаються між гравцями.</p>

</div>

<div class="fl-facts">
<div><b>45-60 хв</b><span>Між повітряними скидами</span></div>
<div><b>0</b><span>Мехів</span></div>
<div><b>9 хв</b><span>Від оголошення до падіння</span></div>
<div><b>20 хв</b><span>До вибуху нерозкритого ящика</span></div>
</div>


## :material-package-variant-closed: Повітряні скиди

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `CargoDropCooldownMinimum` | 45 | Мінімум хвилин між двома скидами. |
| `CargoDropCooldownMaximum` | 60 | Максимум хвилин між двома скидами. |
| `CargoDropFallDelay` | 540 | Секунди між оголошенням і падінням. |
| `CargoDropFallDuration` | 60 | Секунди, за які ящик падає. |
| `CargoDropSelfdestructTime` | 1200 | Секунди до вибуху нерозкритого ящика. |
| `CargoDropZombieEncounterWeightMultiplier` | 0.3 | Вага зустрічі із зомбі під час скиду. |
| `CargoDropDropshipEncounterWeightMultiplier` | 0.01 | Вага зустрічі з десантним кораблем під час скиду. Корабель практично ніколи не обирається. |

## :material-robot-off: Мехи та десантні кораблі

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `DisableSentrySpawning` | True | Мехів немає. |
| `EnableSentryRespawning` | False | Жоден мех не повертається десантним кораблем. |
| `EnableDropshipAbandonedBunkerEncounter` | False | Жодних десантних кораблів біля покинутих бункерів. |
| `DropshipAbandonedBunkerEncounterTriggerChance` | -1 | Типове значення гри (не використовується, поки зустріч вимкнена). |
| `EnableDropshipBaseBuildingEncounter` | False | Десантний корабель не атакує, поки ви будуєте базу. |
| `BaseBuildingEncounterTriggerChance` | 0 | Жодної зустрічі під час будівництва бази. |
| `BaseBuildingEncounterTriggerTimeMultiplier` | 1 | Час зустрічей під час будівництва бази. |
| `DropshipHealthMultiplier`, `SentryHealthMultiplier`, `BaseBuildingAttackerSentryHealthMultiplier` | 1 | Здоров'я десантних кораблів і вартових. |
| `DropshipDamageMultiplier`, `SentryDamageMultiplier` | 1 | Шкода десантних кораблів і вартових. |

## :material-calendar-star: Події сервера

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `AllowEvents` | True | Події на сервері дозволені. |
| `AllowVoting` | True | Гравці можуть голосувати. |
| `VotingDuration` | 60 | Тривалість голосування в секундах. |
| `PlayerMinimalVotingInterest` | 0.5 | Частка гравців, які мають взяти участь, щоб голосування зарахувалося. |
| `PlayerPositiveVotePercentage` | 0.5 | Частка голосів «за», потрібна для ухвалення. |

---

[Усі сторінки налаштувань](overview.md#every-setting-explained) | [Повний список значень](all-settings.md)
