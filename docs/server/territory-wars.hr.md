<div class="fl-page-hero fl-bg-a" markdown>

:material-flag-variant:

# Teritorij

<p>Poslužitelj baza protiv baze: tlo koje držiš je ono za što se boriš. Sve vrijednosti ispod dolaze izravno iz datoteke ServerSettings.ini poslužitelja.</p>

</div>

<div class="fl-facts">
<div><b>3</b><span>Zastave po igraču</span></div>
<div><b>300</b><span>Elemenata po zastavi</span></div>
<div><b>2</b><span>Kupole po bazi</span></div>
<div><b>24 h</b><span>Zauzimanje zastave</span></div>
<div><b>8 h</b><span>Offline zaštita od napada</span></div>
<div><b>10</b><span>Veličina ekipe</span></div>
</div>


## :material-flag: Zastave i zauzimanje

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `AllowMultipleFlagsPerPlayer` | True | Igrač može postaviti više od jedne zastave. |
| `NumberOfAllowedFlagsPerPlayer` | 3 | Zastave koje svaki igrač smije postaviti. |
| `FlagOvertakeDuration` | 24:00:00 | Vrijeme potrebno za zauzimanje neprijateljske zastave. |
| `AllowFlagPlacementOnBBElements` | False | Zastave se ne mogu postavljati na elemente izgradnje baze. |
| `UseMapBaseBuildingRestriction` | True | Područja zabrane gradnje definirana na karti se provode. |
| `UseBuildingProximityRestrictions` | True | Najmanje udaljenosti između baza se provode. |
| `DisableBaseBuilding` | False | Gradnja baze je dopuštena. |

## :material-wall: Veličina baze

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `MaximumAmountOfElementsPerFlag` | 300 | Elementi baze koji stanu u područje jedne zastave. |
| `ExtraElementsPerFlagForAdditionalSquadMember` | 17 | Dodatni elementi po zastavi za svakog člana ekipe nakon prvog. |
| `MaximumNumberOfExpandedElementsPerFlag` | 75 | Dodatni elementi koje kompleti za proširenje baze mogu dodati. |
| `TurretMaxAmountPerFlagArea` | 2 | Kupole dopuštene po području zastave. |
| `TurretStartDecayingIfFlagAreaHasMoreThan` | 2 | Kupole iznad ovog broja brže propadaju. |
| `AllowWallPlacementOnHalfAndLowWalls` | True | Zidovi se mogu postavljati na polu-zidove i niske zidove. |
| `AllowFloorPlacementOnHalfAndLowWalls` | False | Podovi se ne mogu postavljati na polu-zidove i niske zidove. |
| `WeaponRackMaxAmountPerFlagArea`, `WallWeaponRackMaxAmountPerFlagArea`, `WellMaxAmountPerFlagArea`, `OvenMaxAmountPerFlagArea`, `GardenMaxAmountPerFlagArea`, `SmokerMaxAmountPerFlagArea` | -1 | Bez ograničenja za ove objekte. |
| `TombstoneMaxAmountPerSquad` | -1 | Bez ograničenja nadgrobnih spomenika po ekipi. |

## :material-timer-sand: Propadanje

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `BaseElementsDecayRateMultiplier` | 0.5 | Brzina kojom neodržavani elementi baze propadaju. Referentno vrijeme propadanja je 672 sata; 0.5 ga produljuje na 1344 sata (56 dana). |
| `ChestAcquisitionDuration` | 24 | Sati prije nego što neprijateljski sanduk unutar tvog područja zastave postane tvoj. |

## :material-shield-lock: Zaštita od napada

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `RaidProtectionType` | 1 | Offline zaštita: baza je zaštićena kad su svi iz nje offline. |
| `RaidProtectionOfflineProtectionStartDelay` | 00:30:00 | Baza ostaje ranjiva 30 minuta nakon odjave zadnjeg igrača. |
| `RaidProtectionOfflineMaxProtectionTime` | 08:00:00 | Najdulje trajanje zaštite. |
| `RaidProtectionEnableLog` | False | Događaji zaštite od napada se ne bilježe. |

## :material-account-group: Ekipe

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `SquadMemberCountAtIntLevel1` do `SquadMemberCountAtIntLevel5` | 10 | Ekipe imaju 10 igrača na svakoj razini inteligencije. |
| `RTSquadProbationDuration` | 1 | Sati probnog roka za člana koji napusti ekipu i ponovno joj se pridruži. |
| `SquadMemberCountLimitForPunishment` | 2 | Najveća bivša ekipa čiji članovi ne podliježu kazni zatvorenika. |
| `SquadMoneyPenaltyPerPrevSquadMember`, `SquadFamePointsPenaltyPerPrevSquadMember` | 0 | Bez kazne u novcu ili slavi za promjenu ekipe. |
| `EnableSquadMemberNameWidget` | True | Imena članova ekipe prikazuju se iznad njihovih glava (samo članovima ekipe, nikad neprijateljima). |

## :material-target: Kupole

Kupole napadaju zatvorenike, marionete (zombije), vozila, stražare, životinje i naoružane NPC-ove (`TurretsAttackPrisoners`, `TurretsAttackPuppets`, `TurretsAttackVehicles`, `TurretsAttackSentries`, `TurretsAttackAnimals`, `TurretsAttackArmedNPCs`, sve True).

## :material-hammer: Šteta na bazi

| Postavka | Vrijednost | Što radi |
|---|---|---|
| `LockProtectionDamageMultiplier` | 1 | Šteta koju brave nanose osobama koje ih ne uspiju obiti. |
| `BaseBuildingDestructionLogDamageThreshold` | 20 | Razina štete iznad koje se bilježi uništenje baze. |

## :material-calculator:  { #calculator }

<div class="fl-calc" data-base="300" data-extra="17" data-exp="75" data-max="10">
<label class="fl-calc__row" hidden><span></span> <b class="fl-calc__n">1</b><input type="range" min="1" max="10" value="1"></label>
<div class="fl-facts">
<div><b data-out="flag">300</b><span></span></div>
<div><b data-out="exp">375</b><span></span></div>
</div>
<p class="fl-calc__note"></p>
</div>

## :material-link-variant: Srodne stranice

[Pravila](rules.md) pokrivaju zrakoplove i mine. [Respawn](respawn.md) pokriva respawn u skloništima.

---

[Sve stranice postavki poslužitelja](overview.md#every-setting-explained) | [Potpuni popis vrijednosti](all-settings.md)
