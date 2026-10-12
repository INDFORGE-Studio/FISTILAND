<div class="fl-page-hero fl-bg-d" markdown>

:material-gavel:

# Правила

<p>Насамперед чесна гра: лише вигляд від першої особи, без прицілу, без pay-to-win наборів.</p>

</div>

<div class="fl-facts">
<div><b>14</b><span>Слотів</span></div>
<div><b>1-ша особа</b><span>Єдиний вигляд</span></div>
<div><b>Вимк.</b><span>Приціл</span></div>
<div><b>x1.3</b><span>Шкода між гравцями</span></div>
</div>


## :material-gavel: Правила для гравців

- **Літаки** призначені лише для пересування. Рейдити на літаку заборонено.
- **Міни** призначені лише для захисту вашої бази.

Це правила, а не налаштування сервера: вони тримаються на повазі гравців.

## :material-eye: Вигляд та інтерфейс

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `AllowFirstPerson` | True | Вигляд від першої особи дозволений. |
| `AllowThirdPerson` | True | Вигляд від третьої особи дозволено: гравці можуть перемикатися між виглядом від першої та третьої особи. |
| `AllowCrosshair` | False | Прицілу немає. |
| `AllowMapScreen` | True | Екран мапи доступний. |
| `HideKillNotification` | True | Гравці не бачать сповіщення, коли хтось убиває когось. |
| `HideQuickAccessBar`, `HideLifeIndicators` | False | Обидва елементи інтерфейсу показуються. |

## :material-sword-cross: Бій

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `HumanToHumanDamageMultiplier` | 1.3 | Шкода між гравцями. |
| `HumanToHumanArmedMeleeDamageMultiplier` | 1.3 | Шкода від холодної зброї між гравцями. |
| `HumanToHumanUnarmedMeleeDamageMultiplier` | 1 | Шкода без зброї між гравцями. |
| `HumanToHumanThrowingDamageMultiplier` | 1.3 | Шкода від метальної зброї між гравцями. |
| `AllowMinesAndTraps` | True | Міни та пастки дозволені. |
| `AllowComa` | True | Гравці можуть впасти в кому перед смертю. |
| `AllowKillClaiming` | True | Після вбивства гравця випадає BCU. |
| `LogSuicides` | True | Самогубства записуються в журнал. |

## :material-logout: Вихід з гри та захист

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `LogoutTimer` | 120 | Секунди до того, як гравець, що виходить, залишає світ. |
| `LogoutTimerWhileCaptured` | 120 | Те саме для зв'язаного гравця. |
| `EnableNewPlayerProtection` | True | Нові гравці захищені на початку. |
| `NewPlayerProtectionDuration` | 120 | Тривалість захисту. |
| `PlaySafeIdProtection` | False | Для приєднання не потрібен PlaySafe ID. |

## :material-account: Персонажі

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `DeleteInactiveUsers` | False | Неактивних персонажів ніколи не видаляють. |
| `DaysSinceLastLoginToBecomeInactive` | 30 | Дні без входу, після яких гравця вважають неактивним. |
| `DeleteBannedUsers` | False | Персонажів, яких забанено, зберігають. |

## :material-cash-remove: Набори

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `EnableDigitalDeluxeStarterPack` | False | Deluxe Survival Pack використати не можна. |
| `EnableDigitalDeluxeFreeGoldCard` | False | Безкоштовну золоту карту з цього набору отримати не можна. |

## :material-server: Сервер

| Налаштування | Значення | Що воно робить |
|---|---|---|
| `MaxPlayers` | 14 | Місця для гравців. |
| `ServerPlaystyle` | PVP | Заявлений стиль гри. |
| `MaxServerTickRate` | 35 | Оновлень сервера за секунду, коли є гравці онлайн. |
| `MinServerTickRate` | 5 | Оновлень сервера за секунду, коли він порожній. |
| `MaxPingCheckEnabled` | True | Гравців із високим пінгом вилучають. |
| `MaxPing` | 300 | Найвищий дозволений пінг у мілісекундах. |
| `MaxNumberOfConsecutiveHighPingReadings` | 5 | Кількість поганих вимірів поспіль до вилучення. |
| `WelcomeMessage` | FISTILAND PvP SERVER | Показується, коли гравець приєднується. |
| `MessageOfTheDay` | More information on discord.gg/RHkNGk6ZQN | Повідомлення, що повторюється в чаті. |
| `MessageOfTheDayCooldown` | 30 | Хвилини між двома повторами. |
| `AllowGlobalChat`, `AllowLocalChat`, `AllowSquadChat`, `AllowAdminChat` | True | Усі канали чату відкриті. |
| `LimitGlobalChat` | False | Глобальний чат не має обмежень. |

---

[Усі сторінки налаштувань](overview.md#every-setting-explained) | [Повний список значень](all-settings.md)
