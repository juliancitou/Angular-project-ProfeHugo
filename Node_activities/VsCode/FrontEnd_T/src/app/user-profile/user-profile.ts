import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Importar CommonModule
import { db } from './db';

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css'],
  standalone: true,
  imports: [CommonModule] // ✅ Necesario para *ngIf y *ngFor
})
export class UserProfileComponent implements OnInit {
  datos: db = new db();
  user: User | undefined;
  masDeUnUsuario: boolean = false;
  usuariosMostrados: boolean = false;
  userList: User[] = [];

  title = 'Perfil de Usuario';

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.userList = this.datos.getAll();
    this.checkUserCount();

    if (this.userList.length > 0) {
      this.user = this.userList[0];
    }
  }

  checkUserCount() {
    // ✅ Cambiado: se activa con al menos 1 usuario
    this.masDeUnUsuario = this.datos.count() >= 1;
  }

  mostrarLista() {
    this.usuariosMostrados = !this.usuariosMostrados;
  }

  eliminarUsuario(id: number) {
    // ✅ Eliminar de la base de datos real
    this.datos.eliminarUsuario(id);
    this.cargarUsuarios(); // Recargar la lista
    
    // Si se ocultó la lista al eliminar el último usuario
    if (this.userList.length === 0) {
      this.usuariosMostrados = false;
    }
  }

  agregarUsuario() {
    const nuevoId = this.userList.length > 0 ? 
      Math.max(...this.userList.map(u => u.id)) + 1 : 1;
    
    const nuevo: User = {
      id: nuevoId,
      name: `Usuario ${nuevoId}`,
      age: 20 + Math.floor(Math.random() * 30),
      email: `usuario${nuevoId}@example.com`,
    };
    
    // ✅ Agregar a la base de datos real
    this.datos.agregarUsuario(nuevo);
    this.cargarUsuarios();
    this.usuariosMostrados = true; // Mostrar lista automáticamente
  }
}