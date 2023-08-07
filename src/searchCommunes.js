export function fetchCommunesByPostalCode(postalCode) {
    const url = `https://geo.api.gouv.fr/communes?codePostal=${postalCode}&fields=nom,code,codesPostaux,surface,codeDepartement,departement,codeRegion,region,population&format=json&geometry=centre`;

    return fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.log(error);
            return [];
        });
}

export function fetchCommunesByName(name) {
    const url = `https://geo.api.gouv.fr/communes?nom=${name}&fields=nom,code,codesPostaux,surface,codeDepartement,departement,codeRegion,region,population&format=json&geometry=centre`;

    return fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.log(error);
            return [];
        });
}