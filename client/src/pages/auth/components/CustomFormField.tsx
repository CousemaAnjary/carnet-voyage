import { Control } from "react-hook-form"
import {  
    FormControl, 
    FormField, 
    FormItem, 
    FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export type FormType = {
    name?: string;
    email: string;
    password: string;
};

const CustormFormField : React.FC<{ 
    formControl : Control<FormType>,
    name: "name" | "email" | "password",
    inputType: "text" | "password" | "email"
}> = ({ formControl, name, inputType } ) => {
    const placeholders = {
        name: "Nom, ex : Rabe",
        email: "Email, ex : rabe@gmail.com",
        password: "Mot de passe"
    }
    
    const setPlaceholder = () => {
        let placeholder = ""
        switch(name) {
            case 'name':
                placeholder = placeholders.name
                break
            case 'email':
                placeholder = placeholders.email
                break
            case 'password':
                placeholder = placeholders.password
                break
            default:
                break
        }

        return placeholder
    }

    return (
        <FormField control={formControl} name={name}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input {...field}
                            type={inputType}
                            placeholder={setPlaceholder()}
                            className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-md hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        
    )
}

export default CustormFormField