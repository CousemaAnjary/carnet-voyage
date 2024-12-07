import { useAuth } from "@/features/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import { FormType } from "../components/CustomFormField";
import { Layout, LayoutLabel } from "../Layout";
import { login } from "../../../features/api/services";

export default function Login() {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (formData: FormType) => {
        await login(formData)
            .then((data) => {
                setToken(data.token)
                navigate('/home')
            })
        
    };

    return (
        <Layout>
            <LayoutLabel>Connexion</LayoutLabel>
            <LoginForm onLogin={handleLogin}/>
        </Layout>
    )
}