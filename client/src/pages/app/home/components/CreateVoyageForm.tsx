/* eslint-disable  @typescript-eslint/no-explicit-any */
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { VoyageType } from "../../../../features/api/types"
import { postVoyage } from "../../../../features/api/services"
import { useAppDispatch } from "@/features/stores/hook"
import { stateAddVoyage } from "@/features/stores/voyageSlice"

// Validation schema
const formSchema = z.object({
    name: z.string().min(2, { message: "Le nom est obligatoire" }),
    city: z.string().min(2, { message: "La ville est obligatoire" }),
    country: z.string().min(2, { message: "Le pays est obligatoire" }),
    beginning_at: z.string().refine((value) => !isNaN(Date.parse(value)), {
        message: "La date est invalide",
    }),
})

interface CreateVoyageFormProps {
    onCancel: () => void;
    onSuccess: () => void;
    onError: (error: string) => void;
}

const CreateVoyageForm: React.FC<CreateVoyageFormProps> = ({ onCancel, onSuccess, onError }) => {
    const dispatch = useAppDispatch()

    const form = useForm<VoyageType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            city: "",
            country: "",
            beginning_at: new Date().toISOString().split("T")[0],
        },
    })

    const handleSubmit = async (data: VoyageType) => {
        form.reset()
        try {
            const response = await postVoyage(data)
            console.log(data)
            const newVoyage: VoyageType = response.travel
            dispatch(stateAddVoyage(newVoyage))
            onSuccess()
        } catch (error: any) {
            if (error.message === "Network Error") {
                onError("Network Error")
            } else {
                onError(error.message || "Une erreur inconnue est survenue")
            }
            console.log(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} 
                                        placeholder="Nom du dossier" 
                                        className="w-full p-2 border rounded"
                                        aria-label="Nom du dossier" 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field}
                                        placeholder="Ville" 
                                        className="w-full p-2 border rounded"
                                        aria-label="Ville" 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} 
                                        placeholder="Pays" 
                                        className="w-full p-2 border rounded"
                                        aria-label="Pays" 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="beginning_at"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date de début</FormLabel>
                                <FormControl>
                                    <Input {...field} 
                                        type="date" 
                                        className="w-full p-2 border rounded"
                                        aria-label="Date de début"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-end mt-4 gap-2">
                    <Button
                        onClick={onCancel}
                        type="button"
                        variant={"outline"}
                    >
                        Annuler
                    </Button>
                    <Button type="submit" className="bg-blue-600">
                        Enregistrer
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default CreateVoyageForm
