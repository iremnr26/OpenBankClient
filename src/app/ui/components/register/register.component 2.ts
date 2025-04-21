import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../Entities/User';
import { UserService } from '../../../services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { create_user } from '../../../contracts/users/create_user';
import { BaseComponent, spinnerType } from '../../../base/base.component';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent extends BaseComponent implements  OnInit{

   frm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastrService: CustomToastrService, spinner: NgxSpinnerService) {
    super(spinner)
  }
  

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      lastname: ["", [Validators.required, Validators.minLength(2)]],
      username: ["", [Validators.required, Validators.minLength(4)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmpass: ["", [Validators.required]],
     terms: [false, [Validators.requiredTrue]] // ✅ Checkbox kontrolü
    }, {
      validator: this.passwordMatchValidator
    });
  }

  async onSubmit(user: User) {

    if (this.frm.invalid) {
      this.frm.markAllAsTouched(); // Hataları göstermesi için
      return;
    }
    this.showSpinner(spinnerType.BallFussion); // ✅

    console.log("Form verisi:", this.frm.value);
    const result: create_user =  await this.userService.create(user);
    if (result.succeeded)
      this.toastrService.message(
        result.message,
        `User Created Successfully, Thanks ${this.frm.value.name}!`,
        {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight
        }
      );
      
    else
      this.toastrService.message(result.message, "Hata", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      })
        this.hideSpinner(spinnerType.BallFussion); // ✅
      
  }

  // Şifre eşleşme kontrolü
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPass = form.get('confirmpass')?.value;
    return password === confirmPass ? null : { mismatch: true };
  }

  // Kolay erişim için getter
  get f() {
    return this.frm.controls;
  }

  
}
