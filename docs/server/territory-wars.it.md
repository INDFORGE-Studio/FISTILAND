<div class="fl-page-hero fl-bg-a" markdown>

:material-flag-variant:

# Territorio

<p>Un server di base contro base: il terreno che tieni è ciò per cui combatti. Ogni valore qui sotto viene direttamente dal ServerSettings.ini del server.</p>

</div>

<div class="fl-facts">
<div><b>3</b><span>Bandiere per giocatore</span></div>
<div><b>200</b><span>Elementi per bandiera</span></div>
<div><b>2</b><span>Torrette per base</span></div>
<div><b>24 h</b><span>Cattura della bandiera</span></div>
<div><b>8 h</b><span>Protezione offline dai raid</span></div>
<div><b>10</b><span>Dimensione della squadra</span></div>
</div>


## :material-flag: Bandiere e cattura

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `AllowMultipleFlagsPerPlayer` | True | Un giocatore può piazzare più di una bandiera. |
| `NumberOfAllowedFlagsPerPlayer` | 3 | Bandiere che ogni giocatore può piazzare. |
| `FlagOvertakeDuration` | 24:00:00 | Tempo necessario per catturare una bandiera nemica. |
| `AllowFlagPlacementOnBBElements` | False | Le bandiere non possono essere piazzate sugli elementi di costruzione della base. |
| `UseMapBaseBuildingRestriction` | True | Le aree in cui la mappa vieta di costruire sono applicate. |
| `UseBuildingProximityRestrictions` | True | Le distanze minime tra le basi sono applicate. |
| `DisableBaseBuilding` | False | La costruzione di basi è consentita. |

## :material-wall: Dimensione delle basi

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `MaximumAmountOfElementsPerFlag` | 200 | Elementi di base che stanno nell'area di una bandiera. |
| `ExtraElementsPerFlagForAdditionalSquadMember` | 25 | Elementi extra per bandiera per ogni membro della squadra dopo il primo. |
| `MaximumNumberOfExpandedElementsPerFlag` | 75 | Elementi extra che i kit di espansione della base possono aggiungere. |
| `TurretMaxAmountPerFlagArea` | 2 | Torrette consentite per area di bandiera. |
| `TurretStartDecayingIfFlagAreaHasMoreThan` | 2 | Le torrette oltre questo numero si degradano più in fretta. |
| `AllowWallPlacementOnHalfAndLowWalls` | True | I muri possono essere piazzati su muri bassi e a mezza altezza. |
| `AllowFloorPlacementOnHalfAndLowWalls` | False | I pavimenti non possono essere piazzati su muri bassi e a mezza altezza. |
| `WeaponRackMaxAmountPerFlagArea`, `WallWeaponRackMaxAmountPerFlagArea`, `WellMaxAmountPerFlagArea`, `OvenMaxAmountPerFlagArea`, `GardenMaxAmountPerFlagArea`, `SmokerMaxAmountPerFlagArea` | -1 | Nessun limite per questi oggetti. |
| `TombstoneMaxAmountPerSquad` | -1 | Nessun limite di lapidi per squadra. |

## :material-timer-sand: Degrado

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `BaseElementsDecayRateMultiplier` | 0.5 | Velocità con cui si degradano gli elementi di base non mantenuti. Il tempo di riferimento è di 672 ore; 0.5 lo porta a 1344 ore (56 giorni). |
| `ChestAcquisitionDuration` | 24 | Ore prima che un baule nemico nella tua area di bandiera diventi tuo. |

## :material-shield-lock: Protezione dai raid

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `RaidProtectionType` | 1 | Protezione offline: una base è protetta quando tutti i suoi membri sono offline. |
| `RaidProtectionOfflineProtectionStartDelay` | 00:30:00 | La base resta vulnerabile per 30 minuti dopo la disconnessione dell'ultimo giocatore. |
| `RaidProtectionOfflineMaxProtectionTime` | 08:00:00 | Durata massima della protezione. |
| `RaidProtectionEnableLog` | False | Gli eventi di protezione dai raid non vengono registrati. |

## :material-account-group: Squadre

| Impostazione | Valore | Cosa fa |
|---|---|---|
| Da `SquadMemberCountAtIntLevel1` a `SquadMemberCountAtIntLevel5` | 10 | Le squadre contano 10 giocatori a ogni livello di intelligenza. |
| `RTSquadProbationDuration` | 1 | Ore di prova per un membro che lascia e rientra in una squadra. |
| `SquadMemberCountLimitForPunishment` | 2 | La più grande ex squadra i cui membri non subiscono la penalità da prigioniero. |
| `SquadMoneyPenaltyPerPrevSquadMember`, `SquadFamePointsPenaltyPerPrevSquadMember` | 0 | Nessuna penalità di denaro o fama per il cambio di squadra. |
| `EnableSquadMemberNameWidget` | True | I nomi dei compagni di squadra vengono mostrati sopra la testa (solo la squadra, mai i nemici). |

## :material-target: Torrette

Le torrette attaccano prigionieri, marionette (zombie), veicoli, sentinelle, animali e PNG armati (`TurretsAttackPrisoners`, `TurretsAttackPuppets`, `TurretsAttackVehicles`, `TurretsAttackSentries`, `TurretsAttackAnimals`, `TurretsAttackArmedNPCs`, tutti su True).

## :material-hammer: Danni alle basi

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `LockProtectionDamageMultiplier` | 1 | Danno inflitto dalle serrature a chi non riesce a scassinarle. |
| `BaseBuildingDestructionLogDamageThreshold` | 20 | Livello di danno oltre il quale la distruzione della base viene registrata. |

## :material-link-variant: Pagine correlate

[Regole](rules.md) tratta di aerei e mine. [Respawn](respawn.md) tratta dei respawn al rifugio.

---

[Tutte le pagine delle impostazioni](overview.md#every-setting-explained) | [Elenco completo dei valori](all-settings.md)
