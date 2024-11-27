import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import { register } from "../services";
import { FormType } from "../components/CustomFormField";
import { Layout, LayoutLabel } from "../Layout";

export default function Register() {
    const navigate = useNavigate();

    const handleRegister = async (data: FormType) => {
        await register(data)
            .then(() => navigate('/login'))
    };

    return (
        <Layout>
            <LayoutLabel>Inscription</LayoutLabel>
            <RegisterForm onRegister={handleRegister}/>
        </Layout>
    )
}