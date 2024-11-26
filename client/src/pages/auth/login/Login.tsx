import { useAuth } from "@/modules/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import { FormType } from "../components/CustomFormField";
import { Layout, LayoutLabel } from "../Layout";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (data: FormType) => {
        await login(data)
            .then(() => navigate('/carnet-voyage'))
    };

    return (
        <Layout>
            <LayoutLabel>Connexion</LayoutLabel>
            <LoginForm onLogin={handleLogin}/>
        </Layout>
    )
}