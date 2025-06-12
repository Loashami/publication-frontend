import PublicationCreateDialogButton from "./components/publication-create-dialog-button";
import PublicationListTable from "./components/publication-list-table";

function App() {
    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Gestor de Publicaciones
                        </h1>
                        <p className="text-muted-foreground">
                            Administra todas tus publicaciones desde aquí
                        </p>
                    </div>
                    <PublicationCreateDialogButton />
                </div>
            </div>
            <PublicationListTable />
        </div>
    );
}

export default App;
