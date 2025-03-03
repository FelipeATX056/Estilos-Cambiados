import { useDispatch, useSelector } from "react-redux";
import geriatricoApi from "../api/geriatricoApi";
import { requestStart, requestSuccess, requestFail } from "../store/auth/forgotPasswordSlice";

export const usePassword = () => {
    // Obtiene el estado actual de loading, message y error desde el store de Redux
    const { loading, message, error } = useSelector(state => state.forgotPassword);
    const dispatch = useDispatch();

    // Función para manejar la lógica de "olvidé mi contraseña"
    const forgotPassword = async ({ per_correo }) => {
        dispatch(requestStart()); // Se marca que la solicitud ha comenzado (loading: true)

        try {
            // Realiza la solicitud para recuperar la contraseña
            const { data } = await geriatricoApi.post('recuperarPassword', { per_correo });
            dispatch(requestSuccess(data.message)); // Si la solicitud tiene éxito, se maneja el éxito
        } catch (error) {
            dispatch(requestFail("Hubo un error al enviar el correo de recuperación.")); // Si falla, maneja el error
            console.error("Error en la solicitud:", error); // Se muestra el error en consola
        }
    };

    // Función para manejar el restablecimiento de contraseña
    const resetPassword = async (token, per_password, confirmPassword) => {
        dispatch(requestStart());

        try {
            // Realiza la solicitud POST al backend con el token en la URL
            const { data } = await geriatricoApi.post(`restablecerPassword/${token}`, { per_password, confirmPassword });
            dispatch(requestSuccess(data.message)); // Si la solicitud tiene éxito, se maneja el éxito
            console.log(data.message); // Mensaje de respuesta del backend
            return data; // Devuelve la respuesta por si se necesita en otro lugar
        } catch (error) {
            dispatch(requestFail("Hubo un error al restablecer la contraseña.")); // Si falla, maneja el error
            console.error("Error en la solicitud:", error); // Se muestra el error en consola
        }
    };

    return {
        forgotPassword,  // Exponemos la función para que pueda ser utilizada fuera del hook
        resetPassword,   // Exponemos la función para restablecer la contraseña
        loading,         // Indica si está en proceso de carga
        message,         // Mensaje de éxito o de error
        error,           // Mensaje de error si la solicitud falla
    };
};
