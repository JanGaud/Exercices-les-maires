/**
 * Les routes de l'api
 * url : https://jmartel.webdev.cmaisonneuve.qc.ca/wsmaires/maires/
 * 
 * Faire une recherche : /recherche
 * ?type = [date, nom]
 * ?valeur = chaine de recherche
 * Ex 1 : https://jmartel.webdev.cmaisonneuve.qc.ca/wsmaires/maires/recherche?type=date&valeur=2012
 * Ex 2 : https://jmartel.webdev.cmaisonneuve.qc.ca/wsmaires/maires/recherche?type=nom&valeur=Houde
 * 
 * Obtenir la liste : /liste
 * ?tri=[date, nom]
 * ?ordre=[asc, desc]
 * Ex 3 : https://jmartel.webdev.cmaisonneuve.qc.ca/wsmaires/maires/liste?tri=date&ordre=asc
 * Ex 4 : https://jmartel.webdev.cmaisonneuve.qc.ca/wsmaires/maires/liste?tri=nom&ordre=desc
 * 
 */


export default class MaireXhr {
    /**
     * @typedef UnMaire
     * @type {object}
     * @property {string} nom - Le nom
     * @property {string} prenom - Le prénom
     * @property {number} debut - Année du début du mandat
     * @property {?number} fin - Année de fin du mandat ou null
     */

    /**
     * @type {UnMaire[]} Tableau des maires
    }
     */
    #aMaires;
    static nbMaire = 0; 
    /**
     * Représente le constructeur de la classe
     * Qu'est-ce qui pourrait être fait rapidement à la construction de l'objet ?
     */
    constructor(textJSON){
        let tableauParse = JSON.parse(textJSON);
        this.#aMaires = tableauParse;
    }
    
     /**
      * Retourne les résultats de la recherche
      * @param {Object} params - Objet de paramètre
      * @param {string} params.type - Le type de recherche : ["date", "nom"]
      * @param {string | Number} params.valeur - La valeur recherchée
      * @param {fonction} params.callback - La fonction de rappel, elle attend un paramètre, les données
      * @returns {UnMaire[]} - Tableau des résultats;
     */
    rechercheMaires(params){
      var oReq = new XMLHttpRequest();
      oReq.onreadystatechange = () => {
        if(oReq.readyState == 4 && oReq.status == 200){
          params.callback(new MaireXhr(oReq.responseText).getMaire());
        }
      };

      oReq.open("get", `https://jmartel.webdev.cmaisonneuve.qc.ca/wsmaires/maires/recherche?type=${params.type}&valeur=${params.valeur}`, true);
      oReq.send();
    }
    
    /**
     * Retourne la liste des maires triée selon les paramètres
     * @param {Object} params - Objet de paramètre
     * @param {string} params.type - Le type de tri : ["date", "nom"]
     * @param {string} params.ordre - L'ordre du tri : ["ASC", "DESC"]
     * @param {fonction} params.callback - La fonction de rappel, elle attend un paramètre, les données
     * @returns {UnMaire[]} - Tableau des résultats
     */
    listeMaires(params) {
      
      var oReq = new XMLHttpRequest();
      oReq.onreadystatechange = () => {
        if(oReq.readyState == 4 && oReq.status == 200){
          params.callback(new MaireXhr(oReq.responseText).getMaire());
        }
      };

      oReq.open("get", `https://jmartel.webdev.cmaisonneuve.qc.ca/wsmaires/maires/liste?tri=${params.type}&ordre=${params.ordre}`, true);
      oReq.send();
    }

    /**
     * @returns {Number} - Le nombre d'enregistrement dans le tableau des maires
     */
    getNombreMaires(){
      return MaireXhr.nbMaire;
    }

    getMaire(){
      return this.#aMaires
    }
    
  }