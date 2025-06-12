import { CATEGORIES, STATUSES } from "@/config/data"
import { createPublication } from "@/data/publications"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select"
import { Textarea } from "./ui/textarea"

export default function PublicationCreateForm({
  onClose
}: {
  onClose?: () => void
}) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
    categoria: "Tecnología",
    estado: "Borrador"
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const queryClient = useQueryClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.author || !formData.content) {
      alert("Por favor, completa todos los campos obligatorios.")
      return
    }

    try {
      setIsSubmitting(true)
      await createPublication(formData)
      queryClient.invalidateQueries({ queryKey: ["publications"] })
      onClose?.()
    } catch (error) {
      console.error("Error al crear la publicación:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            placeholder="Título de la publicación"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Autor *</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={e => setFormData({ ...formData, author: e.target.value })}
            placeholder="Nombre del autor"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Contenido *</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={e => setFormData({ ...formData, content: e.target.value })}
          placeholder="Contenido de la publicación..."
          rows={4}
          required
          minLength={50}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="categoria">Categoría *</Label>
          <Select
            value={formData.categoria}
            onValueChange={value =>
              setFormData({ ...formData, categoria: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(categoria => (
                <SelectItem key={categoria} value={categoria}>
                  {categoria}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="estado">Estado</Label>
          <Select
            value={formData.estado}
            onValueChange={value =>
              setFormData({
                ...formData,
                estado: value as typeof formData.estado
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map(estado => (
                <SelectItem key={estado} value={estado}>
                  {estado}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creando..." : "Crear Publicación"}
        </Button>
      </div>
    </form>
  )
}
