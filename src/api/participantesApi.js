import axiosInstance from './axiosInstance';

export const getParticipantesFin2025 = async () => {
  try {
    const response = await axiosInstance.get('/fin2025WS');
    return response.data; // { success, data: [...], total, ... }
  } catch (error) {
    // Puedes lanzar error personalizado o loguear
    console.error('Error al obtener participantes:', error);
    throw error; // o return { success: false, message: error.message }
  }
};

export const crearUsuario = async (datos) => {
  try {
    const response = await axiosInstance.post('/usuarios', datos);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const obtenerUsuario = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/usuarios/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const actualizarUsuario = async (datos) => {
  try {
    const payload = {
      ...datos,
      pagado: datos.pagado === "1" || datos.pagado === true || datos.pagado === 1,
    };

    const response = await axiosInstance.post(
      '/api/editar',
      payload
    );

    return response.data;
  } catch (error) {
    console.error("Error al actualizar:", error);
    throw error;
  }
};

export const eliminarParticipante = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/eliminar/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const enviarEmail = async (datos) => {
  try {
    const response = await axiosInstance.post('/api/email', datos);
    return response.data;
  } catch (error) {
    throw error;
  }
};