<div class="fl-page-hero fl-bg-b" markdown>

:material-timer-sand:

# Reaparición

<p>Perder un combate cuesta minutos, no una tarde entera. Los precios que terminan en g se pagan en oro; los demás, en puntos de fama.</p>

</div>

<div class="fl-facts">
<div><b>30 s</b><span>Espera en el refugio</span></div>
<div><b>150</b><span>Precio en el refugio</span></div>
<div><b>100</b><span>Reaparición aleatoria</span></div>
<div><b>250</b><span>Reaparición por sector</span></div>
<div><b>No</b><span>Enfermedad de clonación</span></div>
</div>


## :material-parachute: Métodos de reaparición

| Ajuste | Valor | Qué hace |
|---|---|---|
| `AllowSectorRespawn` | True | Reaparecer en un sector elegido. |
| `AllowShelterRespawn` | True | Reaparecer en tu refugio. |
| `AllowSquadmateRespawn` | True | Reaparecer junto a un miembro de la escuadra. |
| `EnableSpawnOnGround` | False | Las nuevas apariciones llegan en paracaídas. |
| `AllowAutomaticParachuteOpening` | True | El paracaídas se abre automáticamente. |

## :material-cash: Precios

| Ajuste | Valor | Qué hace |
|---|---|---|
| `RandomRespawnPrice` | 100 | Reaparecer en un punto aleatorio. |
| `SectorRespawnPrice` | 250 | Reaparecer en un sector elegido. |
| `ShelterRespawnPrice` | 150 | Reaparecer en tu refugio dentro de un área de bandera. |
| `ShelterRespawnPriceOutsideFlagArea` | 2g | Reaparecer en un refugio fuera de un área de bandera. |
| `SquadRespawnPrice` | 2g | Reaparecer junto a un miembro de la escuadra. |
| `RandomPricePerSquadmateModifier`, `SectorPricePerSquadmateModifier`, `ShelterPricePerSquadmateModifier` | 0 | El tamaño de la escuadra no cambia el precio. |

## :material-timer-sand: Tiempos de espera

| Ajuste | Valor | Qué hace |
|---|---|---|
| `RandomRespawnInitialTime` | 0 | Espera antes de que sea posible una reaparición aleatoria (segundos). |
| `SectorRespawnInitialTime` | 60 | Espera antes de que sea posible una reaparición por sector (segundos). |
| `ShelterRespawnInitialTime` | 30 | Espera antes de que sea posible una reaparición en el refugio (segundos). |
| `SquadRespawnInitialTime` | 60 | Espera antes de que sea posible una reaparición de escuadra (segundos). |
| `RandomRespawnCooldown` | 0 | Espera extra tras muertes repetidas, reaparición aleatoria. |
| `SectorRespawnCooldown` | 120 | Espera extra tras muertes repetidas, reaparición por sector. |
| `ShelterRespawnCooldown` | 120 | Espera extra tras muertes repetidas, reaparición en el refugio. |
| `SquadRespawnCooldown` | 60 | Espera extra tras muertes repetidas, reaparición de escuadra. |
| `RandomCooldownResetMultiplier` | 0 | El tiempo de espera de la reaparición aleatoria se reinicia de inmediato. |
| `SectorCooldownResetMultiplier`, `ShelterCooldownResetMultiplier`, `SquadCooldownResetMultiplier` | 0.7 | El tiempo de espera se reinicia tras este múltiplo del tiempo de espera. |

## :material-skull: Suicidio

| Ajuste | Valor | Qué hace |
|---|---|---|
| `CommitSuicideInitialTime` | 30 | Segundos hasta que el comando de suicidio está disponible. |
| `CommitSuicideCooldown` | 300 | Segundos hasta poder usarlo de nuevo. |
| `CommitSuicideCooldownResetMultiplier` | 1.25 | Con qué rapidez se reinicia el tiempo de espera del suicidio. |

## :material-cog: Otros

| Ajuste | Valor | Qué hace |
|---|---|---|
| `MaximumBaseProximityWhenSpawning` | 5000 | Distancia a las banderas enemigas usada al elegir un punto de aparición. |
| `CloningSicknessEnabled` | False | Sin enfermedad de clonación tras reaparecer. |
| `PermadeathThreshold` | -7500 | Saldo negativo a partir del cual un personaje se elimina de forma permanente. |

---

[Todas las páginas de ajustes](overview.md#every-setting-explained) | [Lista completa de valores](all-settings.md)
