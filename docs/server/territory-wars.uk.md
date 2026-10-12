<div class="fl-page-hero fl-bg-a" markdown>

:material-flag-variant:

# Територія

<p>Сервер «база проти бази»: ви боретеся за землю, яку тримаєте. Кожне значення нижче взято прямо з ServerSettings.ini сервера.</p>

</div>

<div class="fl-facts">
<div><b>3</b><span>Прапори на гравця</span></div>
<div><b>200</b><span>Елементів на прапор</span></div>
<div><b>2</b><span>Турелі на базу</span></div>
<div><b>24 год</b><span>Захоплення прапора</span></div>
<div><b>8 год</b><span>Офлайн-захист від рейдів</span></div>
<div><b>10</b><span>Розмір загону</span></div>
</div>


## :material-flag: Прапори та захоплення

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `AllowMultipleFlagsPerPlayer` | True | Гравець може ставити більше одного прапора. |
| `NumberOfAllowedFlagsPerPlayer` | 3 | Кількість прапорів, яку може поставити кожен гравець. |
| `FlagOvertakeDuration` | 24:00:00 | Час, потрібний для захоплення ворожого прапора. |
| `AllowFlagPlacementOnBBElements` | False | Прапори не можна ставити на елементи будівництва бази. |
| `UseMapBaseBuildingRestriction` | True | Діють зони, де карта забороняє будувати. |
| `UseBuildingProximityRestrictions` | True | Діють мінімальні відстані між базами. |
| `DisableBaseBuilding` | False | Будівництво баз дозволене. |

## :material-wall: Розмір бази

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `MaximumAmountOfElementsPerFlag` | 200 | Елементи бази, що вміщуються в зону одного прапора. |
| `ExtraElementsPerFlagForAdditionalSquadMember` | 25 | Додаткові елементи на прапор за кожного учасника загону після першого. |
| `MaximumNumberOfExpandedElementsPerFlag` | 75 | Додаткові елементи, які можуть дати набори розширення бази. |
| `TurretMaxAmountPerFlagArea` | 2 | Дозволені турелі на зону прапора. |
| `TurretStartDecayingIfFlagAreaHasMoreThan` | 2 | Турелі понад це число руйнуються швидше. |
| `AllowWallPlacementOnHalfAndLowWalls` | True | Стіни можна ставити на низькі та напіввисокі стіни. |
| `AllowFloorPlacementOnHalfAndLowWalls` | False | Підлогу не можна ставити на низькі та напіввисокі стіни. |
| `WeaponRackMaxAmountPerFlagArea`, `WallWeaponRackMaxAmountPerFlagArea`, `WellMaxAmountPerFlagArea`, `OvenMaxAmountPerFlagArea`, `GardenMaxAmountPerFlagArea`, `SmokerMaxAmountPerFlagArea` | -1 | Для цих об'єктів немає обмежень. |
| `TombstoneMaxAmountPerSquad` | -1 | Кількість надгробків на загін не обмежена. |

## :material-timer-sand: Руйнування

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `BaseElementsDecayRateMultiplier` | 0.5 | Швидкість, з якою руйнуються необслуговувані елементи бази. Еталонний час становить 672 години; 0.5 розтягує його до 1344 годин (56 днів). |
| `ChestAcquisitionDuration` | 24 | Години, після яких ворожа скриня в зоні вашого прапора стає вашою. |

## :material-shield-lock: Захист від рейдів

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `RaidProtectionType` | 1 | Офлайн-захист: база захищена, коли всі її учасники офлайн. |
| `RaidProtectionOfflineProtectionStartDelay` | 00:30:00 | База лишається вразливою 30 хвилин після виходу останнього гравця. |
| `RaidProtectionOfflineMaxProtectionTime` | 08:00:00 | Максимальна тривалість захисту. |
| `RaidProtectionEnableLog` | False | Події захисту від рейдів не записуються в журнал. |

## :material-account-group: Загони

| Налаштування | Значення | Що воно робить |
|---|---|---|
| від `SquadMemberCountAtIntLevel1` до `SquadMemberCountAtIntLevel5` | 10 | Загони налічують 10 гравців на кожному рівні інтелекту. |
| `RTSquadProbationDuration` | 1 | Години випробування для учасника, який залишає загін і повертається. |
| `SquadMemberCountLimitForPunishment` | 2 | Найбільший колишній загін, учасники якого не отримують штрафу в'язня. |
| `SquadMoneyPenaltyPerPrevSquadMember`, `SquadFamePointsPenaltyPerPrevSquadMember` | 0 | Жодного штрафу грошима чи славою за зміну загону. |
| `EnableSquadMemberNameWidget` | True | Імена учасників загону показуються над їхніми головами (лише загін, ніколи вороги). |

## :material-target: Турелі

Турелі атакують в'язнів, маріонеток (зомбі), транспорт, вартових, тварин та озброєних NPC (`TurretsAttackPrisoners`, `TurretsAttackPuppets`, `TurretsAttackVehicles`, `TurretsAttackSentries`, `TurretsAttackAnimals`, `TurretsAttackArmedNPCs`, усі True).

## :material-hammer: Шкода базам

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `LockProtectionDamageMultiplier` | 1 | Шкода від замків тим, хто не зміг їх зламати. |
| `BaseBuildingDestructionLogDamageThreshold` | 20 | Рівень шкоди, вище якого руйнування бази записується в журнал. |

## :material-link-variant: Пов'язані сторінки

[Правила](rules.md) розповідають про літаки та міни. [Відродження](respawn.md) розповідає про відродження в укритті.

---

[Усі сторінки налаштувань](overview.md#every-setting-explained) | [Повний список значень](all-settings.md)
