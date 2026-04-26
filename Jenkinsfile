pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "amitbaviskar/ci-cd-app"
    }

    stages {

        stage('Checkout') {
            steps {
                git credentialsId: 'github-key', url: 'git@github.com:Amitbaviskar/ci-cd-app.git'
                // Use SSH key to securely pull code
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
                // Install Node.js dependencies
            }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:latest ."
                // Build Docker image
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh '''
                    echo "$PASS" | docker login -u "$USER" --password-stdin
                    docker push ${DOCKER_IMAGE}:latest
                    '''
                }
                // Push image to Docker Hub securely
            }
        }

        stage('Test SSH') {
            steps {
                sshagent(['vm-ssh']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no root@136.112.66.220 "echo SUCCESS"
                    '''
                }
                // Verify SSH connectivity
            }
        }

        stage('Deploy') {
            steps {
                sshagent(['vm-ssh']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no root@136.112.66.220 "
                    docker pull amitbaviskar/ci-cd-app:latest &&
                    docker rm -f my-app || true &&
                    docker run -d -p 3000:3000 --name my-app amitbaviskar/ci-cd-app:latest
                    "
                    '''
                }
                // Deploy latest container on VM
            }
        }
    }
}
