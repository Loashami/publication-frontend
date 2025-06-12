import { getPublications } from "@/data/publications";
import { useQuery } from "@tanstack/react-query";

import { Badge } from "./ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import PublicationEditDialogButton from "./publication-edit-dialog-button";
import PublicationDeleteConfirmButton from "./publication-delete-confirm-button";

const getStatusBadge = (status: string) => {
    const variants = {
        Borrador: "secondary",
        Publicado: "default",
        Archivado: "outline",
    } as const;

    return (
        <Badge variant={variants[status as keyof typeof variants]}>
            {status}
        </Badge>
    );
};

export default function PublicationListTable() {
    const {
        data: publications,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["publications"],
        queryFn: getPublications,
    });

    if (isLoading) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                Cargando publicaciones...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-8 text-destructive">
                Error al cargar las publicaciones.
            </div>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Publicaciones ({publications!.length})</CardTitle>
                <CardDescription>
                    Lista de todas las publicaciones con opciones para editar y
                    eliminar
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Título</TableHead>
                            <TableHead>Autor</TableHead>
                            <TableHead>Categoría</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">
                                Acciones
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {publications!.map((publication) => (
                            <TableRow key={publication.id}>
                                <TableCell className="font-medium">
                                    <div>
                                        <div className="font-semibold">
                                            {publication.title}
                                        </div>
                                        <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                                            {publication.content}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{publication.author}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">
                                        {publication.categoria}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {getStatusBadge(publication.estado)}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <PublicationEditDialogButton
                                            publication={publication}
                                        />
                                        <PublicationDeleteConfirmButton
                                            publication={publication}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {publications!.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                        No se encontraron publicaciones que coincidan con los
                        filtros.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
