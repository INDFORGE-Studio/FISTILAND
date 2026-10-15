<div class="fl-page-hero fl-bg-b" markdown>

:material-package-variant-closed:

# Wydarzenia

<p>Zrzuty zaopatrzenia dają każdej drużynie powód, by opuścić bazę. Mechy i desantowce są wyłączone, więc walki toczą się między graczami.</p>

</div>

<div class="fl-facts">
<div><b>45-60 min</b><span>Między zrzutami zaopatrzenia</span></div>
<div><b>0</b><span>Mechów</span></div>
<div><b>9 min</b><span>Od ogłoszenia do upadku</span></div>
<div><b>20 min</b><span>Zanim nieotwarta skrzynia wybuchnie</span></div>
</div>


## :material-package-variant-closed: Zrzuty zaopatrzenia

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `CargoDropCooldownMinimum` | 45 | Minimalna liczba minut między dwoma zrzutami. |
| `CargoDropCooldownMaximum` | 60 | Maksymalna liczba minut między dwoma zrzutami. |
| `CargoDropFallDelay` | 540 | Sekundy między ogłoszeniem a upadkiem. |
| `CargoDropFallDuration` | 60 | Sekundy, przez które skrzynia spada. |
| `CargoDropSelfdestructTime` | 1200 | Sekundy, zanim nieotwarta skrzynia wybuchnie. |
| `CargoDropZombieEncounterWeightMultiplier` | 0.3 | Waga spotkania z zombie przy zrzucie. |
| `CargoDropDropshipEncounterWeightMultiplier` | 0.01 | Waga spotkania z desantowcem przy zrzucie. Desantowiec praktycznie nigdy nie jest wybierany. |

## :material-robot-off: Mechy i desantowce

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `DisableSentrySpawning` | True | Brak mechów. |
| `EnableSentryRespawning` | False | Żaden mech nie wraca desantowcem. |
| `EnableDropshipAbandonedBunkerEncounter` | False | Brak desantowca przy opuszczonych bunkrach. |
| `DropshipAbandonedBunkerEncounterTriggerChance` | -1 | Domyślna wartość gry (nieużywana, gdy spotkanie jest wyłączone). |
| `EnableDropshipBaseBuildingEncounter` | False | Brak ataku desantowca podczas budowy bazy. |
| `BaseBuildingEncounterTriggerChance` | 0 | Brak spotkania podczas budowy bazy. |
| `BaseBuildingEncounterTriggerTimeMultiplier` | 1 | Czas spotkań podczas budowy bazy. |
| `DropshipHealthMultiplier`, `SentryHealthMultiplier`, `BaseBuildingAttackerSentryHealthMultiplier` | 1 | Zdrowie desantowców i strażników. |
| `DropshipDamageMultiplier`, `SentryDamageMultiplier` | 1 | Obrażenia desantowców i strażników. |

## :material-calendar-star: Wydarzenia serwera

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `AllowEvents` | True | Wydarzenia są dozwolone na serwerze. |
| `AllowVoting` | True | Gracze mogą głosować. |
| `VotingDuration` | 60 | Długość głosowania w sekundach. |
| `PlayerMinimalVotingInterest` | 0.5 | Odsetek graczy, który musi wziąć udział, aby głosowanie się liczyło. |
| `PlayerPositiveVotePercentage` | 0.5 | Odsetek głosów za potrzebny do przyjęcia. |

---

[Wszystkie strony ustawień serwera](overview.md#every-setting-explained) | [Pełna lista wartości](all-settings.md)
