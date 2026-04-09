import { Form, Input, Button, Card, message, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { obtenerCarrera, actualizarCarrera } from '../api/participantesApi';
import dayjs from "dayjs";
const EditarCarreras = ({ onSuccess }) => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    
    const handleCancel = () => {
        navigate("/carreras");
    };
    
    const onFinish = async (values) => {
    try {
      //setLoading(true);

      const response = await actualizarCarrera(id, {
        nombre: values.nombre,
        fechaInicio: values.fechaInicio,
        fechaFin: values.fechaFin,
        anio: values.anio
      });
      
      if (response.success) {
        message.success(response.message || 'Carrera actualizada correctamente');
        
        onSuccess?.();
        navigate("/carreras");
      } else {
        message.error(response.message || 'Error al actualizar');
      }
    } catch (error) {
      message.error('Error al guardar los cambios');
    } finally {
     //setLoading(false);
    }
  };

    useEffect(() => {
    if (!id) return; // evita ejecuciones si id no existe aún
  
    const fetchData = async () => {
        try {
        //setLoading(true);
        const response = await obtenerCarrera(id);
        console.log(response);
        
        if (response.success) {
            // Setear los valores en el formulario
            form.setFieldsValue({
            nombre: response.data.nombre,
            anio: response.data.anio,
            fechaInicio: response.data.fechaInicio ? dayjs(response.data.fechaInicio) : null,
            fechaFin: response.data.fechaFin ? dayjs(response.data.fechaFin) : null
            });
        } else {
            message.error(response.message || 'Error al cargar los datos');
        }
        } catch (err) {
            console.log(err);
            message.error('Error al cargar la carrera');
        } finally {
            //setLoading(false);
        }
    };
  
    fetchData();
  }, [id, form]);
  return (
        <div
        style={{
        display: "",
        justifyContent: "",
        alignItems: "",
        minHeight: "",
        background: "#f5f5f5"
        }}
        >
        <Card title="" style={{ width: "100%" }}>
        <h2>Editar Carrera</h2>
        <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        htmlType="submit"
        >        
        <Form.Item
        label="Nombre"
        name="nombre"
        rules={[
            { required: true, message: "El nombre es obligatorio" }
        ]}
        >
        <Input placeholder="Nombre" />
        </Form.Item>
        <Form.Item
            label="Fecha de Inicio"
            name="fechaInicio"
            rules={[{ required: true, message: "La fecha es obligatoria" }]}
            >
            <DatePicker
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
            />
        </Form.Item>
        <Form.Item
            label="Fecha de Fin"
            name="fechaFin"
            rules={[{ required: true, message: "La fecha es obligatoria" }]}
            >
            <DatePicker
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
            />
        </Form.Item>
        <Form.Item
          label="Año"
          name="anio"
          rules={[
            { required: true, message: "El Año es obligatorio" }
          ]}
        >
        <Input placeholder="Año" />
        </Form.Item>
        <Button
            type="primary"
            
            htmlType="submit"
            style={{ marginRight: 10 }}
            >
            Guardar
        </Button>
        <Button 
                onClick={handleCancel} 
                style={{
                    backgroundColor: "#ff4d4f",
                    borderColor: "#ff4d4f",
                    color: "#fff"
                }}
        >
            Cancelar
        </Button>
        </Form>
        </Card>
        </div>
      );
};

export default EditarCarreras;