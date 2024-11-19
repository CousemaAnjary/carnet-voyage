import { z } from 'zod';

import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { VoyageType } from '../carnetVoyageType';
import { addFolderVoyage } from '../carnetVoyageService';

// Define validation schema with Zod
const formSchema = z.object({
    name: z.string().min(2, { message: "Le nom est obligatoire" }),
    city: z.string().min(2, { message: "La ville est obligatoire" }),
    country: z.string().min(2, { message: "Le pays est obligatoire" }),
    beginning_at: z.string(),
});

export default function VoyageFormDialog() {
    /**
  * ! STATE (état, données) de l'application
  */
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const form = useForm<VoyageType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            city: '',
            country: '',
            beginning_at: new Date().toISOString().split('T')[0],
        },
    });


    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    // Ajouter un dossier de voyage dans la base de données
    const handleSubmit = async (data: VoyageType) => {
        form.reset();
        
        try {
            const folderData = { ...data }
            await addFolderVoyage(folderData)
            setIsDialogOpen(false)
        } catch (error) {
            console.log("Erreur lors de la création du dossier.", error);
        }
    };

    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <button
                    className="fixed bottom-5 right-5 bg-blue-600 text-white 
                    rounded-full p-4 shadow-lg focus:outline-none hover:bg-blue-600 
                    transition"
                    onClick={() => setIsDialogOpen(true)}
                >
                    <FaPlus size={24} />
                </button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-sm">
                <DialogHeader>
                    <DialogTitle>Créer un Nouveau Dossier</DialogTitle>
                    <DialogDescription>Veuillez remplir les informations du dossier ci-dessous.</DialogDescription>
                </DialogHeader>
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
                        <DialogFooter className="flex justify-end mt-4 gap-2">
                            <DialogClose asChild>
                                <Button type="button" variant={'outline'}>Annuler</Button>
                            </DialogClose>
                            <Button type="submit" className="bg-blue-600">Enregistrer</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
