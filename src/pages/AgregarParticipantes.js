import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form, Input, Button, Card, Select, DatePicker, message   } from "antd";
import { agregarUsuario } from '../api/participantesApi';
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const AgregarParticipantes = () => {
  
const { Option } = Select;
const navigate = useNavigate();
const handleCancel = () => {
  navigate("/carreras");
};
    
const [form] = Form.useForm();
  useEffect(() => {
}, []);


  const onFinish = async (values) => {
  try {
    const datosEnviar = {
      ...values,
      nacimiento: values.nacimiento
        ? values.nacimiento.format("YYYY-MM-DD")
        : null 
    };
    console.log("Datos a enviar:", datosEnviar);
    const resultado = await agregarUsuario(datosEnviar);
    if (resultado.inscrito) {
        message.success("¡Participante Agregado correctamente!");

        navigate("/carreras");
    }
    } catch (error) {
        console.error("Error al guardar:", error);
    }
};

  return (
    <div
        style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f5f5f5"
    }}
    >
      

      <Card title="" style={{ maxWidth: 850, width: "100%" }}>
        <h2>Agregar Participante</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        htmlType="submit"
        initialValues={{
            nacimiento: usuario.nacimiento ? dayjs(usuario.nacimiento) : null
        }}
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
          label="Apellidos"
          name="apellidos"
          rules={[
            { required: true, message: "Los apellidos son obligatorios" }
          ]}
        >
        <Input placeholder="Apellidos" />
        </Form.Item>

        <Form.Item>
        
        <Form.Item
            label="Talla"
            name="talla"
            rules={[
                { required: true, message: "La talla es obligatoria" }
            ]}
        >

        <Select placeholder="Selecciona una talla">
            <Option value="Ninguna">Ninguna</Option>
            <Option value="Extrachica">Extrachica</Option>
            <Option value="Mediana">Mediana</Option>
            <Option value="Grande">Grande</Option>
            <Option value="Extragrande">Extragrande</Option>
        </Select>
        </Form.Item>

        <Form.Item
            label="Categoria"
            name="categoria"
            rules={[
                { required: true, message: "La categoria es obligatoria" }
            ]}
        >
        <Select placeholder="Selecciona una Categoria">
            <Option value="Preinfantil">Pre-infantil (Menores de 6 Años)</Option>
            <Option value="InfantilA">Infantil A (6-7 Años)</Option>
            <Option value="InfantilB">Infantil B (8-9 Años)</Option>
            <Option value="InfantilC">Infantil C (10-11 Años)</Option>
            <Option value="InfantilD">Infantil D (12-13 Años)</Option>
            <Option value="Juvenil1">Juvenil Menor (14-15 años)</Option>
            <Option value="Juvenil2">Juvenil Mayor (16-19 años)</Option>
            <Option value="Libre">Libre (20-39 años)</Option>
            <Option value="Master">Extragrande</Option>
            <Option value="Veteranos">Extragrande</Option>
            <Option value="Veteranosplus">Extragrande</Option>
            <Option value="Medicos">Médicos</Option>
        </Select>
        </Form.Item>

        <Form.Item
            label="Fecha de nacimiento"
            name="nacimiento"
            rules={[{ required: true, message: "La fecha es obligatoria" }]}
            >
            <DatePicker
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
            />
        </Form.Item>

        <Form.Item
          label="Télefono"
          name="telefono"
          rules={[
            { required: true, message: "El Télefono es obligatorio" }
          ]}
        >
        <Input placeholder="Télefono" />
        </Form.Item>

        <Form.Item
          label="Número"
          name="numero"
          rules={[
            { required: true, message: "El Número es obligatorio" }
          ]}
        >
        <Input placeholder="Número" />
        </Form.Item>
          <Form.Item
          label="Correo"
          name="email"
          rules={[
            { required: true, message: "El correo es obligatorio" },
            { type: "email", message: "Ingresa un correo válido" }
         ]}
        >
        <Input placeholder="Correo" />
        </Form.Item>

        <Form.Item
            label="Pagado"
            name="pagado"
            rules={[
                { required: true, message: "Selecciona uno" }
            ]}
        >

        <Select placeholder="Selecciona una">
            <Option value="0">No</Option>
            <Option value="1">Si</Option>
        </Select>
        </Form.Item>

        <Form.Item
            label="Tipo de Pago"
            name="tipopago"
            rules={[
                { required: true, message: "Selecciona un Tipo de Pago" }
            ]}
        >

        <Select placeholder="Selecciona un Tipo de Pago">
            <Option value="Efectivo">Efectivo</Option>
            <Option value="Transferencia">Transferencia</Option>
        </Select>
        </Form.Item>

        <Form.Item
            label="Sexo"
            name="sexo"
            rules={[
                { required: true, message: "Selecciona un Sexo" }
            ]}
        >

        <Select placeholder="Selecciona un sexo">
            <Option value="Hombre">Hombre</Option>
            <Option value="Mujer">Mujer</Option>
        </Select>
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
        </Form.Item>
      </Form>
    </Card>
    </div>
  );
};

export default AgregarParticipantes;