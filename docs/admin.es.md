<div class="fl-page-hero fl-bg-d" markdown>

:material-shield-crown:

# Guía de admin

<p>Todo lo que comprobamos al llevar un servidor de SCUM</p>

</div>

<div class="fl-facts">
<div><b>1.3.4.2</b><span>Versión del juego</span></div>
<div><b>2.572</b><span>Códigos de objetos</span></div>
<div><b>7779</b><span>Puerto de conexión directa (local)</span></div>
<div><b>6 archivos</b><span>Para descargar</span></div>
</div>


## :material-key: Ser admin

Añade tu SteamID64 (17 cifras, se encuentra en steamid.io) a `AdminUsers.ini`, uno por línea. El archivo se lee al iniciar el servidor, así que reinícialo tras editarlo. Después escribe los comandos en el chat del juego, con un `#` delante.

## :material-console: Comandos del chat

Estado: **Válido** significa que comprobamos en el juego que funciona. **Sin verificar** significa que una guía pública o el juego lo menciona, pero no lo hemos comprobado en el juego. En los ejemplos, las cantidades, el nombre del jugador y los códigos de objetos son solo ejemplos: cámbialos según lo necesites.

| Comando | Estado | Qué hace |
|---|---|---|
| `#ListPlayers` | <span class="fl-st fl-st-ok">:material-check-decagram: Válido</span> | Lista los jugadores conectados. |
| `#ListItems` | <span class="fl-st fl-st-ok">:material-check-decagram: Válido</span> | Escribe todos los códigos de objetos de tu versión (2.572 en 1.3.4.2) en el registro del juego. |
| `#spawnitem Apple`<br>`#spawnitem Water_05l` | <span class="fl-st fl-st-ok">:material-check-decagram: Válido</span> | Te da un objeto a partir de su código. Usa cualquier código de la lista de objetos (ver las descargas más abajo). |
| `#SetCurrencyBalance Normal 10000 NombreDelJugador` | <span class="fl-st fl-st-ok">:material-check-decagram: Válido</span> | Fija el dinero de un jugador. `Normal` es el dinero normal y `10000` la cantidad: cámbiala por el número que quieras (500, 100000...). |
| `#ChangeCurrencyBalance Gold 5 NombreDelJugador` | <span class="fl-st fl-st-ok">:material-check-decagram: Válido</span> | Cambia el oro de un jugador. `Gold` es la moneda y `5` la cantidad: cámbiala como quieras. |
| `#NightBrightness 1` | <span class="fl-st fl-st-ok">:material-check-decagram: Válido</span> | Brillo de la noche, de 0 (oscuro) a 1 (claro). Solo para ti, no para todo el servidor. |
| `#SetTime 12` | <span class="fl-st fl-st-ok">:material-check-decagram: Válido</span> | Fija la hora del día, de 0 a 24. |
| `#ListZombies`<br>`#ListAnimals` | <span class="fl-st fl-st-ok">:material-check-decagram: Válido</span> | Lista los tipos de zombis y de animales. |
| `#ListSpawnedVehicles`<br>`#ListSpawnedArmedNPCs` | <span class="fl-st fl-st-ok">:material-check-decagram: Válido</span> | Lista lo que está vivo en el mundo. El resultado sale solo en el chat, no en el registro. |
| `#MapTeleport` | <span class="fl-st fl-st-rep">:material-help-circle-outline: Sin verificar</span> | Teletransporte desde el mapa. |
| `#SetImmortality true`<br>`#SetImmortality false` | <span class="fl-st fl-st-rep">:material-help-circle-outline: Sin verificar</span> | Inmunidad al daño, activada y luego desactivada. |
| `#SetFamePoints 500 NombreDelJugador` | <span class="fl-st fl-st-rep">:material-help-circle-outline: Sin verificar</span> | Fija los puntos de fama de un jugador. |
| `#SetGodMode` | <span class="fl-st fl-st-rep">:material-help-circle-outline: Sin verificar</span> | Construcción instantánea, no invulnerabilidad. |

## :material-monitor: Lanzar y mantener un servidor de SCUM: en uno dedicado o en local

Los dos archivos de ajustes funcionan igual en todas partes: el servidor los lee al iniciarse, así que detén el servidor, sustituye los archivos y vuelve a iniciarlo.

### En un servidor dedicado

En un servidor alquilado (Nitrado, por ejemplo), sube tu `ServerSettings.ini` y tu `EconomyOverride.json` desde la página de archivos o de ajustes del proveedor, con el servidor detenido, y vuelve a iniciarlo. Las pantallas cambian de un proveedor a otro: consulta la ayuda de tu proveedor para saber dónde van los archivos.

### En local, gratis

Un servidor de prueba gratuito en tu propio PC te permite probar tus ajustes y precios antes de publicarlos:

1. En Steam, instala la herramienta gratuita **SCUM Server**.
2. Copia tu `ServerSettings.ini` y tu `EconomyOverride.json` en la carpeta `SCUM\Saved\Config\WindowsServer` de la herramienta. Añade `[TEST]` al nombre del servidor para reconocerlo.
3. Inicia `SCUMServer.exe -log -port=7777` desde `SCUM\Binaries\Win64`. Cargar el mapa tarda unos dos minutos.
4. En el juego, abre el cuadro de conexión directa y escribe `127.0.0.1:7779`. Esto nos funcionó con un servidor iniciado con `-port=7777`: el puerto de conexión era el 7779, dos más que el puerto del juego, y el 7777 fallaba. Probado en el mismo PC que el juego; con otro valor de `-port`, el puerto puede cambiar.
5. Para el servidor con Ctrl+C en su ventana.

El registro del servidor es `SCUM\Saved\Logs\SCUM.log` en la carpeta de la herramienta. El registro de tu propio juego, donde salen los resultados de los comandos, está en `%LOCALAPPDATA%\SCUM\Saved\Logs`.

## :material-file-cog: Archivos de ajustes

| Archivo | Qué contiene |
|---|---|
| `ServerSettings.ini` | Todos los ajustes del servidor (440 claves, texto ASCII). |
| `EconomyOverride.json` | Ajustes de los comerciantes y precios por objeto. Cada valor se escribe como texto entre comillas. |
| `AdminUsers.ini` | Los admins, un SteamID64 por línea. |

Consulta las [páginas de ajustes](server/overview.md) para ver qué hace cada valor en FISTILAND.

## :material-download: Descargar los archivos de configuración

Cada archivo existe en dos versiones, para poder compararlos. **FISTILAND** son las versiones que usa nuestro servidor. Y **SCUM** son las versiones tal como las entrega el juego por defecto, y por tanto también un buen punto de partida para empezar desde cero.

| Archivo | Cuál | Qué es |
|---|---|---|
| [ServerSettings_FISTILAND.ini](downloads/ServerSettings_FISTILAND.ini){ download="ServerSettings_FISTILAND.ini" } | <span class="fl-st fl-wh-fl">:material-shield-star: FISTILAND</span> | Los ajustes del servidor FISTILAND. |
| [ServerSettings_SCUM.ini](downloads/ServerSettings_SCUM.ini){ download="ServerSettings_SCUM.ini" } | <span class="fl-st fl-wh-sc">:material-gamepad-variant: SCUM</span> | El archivo con el que empieza un servidor Nitrado nuevo, sin tocar. |
| [EconomyOverride_FISTILAND.json](downloads/EconomyOverride_FISTILAND.json){ download="EconomyOverride_FISTILAND.json" } | <span class="fl-st fl-wh-fl">:material-shield-star: FISTILAND</span> | Ajustes de los comerciantes de FISTILAND: sin requisito de fama, comerciantes siempre con existencias y dinero, precios fijos. |
| [EconomyOverride_SCUM.json](downloads/EconomyOverride_SCUM.json){ download="EconomyOverride_SCUM.json" } | <span class="fl-st fl-wh-sc">:material-gamepad-variant: SCUM</span> | El archivo de comerciantes con los valores de salida del juego. |
| [SCUM_item_codes_1.3.4.2.txt](downloads/SCUM_item_codes_1.3.4.2.txt){ download="SCUM_item_codes_1.3.4.2.txt" } | <span class="fl-st fl-wh-da">:material-database: Datos</span> | Los 2.572 códigos de objetos de la versión 1.3.4.2 del juego, uno por línea (del comando `#ListItems`). |
| [Armory_SCUM_prices_A0.csv](downloads/Armory_SCUM_prices_A0.csv){ download="Armory_SCUM_prices_A0.csv" } | <span class="fl-st fl-wh-da">:material-database: Datos</span> | Los precios del comerciante Armory del juego base, leídos en el juego en el puesto A0 (unas 380 líneas). |

:material-alert: En todos los archivos disponibles para descargar, la dirección del servidor, los puertos y las contraseñas se han quitado a propósito; no olvides hacer lo mismo si luego compartes tus propios archivos.
