import { useState } from "react";
import isEmailValid from "../Components/util/isEmailValid";
import { ErrorAuth } from "../Interfaces";

export default function useErrors(){
    const [errors, setErrors] = useState<ErrorAuth[]>([])

    function setError({field, message} : ErrorAuth){
    
        const errorAlreadyExists = errors.find(
            (error: any) => error.field === field
        );

        if (errorAlreadyExists) {
            return;
        }

        setErrors((prev) => [
            ...prev,
            { field, message},
        ]);

    }

    function removeError(field : string){
        setErrors((prevState) =>
        prevState.filter((error) => error.field != field)
      );
    }

    return {setError, removeError, errors}
}