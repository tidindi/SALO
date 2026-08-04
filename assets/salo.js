function tid(){var k=document.getElementById('klokke');if(!k)return;
 k.textContent='CET '+new Date().toLocaleTimeString('nb-NO',{timeZone:'Europe/Oslo',hour:'2-digit',minute:'2-digit'});}
tid();setInterval(tid,20000);
var rute=document.getElementById('rutenett'),liste=document.getElementById('liste'),
    bR=document.getElementById('btnRute'),bL=document.getElementById('btnListe');
if(bR&&bL){
  function visning(somListe){
    rute.hidden = somListe;
    liste.hidden = !somListe;
    bR.setAttribute('aria-pressed', somListe ? 'false' : 'true');
    bL.setAttribute('aria-pressed', somListe ? 'true' : 'false');
  }
  bR.addEventListener('click', function(){ visning(false); bR.focus(); });
  bL.addEventListener('click', function(){ visning(true); bL.focus(); });
}
var filtre=document.querySelectorAll('[data-filter]');
if(filtre.length){filtre.forEach(function(b){b.addEventListener('click',function(){
 var f=b.dataset.filter;
 filtre.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
 document.querySelectorAll('[data-tags]').forEach(function(el){
  el.style.display=(f==='alle'||el.dataset.tags.indexOf('|'+f+'|')>-1)?'':'none';});
});});}
var skjema = document.getElementById('kontaktskjema');
if (skjema && window.fetch) {
  var status = document.getElementById('skjemastatus');
  var knapp = skjema.querySelector('button[type="submit"]');
  skjema.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!skjema.checkValidity()) { skjema.reportValidity(); return; }
    var opprinnelig = knapp.textContent;
    knapp.disabled = true;
    knapp.textContent = 'Sender …';
    status.className = 'status mono';
    status.textContent = '';
    fetch(skjema.action, {
      method: 'POST',
      body: new FormData(skjema),
      headers: { 'Accept': 'application/json' }
    }).then(function (svar) {
      if (svar.ok) {
        skjema.reset();
        status.className = 'status mono ok';
        status.textContent = 'Takk. Henvendelsen er sendt, og vi svarer så snart vi kan.';
      } else {
        return svar.json().then(function (d) {
          throw new Error(d.errors ? d.errors.map(function (f) { return f.message; }).join(', ') : 'Ukjent feil');
        });
      }
    }).catch(function () {
      status.className = 'status mono feil';
      status.textContent = 'Noe gikk galt. Send gjerne en e-post til post@salokommunikasjon.no i stedet.';
    }).then(function () {
      knapp.disabled = false;
      knapp.textContent = opprinnelig;
    });
  });
}
