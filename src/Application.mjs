import MaireXhr from "./MaireXhr.mjs";
import MaireFetch from "./MaireFetch.mjs";

export default class Application {
     #btnListeNom = document.querySelectorAll(".btn-liste-nom");
     #btnListeDate = document.querySelectorAll(".btn-liste-date");
     #btnRchNom = document.querySelectorAll(".btn-recherche-nom");
     #btnRchDate = document.querySelectorAll(".btn-recherche-date");

    /** 
     * Constructeur de la classe Application
     * Le constructeur attache les écouteurs d'événement sur les bonnes méthodes de l'application
     */
    constructor() {

        for(let i = 0; i < this.#btnListeNom.length; i++){
          this.#btnListeNom[i].addEventListener("click", (event) => {this.liste(event, "nom")});
        }

        for(let i = 0; i < this.#btnListeDate.length; i++){
          this.#btnListeDate[i].addEventListener("click", (event) => {this.liste(event, "date")});
        }
        
        for(let i = 0; i < this.#btnRchNom.length; i++){
          this.#btnRchNom[i].addEventListener("click", (event) => {this.recherche(event, "nom")}); 
        }

        for(let i = 0; i < this.#btnRchDate.length; i++){
          this.#btnRchDate[i].addEventListener("click", (event) => {this.recherche(event, "date")});
        }
    }
    
    /**
    Mettre les autres méthodes ici.
    */

    liste(event, type){
      let fieldset = event.target.closest("fieldset");
      let ordreTrie = fieldset.querySelector("input[name='ordre']:checked");
      let params = {
        type: type,
        ordre: ordreTrie == null ? "asc" : ordreTrie.value,
        callback: (data) => {this.render(data)}
      };

      if(fieldset.classList[0] == "xhr"){
        MaireXhr.prototype.listeMaires(params);
      }
      
      if(fieldset.classList[0] == "fetch"){
        MaireFetch.prototype.listeMaires(params);
      }   

    }

    recherche(event, type){ 
      let fieldset = event.target.closest("fieldset");
      let champRecherche = fieldset.querySelector(".champ-recherche");
      let txtRecherche = champRecherche.value;

      let params = {
        type: type,
        valeur: txtRecherche,
        callback: (data) => {this.render(data)}
      }

      if(fieldset.classList[0] == "xhr"){
        MaireXhr.prototype.rechercheMaires(params);
      }
      
      if(fieldset.classList[0] == "fetch"){
        MaireFetch.prototype.rechercheMaires(params);
      } 
      
    }


    render(data){
      let tableauResultat = document.querySelector(".tbl-resultat");
        tableauResultat.querySelector("tbody").innerHTML = "";  
        
      for(let i = 0; i < data.length; i++){
        const row = document.createElement("tr");
        const nom = document.createElement("td");
        const prenom = document.createElement("td");
        const debut = document.createElement("td");
        const fin = document.createElement("td");

        nom.innerHTML = data[i].nom;
        prenom.innerHTML = data[i].prenom;
        debut.innerHTML = data[i].debut;
        fin.innerHTML = data[i].fin;


        row.appendChild(nom);
        row.appendChild(prenom);
        row.appendChild(debut);
        row.appendChild(fin);

        
        tableauResultat.querySelector("tbody").appendChild(row);
      }
    }

  }