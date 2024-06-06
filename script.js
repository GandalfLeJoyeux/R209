const valeur = document.getElementById("input");
const liste = document.getElementById("villes")
let code_postal;
const expr_reg = /^\d{5}$/;
let code_postal;

valeur.addEventListener("input", updateValue);


function updateValue() {
  code_postal = valeur.value;
  if (expr_reg.test(code_postal)){
    const communes = RequestInsee(code_postal)
    console.log(communes)
    communes.forEach((commune) => {
        let option = document.createElement('option')
        option.value = commune.code
        option.textContent = commune.nom
        liste.appendChild(option)
    });
}
}





async function RequestMeteo(insee) {
    try {
        const res = await fetch(`https://api.meteo-concept.com/api/forecast/daily/0?token=token&insee=${insee}`);
        /* "api/forecast/daily/0" permet d'avoir les données météo du jour même, jour entre 0 et 13 (Pour le jour même : 0, pour le lendemain : 1, etc.). */
        const datares = await res.json();
        const jsonstring = JSON.stringify(datares);
        const jsonparse = JSON.parse(jsonstring);
        const tab = [jsonparse.forecast.tmin, jsonparse.forecast.tmax, jsonparse.forecast.probarain, jsonparse.forecast.sun_hours]
        return tab;
    }

    catch (error) {
        console.error("Il y a eu un problème : ", error);
        throw error;
    }
}

async function RequestInsee(cp) {
    try {
        const cpres = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${cp}`)
        const cpdata = await cpres.json()
        return cpdata
    }
    catch (error) {
        console.error("Erreur lors de la récupération du code Insee : ", error)
        throw error;
    }
}

