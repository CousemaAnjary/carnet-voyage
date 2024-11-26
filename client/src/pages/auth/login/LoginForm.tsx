import { Form } from "@/components/ui/form"
import { Link } from "react-router-dom"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import CustormFormField, { FormType } from "../../components/CustomFormField"

const formSchema = z.object({
    email: z.string().email({ message: "Adresse e-mail invalide" }),
    password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
})

const LoginForm : React.FC<{ 
    onLogin: (data: FormType) => void
}> = ({ onLogin }) => {
    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    return (
        <Form {...form}>
            <form className="mt-5" onSubmit={form.handleSubmit(onLogin)}>
                <div>
                    <CustormFormField formControl={form.control} name="email" inputType="email" />
                </div>

                <div className="mt-6 sm:mt-8">
                    <CustormFormField formControl={form.control} name="password" inputType="password" />
                </div>

                <div className="mt-7">
                    <Button className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                        Connexion
                    </Button>
                </div>

                <div className="flex mt-7 items-center text-center">
                    <hr className="border-gray-300 border-1 w-full rounded-md" />
                    <label className="block font-medium text-sm text-gray-600 w-full">
                        Connectez-vous avec
                    </label>
                    <hr className="border-gray-300 border-1 w-full rounded-md" />
                </div>

                <div className="flex mt-7 justify-center w-full">
                    <Button type="button" variant="outline" className="w-full flex items-center justify-center border-gray-300 shadow-sm hover:shadow-inner transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                        <FcGoogle size={18} className="mr-1" /> Google
                    </Button>
                </div>

                <div className="mt-7">
                    <div className="flex justify-center items-center">
                        <label className="mr-2 text-sm">Nouveau ici ?</label>
                        <Link to="/register" className="text-blue-500 text-sm font-medium transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                            Créez un compte
                        </Link>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default LoginForm
