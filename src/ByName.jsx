import React, { useState } from 'react';
import { fetchCommunesByName } from './searchCommunes';
import { ClipLoader } from 'react-spinners';

function ByName({ setCommuneData }) {
  const [notFoundMessage, setNotFoundMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCommuneNameInput = async (event) => {
    const inputValue = event.target.value;

    if (inputValue.length >= 3) {
      setIsLoading(true);
      try {
        const data = await fetchCommunesByName(inputValue);
        if (data.length === 0) {
          setNotFoundMessage("Aucune commune trouvée à ce nom.");
          setCommuneData(null);
        } else {
          setNotFoundMessage(null);
          setCommuneData(data);
        }
      } catch (error) {
        console.log(error);
        setNotFoundMessage("Une erreur s'est produite lors de la recherche des communes.");
        setCommuneData(null);
      } finally {
        setIsLoading(false);
      }
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
      {isLoading ? (
        <ClipLoader size={20} color={'#6366F1'} loading={isLoading} />
      ) : (
        notFoundMessage && (
          <p className="text-red-500">{notFoundMessage}</p>
        )
      )}
    </div>
  );
}

export default ByName;
