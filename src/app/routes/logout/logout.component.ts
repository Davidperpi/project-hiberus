import { Component, OnInit } from '@angular/core';
import { JwtTokenService } from '../../core/data-service/jwt-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private jwtToken: JwtTokenService,private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    // Destruye el token y navega hasta la página de login desde el componente
    this.jwtToken.destroyToken();
    this.router.navigate(['/']);
  }
}
