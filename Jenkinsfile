#!/usr/bin/env groovy

pipeline {
    agent {
        label 'os:linux'
    }
    options {
        skipDefaultCheckout()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(
            daysToKeepStr: '15'
        ))
        ansiColor('xterm')
    }
    parameters {
        booleanParam(name: 'CLEAN_WS',
            defaultValue: false,
            description: 'When checked, will clean workspace.')
    }
    stages {
        stage('Clean') {
            steps {
                script {
                    if (params.CLEAN_WS) {
                        cleanWs()
                    }
                }
            }
        }
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Unit Test') {
            steps {
                withNode('16.6.0') {
                    sh """
                        npm install --registry=https://registry.npm.taobao.org
                        npm run test
                    """
                }
            }
        }
        stage('Sonar Scan') {
            steps {
                script {
                    def projectKey = "data-eastlake-sdk-node"
                    def optionalProperties = [
                        "sonar.sources=lib",
                        "sonar.tests=test",
                        "sonar.javascript.lcov.reportPaths=coverage/lcov.info",
                    ]
                    withNode('16.6.0') {
                        sonarScan projectKey: projectKey, optionalProperties: optionalProperties, abortPipeline: true
                    }
                }
            }
        }
    }
}
