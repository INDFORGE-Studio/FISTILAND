<div class="fl-page-hero fl-bg-d" markdown>

:material-gavel:

# Règles

<p>Le fair-play d'abord : première personne uniquement, pas de réticule, aucun pack pay-to-win.</p>

</div>

<div class="fl-facts">
<div><b>14</b><span>Slots</span></div>
<div><b>1re pers.</b><span>Seule vue</span></div>
<div><b>Off</b><span>Réticule</span></div>
<div><b>x1.3</b><span>Dégâts entre joueurs</span></div>
</div>


## :material-gavel: Règles pour les joueurs

- Les **aéronefs** servent uniquement à se déplacer. Il est interdit de raider avec un aéronef.
- Les **mines** servent uniquement à défendre votre base.

Ces deux points sont des règles, pas des réglages du serveur : elles reposent sur le respect des joueurs.

## :material-eye: Vue et interface

| Réglage | Valeur | Rôle |
|---|---|---|
| `AllowFirstPerson` | True | La vue à la première personne est autorisée. |
| `AllowThirdPerson` | False | La troisième personne est désactivée. |
| `AllowCrosshair` | False | Pas de réticule. |
| `AllowMapScreen` | True | L'écran de la carte est disponible. |
| `HideKillNotification` | True | Les joueurs ne voient pas de notification quand quelqu'un en tue un autre. |
| `HideQuickAccessBar`, `HideLifeIndicators` | False | Ces deux éléments d'interface sont affichés. |

## :material-sword-cross: Combat

| Réglage | Valeur | Rôle |
|---|---|---|
| `HumanToHumanDamageMultiplier` | 1.3 | Dégâts entre joueurs. |
| `HumanToHumanArmedMeleeDamageMultiplier` | 1.3 | Dégâts des armes de mêlée entre joueurs. |
| `HumanToHumanUnarmedMeleeDamageMultiplier` | 1 | Dégâts à mains nues entre joueurs. |
| `HumanToHumanThrowingDamageMultiplier` | 1.3 | Dégâts des armes de lancer entre joueurs. |
| `AllowMinesAndTraps` | True | Les mines et les pièges sont autorisés. |
| `AllowComa` | True | Les joueurs peuvent tomber dans le coma avant de mourir. |
| `AllowKillClaiming` | True | Un BCU tombe quand un joueur est tué. |
| `LogSuicides` | True | Les suicides sont journalisés. |

## :material-logout: Déconnexion et protection

| Réglage | Valeur | Rôle |
|---|---|---|
| `LogoutTimer` | 120 | Secondes avant qu'un joueur qui se déconnecte quitte le monde. |
| `LogoutTimerWhileCaptured` | 120 | Idem, pour un joueur ligoté. |
| `EnableNewPlayerProtection` | True | Les nouveaux joueurs sont protégés au départ. |
| `NewPlayerProtectionDuration` | 120 | Durée de la protection. |
| `PlaySafeIdProtection` | False | Rejoindre ne demande pas d'identifiant PlaySafe. |

## :material-account: Personnages

| Réglage | Valeur | Rôle |
|---|---|---|
| `DeleteInactiveUsers` | False | Les personnages inactifs ne sont jamais supprimés. |
| `DaysSinceLastLoginToBecomeInactive` | 30 | Jours sans connexion avant qu'un joueur soit considéré comme inactif. |
| `DeleteBannedUsers` | False | Les personnages bannis sont conservés. |

## :material-cash-remove: Packs

| Réglage | Valeur | Rôle |
|---|---|---|
| `EnableDigitalDeluxeStarterPack` | False | Le Deluxe Survival Pack ne peut pas être utilisé. |
| `EnableDigitalDeluxeFreeGoldCard` | False | La carte or gratuite de ce pack ne peut pas être réclamée. |

## :material-server: Serveur

| Réglage | Valeur | Rôle |
|---|---|---|
| `MaxPlayers` | 14 | Slots de joueurs. |
| `ServerPlaystyle` | PVP | Style de jeu déclaré. |
| `MaxServerTickRate` | 35 | Mises à jour du serveur par seconde avec des joueurs en ligne. |
| `MinServerTickRate` | 5 | Mises à jour du serveur par seconde à vide. |
| `MaxPingCheckEnabled` | True | Les joueurs avec un ping élevé sont expulsés. |
| `MaxPing` | 300 | Ping maximum autorisé en millisecondes. |
| `MaxNumberOfConsecutiveHighPingReadings` | 5 | Mauvaises mesures d'affilée avant l'expulsion. |
| `WelcomeMessage` | FISTILAND PvP SERVER | Affiché quand un joueur se connecte. |
| `MessageOfTheDay` | More information on discord.gg/UdHGdRSyyu | Message répété dans le chat. |
| `MessageOfTheDayCooldown` | 30 | Minutes entre deux répétitions. |
| `AllowGlobalChat`, `AllowLocalChat`, `AllowSquadChat`, `AllowAdminChat` | True | Tous les canaux de chat sont ouverts. |
| `LimitGlobalChat` | False | Le chat global n'a aucune restriction. |

---

[Toutes les pages de réglages](overview.md#every-setting-explained) | [Liste complète des valeurs](all-settings.md)
