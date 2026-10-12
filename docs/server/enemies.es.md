<div class="fl-page-hero fl-bg-f" markdown>

:material-skull-crossbones:

# Enemigos

<p>Los verdaderos rivales son los demás jugadores. Los zombis y los PNJ armados están para ocuparse de ellos, no para temerlos.</p>

</div>

<div class="fl-facts">
<div><b>200</b><span>Zombis como máximo</span></div>
<div><b>x0.5</b><span>Salud de los zombis</span></div>
<div><b>x0.1</b><span>Salud de los PNJ armados</span></div>
<div><b>3</b><span>Dificultad de los PNJ armados</span></div>
</div>


## :material-ghost: Zombis

Los zombis se llaman marionetas (puppets) en los ajustes.

| Ajuste | Valor | Qué hace |
|---|---|---|
| `MaxAllowedPuppets` | 200 | Zombis que pueden existir a la vez. |
| `PuppetHealthMultiplier` | 0.5 | Salud de los zombis. |
| `PuppetRunningSpeedMultiplier` | 0.6 | Velocidad de carrera de los zombis. |
| `ZombieDamageMultiplier` | 0.7 | Daño que causan los zombis. |
| `EncounterBaseCharacterAmountMultiplier` | 1 | Número de zombis por zona de encuentro. |
| `EncounterExtraCharacterPerPlayerMultiplier`, `EncounterExtraCharacterPlayerCapMultiplier` | 1 | Zombis extra por jugadores adicionales cerca. |
| `EncounterCharacterRespawnTimeMultiplier`, `EncounterCharacterRespawnBatchSizeMultiplier` | 1 | Velocidad de reaparición y tamaño de los grupos. |
| `EncounterNeverRespawnCharacters` | False | Los zombis reaparecen tras morir. |
| `EncounterHordeActivationChanceMultiplier` | 0 | El ruido nunca desencadena una horda. |
| `EnableLootPuppetHorde` | False | No aparece ninguna horda al morir un zombi de botín. |
| `DisableLootPuppetSpawning` | False | Pueden aparecer zombis de botín. |
| `DisableSuicidePuppetSpawning` | True | Sin zombis explosivos. |
| `PuppetsCanOpenDoors`, `PuppetsCanVaultWindows` | True | Los zombis abren puertas y saltan por las ventanas. |
| `PuppetWorldEncounterSpawnWeightMultiplier`, `DropshipWorldEncounterSpawnWeightMultiplier` | 1 | Ponderaciones de los encuentros aleatorios del mundo. |

## :material-pistol: PNJ armados

| Ajuste | Valor | Qué hace |
|---|---|---|
| `ArmedNPCDifficultyLevel` | 3 | Dificultad alta. |
| `ArmedNPCHealthMultiplier` | 0.1 | Salud: basta una sola bala bien colocada. |
| `ArmedNPCDamageMultiplier` | 0.5 | Daño que causan. |
| `ArmedNPCRunningSpeedMultiplier` | 0.9 | Velocidad de carrera. |
| `ArmedNPCSpreadMultiplier` | 1 | Dispersión de las armas. |
| `ProbabilityForArmedNPCToDropItemFromHandsWhenSearched` | 1 | Un PNJ registrado siempre suelta lo que lleva en las manos. |
| `MinimumDurabilityOfArmedNPCsDroppedItemFromHands` / `MaximumDurabilityOfArmedNPCsDroppedItemFromHands` | 0.2 / 0.3 | Estado de esos objetos. |
| `MaxAllowedNPCs` | -1 | Sin límite de PNJ armados. |

## :material-robot-off: Mechs

No hay mechs. El ajuste `DisableSentrySpawning` está en True. Ver [Eventos](events.md).

---

[Todas las páginas de ajustes](overview.md#every-setting-explained) | [Lista completa de valores](all-settings.md)
