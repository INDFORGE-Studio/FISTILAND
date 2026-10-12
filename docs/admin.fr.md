<div class="fl-page-hero fl-bg-d" markdown>

:material-shield-crown:

# Guide Admin

<p>Tout ce que nous avons vérifié en faisant tourner un serveur SCUM</p>

</div>

<div class="fl-facts">
<div><b>1.3.4.2</b><span>Version du jeu</span></div>
<div><b>2 572</b><span>Codes d'objets</span></div>
<div><b>7779</b><span>Port de connexion directe (local)</span></div>
<div><b>6 fichiers</b><span>À télécharger</span></div>
</div>


## :material-key: Devenir admin

Ajoutez votre SteamID64 (17 chiffres, à trouver sur steamid.io) dans `AdminUsers.ini`, un par ligne. Le fichier est lu au démarrage du serveur : redémarrez-le après modification. Ensuite, tapez les commandes dans le chat en jeu, précédées d'un `#`.

## :material-console: Commandes du chat

Statut : **Testée** veut dire que nous l'avons lancée sur notre serveur. **Signalée** veut dire qu'un guide public la décrit et que nous ne l'avons pas testée. Dans les exemples, les montants, le nom du joueur et les codes d'objets ne sont que des exemples : changez-les selon vos besoins.

| Commande | Statut | Ce qu'elle fait |
|---|---|---|
| `#ListPlayers` | <span class="fl-st fl-st-ok">:material-check-circle: Testée</span> | Liste les joueurs en ligne. |
| `#ListItems` | <span class="fl-st fl-st-ok">:material-check-circle: Testée</span> | Affiche tous les codes d'objets de votre version (2 572 en 1.3.4.2) dans le journal du jeu. |
| `#spawnitem Apple`<br>`#spawnitem Water_05l` | <span class="fl-st fl-st-ok">:material-check-circle: Testée</span> | Vous donne un objet à partir de son code. Utilisez n'importe quel code de la liste des objets (voir les téléchargements plus bas). |
| `#SetCurrencyBalance Normal 10000 NomDuJoueur` | <span class="fl-st fl-st-ok">:material-check-circle: Testée</span> | Fixe l'argent d'un joueur. `Normal` est l'argent ordinaire et `10000` le montant : changez-le par le nombre voulu (500, 100000…). |
| `#ChangeCurrencyBalance Gold 5 NomDuJoueur` | <span class="fl-st fl-st-ok">:material-check-circle: Testée</span> | Modifie l'or d'un joueur. `Gold` est la monnaie et `5` le montant : changez-le comme vous voulez. |
| `#NightBrightness 1` | <span class="fl-st fl-st-ok">:material-check-circle: Testée</span> | Luminosité de la nuit, de 0 (sombre) à 1 (clair). Pour vous seulement, pas pour tout le serveur. |
| `#SetTime 12` | <span class="fl-st fl-st-ok">:material-check-circle: Testée</span> | Fixe l'heure de la journée, de 0 à 24. |
| `#ListZombies`<br>`#ListAnimals` | <span class="fl-st fl-st-ok">:material-check-circle: Testée</span> | Liste les types de zombies et d'animaux. |
| `#ListSpawnedVehicles`<br>`#ListSpawnedArmedNPCs` | <span class="fl-st fl-st-ok">:material-check-circle: Testée</span> | Liste ce qui est vivant dans le monde. Le résultat s'affiche dans le chat uniquement, pas dans le journal. |
| `#MapTeleport` | <span class="fl-st fl-st-lst">:material-format-list-bulleted: Listée</span> | Téléportation par la carte. Non testée. |
| `#SetImmortality true`<br>`#SetImmortality false` | <span class="fl-st fl-st-rep">:material-help-circle-outline: Signalée</span> | Immunité aux dégâts, activée puis désactivée. |
| `#SetFamePoints 500 NomDuJoueur` | <span class="fl-st fl-st-rep">:material-help-circle-outline: Signalée</span> | Fixe les fame points d'un joueur. |
| `#SetGodMode` | <span class="fl-st fl-st-rep">:material-help-circle-outline: Signalée</span> | Construction instantanée, pas d'invulnérabilité. |
| `#heal` | <span class="fl-st fl-st-no">:material-close-circle: Absente</span> | N'existe pas en 1.3.4.2. |

## :material-monitor: Lancer et faire tourner un serveur SCUM : sur un dédié ou en local gratuitement

Les deux fichiers de réglages fonctionnent de la même façon partout : le serveur les lit au démarrage, donc arrêtez le serveur, remplacez les fichiers, puis relancez-le.

### Sur un serveur dédié

Sur un serveur loué (Nitrado, par exemple), envoyez vos `ServerSettings.ini` et `EconomyOverride.json` par la page de fichiers ou de réglages de l'hébergeur, serveur arrêté, puis relancez-le. Les écrans changent d'un hébergeur à l'autre : consultez l'aide de votre hébergeur pour savoir où déposer les fichiers.

### En local, gratuitement

Un serveur de test gratuit sur votre propre PC permet d'essayer vos réglages et vos prix avant de les mettre en ligne :

1. Dans Steam, installez l'outil gratuit **SCUM Server**.
2. Copiez votre `ServerSettings.ini` et votre `EconomyOverride.json` dans le dossier `SCUM\Saved\Config\WindowsServer` de l'outil. Ajoutez `[TEST]` au nom du serveur pour le repérer.
3. Lancez `SCUMServer.exe -log -port=7777` depuis `SCUM\Binaries\Win64`. Le chargement de la carte prend environ deux minutes.
4. Dans le jeu, ouvrez la zone de connexion directe et saisissez `127.0.0.1:7779`. C'est ce qui a fonctionné chez nous avec un serveur lancé en `-port=7777` : le port de connexion était 7779, soit 2 de plus que le port du jeu, et 7777 échouait. Testé sur le même PC que le jeu ; avec une autre valeur de `-port`, le port peut changer.
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

Chaque fichier existe en deux versions, pour pouvoir les comparer. **FISTILAND** sont les versions que notre serveur utilise. Et **SCUM** sont les versions telles que le jeu les fournit par défaut, et donc aussi un bon point de départ pour repartir de zéro.

| Fichier | Lequel | Ce que c'est |
|---|---|---|
| [ServerSettings_FISTILAND.ini](downloads/ServerSettings_FISTILAND.ini){ download="ServerSettings_FISTILAND.ini" } | <span class="fl-st fl-wh-fl">:material-shield-star: FISTILAND</span> | Les réglages du serveur FISTILAND. |
| [ServerSettings_SCUM.ini](downloads/ServerSettings_SCUM.ini){ download="ServerSettings_SCUM.ini" } | <span class="fl-st fl-wh-sc">:material-gamepad-variant: SCUM</span> | Le fichier d'un nouveau serveur Nitrado, intact. |
| [EconomyOverride_FISTILAND.json](downloads/EconomyOverride_FISTILAND.json){ download="EconomyOverride_FISTILAND.json" } | <span class="fl-st fl-wh-fl">:material-shield-star: FISTILAND</span> | Les réglages des marchands de FISTILAND : pas de fame requis, marchands toujours approvisionnés et riches, prix fixes. |
| [EconomyOverride_SCUM.json](downloads/EconomyOverride_SCUM.json){ download="EconomyOverride_SCUM.json" } | <span class="fl-st fl-wh-sc">:material-gamepad-variant: SCUM</span> | Le fichier des marchands avec les valeurs de départ du jeu. |
| [SCUM_item_codes_1.3.4.2.txt](downloads/SCUM_item_codes_1.3.4.2.txt){ download="SCUM_item_codes_1.3.4.2.txt" } | <span class="fl-st fl-wh-da">:material-database: Données</span> | Les 2 572 codes d'objets de la version 1.3.4.2 du jeu, un par ligne (issus de la commande `#ListItems`). |
| [Armory_SCUM_prices_A0.csv](downloads/Armory_SCUM_prices_A0.csv){ download="Armory_SCUM_prices_A0.csv" } | <span class="fl-st fl-wh-da">:material-database: Données</span> | Les prix de l'Armory (armurier) du jeu de base, relevés en jeu à l'avant-poste A0 (environ 380 lignes). |

:material-alert: Pour tous les fichiers disponibles au téléchargement, l'adresse du serveur, les ports et les mots de passe ont volontairement été retirés ; n'oubliez pas de faire de même si vous faites circuler vos fichiers par la suite.
