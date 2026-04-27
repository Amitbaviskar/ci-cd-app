pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "amitbaviskar/ci-cd-app"
    }

    stages {

        stage('Checkout') {
            steps {
                git credentialsId: 'github-key', url: 'git@github.com:Amitbaviskar/ci-cd-app.git'
<<<<<<< HEAD
                // Use SSH key to securely pull code
=======
>>>>>>> a6543b6 (add jenkins pipeline)
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
<<<<<<< HEAD
                // Install Node.js dependencies
=======
>>>>>>> a6543b6 (add jenkins pipeline)
            }
        }

        stage('Docker Build') {
            steps {
<<<<<<< HEAD
                sh "docker build -t ${DOCKER_IMAGE}:latest ."
                // Build Docker image
=======
                sh '''
                docker rmi amitbaviskar/ci-cd-app:latest || true
                docker build -t amitbaviskar/ci-cd-app:latest .
                '''
>>>>>>> a6543b6 (add jenkins pipeline)
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh '''
                    echo "$PASS" | docker login -u "$USER" --password-stdin
<<<<<<< HEAD
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
=======
                    docker push amitbaviskar/ci-cd-app:latest
                    '''
                }
>>>>>>> a6543b6 (add jenkins pipeline)
            }
        }

        stage('Deploy') {
            steps {
                sshagent(['vm-ssh']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no root@136.112.66.220 "
<<<<<<< HEAD
                    docker pull amitbaviskar/ci-cd-app:latest &&
                    docker rm -f my-app || true &&
=======
                    docker stop my-app || true &&
                    docker rm my-app || true &&
                    docker pull amitbaviskar/ci-cd-app:latest &&
>>>>>>> a6543b6 (add jenkins pipeline)
                    docker run -d -p 3000:3000 --name my-app amitbaviskar/ci-cd-app:latest
                    "
                    '''
                }
<<<<<<< HEAD
                // Deploy latest container on VM
=======
>>>>>>> a6543b6 (add jenkins pipeline)
            }
        }
    }
}
