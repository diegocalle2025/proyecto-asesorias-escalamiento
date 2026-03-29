# Sistema de Gestión de Asesorías - Escalamiento y Balanceo (CI/CD)

Este proyecto implementa una arquitectura de microservicios escalable para la gestión de asesorías académicas, cumpliendo con los requerimientos de alta disponibilidad y rendimiento mediante la automatización de despliegue continuo.

## 🏗️ Arquitectura del Sistema

El sistema ha sido desacoplado para separar el servicio de mayor demanda (**Proyectos**) del resto de la aplicación (**Monolito**).

- **Monolito (Puerto 3000):** Maneja la gestión de Clientes, Universidades, Etapas y Tipos de Proyecto.
- **Microservicio de Proyectos (Puerto 4000 via Nginx):** Servicio crítico escalado horizontalmente.
- **Balanceador de Carga (Nginx):** Distribuye el tráfico entre las réplicas del microservicio.

## 🚀 Escalamiento Horizontal

Para mejorar el performance, el microservicio de proyectos cuenta con **3 réplicas** activas. El balanceo de carga se realiza mediante Nginx utilizando un grupo `upstream`, lo que permite una gestión eficiente del tráfico de solicitudes de proyectos independientes.

## 🤖 Automatización CI/CD (GitHub Actions)

Se ha implementado un flujo de trabajo de **Entrega Continua (CD)** nativo en GitHub para automatizar el ciclo de vida del software:

1. **Trigger**: Cada `push` a la rama `master`.
2. **Build**: Construcción automática de imágenes Docker para Monolito y Microservicio.
3. **Registry**: Publicación de imágenes en **Docker Hub** con tag `latest`.
4. **Security**: Gestión de secretos mediante `DOCKER_HUB_TOKEN`.

## 🛠️ Instalación y Ejecución

Asegúrate de tener instalado [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/).

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/diegocalle2025/proyecto-asesorias-escalamiento
   cd "Proyecto de Asesorias"
   ```

2. Configurar variables de entorno:
   Crea un archivo `.env` en la raíz con tu `MONGODB_URI`.

3. Levantar la infraestructura completa:
   ```bash
   docker compose up -d
   ```

## 📡 Verificación del Despliegue (Localhost)

Una vez levantada la infraestructura, puedes verificar el acceso en los siguientes puntos:

- **Monolito:** [http://localhost:3000](http://localhost:3000)
- **Microservicio (Balanceado):** [http://localhost:4000](http://localhost:4000)
- **API Proyectos:** [http://localhost:4000/api/proyectos](http://localhost:4000/api/proyectos)

## 🐳 Docker Hub (Imágenes)

- [dcalle2026/monolito-asesorias](https://hub.docker.com/r/dcalle2026/monolito-asesorias)
- [dcalle2026/microservicio-proyectos](https://hub.docker.com/r/dcalle2026/microservicio-proyectos)

---
*Desarrollado como parte de la actividad de Técnicas de Escalamiento - 2026.*
