<div class="fl-page-hero fl-bg-b" markdown>

:material-timer-sand:

# Respawn

<p>Izgubljena borba košta minute, a ne cijelu večer. Cijene koje završavaju na g plaćaju se zlatom, ostale bodovima slave.</p>

</div>

<div class="fl-facts">
<div><b>30 s</b><span>Čekanje za sklonište</span></div>
<div><b>150</b><span>Cijena skloništa</span></div>
<div><b>100</b><span>Nasumični respawn</span></div>
<div><b>250</b><span>Respawn u sektoru</span></div>
<div><b>Isklj.</b><span>Bolest kloniranja</span></div>
</div>


## :material-parachute: Načini respawna

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `AllowSectorRespawn` | True | Respawn u odabranom sektoru. |
| `AllowShelterRespawn` | True | Respawn u tvom skloništu. |
| `AllowSquadmateRespawn` | True | Respawn pokraj člana ekipe. |
| `EnableSpawnOnGround` | False | Novi igrači stižu padobranom. |
| `AllowAutomaticParachuteOpening` | True | Padobran se otvara automatski. |

## :material-cash: Cijene

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `RandomRespawnPrice` | 100 | Respawn na nasumičnoj točki. |
| `SectorRespawnPrice` | 250 | Respawn u odabranom sektoru. |
| `ShelterRespawnPrice` | 150 | Respawn u tvom skloništu unutar područja zastave. |
| `ShelterRespawnPriceOutsideFlagArea` | 2g | Respawn u skloništu izvan područja zastave. |
| `SquadRespawnPrice` | 2g | Respawn pokraj člana ekipe. |
| `RandomPricePerSquadmateModifier`, `SectorPricePerSquadmateModifier`, `ShelterPricePerSquadmateModifier` | 0 | Veličina ekipe ne mijenja cijenu. |

## :material-timer-sand: Vrijeme čekanja

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `RandomRespawnInitialTime` | 0 | Čekanje prije mogućeg nasumičnog respawna (sekunde). |
| `SectorRespawnInitialTime` | 60 | Čekanje prije mogućeg respawna u sektoru (sekunde). |
| `ShelterRespawnInitialTime` | 30 | Čekanje prije mogućeg respawna u skloništu (sekunde). |
| `SquadRespawnInitialTime` | 60 | Čekanje prije mogućeg respawna uz ekipu (sekunde). |
| `RandomRespawnCooldown` | 0 | Dodatno čekanje nakon uzastopnih smrti, nasumični respawn. |
| `SectorRespawnCooldown` | 120 | Dodatno čekanje nakon uzastopnih smrti, respawn u sektoru. |
| `ShelterRespawnCooldown` | 120 | Dodatno čekanje nakon uzastopnih smrti, respawn u skloništu. |
| `SquadRespawnCooldown` | 60 | Dodatno čekanje nakon uzastopnih smrti, respawn uz ekipu. |
| `RandomCooldownResetMultiplier` | 0 | Vrijeme čekanja nasumičnog respawna odmah se resetira. |
| `SectorCooldownResetMultiplier`, `ShelterCooldownResetMultiplier`, `SquadCooldownResetMultiplier` | 0.7 | Čekanje se resetira nakon ovog višekratnika vremena čekanja. |

## :material-skull: Samoubojstvo

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `CommitSuicideInitialTime` | 30 | Sekunde prije nego naredba za samoubojstvo postane dostupna. |
| `CommitSuicideCooldown` | 300 | Sekunde prije nego se može ponovno upotrijebiti. |
| `CommitSuicideCooldownResetMultiplier` | 1.25 | Koliko brzo se resetira čekanje za samoubojstvo. |

## :material-cog: Ostalo

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `MaximumBaseProximityWhenSpawning` | 5000 | Udaljenost od neprijateljskih zastava koja se koristi pri odabiru točke pojavljivanja. |
| `CloningSicknessEnabled` | False | Nema bolesti kloniranja nakon respawna. |
| `PermadeathThreshold` | -7500 | Negativno stanje računa pri kojem se lik trajno briše. |

---

[Sve stranice postavki poslužitelja](overview.md#every-setting-explained) | [Potpuni popis vrijednosti](all-settings.md)
