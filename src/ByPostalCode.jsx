import { useState } from "react";
import { fetchCommunesByPostalCode } from './searchCommunes';

// eslint-disable-next-line react/prop-types
function PostalCodeContent({ setCommuneData }) {
    const [notFoundMessage, setNotFoundMessage] = useState(null);

    const handlePostalCodeInput = (event) => {
        const inputValue = event.target.value;

        if (inputValue.length === 5) {
            fetchCommunesByPostalCode(inputValue)
                .then((data) => {
                    if (data.length === 0) {
                        setNotFoundMessage("Aucune commune trouvée pour ce code postal.");
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
                        id="cp"
                        type="text"
                        placeholder="69250"
                        onInput={handlePostalCodeInput}
                    />
                </div>
            </form>
            {notFoundMessage && (
                <p className="text-red-500">{notFoundMessage}</p>
            )}
        </div>
    );
}

export default PostalCodeContent;