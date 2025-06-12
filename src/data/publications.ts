import { api } from "@/lib/axios";

export type Publication = {
    id: number;
    title: string;
    author: string;
    content: string;
    categoria: string;
    estado: string;
};

export type CreatePublication = Omit<Publication, "id">;
export type UpdatePublication = Partial<Omit<Publication, "id">>;

export const getPublications = async () => {
    const response = await api.get<Publication[]>("/publications");
    return response.data;
};

export const createPublication = async (publication: CreatePublication) => {
    const response = await api.post<Publication>("/publications", publication);
    return response.data;
};

export const updatePublication = async (
    id: number,
    publication: UpdatePublication
) => {
    const response = await api.put<Publication>(
        `/publications/${id}`,
        publication
    );
    return response.data;
};
