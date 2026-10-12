<div class="fl-page-hero fl-bg-d" markdown>

:material-shield-crown:

# Посібник адміністратора

<p>Усе, що ми перевірили, запускаючи сервер SCUM</p>

</div>

<div class="fl-facts">
<div><b>1.3.4.2</b><span>Версія гри</span></div>
<div><b>2 572</b><span>Коди предметів</span></div>
<div><b>7779</b><span>Порт прямого підключення (локально)</span></div>
<div><b>6 файлів</b><span>Для завантаження</span></div>
</div>


## :material-key: Стати адміністратором

Додайте свій SteamID64 (17 цифр, його можна знайти на steamid.io) до `AdminUsers.ini`, по одному в рядку. Файл читається під час запуску сервера, тому після змін перезапустіть сервер. Потім вводьте команди в чаті гри, поставивши спереду `#`.

## :material-console: Команди чату

Статус: **Перевірено** означає, що ми запускали команду на нашому сервері. **Згадано** означає, що її описує публічний посібник, а ми її не перевіряли. У прикладах суми, ім'я гравця та коди предметів — лише приклади: змініть їх на потрібні.

| Команда | Статус | Що робить |
|---|---|---|
| `#ListPlayers` | <span class="fl-st fl-st-ok">:material-check-circle: Перевірено</span> | Показує гравців онлайн. |
| `#ListItems` | <span class="fl-st fl-st-ok">:material-check-circle: Перевірено</span> | Виводить усі коди предметів вашої версії (2 572 у 1.3.4.2) у журнал гри. |
| `#spawnitem Apple`<br>`#spawnitem Water_05l` | <span class="fl-st fl-st-ok">:material-check-circle: Перевірено</span> | Видає вам предмет за його кодом. Використовуйте будь-який код зі списку предметів (див. завантаження нижче). |
| `#SetCurrencyBalance Normal 10000 ІмяГравця` | <span class="fl-st fl-st-ok">:material-check-circle: Перевірено</span> | Встановлює гроші гравця. `Normal` — звичайні гроші, `10000` — сума: змініть її на будь-яке число (500, 100000...). |
| `#ChangeCurrencyBalance Gold 5 ІмяГравця` | <span class="fl-st fl-st-ok">:material-check-circle: Перевірено</span> | Змінює золото гравця. `Gold` — валюта, `5` — сума: змініть як хочете. |
| `#NightBrightness 1` | <span class="fl-st fl-st-ok">:material-check-circle: Перевірено</span> | Яскравість ночі від 0 (темно) до 1 (світло). Лише для вас, не для всього сервера. |
| `#SetTime 12` | <span class="fl-st fl-st-ok">:material-check-circle: Перевірено</span> | Встановлює час доби від 0 до 24. |
| `#ListZombies`<br>`#ListAnimals` | <span class="fl-st fl-st-ok">:material-check-circle: Перевірено</span> | Показує типи зомбі та тварин. |
| `#ListSpawnedVehicles`<br>`#ListSpawnedArmedNPCs` | <span class="fl-st fl-st-ok">:material-check-circle: Перевірено</span> | Показує, що живе у світі. Результат з'являється лише в чаті, не в журналі. |
| `#MapTeleport` | <span class="fl-st fl-st-lst">:material-format-list-bulleted: У списку</span> | Телепорт через мапу. Не перевірено. |
| `#SetImmortality true`<br>`#SetImmortality false` | <span class="fl-st fl-st-rep">:material-help-circle-outline: Згадано</span> | Імунітет до шкоди: увімкнути, потім вимкнути. |
| `#SetFamePoints 500 ІмяГравця` | <span class="fl-st fl-st-rep">:material-help-circle-outline: Згадано</span> | Встановлює очки слави гравця. |
| `#SetGodMode` | <span class="fl-st fl-st-rep">:material-help-circle-outline: Згадано</span> | Миттєве будівництво, а не невразливість. |
| `#heal` | <span class="fl-st fl-st-no">:material-close-circle: Немає</span> | Не існує у 1.3.4.2. |

## :material-monitor: Запуск і робота сервера SCUM: на виділеному сервері або локально безкоштовно

Обидва файли налаштувань працюють однаково скрізь: сервер читає їх під час запуску, тож зупиніть сервер, замініть файли й запустіть його знову.

### На виділеному сервері

На орендованому сервері (наприклад, Nitrado) завантажте свої `ServerSettings.ini` і `EconomyOverride.json` через сторінку файлів або налаштувань хостингу, поки сервер зупинено, а потім запустіть його знову. Екрани відрізняються в різних хостингів: перегляньте довідку свого хостингу, щоб дізнатися, куди класти файли.

### Локально й безкоштовно

Безкоштовний тестовий сервер на вашому ПК дає змогу випробувати налаштування та ціни до того, як вони потраплять у гру:

1. У Steam встановіть безкоштовний інструмент **SCUM Server**.
2. Скопіюйте свої `ServerSettings.ini` і `EconomyOverride.json` до папки `SCUM\Saved\Config\WindowsServer` інструмента. Додайте `[TEST]` до назви сервера, щоб його легко знайти.
3. Запустіть `SCUMServer.exe -log -port=7777` з `SCUM\Binaries\Win64`. Завантаження мапи триває близько двох хвилин.
4. У грі відкрийте поле прямого підключення й введіть `127.0.0.1:7779`. У нас це спрацювало із сервером, запущеним з `-port=7777`: порт підключення був 7779, на два більше за ігровий порт, а 7777 не працював. Перевірено на тому самому ПК, де гра; з іншим значенням `-port` порт може відрізнятися.
5. Зупиніть сервер за допомогою Ctrl+C у його вікні.

Журнал сервера — `SCUM\Saved\Logs\SCUM.log` у папці інструмента. Журнал вашої гри, де видно результати команд, лежить у `%LOCALAPPDATA%\SCUM\Saved\Logs`.

## :material-file-cog: Файли налаштувань

| Файл | Що містить |
|---|---|
| `ServerSettings.ini` | Усі налаштування сервера (440 ключів, текст ASCII). |
| `EconomyOverride.json` | Налаштування торговців і ціни за предмет. Кожне значення записане як текст у лапках. |
| `AdminUsers.ini` | Адміністратори, по одному SteamID64 в рядку. |

Що робить кожне значення на FISTILAND, дивіться на [сторінках налаштувань](server/overview.md).

## :material-download: Завантажити файли конфігурації

Кожен файл існує у двох версіях, щоб їх можна було порівняти. **FISTILAND** — це версії, які використовує наш сервер. А **SCUM** — це версії в такому вигляді, в якому їх за замовчуванням дає гра, а отже, також добра відправна точка, щоб почати з нуля.

| Файл | Який | Що це |
|---|---|---|
| [ServerSettings_FISTILAND.ini](downloads/ServerSettings_FISTILAND.ini){ download="ServerSettings_FISTILAND.ini" } | <span class="fl-st fl-wh-fl">:material-shield-star: FISTILAND</span> | Налаштування сервера FISTILAND. |
| [ServerSettings_SCUM.ini](downloads/ServerSettings_SCUM.ini){ download="ServerSettings_SCUM.ini" } | <span class="fl-st fl-wh-sc">:material-gamepad-variant: SCUM</span> | Файл, з яким стартує новий сервер Nitrado, без змін. |
| [EconomyOverride_FISTILAND.json](downloads/EconomyOverride_FISTILAND.json){ download="EconomyOverride_FISTILAND.json" } | <span class="fl-st fl-wh-fl">:material-shield-star: FISTILAND</span> | Налаштування торговців FISTILAND: без вимоги слави, торговці завжди з товаром і грошима, фіксовані ціни. |
| [EconomyOverride_SCUM.json](downloads/EconomyOverride_SCUM.json){ download="EconomyOverride_SCUM.json" } | <span class="fl-st fl-wh-sc">:material-gamepad-variant: SCUM</span> | Файл торговців зі стартовими значеннями гри. |
| [SCUM_item_codes_1.3.4.2.txt](downloads/SCUM_item_codes_1.3.4.2.txt){ download="SCUM_item_codes_1.3.4.2.txt" } | <span class="fl-st fl-wh-da">:material-database: Дані</span> | Усі 2 572 коди предметів версії гри 1.3.4.2, по одному в рядку (з команди `#ListItems`). |
| [Armory_SCUM_prices_A0.csv](downloads/Armory_SCUM_prices_A0.csv){ download="Armory_SCUM_prices_A0.csv" } | <span class="fl-st fl-wh-da">:material-database: Дані</span> | Ціни торговця Armory в базовій грі, зчитані в грі на форпості A0 (близько 380 рядків). |

:material-alert: У всіх файлах, доступних для завантаження, адресу сервера, порти та паролі навмисно прибрано; не забудьте зробити те саме, якщо надалі поширюватимете свої файли.
