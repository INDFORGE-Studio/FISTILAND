<div class="fl-page-hero fl-bg-d" markdown>

:material-gavel:

# Reglas

<p>Juego limpio ante todo: sin mira, sin paquetes pay-to-win.</p>

</div>

<div class="fl-facts">
<div><b>14</b><span>Slots</span></div>
<div><b>1.ª + 3.ª</b><span>Vistas permitidas</span></div>
<div><b>No</b><span>Mira</span></div>
<div><b>x1.3</b><span>Daño entre jugadores</span></div>
</div>


## :material-gavel: Reglas para los jugadores

- Las **aeronaves** son solo para desplazarse. No se permite asaltar con una aeronave.
- Las **minas** son solo para defender tu base.

Estas dos son reglas, no ajustes del servidor: dependen de que los jugadores las respeten.

## :material-eye: Vista e interfaz

| Ajuste | Valor | Qué hace |
|---|---|---|
| `AllowFirstPerson` | True | Se permite la vista en primera persona. |
| `AllowThirdPerson` | True | La tercera persona está permitida: los jugadores pueden alternar entre primera y tercera persona. |
| `AllowCrosshair` | False | Sin mira. |
| `AllowMapScreen` | True | La pantalla del mapa está disponible. |
| `HideKillNotification` | True | Los jugadores no ven un aviso cuando alguien mata a otro. |
| `HideQuickAccessBar`, `HideLifeIndicators` | False | Ambos elementos de la interfaz se muestran. |

## :material-sword-cross: Combate

| Ajuste | Valor | Qué hace |
|---|---|---|
| `HumanToHumanDamageMultiplier` | 1.3 | Daño entre jugadores. |
| `HumanToHumanArmedMeleeDamageMultiplier` | 1.3 | Daño de las armas cuerpo a cuerpo entre jugadores. |
| `HumanToHumanUnarmedMeleeDamageMultiplier` | 1 | Daño sin armas entre jugadores. |
| `HumanToHumanThrowingDamageMultiplier` | 1.3 | Daño de las armas arrojadizas entre jugadores. |
| `AllowMinesAndTraps` | True | Se permiten minas y trampas. |
| `AllowComa` | True | Los jugadores pueden caer en coma antes de morir. |
| `AllowKillClaiming` | True | Se suelta un BCU cuando muere un jugador. |
| `LogSuicides` | True | Los suicidios se registran. |

## :material-logout: Desconexión y protección

| Ajuste | Valor | Qué hace |
|---|---|---|
| `LogoutTimer` | 120 | Segundos hasta que un jugador que se desconecta sale del mundo. |
| `LogoutTimerWhileCaptured` | 120 | Lo mismo, para un jugador atado. |
| `EnableNewPlayerProtection` | True | Los jugadores nuevos están protegidos al empezar. |
| `NewPlayerProtectionDuration` | 120 | Duración de la protección. |
| `PlaySafeIdProtection` | False | Unirse no requiere un ID de PlaySafe. |

## :material-account: Personajes

| Ajuste | Valor | Qué hace |
|---|---|---|
| `DeleteInactiveUsers` | False | Los personajes inactivos nunca se eliminan. |
| `DaysSinceLastLoginToBecomeInactive` | 30 | Días sin conectarse hasta que un jugador se considera inactivo. |
| `DeleteBannedUsers` | False | Los personajes vetados se conservan. |

## :material-cash-remove: Paquetes

| Ajuste | Valor | Qué hace |
|---|---|---|
| `EnableDigitalDeluxeStarterPack` | False | No se puede usar el Deluxe Survival Pack. |
| `EnableDigitalDeluxeFreeGoldCard` | False | No se puede reclamar la tarjeta de oro gratuita de ese paquete. |

## :material-server: Servidor

| Ajuste | Valor | Qué hace |
|---|---|---|
| `MaxPlayers` | 14 | Plazas de jugadores. |
| `ServerPlaystyle` | PVP | Estilo de juego declarado. |
| `MaxServerTickRate` | 35 | Actualizaciones del servidor por segundo con jugadores conectados. |
| `MinServerTickRate` | 5 | Actualizaciones del servidor por segundo cuando está vacío. |
| `MaxPingCheckEnabled` | True | Se expulsa a los jugadores con ping alto. |
| `MaxPing` | 300 | Ping máximo permitido en milisegundos. |
| `MaxNumberOfConsecutiveHighPingReadings` | 5 | Lecturas malas seguidas antes de la expulsión. |
| `WelcomeMessage` | FISTILAND PvP SERVER | Se muestra cuando un jugador se une. |
| `MessageOfTheDay` | More information on indforge-studio.github.io/FISTILAND | Mensaje repetido en el chat. |
| `MessageOfTheDayCooldown` | 30 | Minutos entre dos repeticiones. |
| `AllowGlobalChat`, `AllowLocalChat`, `AllowSquadChat`, `AllowAdminChat` | True | Todos los canales de chat están abiertos. |
| `LimitGlobalChat` | False | El chat global no tiene restricciones. |

---

[Todas las páginas de ajustes](overview.md#every-setting-explained) | [Lista completa de valores](all-settings.md)
