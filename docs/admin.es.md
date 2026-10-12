<div class="fl-page-hero fl-bg-d" markdown>

:material-shield-crown:

# Guía de admin

<p>Todo lo que comprobamos al llevar un servidor de SCUM, con la v1.3.4.2</p>

</div>

<div class="fl-facts">
<div><b>1.3.4.2</b><span>Versión del juego</span></div>
<div><b>2.572</b><span>Códigos de objetos</span></div>
<div><b>7779</b><span>Puerto de conexión directa (local)</span></div>
<div><b>2 archivos</b><span>Ajustes + economía</span></div>
</div>


## :material-key: Ser admin

Añade tu SteamID64 (17 cifras, se encuentra en steamid.io) a `AdminUsers.ini`, uno por línea. El archivo se lee al iniciar el servidor, así que reinícialo tras editarlo. Después escribe los comandos en el chat del juego, con un `#` delante.

## :material-console: Comandos del chat

Estado: **Probado** significa que lo ejecutamos en nuestro servidor. **Indicado** significa que una guía pública lo describe y que no lo probamos.

| Comando | Qué hace | Estado |
|---|---|---|
| `#ListPlayers` | Lista los jugadores conectados. | Probado |
| `#ListItems` | Escribe todos los códigos de objetos de tu versión (2.572 en 1.3.4.2) en el registro del juego. | Probado |
| `#spawnitem Apple`, `#spawnitem Water_05l` | Te da un objeto a partir de su código. | Probado |
| `#SetCurrencyBalance Normal 10000 NombreDelJugador` | Fija el dinero de un jugador. | Probado |
| `#ChangeCurrencyBalance Gold 5 NombreDelJugador` | Cambia el oro de un jugador. | Probado |
| `#NightBrightness 1` | Brillo de la noche, de 0 (oscuro) a 1 (claro). Solo para ti, no para todo el servidor. | Probado |
| `#SetTime 12` | Fija la hora del día, de 0 a 24. | Probado |
| `#ListZombies`, `#ListAnimals` | Lista los tipos de zombis y de animales. | Probado |
| `#ListSpawnedVehicles`, `#ListSpawnedArmedNPCs` | Lista lo que está vivo en el mundo. El resultado sale solo en el chat, no en el registro. | Probado |
| `#MapTeleport` | Teletransporte desde el mapa. | En la lista, no probado |
| `#SetImmortality true` / `false` | Inmunidad al daño, activada y luego desactivada. | Indicado |
| `#SetFamePoints 500 NombreDelJugador` | Fija los puntos de fama de un jugador. | Indicado |
| `#SetGodMode` | Construcción instantánea, no invulnerabilidad. | Indicado |
| `#heal` | No existe en 1.3.4.2. | No disponible |

## :material-monitor: Montar un servidor de prueba local gratis

1. En Steam, instala la herramienta gratuita **SCUM Server**.
2. Copia tu `ServerSettings.ini` y tu `EconomyOverride.json` en la carpeta `SCUM\Saved\Config\WindowsServer` de la herramienta. Añade `[TEST]` al nombre del servidor para reconocerlo.
3. Inicia `SCUMServer.exe -log -port=7777` desde `SCUM\Binaries\Win64`. Cargar el mapa tarda unos dos minutos.
4. En el juego, abre el cuadro de conexión directa y escribe `127.0.0.1:7779`. El puerto 7777 no funciona ahí.
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

Cada archivo existe en dos versiones, para poder compararlos. **FISTILAND** es el archivo que usa nuestro servidor. **SCUM** es el archivo tal como lo entrega el juego o Nitrado, el punto de partida para empezar desde cero.

| Archivo | Cuál | Qué es |
|---|---|---|
| [ServerSettings_FISTILAND.ini](downloads/ServerSettings_FISTILAND.ini){ download } | **FISTILAND** | Los ajustes del servidor FISTILAND. |
| [ServerSettings_SCUM.ini](downloads/ServerSettings_SCUM.ini){ download } | **SCUM** | El archivo con el que empieza un servidor Nitrado nuevo, sin tocar. |
| [EconomyOverride_FISTILAND.json](downloads/EconomyOverride_FISTILAND.json){ download } | **FISTILAND** | Ajustes de los comerciantes de FISTILAND: sin requisito de fama, comerciantes siempre con existencias y dinero, precios fijos. |
| [EconomyOverride_SCUM.json](downloads/EconomyOverride_SCUM.json){ download } | **SCUM** | El archivo de comerciantes con los valores de salida del juego. |
| [SCUM_item_codes_1.3.4.2.txt](downloads/SCUM_item_codes_1.3.4.2.txt){ download } | **Datos** | Los 2.572 códigos de objetos de la versión 1.3.4.2 del juego, uno por línea (del comando `#ListItems`). |
| [Armory_SCUM_prices_A0.csv](downloads/Armory_SCUM_prices_A0.csv){ download } | **Datos** | Los precios del comerciante Armory del juego base, leídos en el juego en el puesto A0 (unas 380 líneas). |

La dirección del servidor, los puertos y la contraseña se han quitado de estas copias. Conserva los tuyos al subir el archivo.
