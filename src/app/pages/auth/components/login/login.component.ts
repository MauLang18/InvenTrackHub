import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatError,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltip } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { BaseApiResponse } from '../../../../shared/models/commons/base-api-response.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatLabel,
    MatError,
    MatTooltip,
    MatIcon,
    FormsModule,
    MatInputModule,
    MatButton,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cd = inject(ChangeDetectorRef);

  form!: FormGroup;
  inputType = 'password';
  visible = false;

  icVisibility = 'visibility';
  icVisibilityOff = 'visibility_off';
  icUsername = 'account_circle';

  initForm(): void {
    this.form = this.fb.group({
      userName: ['admin', [Validators.required]],
      password: ['admin123', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  login(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        controls.markAllAsTouched();
      });
    }

    this.authService
      .login(this.form.value)
      .subscribe((response: BaseApiResponse<string>) => {
        if (response.isSuccess) {
          this.router.navigate(['/']);
        }
      });
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
