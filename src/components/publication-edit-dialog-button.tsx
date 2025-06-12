import type { Publication } from "@/data/publications"
import { Button } from "./ui/button"
import { EditIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "./ui/dialog"
import PublicationEditForm from "./publication-edit-form"
import { useState } from "react"

type PublicationEditDialogButtonProps = {
  publication: Publication
}

export default function PublicationEditDialogButton({
  publication
}: PublicationEditDialogButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <EditIcon />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Publicación</DialogTitle>
            <DialogDescription>
              Completa la información para editar la publicación.
            </DialogDescription>
          </DialogHeader>
          <PublicationEditForm
            onClose={() => setOpen(false)}
            publication={publication}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
