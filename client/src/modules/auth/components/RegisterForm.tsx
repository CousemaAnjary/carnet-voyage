import { Link, useNavigate } from "react-router-dom";
import { RegisterType } from "../typeScript/AuthTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { register } from "../services/authService";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

// Définir le schéma de validation avec Zod
const formSchema = z.object({
   name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
    email: z.string().email({ message: "Adresse e-mail invalide" }),
    password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
});

export default function RegisterForm() {
    const navigate = useNavigate();

    const form = useForm<RegisterType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const handleRegister = async (data: RegisterType): Promise<void> => {
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
        <div className="font-sans">
            <div className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-0 bg-gray-100">
                <div className="relative sm:max-w-md w-full">
                    <div className="card bg-blue-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
                    <div className="card bg-red-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
                    <div className="relative w-full rounded-3xl px-6 py-8 sm:py-10 bg-gray-100 shadow-md">
                        <label className="block mt-3 text-lg text-gray-700 text-center font-semibold sm:text-xl">
                            Inscription
                        </label>
                        <Form {...form}>
                            <form className="mt-5" onSubmit={form.handleSubmit(handleRegister)}>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input {...field}
                                                        placeholder="Nom complet"
                                                        className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-md hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="mt-7">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input {...field}
                                                        placeholder="Adresse e-mail"
                                                        className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-md hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="mt-7">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input {...field}
                                                        placeholder="Mot de passe"
                                                        className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-md hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="mt-7">
                                    <Button className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                                        S'inscrire
                                    </Button>
                                </div>

                                <div className="flex mt-7 items-center text-center">
                                    <hr className="border-gray-300 border-1 w-full rounded-md" />
                                    <label className="block font-medium text-sm text-gray-600 w-full">
                                        Ou inscrivez-vous avec
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
                                        <label className="mr-2 text-sm">Déjà inscrit ?</label>
                                        <Link to="/login" className="text-blue-500 text-sm font-medium transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                                            Se connecter
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
