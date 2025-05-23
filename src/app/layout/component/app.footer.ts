import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        &copy; {{ currentYear }} SPOKINSA S.A. - Powered By
        <a href="https://primeng.org" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">PrimeNG</a>
    </div>`
})
export class AppFooter {
    currentYear: number = new Date().getFullYear();
}
