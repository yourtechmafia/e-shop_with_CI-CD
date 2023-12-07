pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'techmafia/e-shop'  //Your Docker Hub repository
        DOCKERHUB_CREDENTIALS = 'dockerhub_credentials'  //Your ID of Jenkins credentials for Docker Hub
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/yourtechmafia/e-shop_with_CI-CD.git'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub_credentials', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        sh 'echo $DOCKERHUB_PASSWORD | docker login -u $DOCKERHUB_USERNAME --password-stdin'
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t ${DOCKER_IMAGE}:latest .'
                }
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                script {
                    sh 'docker push ${DOCKER_IMAGE}:latest'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh 'kubectl apply -f k8s/'
                }
            }
        }
    }

    post {
        always {
            echo 'Post-build actions completed.'
        }
    }
}
