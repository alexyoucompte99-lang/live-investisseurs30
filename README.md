# Live Investisseurs 3.0 · page d'inscription

Landing page permanente du live mensuel « Comment investir 100 000 € pour créer un patrimoine qui travaille pour vous » (Thomas Mayol, Benjamin Forget, Ghislain Cayla · Valar Gestion Privée).

- `index.html` : page mono-fichier (HTML + CSS + JS). Tout se règle dans le bloc `CONFIG` en tête du script :
  - `SESSIONS` : dates des lives (heure de Paris). La page choisit toute seule la prochaine date. Ajouter une ligne par nouveau mois.
  - `WEBHOOK_URL` : Apps Script qui écrit les inscriptions dans le Google Sheet.
  - `VISIO_URL` : lien YouTube Live (affiché sur l'écran de confirmation et dans l'invitation agenda).
  - `COMMUNAUTE_URL` : lien du groupe WhatsApp (bouton sur l'écran de confirmation).
  - `META_PIXEL_ID` : pixel Meta (PageView, Lead, CompleteRegistration en trackSingle).
- `diagnostic.html` : page de réservation des 40 diagnostics (CTA de fin de live). Lien à afficher à l'écran à 21h30 et à mettre dans l'e-mail J+1 des présents (`ENVOIS_URL_RESERVATION` de `sequences/Envois.js`) : `URL_PAGE + diagnostic.html?i=<Id>`. Pas de lien depuis `index.html` : la page calcule seule ses 3 états (avant la fin du live, ouvert jusqu'à samedi 22h, fermé), aperçu avec `?test=avant|ouvert|ferme`. Compteur de créneaux restants via la route `?action=creneaux` du webhook (`webhook-live-i3/Creneaux.js`, à brancher dans `doGet`/`doPost` une fois le webhook autorisé).
- `assets/` : logo, portraits, agréments, logos partenaires, vignettes témoignages.

Test local : config `live-i3` de `.claude/launch.json` (port 8966).
