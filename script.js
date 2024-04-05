const valeur = document.getElementById("input");
var code_postal;

input.addEventListener("input", updateValue);

function updateValue(e) {
  code_postal = e.target.value;
}

async function RequestMeteo(insee) {
    try {
        const res = await fetch(`https://api.meteo-concept.com/api/forecast/daily/0?token=bed2667d06926b83c2780e247db4c70a28afc391d138efb8f2216f2de64bd7c0&insee=${insee}`);
        const datares = await res.json();
        return datares
    }

    catch (error) {
        console.error("Erreur lors de la requête API météo : ", error);
        throw error;
    }
}
