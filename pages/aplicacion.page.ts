import { Page, Locator, expect } from "@playwright/test";

export class PaginaAplicacionTodoism {
    readonly pagina: Page;
    readonly campoNuevaTarea: Locator;
    readonly listaTareas: Locator;
    readonly botonLimpiar: Locator

    constructor(pagina: Page) {
        this.pagina = pagina;
        this.campoNuevaTarea = pagina.locator('#item-input');
        this.listaTareas = pagina.locator('.items');
        this.botonLimpiar = pagina.locator('#clear-btn');
    }

    esperarAplicacionLista = async () => {
        await this.campoNuevaTarea.waitFor({ state: 'visible' });
    }

    crearTarea = async (tarea: string) => {
        await this.campoNuevaTarea.fill(tarea);
        await this.pagina.keyboard.press('Enter');
    }

    completarTarea = async (tarea: string) => {
        await this.pagina.locator('.item-body', { hasText: tarea })
                         .locator('a > i')
                         .click();
    }

    limpiarTareasCompletadas = async () => {
        await this.botonLimpiar.click();
    }

    verificarCreacionTarea = async (tarea: string) => {
        const elementoTarea = this.listaTareas.locator(`:text("${tarea}")`);
        await expect(elementoTarea).toHaveAttribute('class', /\bactive-item\b/);
    }

    verificarCompletitudTarea = async (tarea: string) => {
        const elementoTarea = this.listaTareas.locator(`:text("${tarea}")`);
        await expect(elementoTarea).toHaveAttribute('class', /\binactive-item\b/);
    }

    verificarTareaEliminada = async (tarea: string) => {
        await expect(this.listaTareas.getByText(tarea)).toHaveCount(0);
    }
}
