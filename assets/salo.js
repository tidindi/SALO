function tid(){var k=document.getElementById('klokke');if(!k)return;
 k.textContent='CET '+new Date().toLocaleTimeString('nb-NO',{timeZone:'Europe/Oslo',hour:'2-digit',minute:'2-digit'});}
tid();setInterval(tid,20000);
var rute=document.getElementById('rutenett'),liste=document.getElementById('liste'),
    bR=document.getElementById('btnRute'),bL=document.getElementById('btnListe');
if(bR&&bL){bR.addEventListener('click',function(){rute.classList.remove('skjult');liste.classList.remove('aktiv');
 bR.setAttribute('aria-pressed','true');bL.setAttribute('aria-pressed','false');});
 bL.addEventListener('click',function(){rute.classList.add('skjult');liste.classList.add('aktiv');
 bR.setAttribute('aria-pressed','false');bL.setAttribute('aria-pressed','true');});}
var filtre=document.querySelectorAll('[data-filter]');
if(filtre.length){filtre.forEach(function(b){b.addEventListener('click',function(){
 var f=b.dataset.filter;
 filtre.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
 document.querySelectorAll('[data-tags]').forEach(function(el){
  el.style.display=(f==='alle'||el.dataset.tags.indexOf('|'+f+'|')>-1)?'':'none';});
});});}
