pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "amitbaviskar/ci-cd-app"
    }

    stages {

        stage('Checkout') {
            steps {
                git 'git@github.com:Amitbaviskar/ci-cd-app.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    sh "docker build -t $DOCKER_IMAGE:latest ."
                }
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh """
                    echo $PASS | docker login -u $USER --password-stdin
                    docker push $DOCKER_IMAGE:latest
                    """
                }
            }
        }

        stage('Test SSH') {
    steps {
        sshagent(['vm-ssh']) {
            sh 'ssh ...'
        }
    }
}

        stage('Deploy') {
            steps {
                sshagent(['vm-ssh']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no root@136.112.66.220'
                    docker pull $DOCKER_IMAGE:latest
                    docker rm -f my-app || true
                    docker run -d -p 3000:3000 --name my-app $DOCKER_IMAGE:latest
                    '
                    """
                }
            }
        }
    }
}
