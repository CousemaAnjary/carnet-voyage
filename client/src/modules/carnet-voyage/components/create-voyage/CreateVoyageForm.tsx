import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { VoyageType } from '../../types'
import { addFolderVoyage } from '../../carnetVoyageService'

// Define validation schema with Zod
const formSchema = z.object({
    name: z.string().min(2, { message: "Le nom est obligatoire" }),
    city: z.string().min(2, { message: "La ville est obligatoire" }),
    country: z.string().min(2, { message: "Le pays est obligatoire" }),
    beginning_at: z.string().refine((value) => !isNaN(Date.parse(value)), {
        message: "La date est invalide",
    }),
})

interface CreateVoyageFormProps {
    setNetworkError: (created: boolean) => void;
    setDataSent: (sent: boolean) => void;
}

const CreateVoyageForm: React.FC<CreateVoyageFormProps> = ({ setNetworkError, setDataSent }) => {

    const form = useForm<VoyageType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            city: '',
            country: '',
            beginning_at: new Date().toISOString().split('T')[0],
        },
    })

    const handleCancel = () => {
        setDataSent(true)
    }

    const handleSubmit = async (data: VoyageType) => {
        form.reset()
        
        const folderData = { ...data }
        await addFolderVoyage(folderData)
            .catch(error => {
                if(error.message === "Network Error") {
                    setNetworkError(true)
                } else {
                    console.log("Erreur lors de la récupération des dossiers de voyage.", error)
                }
            })
            
        setDataSent(true)
    }

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder="Nom du dossier" className="w-full p-2 border rounded" />
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
                                    <Input {...field} placeholder="Ville" className="w-full p-2 border rounded" />
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
                                    <Input {...field} placeholder="Pays" className="w-full p-2 border rounded" />
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
                                    <Input
                                        {...field}
                                        type="date"
                                        className="w-full p-2 border rounded"

                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-end mt-4 gap-2">
                    <Button onClick={handleCancel}
                        type="button" 
                        variant={'outline'}>Annuler</Button>
                    <Button type="submit" className="bg-blue-600">Enregistrer</Button>
                </div>
            </form>
        </Form>
    )
}

export default CreateVoyageForm