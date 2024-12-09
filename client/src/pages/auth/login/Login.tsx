/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useAuth } from "@/features/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import { FormType } from "../components/CustomFormField";
import { Layout, LayoutLabel } from "../Layout";
import { login } from "../../../features/api/services";
import { useState } from "react";
import NetworkErrorDialog from "@/components/errors/NetworkErrorDialog";

export default function Login() {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const [openNetworkErrorDialog, setOpenNetworkErrorDialog] = useState(false);

    const handleLogin = async (formData: FormType) => {
        try {
            const response_data = await login(formData);
            setToken(response_data.token);
            navigate('/');
        } catch (error: any) {
            if (error.message === "Network Error") {
                setOpenNetworkErrorDialog(true);
            } else {
                console.log(error);
            }
        }
        
    };

    return (
        <Layout>
            <LayoutLabel>Connexion</LayoutLabel>
            <LoginForm onLogin={handleLogin}/>
            {openNetworkErrorDialog && <NetworkErrorDialog setIsOpen={setOpenNetworkErrorDialog} />}
        </Layout>
    )
}