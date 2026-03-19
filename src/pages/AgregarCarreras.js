import { Form, Input, Button, Card  } from "antd";
import { useNavigate } from "react-router-dom";
const AgregarCarreras = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate("/carreras");
    };
    
  const onFinish = async (values) => {
    try {
      console.log("Datos a enviar:", values);
      //const resultado = await setCarreras(values);
    } catch (error) {
          console.error("Error al guardar:", error);
    }
  };
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
            <h2>Agregar Carreras</h2>
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

export default AgregarCarreras;