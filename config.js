/* =====================================================================
   CONFIG DU LIVE : la seule zone à modifier (utilisée par index.html et
   rejoindre.html).
   - SESSIONS : dates des lives, heure de Paris. La page choisit toute seule
     la prochaine : jusqu'à 30 min après la fin d'un live il reste affiché,
     ensuite la page passe à la date suivante. Pour ajouter un mois, ajouter
     une ligne. Décalage horaire : +02:00 jusqu'au 25 octobre 2026, +01:00 après.
   - CRENEAUX_DIAGNOSTIC : nombre de créneaux de diagnostic réservés aux
     participants après le live (fenêtre FENETRE_H heures). Caler sur la
     capacité réelle de l'équipe : la page l'annonce, il faut le tenir.
   - WEBHOOK_URL : Apps Script « Live Investisseurs 3.0 · Inscriptions ».
   - VISIO_URL : lien YouTube Live (non répertorié). Vide = la page
     rejoindre.html dit que le lien sera actif à 19h45 le jour du live.
   - COMMUNAUTE_URL : invitation au groupe WhatsApp. Vide = bouton masqué.
   - META_PIXEL_ID : pixel Meta. Vide = aucun pixel. Avec un ID et
     PIXEL_CONSENT à true, le pixel ne se charge qu'après « J'accepte »
     (règle CNIL pour les traceurs publicitaires).
   - COMPTEUR_MIN : le nombre d'inscrits ne s'affiche qu'à partir de ce seuil.
     Sous 300, un petit chiffre dessert la page : ne pas descendre ce seuil.
===================================================================== */
window.CONFIG = {
  SESSIONS: [
    "2026-09-24T20:00:00+02:00",
    "2026-10-22T20:00:00+02:00",
    "2026-11-26T20:00:00+01:00",
    "2026-12-17T20:00:00+01:00"
  ],
  DUREE_MIN: 120,
  CRENEAUX_DIAGNOSTIC: 40,
  FENETRE_H: 48,
  TITRE_AGENDA: "Live Investisseurs 3.0 · Comment investir 100 000 €",
  DETAILS_AGENDA: "La méthode complète utilisée en gestion privée : placements, fiscalité, structuration. Deux heures en direct avec Thomas Mayol, Benjamin Forget et Ghislain Cayla (Valar Gestion Privée), sur un cas réel.\n\nAu programme : 20h00 le cas réel, 20h45 le portefeuille 100 000 € construit ligne par ligne, 21h15 le fichier remis aux personnes présentes, 21h30 vos questions puis l'ouverture des 40 créneaux de diagnostic.\n\nLe fichier du portefeuille et vos questions ne se jouent que pendant le direct.",
  URL_PAGE: "https://alexyoucompte99-lang.github.io/live-investisseurs30/",
  WEBHOOK_URL: "https://script.google.com/macros/s/AKfycbwQ0CA81iPnB3LUtSSAN1D2sridDn9yCdlZut4ey6Xm4obE_-k6FqeJQT9NBr_ii_nrpw/exec",
  VISIO_URL: "",
  COMMUNAUTE_URL: "",
  META_PIXEL_ID: "",
  PIXEL_CONSENT: true,
  COMPTEUR_MIN: 300,
  SOURCE: "lp-live-i3-v3"
};

/* La session à afficher : la prochaine, ou celle en cours (jusqu'à 30 min après la fin). */
window.sessionCourante = function () {
  var C = window.CONFIG;
  var maintenant = Date.now();
  var marge = (C.DUREE_MIN + 30) * 60000;
  var dates = C.SESSIONS.map(function (s) { return new Date(s); }).filter(function (d) { return !isNaN(d); });
  var choisie = dates.find(function (d) { return d.getTime() + marge > maintenant; }) || dates[dates.length - 1];
  var fin = new Date(choisie.getTime() + C.DUREE_MIN * 60000);
  function fmt(opts) { return new Intl.DateTimeFormat('fr-FR', Object.assign({ timeZone: 'Europe/Paris' }, opts)); }
  function heure(d) {
    var p = fmt({ hour: 'numeric', minute: '2-digit', hourCycle: 'h23' }).formatToParts(d);
    var h = p.find(function (x) { return x.type === 'hour'; }).value;
    var m = p.find(function (x) { return x.type === 'minute'; }).value;
    return h + 'h' + (m === '00' ? '' : m);
  }
  var parts = fmt({ year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(choisie)
    .reduce(function (o, p) { o[p.type] = p.value; return o; }, {});
  var jour = fmt({ weekday: 'long' }).format(choisie);
  var dateNum = fmt({ day: 'numeric', month: 'long' }).format(choisie);
  var date = jour + ' ' + dateNum;
  return {
    debut: choisie, fin: fin,
    cle: parts.year + '-' + parts.month + '-' + parts.day,
    jour: jour, date: date, dateCap: date.charAt(0).toUpperCase() + date.slice(1), dateNum: dateNum,
    heure: heure(choisie), heureFin: heure(fin)
  };
};
