# la-chopi-store

#  La Chopi!

### Catálogo Interactivo + Carrito de Compras

Proyecto educativo que simula una tienda virtual con catálogo dinámico, filtrado de productos, carrito persistente y proceso de checkout.

---

##  Características principales

###  Catálogo dinámico

Los productos se generan desde un arreglo en JavaScript y se renderizan con Bootstrap.

###  Búsqueda en tiempo real

Filtrado instantáneo por nombre o distribuidor.

###  Modales de detalles

Cada producto tiene su propia ventana con descripción completa, imagen y botón para añadir al carrito.

###  Carrito de compras persistente

- Guarda productos en `localStorage`
    
- Actualiza cantidades y subtotales
    
- Permite eliminar productos
    
- Calcula el total automáticamente
    

###  Simulación de checkout

Formulario de pago y envío.  
Genera un número de orden aleatorio y limpia el carrito.

---

# Cómo visualizar el proyecto correctamente

Debido a que el proyecto usa rutas relativas y carga de scripts locales, **debes usar un servidor local** para evitar errores en el navegador.

##  Opción 1 — VS Code + Live Server (recomendada)

1. Instala la extensión **Live Server**
    
2. Clic derecho en `index.html` → **Open with Live Server**
    
3. Se abrirá en:
    
    ```
    http://127.0.0.1:5500/
    ```
    

---

##  Opción 2 — Iniciar un servidor con Python

```bash
cd project-root
python -m http.server 8000
```

Luego abre:

```
http://localhost:8000
```

---

##  Opción 3 — Servidor simple con Node.js

```bash
npm install -g serve
serve .
```

Luego visita:

```
http://localhost:3000
```

---

#  Tecnologías utilizadas

- **HTML5 + CSS3**
    
- **JavaScript ES6**
    
- **Bootstrap 5.3.6**
    
- **jQuery**
    
- **LocalStorage para persistencia**
    
- **Modales de Bootstrap**
    

---

#  Funcionalidades principales en JavaScript

###  Gestión del carrito

- `addToCart()`
    
- `renderCart()`
    
- `updateCartCount()`
    
- Persistencia con `localStorage`
    

###  Catálogo dinámico

- `renderproduct()` despliega las tarjetas de productos
    
- Filtro en tiempo real con `keyup`
    

### Manejo de modales

- Mostrar detalles del producto
    
- Añadir al carrito desde el modal
    
- Review del carrito
    
- Checkout con número de orden generado
    

---

#  Checkout (modo educativo)

El formulario solicita:

- Nombre completo
    
- Dirección
    
- Ciudad
    
- Información de pago (solo demostración)
    

Luego:

- Genera un número de orden: `EDU + random`
    
- Vacía el carrito
    
- Muestra mensaje de confirmación por 3 segundos
    

---

#  Créditos

Proyecto creado con fines educativos para practicar:

- DOM avanzado
    
- Bootstrap
    
- Persistencia con LocalStorage
    
- Manejo de eventos
    
- Gestión simple de carrito y checkout
    

---

#  Contribuciones

Cualquier mejora, sugerencia o PR es bienvenida.  
Este proyecto está abierto para práctica, aprendizaje y experimentación.

---
