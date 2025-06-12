import { api } from "@/lib/axios";

export type Publication = {
    id: number;
    title: string;
    author: string;
    content: string;
    categoria: string;
    estado: string;
};

export const getPublications = async () => {
    const response = await api.get<Publication[]>("/publications");
    return response.data;
};
