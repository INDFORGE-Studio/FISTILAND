<div class="fl-page-hero fl-bg-d" markdown>

:material-gavel:

# Regeln

<p>Fairplay zuerst: nur Ego-Perspektive, kein Fadenkreuz, keine Pay-to-win-Pakete.</p>

</div>

<div class="fl-facts">
<div><b>14</b><span>Slots</span></div>
<div><b>Ego</b><span>Einzige Ansicht</span></div>
<div><b>Aus</b><span>Fadenkreuz</span></div>
<div><b>x1.3</b><span>Spielerschaden</span></div>
</div>


## :material-gavel: Spielerregeln

- **Luftfahrzeuge** dienen nur der Fortbewegung. Raiden mit einem Luftfahrzeug ist nicht erlaubt.
- **Minen** dienen nur der Verteidigung deiner Basis.

Diese beiden Punkte sind Regeln, keine Servereinstellungen: Sie beruhen darauf, dass die Spieler sie respektieren.

## :material-eye: Ansicht und Oberfläche

| Einstellung | Wert | Wirkung |
|---|---|---|
| `AllowFirstPerson` | True | Die Ego-Perspektive ist erlaubt. |
| `AllowThirdPerson` | False | Die Third-Person-Ansicht ist deaktiviert. |
| `AllowCrosshair` | False | Kein Fadenkreuz. |
| `AllowMapScreen` | True | Der Kartenbildschirm ist verfügbar. |
| `HideKillNotification` | True | Spieler sehen keine Meldung, wenn jemand jemanden tötet. |
| `HideQuickAccessBar`, `HideLifeIndicators` | False | Beide Oberflächenelemente werden angezeigt. |

## :material-sword-cross: Kampf

| Einstellung | Wert | Wirkung |
|---|---|---|
| `HumanToHumanDamageMultiplier` | 1.3 | Schaden zwischen Spielern. |
| `HumanToHumanArmedMeleeDamageMultiplier` | 1.3 | Schaden von Nahkampfwaffen zwischen Spielern. |
| `HumanToHumanUnarmedMeleeDamageMultiplier` | 1 | Schaden ohne Waffe zwischen Spielern. |
| `HumanToHumanThrowingDamageMultiplier` | 1.3 | Schaden von Wurfwaffen zwischen Spielern. |
| `AllowMinesAndTraps` | True | Minen und Fallen sind erlaubt. |
| `AllowComa` | True | Spieler können vor dem Sterben ins Koma fallen. |
| `AllowKillClaiming` | True | Beim Tod eines Spielers fällt ein BCU. |
| `LogSuicides` | True | Selbstmorde werden protokolliert. |

## :material-logout: Abmelden und Schutz

| Einstellung | Wert | Wirkung |
|---|---|---|
| `LogoutTimer` | 120 | Sekunden, bis ein Spieler, der sich abmeldet, die Welt verlässt. |
| `LogoutTimerWhileCaptured` | 120 | Dasselbe für einen gefesselten Spieler. |
| `EnableNewPlayerProtection` | True | Neue Spieler sind zu Beginn geschützt. |
| `NewPlayerProtectionDuration` | 120 | Dauer des Schutzes. |
| `PlaySafeIdProtection` | False | Für den Beitritt ist keine PlaySafe-ID nötig. |

## :material-account: Charaktere

| Einstellung | Wert | Wirkung |
|---|---|---|
| `DeleteInactiveUsers` | False | Inaktive Charaktere werden nie gelöscht. |
| `DaysSinceLastLoginToBecomeInactive` | 30 | Tage ohne Anmeldung, bis ein Spieler als inaktiv gilt. |
| `DeleteBannedUsers` | False | Gesperrte Charaktere bleiben erhalten. |

## :material-cash-remove: Pakete

| Einstellung | Wert | Wirkung |
|---|---|---|
| `EnableDigitalDeluxeStarterPack` | False | Das Deluxe Survival Pack kann nicht verwendet werden. |
| `EnableDigitalDeluxeFreeGoldCard` | False | Die kostenlose Goldkarte dieses Pakets kann nicht eingelöst werden. |

## :material-server: Server

| Einstellung | Wert | Wirkung |
|---|---|---|
| `MaxPlayers` | 14 | Spielerplätze. |
| `ServerPlaystyle` | PVP | Angegebener Spielstil. |
| `MaxServerTickRate` | 35 | Server-Updates pro Sekunde mit Spielern online. |
| `MinServerTickRate` | 5 | Server-Updates pro Sekunde, wenn leer. |
| `MaxPingCheckEnabled` | True | Spieler mit hohem Ping werden entfernt. |
| `MaxPing` | 300 | Höchster erlaubter Ping in Millisekunden. |
| `MaxNumberOfConsecutiveHighPingReadings` | 5 | Schlechte Messungen in Folge bis zur Entfernung. |
| `WelcomeMessage` | FISTILAND PvP SERVER | Wird beim Beitritt eines Spielers angezeigt. |
| `MessageOfTheDay` | More information on discord.gg/UdHGdRSyyu | Im Chat wiederholte Nachricht. |
| `MessageOfTheDayCooldown` | 30 | Minuten zwischen zwei Wiederholungen. |
| `AllowGlobalChat`, `AllowLocalChat`, `AllowSquadChat`, `AllowAdminChat` | True | Alle Chatkanäle sind offen. |
| `LimitGlobalChat` | False | Der globale Chat hat keine Einschränkung. |

---

[Alle Einstellungsseiten](overview.md#every-setting-explained) | [Vollständige Werteliste](all-settings.md)
