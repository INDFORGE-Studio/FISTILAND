<div class="fl-page-hero fl-bg-a" markdown>

:material-key-variant:

# Búnkeres

<p>Las tarjetas de acceso abren las instalaciones Killbox y Apex, el mejor botín del mapa. Los búnkeres abandonados se abren solos durante un tiempo y luego se vuelven a cerrar.</p>

</div>

<div class="fl-facts">
<div><b>6</b><span>Tarjetas Killbox</span></div>
<div><b>6</b><span>Tarjetas Apex</span></div>
<div><b>3</b><span>Búnkeres abiertos a la vez</span></div>
<div><b>12 h</b><span>Tiempo abierto de un búnker</span></div>
</div>


## :material-key-variant: Tarjetas de acceso

| Ajuste | Valor | Qué hace |
|---|---|---|
| `MaxAllowedKillboxKeycards` | 6 | Tarjetas Killbox que se pueden encontrar en total. |
| `MaxAllowedKillboxKeycards_PoliceStation` | 3 | Tarjetas Killbox en comisarías. |
| `MaxAllowedKillboxKeycards_RadiationZone` | 1 | Tarjetas Killbox en la zona de radiación. |
| `MaxAllowedApexFacilityKeycards` | 6 | Tarjetas Apex Facility que se pueden encontrar en total. |
| `MaxAllowedApexFacilityKeycards_PoliceStation` | 3 | Tarjetas Apex en comisarías. |
| `MaxAllowedApexFacilityKeycards_RadiationZone` | 1 | Tarjetas Apex en la zona de radiación. |
| `KillboxDefuseFailureBonus` | 0.2 | Segundos extra que añade un intento fallido de desactivación. |
| `EnableBCULocking` | True | Los terminales BCU se pueden bloquear. |

## :material-radioactive: Búnkeres abandonados

| Ajuste | Valor | Qué hace |
|---|---|---|
| `AbandonedBunkerMaxSimultaneouslyActive` | 3 | Búnkeres abiertos a la vez. |
| `AbandonedBunkerActiveDurationHours` | 12 | Horas que un búnker permanece abierto tras una activación natural. |
| `AbandonedBunkerKeyCardActiveDurationHours` | 3 | Horas que un búnker permanece abierto tras una activación con tarjeta. |
| `AbandonedBunkerBCUTerminalCooldown` | 24:00:00 | Tiempo de espera de los terminales BCU del interior. |
| `AbandonedBunkerResetArmoryLockersOnActivationOnly` | True | Las taquillas de armería solo se rellenan al activarse un búnker. |
| `SecretBunkerKeyCardActiveDurationHours` | 0.5 | Horas que un búnker secreto permanece abierto tras una activación con tarjeta. |
| `AbandonedBunkerCommotionThreshold`, `AbandonedBunkerCommotionThresholdPerPlayerExtra`, `AbandonedBunkerEnemyActivationThreshold`, `AbandonedBunkerEnemyActivationThresholdPerPlayerExtra` | -1 | Los umbrales de ruido usan los valores integrados del juego. |
| `LogoutTimerInBunker` | 30000 | Segundos hasta que desaparece un jugador que se desconecta en un búnker. |

---

[Todas las páginas de ajustes](overview.md#every-setting-explained) | [Lista completa de valores](all-settings.md)
