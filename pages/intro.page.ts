import { Page, Locator } from "@playwright/test";

export class PaginaIntroduccionTodoism {
    readonly pagina: Page;
    readonly botonIniciarSesion: Locator;

    constructor(pagina: Page) {
        this.pagina = pagina;
        this.botonIniciarSesion = pagina.locator('nav').getByRole('link', { name: 'Login' });
    }

    abrirPaginaWeb = async (): Promise<void> => {
        await this.pagina.goto('http://127.0.0.1:5000/#intro', { waitUntil: 'networkidle' });
    }

    hacerClicEnIniciarSesion = async (): Promise<void> => {
        await Promise.all([
            this.pagina.waitForNavigation(),
            this.botonIniciarSesion.click()
        ]);
    }
}
