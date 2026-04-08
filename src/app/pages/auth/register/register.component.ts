import { AuthService } from '@/app/core/services/auth.service';
import { AppFloatingConfigurator } from '@/app/layout/component/app.floatingconfigurator';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-register',
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, ReactiveFormsModule, RippleModule, AppFloatingConfigurator, CommonModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%*!])[A-Za-z\d@#$%*!]{12,}$/;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      ruc: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
      nombreComercial: ['', Validators.required],
      razonSocial: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nombreAdmin: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Validador personalizado para comparar contraseñas
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? { passwordMismatch: true } : null;
  }

  onSubmit() {

    if (this.registerForm.valid) {

      const rawData = this.registerForm.value;
      const { confirmPassword, ...dataToSend } = rawData;

      console.log('Datos listos para enviar:', dataToSend);

      this.authService.register(dataToSend).subscribe({
        next: (resp) => {
          console.log('Registro exitoso!', resp);
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          console.error('Error al registrar:', err);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
