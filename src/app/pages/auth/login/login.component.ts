import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../../layout/component/app.floatingconfigurator';
import { AuthService } from '@/app/core/services/auth.service';

@Component({
    selector: 'app-login',
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, ReactiveFormsModule, RippleModule, AppFloatingConfigurator],
    templateUrl: './login.component.html'
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            checked: [false]
        });
    }

    onSubmit() {
        
        if (this.loginForm.valid) {

            const rawData = this.loginForm.value;
            const { checked, ...dataToSend } = rawData;

            console.log(dataToSend);
            this.authService.login(dataToSend).subscribe({
                next: (resp) => {
                    this.authService.setUserName(resp.user.nombre, resp.tenant.nombreComercial);
                    this.router.navigate(['/']);
                },
                error: (err) => {
                    console.log('Error al iniciar sesión:', err);
                }
            })
        } else {
            this.loginForm.markAllAsDirty();
        }
    }
}
