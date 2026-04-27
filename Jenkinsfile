pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "amitbaviskar/ci-cd-app"
    }

    stages {

        stage('Checkout') {
            steps {
                git credentialsId: 'github-key', url: 'git@github.com:Amitbaviskar/ci-cd-app.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                docker rmi amitbaviskar/ci-cd-app:latest || true
                docker build -t amitbaviskar/ci-cd-app:latest .
                '''
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh '''
                    echo "$PASS" | docker login -u "$USER" --password-stdin
                    docker push amitbaviskar/ci-cd-app:latest
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sshagent(['vm-ssh']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no root@136.112.66.220 "
                    docker rm -f my-app || true &&
                    docker pull amitbaviskar/ci-cd-app:latest &&
                    docker run -d -p 3000:3000 --name my-app amitbaviskar/ci-cd-app:latest
                    "
                    '''
                }
            }
        }
    }
}
