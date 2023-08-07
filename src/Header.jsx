function HeaderContent() {
  return (
    <div className="m-5">
        <div className="flex flex-col items-center p-3">
            <h1 className="text-2xl font-bold text-blue-600">Infos Communes</h1>
            <p className="text-xl">Informations sur les communes de France</p>
        </div>
        <div className="text-xs">
            <p>Cette petite application vous permettra d'obtenir quelques informations sur les communes de France. Recherchez par code postal ou par nom, et vous obtiendrez les noms, codes postauax, codes INSEE, codes et noms de la région, codes et noms du département, populations, surfaces.</p>
            <p>Toutes ces informations sont récupérées par l'API que fourni le gouvernement, disponible à cette adresse : <a className="text-blue-500" href="https://api.gouv.fr/documentation/api-geo" target="_blank" rel="noreferrer">https://api.gouv.fr</a></p>
        </div>
    </div>
  );
}

export default HeaderContent;