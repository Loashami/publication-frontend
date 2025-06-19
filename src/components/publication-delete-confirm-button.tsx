import { AlertDialog } from "@radix-ui/react-alert-dialog"
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "./ui/alert-dialog"
import { Button } from "./ui/button"
import { Trash2Icon } from "lucide-react"
import { deletePublication, type Publication } from "@/data/publications"
import { useState, useTransition } from "react"
import { useQueryClient } from "@tanstack/react-query"

type PublicationDeleteConfirmButtonProps = {
  publication: Publication
}

export default function PublicationDeleteConfirmButton({
  publication
}: PublicationDeleteConfirmButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        await deletePublication(publication.id)
        setIsOpen(false)
        queryClient.invalidateQueries({ queryKey: ["publications"] })
      } catch (error) {
        console.error("Error al eliminar la publicación: vuelva a intentarlo", error)
      }
    })
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Trash2Icon className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente la
            publicación "{publication.title}".
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleDelete}>
            {isPending ? "Eliminando..." : "Eliminado"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
