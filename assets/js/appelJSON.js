const menuburger=document.querySelector('.container__menuburger');
const url = ['assets/data/countries/france.json', 'assets/data/countries/germany.json', 'assets/data/countries/albania.json', 'assets/data/countries/andorra.json', 'assets/data/countries/armenia.json', 'assets/data/countries/austria.json', 'assets/data/countries/azerbaijan.json', 'assets/data/countries/belarus.json', 'assets/data/countries/belgium.json', 'assets/data/countries/bosnia_and_herzegovina.json', 'assets/data/countries/bulgaria.json', 'assets/data/countries/croatia.json', 'assets/data/countries/cyprus.json', 'assets/data/countries/czech.json', 'assets/data/countries/denmark.json', 'assets/data/countries/estonia.json', 'assets/data/countries/finland.json', 'assets/data/countries/georgia.json', 'assets/data/countries/greece.json', 'assets/data/countries/hungary.json', 'assets/data/countries/iceland.json', 'assets/data/countries/ireland.json', 'assets/data/countries/italy.json', 'assets/data/countries/latvia.json', 'assets/data/countries/liechtenstein.json', 'assets/data/countries/lithuania.json', 'assets/data/countries/luxembourg.json', 'assets/data/countries/malta.json', 'assets/data/countries/moldova.json', 'assets/data/countries/monaco.json', 'assets/data/countries/montenegro.json', 'assets/data/countries/netherlands.json', 'assets/data/countries/north_macedonia.json', 'assets/data/countries/norway.json', 'assets/data/countries/poland.json', 'assets/data/countries/portugal.json', 'assets/data/countries/romania.json', 'assets/data/countries/russia.json', 'assets/data/countries/san_marino.json', 'assets/data/countries/serbia.json', 'assets/data/countries/slovakia.json', 'assets/data/countries/slovenia.json', 'assets/data/countries/spain.json', 'assets/data/countries/sweden.json', 'assets/data/countries/switzerland.json', 'assets/data/countries/turkey.json', 'assets/data/countries/ukraine.json', 'assets/data/countries/united_kingdom.json', 'assets/data/countries/vatican.json' ];
const titlePays = document.querySelector('.container__menuburger__content__title');
const flag = document.getElementById('flag');
const executifTime=document.getElementById('executif-time');
const legislatifTime=document.getElementById('legislatif-time');
const executifText=document.getElementById('executif');
const legislatifText=document.getElementById('legislatif');
const campPolitique=document.getElementById('camp-politique');
const EG=document.getElementById('EG');
const G=document.getElementById('G');
const C=document.getElementById('C');
const D=document.getElementById('D');
const ED=document.getElementById('ED');
let politArray=[EG, G, C, D, ED];
let infosPays = {};

fetch('assets/data/infos-pays.json')
    .then(response=>response.json())
    .then(data => {
        infosPays = data;
    });

document.querySelectorAll('.pays-info').forEach(div => {
    div.style.display='none';
})

Promise.all(url.map(url => fetch(url).then(response => response.json())))
  .then(dataArray => {
    dataArray.forEach(data => {
      L.geoJSON(data, {
        style: function(feature) {
          return {
            fillColor: couleurSelonPays(feature.properties.name),
          };
        },
        onEachFeature: function(feature, layer) {

          /**
           * @return {string} Les informations de chaque pays piochés dans le json selon le nom du pays
           */

          layer.on('click', function() {
            const nomPays = feature.properties.name;
            const infos = infosPays[nomPays];
            menuburger.style.display = 'grid';
            if (infos) {
              flag.src=infos.drapeau;
              titlePays.textContent=infos.name;
              executifTime.textContent=infos.executif_duree;
              legislatifTime.textContent=infos.legislatif_duree;
              executifText.textContent=infos.executif;
              legislatifText.textContent=infos.legislatif;
              campPolitique.textContent=infos.camp_politique;

              /**
               * @return {string} Le politiscore correspondant pour chaque pays
               */

              function afficherPolitique() {
                const indexActif = Number(infos.score_politique);
                for (let i = 0; i < politArray.length; i++) {
                  const element = politArray[i];
                  if (i===indexActif) {
                    element.style.border='solid 16px';
                    element.style.borderRadius='6px';
                  }else{
                    element.style.border='solid 4px';
                    element.style.borderRadius='1rem';
                  }
                }
              }
              afficherPolitique();
            }
         });
        }
      }).addTo(map);

      /**
       * 
       * @param {string} nomPays Le nom du pays récupéré dans le json
       * @returns {string} Une couleur sur la carte selon le score politique du pays
       */

      function couleurSelonPays(nomPays) {
       const infos = infosPays[nomPays];
       if (!infos) return '#cccccc';
       
       if (infos.score_politique == "0") return 'red';
       if (infos.score_politique == "1") return '#e668e8';
       if (infos.score_politique == '2') return 'yellow';
       if (infos.score_politique == '3') return 'rgb(66, 151, 248)';
       return 'black';
     }
    });
});