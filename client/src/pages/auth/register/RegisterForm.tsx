import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import CustormFormField, { FormType } from "../../components/CustomFormField"


const formSchema = z.object({
    name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
    email: z.string().email({ message: "Adresse e-mail invalide" }),
    password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
})

const RegisterForm : React.FC<{ 
    onRegister: (data: FormType) => void
}> = ({ onRegister }) => {
    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    return (
        <Form {...form}>
            <form className="mt-5" onSubmit={form.handleSubmit(onRegister)}>
                <div id="field-name">
                    <CustormFormField name="name" inputType="text" formControl={form.control}/>
                </div>
                <div id="field-email" className="mt-7">
                    <CustormFormField name="email" inputType="email" formControl={form.control}/>
                </div>
                <div id="field-password" className="mt-7">
                    <CustormFormField name="password" inputType="password" formControl={form.control}/>
                </div>
                <div id="register-btn" className="mt-7">
                    <Button className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                        S'inscrire
                    </Button>
                </div>

                <div id="register-with" className="flex mt-7 items-center text-center">
                    <hr className="border-gray-300 border-1 w-full rounded-md" />
                    <label className="block font-medium text-sm text-gray-600 w-full">
                        Ou inscrivez-vous avec
                    </label>
                    <hr className="border-gray-300 border-1 w-full rounded-md" />
                </div>

                <div id="register-to-google" className="flex mt-7 justify-center w-full">
                    <Button type="button" variant="outline" className="w-full flex items-center justify-center border-gray-300 shadow-sm hover:shadow-inner transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                        <FcGoogle size={18} className="mr-1" /> Google
                    </Button>
                </div>

                <div id="link-to-login" className="mt-7">
                    <div className="flex justify-center items-center">
                        <label className="mr-2 text-sm">Déjà inscrit ?</label>
                        <Link to="/login" className="text-blue-500 text-sm font-medium transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                            Se connecter
                        </Link>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default RegisterForm
