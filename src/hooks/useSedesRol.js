import geriatricoApi from '../api/geriatricoApi';
import { getToken } from '../helpers/getToken';

export const useSedesRol = () => {
    const asignarRolAdminSede = async ({ per_id, se_id, rol_id, sp_fecha_inicio, sp_fecha_fin }) => {
        console.log("Datos enviados para asignar rol a la sede:", { per_id, se_id, rol_id, sp_fecha_inicio, sp_fecha_fin });

        const token = getToken();
        if (!token) {
            return {
                success: false,
                message: "Token de autenticación no encontrado",
            };
        }

        try {
            const { data } = await geriatricoApi.post('/sedepersonarol/asignarRolesAdminSede', {
                per_id,
                se_id,
                rol_id,
                sp_fecha_inicio,
                sp_fecha_fin
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });

            console.log("✅ Respuesta del servidor:", data);
            return {
                success: true,
                message: data.message || "Rol administrador sede asociado exitosamente",
                sedePersonaRol: data.sedePersonaRol
            };
        } catch (error) {
            console.error("❌ Error al asignar rol a la sede:", error);
            const errorMessage = error.response?.data?.message || "Error al asignar el rol a la sede";
            return {
                success: false,
                message: errorMessage,
                sedePersonaRol: null
            };
        }
    };

    const obtenerPersonaRolesMiGeriatricoSede = async ({ per_id }) => {
        const token = getToken();
        if (!token) {
            return {
                success: false,
                message: "Token de autenticación no encontrado",
            };
        }

        try {
            const { data } = await geriatricoApi.get(`/personas/roles/${per_id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("✅ Respuesta del servidor:", data);

            return {
                success: true,
                message: data.message || "Roles obtenidos exitosamente",
                persona: data.persona || null
            };

        } catch (error) {
            console.error("❌ Error al obtener los roles:", error);

            let errorMessage = "Error al obtener los roles";
            if (error.response) {
                errorMessage = error.response.data?.message || errorMessage;
            } else if (error.request) {
                errorMessage = "No se recibió respuesta del servidor";
            } else {
                errorMessage = error.message;
            }

            return {
                success: false,
                message: errorMessage,
                persona: null
            };
        }
    };

    const inactivarRolAdminSede = async ({ per_id, se_id, rol_id }) => {
        const token = getToken();
        if (!token) {
            return {
                success: false,
                message: "Token de autenticación no encontrado",
            };
        }
    
        try {
            const { data } = await geriatricoApi.put(
                "/sedepersonarol/inactivarRolAdminSede",
                { per_id, se_id, rol_id }, 
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
    
            console.log("✅ Respuesta del servidor:", data);
    
            return {
                success: true,
                message: data.message || "Rol administrador sede inactivado exitosamente",
                sedePersonaRol: data.data || null, // Asegurar compatibilidad con la respuesta del backend
            };
    
        } catch (error) {
            console.error("❌ Error al inactivar el rol de la sede:", error);
    
            let errorMessage = "Error al inactivar el rol de la sede";
            if (error.response) {
                errorMessage = error.response.data?.message || errorMessage;
            } else if (error.request) {
                errorMessage = "No se recibió respuesta del servidor";
            } else {
                errorMessage = error.message;
            }
    
            return {
                success: false,
                message: errorMessage,
                sedePersonaRol: null,
            };
        }
    };
    
    const asignarRolesSede = async ({ per_id, rol_id, sp_fecha_inicio, sp_fecha_fin }) => {
        console.log("📤 Enviando datos para asignar roles a la sede:", { per_id, rol_id, sp_fecha_inicio, sp_fecha_fin });
    
        const token = getToken();
        if (!token) {
            return {
                success: false,
                message: "🔒 Token de autenticación no encontrado.",
            };
        }
    
        if (!per_id || !rol_id || !sp_fecha_inicio) {
            return {
                success: false,
                message: "❗ Faltan datos obligatorios para asignar el rol.",
            };
        }
    
        try {
            const { data } = await geriatricoApi.post(
                "/sedepersonarol/asignarRolesSede",
                { per_id, rol_id, sp_fecha_inicio, sp_fecha_fin: sp_fecha_fin || null },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
    
            console.log("✅ Respuesta del servidor:", data);
            console.log("---------------------------------");

            return {
                success: true,
                message: data.message || "Rol asignado correctamente.",
                nuevaVinculacion: data.nuevaVinculacion,
                rolNombre: data.rolNombre,
                mensajeAdicional: data.mensajeAdicional || "",
                sede: data.sede || null,
            };
        } catch (error) {
            console.error("❌ Error al asignar roles a la sede:", error);
    
            let errorMessage = "Error al asignar el rol a la sede.";
            if (error.response) {
                errorMessage = error.response.data?.message || errorMessage;
            }
    
            return {
                success: false,
                message: errorMessage,
                sedePersonaRol: null,
            };
        }
    };
    

    return { asignarRolAdminSede, obtenerPersonaRolesMiGeriatricoSede, inactivarRolAdminSede, asignarRolesSede };
};