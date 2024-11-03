
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DossierModalProps, DossierType } from "../typeScript/VoyageType";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


// Définir le schéma de validation avec Zod
const formSchema = z.object({
    name: z.string().min(2, { message: "Le nom est obligatoire" }),
    city: z.string().min(2, { message: "La ville doit contenir au moins 2 caractères" }),
    country: z.string().min(2, { message: "Le pays doit contenir au moins 2 caractères" }),
    beginning_at: z.date(),
})


export default function DossierModal({ onSave, onClose, open }: DossierModalProps) {
    /**
     * ! STATE (état, données) de l'application
     */
    const form = useForm<DossierType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            city: "",
            country: "",
            beginning_at: new Date(),
        },
    })

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    const handleSubmit = async (): Promise<void> => {
        try {
            onSave({nom , ville, pays, dateDebut })

        } catch (error) {
            // Afficher l'erreur dans la console
            console.error(error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="w-full max-w-md">
                <DialogHeader>
                    <DialogTitle>Créer un Nouveau Dossier</DialogTitle>
                    <DialogDescription>Veuillez remplir les informations du dossier ci-dessous.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <div className="space-y-4">
                            <div>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                
                                            <FormControl>
                                                <Input {...field}
                                                    placeholder="Nom du dossier"
                                                    className="w-full p-2 border rounded"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div>
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
            
                                            <FormControl>
                                                <Input {...field}
                                                    placeholder="Ville"
                                                    className="w-full p-2 border rounded"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input {...field}
                                                    placeholder="Pays"
                                                    className="w-full p-2 border rounded"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
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
                                                    placeholder="Date de début"
                                                    className="w-full p-2 border rounded"
                                                    value={field.value ? (field.value as Date).toISOString().split("T")[0] : ""}
                                                    onChange={(e) => field.onChange(new Date(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>


                        <div className="flex justify-end space-x-2 mt-4">
                            <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                                Annuler
                            </button>
                            <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    );
}
