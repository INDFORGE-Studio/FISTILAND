<div class="fl-page-hero fl-bg-d" markdown>

:material-shield-crown:

# Guide Admin

<p>Tout ce que nous avons vérifié en faisant tourner un serveur SCUM</p>

</div>

<div class="fl-facts">
<div><b>1.3.4.2</b><span>Version du jeu</span></div>
<div><b>2 572</b><span>Codes d'objets</span></div>
<div><b>7779</b><span>Port de connexion directe (local)</span></div>
<div><b>2 fichiers</b><span>Réglages + économie</span></div>
</div>


## :material-key: Devenir admin

Ajoutez votre SteamID64 (17 chiffres, à trouver sur steamid.io) dans `AdminUsers.ini`, un par ligne. Le fichier est lu au démarrage du serveur : redémarrez-le après modification. Ensuite, tapez les commandes dans le chat en jeu, précédées d'un `#`.

## :material-console: Commandes du chat

Statut : **Testée** veut dire que nous l'avons lancée sur notre serveur. **Signalée** veut dire qu'un guide public la décrit et que nous ne l'avons pas testée.

| Commande | Ce qu'elle fait | Statut |
|---|---|---|
| `#ListPlayers` | Liste les joueurs en ligne. | Testée |
| `#ListItems` | Affiche tous les codes d'objets de votre version (2 572 en 1.3.4.2) dans le journal du jeu. | Testée |
| `#spawnitem Apple`, `#spawnitem Water_05l` | Vous donne un objet à partir de son code. | Testée |
| `#SetCurrencyBalance Normal 10000 NomDuJoueur` | Fixe l'argent d'un joueur. | Testée |
| `#ChangeCurrencyBalance Gold 5 NomDuJoueur` | Modifie l'or d'un joueur. | Testée |
| `#NightBrightness 1` | Luminosité de la nuit, de 0 (sombre) à 1 (clair). Pour vous seulement, pas pour tout le serveur. | Testée |
| `#SetTime 12` | Fixe l'heure de la journée, de 0 à 24. | Testée |
| `#ListZombies`, `#ListAnimals` | Liste les types de zombies et d'animaux. | Testée |
| `#ListSpawnedVehicles`, `#ListSpawnedArmedNPCs` | Liste ce qui est vivant dans le monde. Le résultat s'affiche dans le chat uniquement, pas dans le journal. | Testée |
| `#MapTeleport` | Téléportation par la carte. | Listée, non testée |
| `#SetImmortality true` / `false` | Immunité aux dégâts, activée puis désactivée. | Signalée |
| `#SetFamePoints 500 NomDuJoueur` | Fixe les fame points d'un joueur. | Signalée |
| `#SetGodMode` | Construction instantanée, pas d'invulnérabilité. | Signalée |
| `#heal` | N'existe pas en 1.3.4.2. | Indisponible |

## :material-monitor: Lancer un serveur de test local gratuit

1. Dans Steam, installez l'outil gratuit **SCUM Server**.
2. Copiez votre `ServerSettings.ini` et votre `EconomyOverride.json` dans le dossier `SCUM\Saved\Config\WindowsServer` de l'outil. Ajoutez `[TEST]` au nom du serveur pour le repérer.
3. Lancez `SCUMServer.exe -log -port=7777` depuis `SCUM\Binaries\Win64`. Le chargement de la carte prend environ deux minutes.
4. Dans le jeu, ouvrez la zone de connexion directe et saisissez `127.0.0.1:7779`. Le port 7777 ne marche pas ici.
5. Arrêtez le serveur avec Ctrl+C dans sa fenêtre.

Le journal du serveur est `SCUM\Saved\Logs\SCUM.log` dans le dossier de l'outil. Le journal de votre propre jeu, où s'affichent les résultats des commandes, est dans `%LOCALAPPDATA%\SCUM\Saved\Logs`.

## :material-file-cog: Fichiers de réglages

| Fichier | Ce qu'il contient |
|---|---|
| `ServerSettings.ini` | Tous les réglages du serveur (440 clés, texte ASCII). |
| `EconomyOverride.json` | Réglages des marchands et prix par objet. Chaque valeur est écrite comme du texte entre guillemets. |
| `AdminUsers.ini` | Les admins, un SteamID64 par ligne. |

Consultez les [pages de réglages](server/overview.md) pour ce que fait chaque valeur sur FISTILAND.

## :material-download: Télécharger les fichiers de configuration

Chaque fichier existe en deux versions, pour pouvoir les comparer. **FISTILAND** est le fichier que notre serveur utilise. **SCUM** est le fichier tel que le jeu ou Nitrado le fournit, le point de départ pour repartir de zéro.

| Fichier | Lequel | Ce que c'est |
|---|---|---|
| [ServerSettings_FISTILAND.ini](downloads/ServerSettings_FISTILAND.ini){ download } | **FISTILAND** | Les réglages du serveur FISTILAND. |
| [ServerSettings_SCUM.ini](downloads/ServerSettings_SCUM.ini){ download } | **SCUM** | Le fichier d'un nouveau serveur Nitrado, intact. |
| [EconomyOverride_FISTILAND.json](downloads/EconomyOverride_FISTILAND.json){ download } | **FISTILAND** | Les réglages des marchands de FISTILAND : pas de fame requis, marchands toujours approvisionnés et riches, prix fixes. |
| [EconomyOverride_SCUM.json](downloads/EconomyOverride_SCUM.json){ download } | **SCUM** | Le fichier des marchands avec les valeurs de départ du jeu. |
| [SCUM_item_codes_1.3.4.2.txt](downloads/SCUM_item_codes_1.3.4.2.txt){ download } | **Données** | Les 2 572 codes d'objets de la version 1.3.4.2 du jeu, un par ligne (issus de la commande `#ListItems`). |
| [Armory_SCUM_prices_A0.csv](downloads/Armory_SCUM_prices_A0.csv){ download } | **Données** | Les prix de l'Armory (armurier) du jeu de base, relevés en jeu à l'avant-poste A0 (environ 380 lignes). |

L'adresse du serveur, les ports et le mot de passe sont retirés de ces copies. Gardez les vôtres quand vous envoyez le fichier.
