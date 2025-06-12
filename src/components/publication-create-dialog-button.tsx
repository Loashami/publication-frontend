import { Plus } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogHeader } from "./ui/dialog"
import {
  DialogContent,
  DialogDescription,
  DialogTitle
} from "@/components/ui/dialog"
import PublicationCreateForm from "./publication-create-form"
import { useState } from "react"

export default function PublicationCreateDialogButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus />
        Nueva Publicación
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nueva Publicación</DialogTitle>
            <DialogDescription>
              Completa la información para crear una nueva publicación.
            </DialogDescription>
          </DialogHeader>
          <PublicationCreateForm onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  )
}
