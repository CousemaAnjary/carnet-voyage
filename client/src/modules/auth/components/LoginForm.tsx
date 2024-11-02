import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { LoginType } from "../typeScript/AuthTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc"


// Définir le schéma de validation avec Zod
const formSchema = z.object({
    email: z.string().email({ message: "Adresse e-mail invalide" }),
    password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
})


export default function LoginForm() {
    /**
     * ! STATE (état, données) de l'application
     */
    const form = useForm<LoginType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <>
            <div className="font-sans">
                <div className="relative min-h-screen flex flex-col sm:justify-center items-center">
                    <div className="relative sm:max-w-sm w-full">
                        <div className="card bg-blue-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
                        <div className="card bg-red-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
                        <div className="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
                            <label className="block mt-3 text-sm text-gray-700 text-center font-semibold">
                                Connexion
                            </label>
                            <Form {...form}>
                                <form method="#" action="#" className="mt-10">
                                    <div>
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

                                    {/* <div className="mt-7 flex">
                                        <label htmlFor="remember_me" className="inline-flex items-center w-full cursor-pointer">
                                            <input
                                                id="remember_me"
                                                type="checkbox"
                                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                name="remember"
                                            />
                                            <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
                                        </label>

                                        <div className="w-full text-right">
                                            <a className="underline text-sm text-gray-600 hover:text-gray-900" href="#">
                                                Mot de passe oublié ?
                                            </a>
                                        </div>
                                    </div> */}

                                    <div className="mt-7">
                                        {/* <button className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                                            Connexion
                                        </button> */}
                                        <Button className="bg-blue-500 w-full hover:bg-blue-500 focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
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
                                        <Button type="button" variant="outline" className="w-full   shadow-sm hover:shadow-inner transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                                            <FcGoogle size={18} className="mr-1" /> Google
                                        </Button>
                                    </div>

                                    <div className="mt-7">
                                        <div className="flex justify-center items-center">
                                            <label className="mr-2 text-sm ">Nouveau ici ?</label>
                                            <Link to="/register" className="text-blue-500 text-sm font-medium transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                                                Créez un compte
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </Form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
