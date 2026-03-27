# Sistema de Gestión de Asesorías - Escalamiento y Balanceo

Este proyecto implementa una arquitectura de microservicios escalable para la gestión de asesorías académicas, cumpliendo con los requerimientos de alta disponibilidad y rendimiento.

## 🏗️ Arquitectura del Sistema

El sistema ha sido desacoplado para separar el servicio de mayor demanda (**Proyectos**) del resto de la aplicación (**Monolito**).

- **Monolito (Puerto 3000):** Maneja la gestión de Clientes, Universidades, Etapas y Tipos de Proyecto.
- **Microservicio de Proyectos (Puerto 4000 via Nginx):** Servicio crítico escalado horizontalmente.
- **Balanceador de Carga (Nginx):** Distribuye el tráfico entre las réplicas del microservicio.

## 🚀 Escalamiento Horizontal

Para mejorar el performance, el microservicio de proyectos cuenta con **3 réplicas** activas. El balanceo de carga se realiza mediante Nginx utilizando un grupo `upstream`.

## 🛠️ Instalación y Ejecución

Asegúrate de tener instalado [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/).

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repo>
   cd "Proyecto de Asesorias"
   ```

2. Configurar variables de entorno:
   Crea un archivo `.env` en la raíz con tu `MONGODB_URI`.

3. Levantar la infraestructura completa:
   ```bash
   docker-compose up -d --build
   ```

4. Verificar el estado de los contenedores:
   ```bash
   docker-compose ps
   ```

## 📡 Endpoints Principales

- **Monolito:** `http://localhost:3000/api/...` (clientes, universidades, etapas, tipos-proyecto)
- **Microservicio (Balanceado):** `http://localhost:4000/api/proyectos`

## 🐳 Docker Hub

Las imágenes están disponibles en Docker Hub:
- `dcalle2026/monolito-asesorias`
- `dcalle2026/microservicio-proyectos`

---
*Desarrollado como parte de la actividad de Técnicas de Escalamiento.*
