import { useNavigate } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import { register } from "../services";
import { FormType } from "../components/CustomFormField";
import { Layout, LayoutLabel } from "../Layout";

export default function Register() {
    const navigate = useNavigate();

    const handleRegister = async (data: FormType) => {
        try {
            const response = await register(data);
            if (response) {
                navigate('/login');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            <LayoutLabel>Inscription</LayoutLabel>
            <RegisterForm onRegister={handleRegister}/>
        </Layout>
    )
}