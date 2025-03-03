import React, { useState, useEffect } from "react";
import { useRoles } from "../../../hooks";
import { Rol, SelectRolProps } from "./types";
import { useSession } from "../../../hooks/useSession"; // Para actualizar sesión

export const SelectRol = (props: SelectRolProps) => {
    const [roles, setRoles] = useState<Rol[]>([]);
    const { obtenerRolesAsignados } = useRoles();
    const { obtenerSesion } = useSession(); // Importamos obtenerSesion para forzar actualización
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                setLoading(true);
                const response = await obtenerRolesAsignados();
                if (response.success) {
                    setRoles(response.roles || []);
                    console.log(response.roles);
                } else {
                    setError(response.message);
                }
            } catch (err) {
                setError("Error al cargar los roles");
            } finally {
                setLoading(false);
            }
        };

        fetchRoles();
    }, []);

    const handleChange = (event) => {
        const selectedRolId = event.target.value;
        const selectedGeId = event.target.options[event.target.selectedIndex].dataset.ge_id;

        localStorage.setItem("rol_id", selectedRolId);
        localStorage.setItem("ge_id", selectedGeId || "null");

        obtenerSesion(); // 🔹 Forzar actualización de la sesión

        props.onChange(event);
    };

    return (
        <div className="dropdown-button">
            <select 
                className="select"
                name={props.name} 
                value={props.value} 
                onChange={handleChange} 
            >
                <option hidden>Seleccione un rol</option>
                {roles.map((rol, index) => (
                    <option 
                        key={`${index}-${rol.rol_id}`} 
                        value={rol.rol_id}
                        data-ge_id={rol.ge_id || undefined} 
                        data-se_id={rol.se_id || undefined}
                    >
                        {rol.se_nombre || rol.ge_nombre}
                    </option>
                ))}
            </select>
        </div>
    );
};
