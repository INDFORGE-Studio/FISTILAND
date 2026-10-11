<div class="fl-page-hero fl-bg-c" markdown>

:material-tag-multiple:

# Economia

<p>Il bottino è abbondante e i mercanti sono economici, così ti equipaggi in poche ore.</p>

</div>

<div class="fl-facts">
<div><b>x5</b><span>Loot</span></div>
<div><b>x0.5</b><span>Prezzo di carburante e acqua</span></div>
<div><b>5</b><span>Missioni per mercante e ciclo</span></div>
<div><b>2</b><span>Missioni attive per mercante</span></div>
</div>


## :material-treasure-chest: Bottino

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `SpawnerProbabilityMultiplier` | 5 | Probabilità che oggetti sparsi compaiano nel mondo (il loot x5). |
| `ExamineSpawnerProbabilityMultiplier` | 5 | Probabilità che un contenitore esaminato dia un oggetto. |
| `SpawnerExpirationTimeMultiplier` | 1 | Quanto durano gli oggetti comparsi nel mondo. |
| `ExamineSpawnerExpirationTimeMultiplier` | 1 | Quanto durano gli oggetti ottenuti esaminando. |
| `EnableItemCooldownGroups` | True | Gli oggetti rari condividono gruppi di tempo di recupero, il che limita il farming di oggetti. |
| `ItemCooldownGroupsDurationMultiplier` | 0.5 | Durata di quei tempi di recupero. |
| `EnableLockedLootContainers` | True | Gli armadietti nel mondo sono chiusi a chiave. |

## :material-gas-station: Carburante, acqua e gas alle stazioni

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `WaterPricePerUnitMultiplier` | 0.5 | Prezzo dell'acqua. |
| `GasolinePricePerUnitMultiplier` | 0.5 | Prezzo del carburante al litro. |
| `PropanePricePerUnitMultiplier` | 5 | Prezzo del propano al litro. |
| `WaterPeriodicInitialAmountMultiplier`, `GasolinePeriodicInitialAmountMultiplier`, `PropanePeriodicInitialAmountMultiplier` | 1 | Quantità iniziale in una fonte. |
| `...PeriodicMaxAmountMultiplier` (acqua, benzina, propano) | 1 | Quantità massima in una fonte. |
| `...PeriodicReplenishAmountMultiplier` e `...PeriodicReplenishIntervalMultiplier` | 1 | Quantità e velocità di ricarica nel tempo. |
| `...ProximityReplenishAmountMultiplier`, `...ProximityReplenishChanceMultiplier`, `...ProximityReplenishTimeoutMultiplier` | 1 | Ricarica quando un giocatore è vicino. |

## :material-clipboard-text: Missioni

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `QuestsEnabled` | True | Le missioni sono disponibili. |
| `MaxQuestsPerCyclePerTrader` | 5 | Missioni che un giocatore può accettare per mercante e ciclo. |
| `MaxSimultaneousQuestsPerTrader` | 2 | Missioni attive contemporaneamente per mercante. |
| `QuestsGlobalCycleDuration` | 23:59:59 | Durata di un ciclo di missioni. |
| `QuestsTraderRefillCooldown` | 03:00:00 | Le missioni dei mercanti si rinnovano ogni 3 ore. |
| `QuestsPhoneRefillCooldown` | 01:00:00 | Le missioni al telefono si rinnovano ogni ora. |
| `QuestsNoticeBoardRefillCooldown` | 02:00:00 | Le missioni delle bacheche si rinnovano ogni 2 ore. |
| `QuestRequirementsBlockTradeableItems` | False | Gli oggetti delle missioni si possono ancora scambiare. |

## :material-account-edit: Servizi

| Impostazione | Valore | Cosa fa |
|---|---|---|
| `NameChangeCost` | 500 | Prezzo per cambiare il nome di un personaggio. |
| `NameChangeCooldown` | 168 | Ore tra un cambio di nome e l'altro. |
| `DisableTimedGifts` | False | I regali stagionali restano attivi. |
| `EnableDeenaOnServer` | True | Deena è attiva. |

---

[Tutte le pagine delle impostazioni](overview.md#every-setting-explained) | [Elenco completo dei valori](all-settings.md)
