/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import { register } from "../../../features/api/services";
import { FormType } from "../components/CustomFormField";
import { Layout, LayoutLabel } from "../Layout";
import { useState } from "react";
import NetworkErrorDialog from "@/components/errors/NetworkErrorDialog";

export default function Register() {
    const navigate = useNavigate();
    const [openNetworkErrorDialog, setOpenNetworkErrorDialog] = useState(false);

    const handleRegister = async (data: FormType) => {
        try {
            await register(data);
            navigate('/login');
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
            <LayoutLabel>Inscription</LayoutLabel>
            <RegisterForm onRegister={handleRegister}/>
            {openNetworkErrorDialog && <NetworkErrorDialog setIsOpen={setOpenNetworkErrorDialog} />}
        </Layout>
    )
}