

Formatage de code: branche code-formatting
- Checkout branche code-formatting
- Présenter js-beautify
- commade: npm install js-beautify -g
- commande: js-beautify -f file -r
- montrer la différence
- présenter eslint
- npm install eslint -g
- créer une configuration eslint
- modifier la configuration et montrer les nouvelles erreurs trouvées
- lancer eslint en ligne de commande: eslint file
- créer un script npm pour vérifier le style de toute l’application: npm run style

Duplication du code:
js-inspect


Ne pas réinventer la roue: branche do-not-reinvent-wheel
- Présenter la fonctionnalité sur l'application
- Montrer ce qu'elle semble faire (ou vouloir faire)
- Montrer le code associé
=> solution 1 reécrire le code
=> solution 2 pour les feignasses, utiliser ce que la nature nous offre :)
Angular a tout ce qu'il faut, idealement il faudrait poser un test pour s'assurer que nous ne cassons rien,
François va vous montrer plus tard comment éviter les regressions en test end-to-end