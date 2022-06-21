#!/bin/bash

docker build -t localhost:5000/hi-static .

docker push localhost:5000/hi-static

kubectl delete -f k8s/*

kubectl apply -f k8s/*

