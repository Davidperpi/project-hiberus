import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JwtTokenService } from '../../../../core/data-service/jwt-token.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Título para la cabecera
  @Input()
  title: string = "";

  // Nombre del botón
  @Input()
  button: string = "";

  // Envia la acción al padre
  @Output()
  buttonClicked = new EventEmitter<string>();

  constructor(private jwtToken: JwtTokenService, private router: Router, public translate: TranslateService) { 
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
  }

  ngOnInit(): void {
  }

  // Acción del botón
  action() {
    this.buttonClicked.emit('prueba')
  }

  // Cierre de sesión
  logout() {
    // Destruye el token y navega hasta la página de login desde el componente
    // this.jwtToken.destroyToken();
    // this.router.navigate(['/logout']);

    // Como en las tareas piden una página de cierre de sesión navega a dicha página
    this.router.navigate(['/logout']);
  }
}
