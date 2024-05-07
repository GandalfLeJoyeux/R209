const valeur = document.getElementById("input");
const expr_reg = /^\d{5}$/;
let code_postal;

input.addEventListener("input", updateValue);


function updateValue(e) {
    code_postal = e.target.value;
    if (expr_reg.test(code_postal)) {
        const test = RequestInsee(code_postal)
        console.log(test)
    }
}





async function RequestMeteo(insee) {
    try {
        const res = await fetch(`https://api.meteo-concept.com/api/forecast/daily/0?token=bed2667d06926b83c2780e247db4c70a28afc391d138efb8f2216f2de64bd7c0&insee=${insee}`);
        const datares = await res.json();
        return datares;
        console.log(datares);
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

