<div class="fl-page-hero fl-bg-b" markdown>

:material-timer-sand:

# Respawn

<p>Przegrana walka kosztuje minuty, a nie cały wieczór. Ceny kończące się na g płaci się złotem, pozostałe punktami sławy.</p>

</div>

<div class="fl-facts">
<div><b>30 s</b><span>Oczekiwanie na schronienie</span></div>
<div><b>150</b><span>Cena schronienia</span></div>
<div><b>100</b><span>Losowy respawn</span></div>
<div><b>250</b><span>Respawn w sektorze</span></div>
<div><b>Wył.</b><span>Choroba klonowania</span></div>
</div>


## :material-parachute: Metody respawnu

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `AllowSectorRespawn` | True | Respawn w wybranym sektorze. |
| `AllowShelterRespawn` | True | Respawn w twoim schronieniu. |
| `AllowSquadmateRespawn` | True | Respawn obok członka drużyny. |
| `EnableSpawnOnGround` | False | Nowi gracze przylatują na spadochronie. |
| `AllowAutomaticParachuteOpening` | True | Spadochron otwiera się automatycznie. |

## :material-cash: Ceny

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `RandomRespawnPrice` | 100 | Respawn w losowym punkcie. |
| `SectorRespawnPrice` | 250 | Respawn w wybranym sektorze. |
| `ShelterRespawnPrice` | 150 | Respawn w twoim schronieniu w obszarze flagi. |
| `ShelterRespawnPriceOutsideFlagArea` | 2g | Respawn w schronieniu poza obszarem flagi. |
| `SquadRespawnPrice` | 2g | Respawn obok członka drużyny. |
| `RandomPricePerSquadmateModifier`, `SectorPricePerSquadmateModifier`, `ShelterPricePerSquadmateModifier` | 0 | Rozmiar drużyny nie zmienia ceny. |

## :material-timer-sand: Czasy oczekiwania

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `RandomRespawnInitialTime` | 0 | Oczekiwanie przed możliwym losowym respawnem (sekundy). |
| `SectorRespawnInitialTime` | 60 | Oczekiwanie przed możliwym respawnem w sektorze (sekundy). |
| `ShelterRespawnInitialTime` | 30 | Oczekiwanie przed możliwym respawnem w schronieniu (sekundy). |
| `SquadRespawnInitialTime` | 60 | Oczekiwanie przed możliwym respawnem przy drużynie (sekundy). |
| `RandomRespawnCooldown` | 0 | Dodatkowe oczekiwanie po kolejnych śmierciach, losowy respawn. |
| `SectorRespawnCooldown` | 120 | Dodatkowe oczekiwanie po kolejnych śmierciach, respawn w sektorze. |
| `ShelterRespawnCooldown` | 120 | Dodatkowe oczekiwanie po kolejnych śmierciach, respawn w schronieniu. |
| `SquadRespawnCooldown` | 60 | Dodatkowe oczekiwanie po kolejnych śmierciach, respawn przy drużynie. |
| `RandomCooldownResetMultiplier` | 0 | Czas oczekiwania losowego respawnu resetuje się od razu. |
| `SectorCooldownResetMultiplier`, `ShelterCooldownResetMultiplier`, `SquadCooldownResetMultiplier` | 0.7 | Czas oczekiwania resetuje się po tej wielokrotności czasu oczekiwania. |

## :material-skull: Samobójstwo

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `CommitSuicideInitialTime` | 30 | Sekundy, zanim polecenie samobójstwa stanie się dostępne. |
| `CommitSuicideCooldown` | 300 | Sekundy, zanim można go użyć ponownie. |
| `CommitSuicideCooldownResetMultiplier` | 1.25 | Jak szybko resetuje się czas oczekiwania na samobójstwo. |

## :material-cog: Inne

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `MaximumBaseProximityWhenSpawning` | 5000 | Odległość od wrogich flag używana przy wyborze punktu odrodzenia. |
| `CloningSicknessEnabled` | False | Brak choroby klonowania po respawnie. |
| `PermadeathThreshold` | -7500 | Ujemne saldo konta, przy którym postać jest trwale usuwana. |

---

[Wszystkie strony ustawień serwera](overview.md#every-setting-explained) | [Pełna lista wartości](all-settings.md)
