<div class="fl-page-hero fl-bg-a" markdown>

:material-flag-variant:

# Terytorium

<p>Serwer baza przeciw bazie: ziemia, którą trzymasz, jest tym, o co walczysz. Wszystkie wartości poniżej pochodzą prosto z pliku ServerSettings.ini serwera.</p>

</div>

<div class="fl-facts">
<div><b>3</b><span>Flagi na gracza</span></div>
<div><b>300</b><span>Elementów na flagę</span></div>
<div><b>2</b><span>Wieżyczki na bazę</span></div>
<div><b>24 h</b><span>Przejęcie flagi</span></div>
<div><b>8 h</b><span>Ochrona offline przed rajdami</span></div>
<div><b>10</b><span>Rozmiar drużyny</span></div>
</div>


## :material-flag: Flagi i przejmowanie

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `AllowMultipleFlagsPerPlayer` | True | Gracz może postawić więcej niż jedną flagę. |
| `NumberOfAllowedFlagsPerPlayer` | 3 | Flagi, które może postawić każdy gracz. |
| `FlagOvertakeDuration` | 24:00:00 | Czas potrzebny na przejęcie wrogiej flagi. |
| `AllowFlagPlacementOnBBElements` | False | Flag nie można stawiać na elementach budowy bazy. |
| `UseMapBaseBuildingRestriction` | True | Strefy zakazu budowy zdefiniowane na mapie są egzekwowane. |
| `UseBuildingProximityRestrictions` | True | Minimalne odległości między bazami są egzekwowane. |
| `DisableBaseBuilding` | False | Budowa bazy jest dozwolona. |

## :material-wall: Rozmiar bazy

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `MaximumAmountOfElementsPerFlag` | 300 | Elementy bazy mieszczące się w obszarze jednej flagi. |
| `ExtraElementsPerFlagForAdditionalSquadMember` | 17 | Dodatkowe elementy na flagę za każdego członka drużyny po pierwszym. |
| `MaximumNumberOfExpandedElementsPerFlag` | 75 | Dodatkowe elementy, które mogą dodać zestawy rozbudowy bazy. |
| `TurretMaxAmountPerFlagArea` | 2 | Wieżyczki dozwolone na obszar flagi. |
| `TurretStartDecayingIfFlagAreaHasMoreThan` | 2 | Wieżyczki ponad tę liczbę zanikają szybciej. |
| `AllowWallPlacementOnHalfAndLowWalls` | True | Ściany można stawiać na półścianach i niskich ścianach. |
| `AllowFloorPlacementOnHalfAndLowWalls` | False | Podłóg nie można stawiać na półścianach i niskich ścianach. |
| `WeaponRackMaxAmountPerFlagArea`, `WallWeaponRackMaxAmountPerFlagArea`, `WellMaxAmountPerFlagArea`, `OvenMaxAmountPerFlagArea`, `GardenMaxAmountPerFlagArea`, `SmokerMaxAmountPerFlagArea` | -1 | Brak limitu dla tych obiektów. |
| `TombstoneMaxAmountPerSquad` | -1 | Brak limitu nagrobków na drużynę. |

## :material-timer-sand: Zanikanie

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `BaseElementsDecayRateMultiplier` | 0.5 | Tempo, w jakim niekonserwowane elementy bazy zanikają. Referencyjny czas zanikania to 672 godziny; 0.5 wydłuża go do 1344 godzin (56 dni). |
| `ChestAcquisitionDuration` | 24 | Godziny, po których wrogi kufer w obszarze twojej flagi staje się twój. |

## :material-shield-lock: Ochrona przed rajdami

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `RaidProtectionType` | 1 | Ochrona offline: baza jest chroniona, gdy wszyscy z niej są offline. |
| `RaidProtectionOfflineProtectionStartDelay` | 00:30:00 | Baza pozostaje podatna na atak przez 30 minut po wylogowaniu ostatniego gracza. |
| `RaidProtectionOfflineMaxProtectionTime` | 08:00:00 | Maksymalny czas trwania ochrony. |
| `RaidProtectionEnableLog` | False | Zdarzenia ochrony przed rajdami nie są rejestrowane. |

## :material-account-group: Drużyny

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `SquadMemberCountAtIntLevel1` do `SquadMemberCountAtIntLevel5` | 10 | Drużyny liczą 10 graczy na każdym poziomie inteligencji. |
| `RTSquadProbationDuration` | 1 | Godziny okresu próbnego dla członka, który opuszcza drużynę i do niej wraca. |
| `SquadMemberCountLimitForPunishment` | 2 | Największa dawna drużyna, której członkowie nie podlegają karze dla więźniów. |
| `SquadMoneyPenaltyPerPrevSquadMember`, `SquadFamePointsPenaltyPerPrevSquadMember` | 0 | Brak kary pieniężnej ani za sławę przy zmianie drużyny. |
| `EnableSquadMemberNameWidget` | True | Nazwy członków drużyny są wyświetlane nad ich głowami (tylko członkom drużyny, nigdy wrogom). |

## :material-target: Wieżyczki

Wieżyczki atakują więźniów, marionetki (zombie), pojazdy, strażników, zwierzęta i uzbrojone NPC (`TurretsAttackPrisoners`, `TurretsAttackPuppets`, `TurretsAttackVehicles`, `TurretsAttackSentries`, `TurretsAttackAnimals`, `TurretsAttackArmedNPCs`, wszystkie True).

## :material-hammer: Obrażenia bazy

| Ustawienie | Wartość | Co robi |
|---|---|---|
| `LockProtectionDamageMultiplier` | 1 | Obrażenia zadawane przez zamki osobom, którym nie uda się ich otworzyć. |
| `BaseBuildingDestructionLogDamageThreshold` | 20 | Poziom obrażeń, powyżej którego rejestrowane jest zniszczenie bazy. |

## :material-link-variant: Powiązane strony

[Zasady](rules.md) obejmują statki powietrzne i miny. [Respawn](respawn.md) obejmuje respawn w schronieniach.

---

[Wszystkie strony ustawień serwera](overview.md#every-setting-explained) | [Pełna lista wartości](all-settings.md)
