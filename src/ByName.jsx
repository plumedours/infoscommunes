import { useState } from "react";
import { fetchCommunesByName } from './searchCommunes';

// eslint-disable-next-line react/prop-types
function NameContent({ setCommuneData }) {
    const [notFoundMessage, setNotFoundMessage] = useState(null);
  
    const handleCommuneNameInput = (event) => {
      const inputValue = event.target.value;
  
      if (inputValue.length >= 3) {
        fetchCommunesByName(inputValue)
          .then((data) => {
            if (data.length === 0) {
              setNotFoundMessage("Aucune commune trouvée à ce nom.");
              setCommuneData(null);
            } else {
              setNotFoundMessage(null);
              setCommuneData(data);
            }
          })
          .catch((error) => {
            console.log(error);
            setNotFoundMessage("Une erreur s'est produite lors de la recherche des communes.");
            setCommuneData(null);
          });
      } else {
        setNotFoundMessage(null);
        setCommuneData(null);
      }
    };

    return (
        <div>
            <form className="">
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="commune"
                  type="text"
                  placeholder="Lyon"
                  onInput={handleCommuneNameInput}
                />
              </div>
            </form>
            {notFoundMessage && (
                <p className="text-red-500">{notFoundMessage}</p>
            )}
        </div>
    );
}

export default NameContent;