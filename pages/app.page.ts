import { Page, Locator, expect } from "@playwright/test";

export class PaginaAplicacionTodoism {
    readonly pagina: Page;
    readonly entradaNuevaTarea: Locator;
    readonly listaTareas: Locator;
    readonly botonLimpiar: Locator

    constructor(pagina: Page) {
        this.pagina = pagina;
        this.entradaNuevaTarea = this.pagina.locator('#item-input');
        this.listaTareas = this.pagina.locator('.items');
        this.botonLimpiar = this.pagina.locator('#clear-btn');
    }

    esperarAplicacionLista = async () => {
        await expect(this.entradaNuevaTarea).toBeVisible();
    }

    crearTarea = async (tarea: string) => {
        await this.entradaNuevaTarea.click();
        await this.entradaNuevaTarea.pressSequentially(tarea);
        await this.entradaNuevaTarea.press('Enter');
    }

    completarTarea = async (tarea: string) => {
        const marcadorTarea = this.pagina.locator(`//span[@class = "item-body" and contains(.,"${tarea}")]/a/i`);
        await marcadorTarea.click()
    }

    limpiarTareasCompletadas = async () => {
        await this.botonLimpiar.click();
    }

    verificarCreacionTarea = async (tarea: string) => {
        await expect(this.listaTareas.getByText(tarea)).toHaveClass('active-item');
    }

    verificarCompletitudTarea = async (tarea: string) => {
        await expect(this.listaTareas.getByText(tarea)).toHaveClass('inactive-item');
    }

    verificarTareaEliminada = async (tarea: string) => {
        await expect(this.listaTareas).not.toHaveText(tarea);
    }
}
