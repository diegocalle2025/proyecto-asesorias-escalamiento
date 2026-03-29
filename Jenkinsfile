pipeline {
    agent any

    environment {
        // Tu usuario de Docker Hub
        DOCKER_USER = 'dcalle2026'
        // El ID de las credenciales que configuraremos en Jenkins más adelante
        DOCKER_HUB_CREDS = credentials('docker-hub-credentials')
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Descargando código desde GitHub...'
                checkout scm
            }
        }

        stage('Build Images') {
            steps {
                script {
                    echo 'Construyendo imágenes de Docker para Monolito y Microservicio...'
                    // Construcción del Monolito (Directorio raíz)
                    sh "docker build -t ${DOCKER_USER}/monolito-asesorias:latest ."
                    // Construcción del Microservicio de Proyectos
                    sh "docker build -t ${DOCKER_USER}/microservicio-proyectos:latest ./microservicio-proyectos"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    echo 'Autenticando y subiendo imágenes a Docker Hub...'
                    // Login seguro usando las credenciales de Jenkins
                    sh "echo ${DOCKER_HUB_CREDS_PSW} | docker login -u ${DOCKER_HUB_CREDS_USR} --password-stdin"
                    
                    // Push de las imágenes
                    sh "docker push ${DOCKER_USER}/monolito-asesorias:latest"
                    sh "docker push ${DOCKER_USER}/microservicio-proyectos:latest"
                }
            }
        }

        stage('Deploy (CD)') {
            steps {
                script {
                    echo 'Desplegando la aplicación en el servidor...'
                    // Reiniciar contenedores con las nuevas imágenes
                    sh "docker-compose down"
                    sh "docker-compose up -d"
                    echo '¡Despliegue completado con éxito!'
                }
            }
        }
    }

    post {
        always {
            echo 'Limpiando el espacio de trabajo...'
            // Opcional: docker logout
            sh "docker logout"
        }
    }
}
