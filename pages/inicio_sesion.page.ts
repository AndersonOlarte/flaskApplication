import { Page, Locator, expect } from "@playwright/test";

export class PaginaInicioSesionTodoism {
    readonly pagina: Page;
    readonly botonObtenerCuentaPrueba: Locator;
    readonly campoNombreUsuario: Locator;
    readonly notificacionExito: Locator;
    readonly botonIniciarSesion: Locator;

    constructor(pagina: Page) {
        this.pagina = pagina;
        this.botonObtenerCuentaPrueba = pagina.getByRole('button', { name: 'Get a test account' });
        this.campoNombreUsuario = pagina.locator('input[placeholder="Username"]');
        this.notificacionExito = pagina.locator('#toast-container >> text=Generate success.');
        this.botonIniciarSesion = pagina.locator('#login-btn');
    }

    hacerClicEnObtenerCuentaPrueba = async (): Promise<void> => {
        await this.botonObtenerCuentaPrueba.click();
    }
    
    esperarGeneracionUsuario = async (): Promise<string> => {
        await this.notificacionExito.waitFor({ state: 'visible' });
        return this.campoNombreUsuario.inputValue();
    }
    
    hacerClicEnIniciarSesion = async (): Promise<void> => {
        await Promise.all([
            this.pagina.waitForNavigation(),
            this.botonIniciarSesion.click()
        ]);
    }
}
