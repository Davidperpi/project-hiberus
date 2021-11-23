import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // Variables
  public userData: User[];
  public user: User = new User;
  public delete: Boolean;
  public userForm: FormGroup;
  public idUser: string;
  public me: User;
  public titleNavbar: string;
  public action: boolean;

  constructor(private userService: UsersService, private fb: FormBuilder) { 
    this.userData = [];
  }

  ngOnInit(): void {
    this.getMe();
    this.getUsers();
    this.cleanUserForm();
  }

  // Obtiene el usuario registrado
  getMe() {
    this.userService.getMe()
      .subscribe(
        data => {
          this.me = data;
          this.titleNavbar = `${this.me.name} ${this.me.surname}`
        },
        err => {
          console.error(err);
        });
  }

  // Obtiene todos los usuarios
  getUsers() {
    this.userService.getAll()
      .subscribe(
        data => {
          this.userData = data.items;
        },
        err => {
          console.error(err);
        });
  }

  // Borra el usuario
  deleteUser(id: string) {
    this.userService.delete(id)
      .subscribe(
        data => {
          this.getUsers();
          this.delete = true;
        },
        err => {
          console.error(err);
          this.delete = false;
        });
  }

  // Limpia e inicializa el form
  cleanUserForm() {
    this.userForm = this.fb.group({
      'name': [null, Validators.required],
      'surname': ['', Validators.required],
      'password': [null, Validators.required],
      'email': [null, Validators.required]
    });
  }

  // Rellena el formulario con los datos del usuario
  private fieldValues() {
    this.userForm.controls['name'].setValue(this.user.name);
    this.userForm.controls['surname'].setValue(this.user.surname);
    this.userForm.controls['password'].setValue(this.user.password);
    this.userForm.controls['email'].setValue(this.user.email);
  }

  // Abre el modal de usuarios
  openModal(id?: string) {
    this.cleanUserForm();
    if (id) {
      this.action = true;
      this.idUser = id;    
      this.userService.getById(id)
        .subscribe(
          data => {
            this.user = data;
            this.fieldValues();
          },
          err => {
            console.error(err);
          });
    } else {
      this.action = false;
    }
  }

  // Redirecciona según la función del userModal
  actionUser() {
    if (this.action) {
      this.editUser();
    } else {
      this.newUser();
    }
  }

  // Rellena user con los datos del formulario
  fillUser() {
    this.user.name = this.userForm.controls['name'].value;
    this.user.surname = this.userForm.controls['surname'].value;
    this.user.password = this.userForm.controls['password'].value;
    this.user.email = this.userForm.controls['email'].value;
  }

  // Edita el usuario
  editUser() {
    this.fillUser();
    this.userService.update(this.idUser, this.user)
    .subscribe(
      data => {
        this.getUsers();
      },
      err => {
        console.error(err);
      });
  }

  // Nuevo usuario
  newUser() {
    this.fillUser();
    this.userService.add(this.user)
    .subscribe(
      data => {
        this.getUsers();
      },
      err => {
        console.error(err);
      });
  }
}
