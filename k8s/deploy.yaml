apiVersion: apps/v1
kind: Deployment
metadata:
  name: hi-static-depl
spec:
  replicas: 1
  selector:
    matchLabels:
      app: hi-static
  template:
    metadata:
      labels:
        app: hi-static
    spec:
      containers:
        - name: hi-static
          image: localhost:5000/hi-static
          volumeMounts:
            - name: static-folder
              mountPath: /app/src/static
      volumes:
        - name: static-folder
          hostPath:
            path: /root/documents/shared/static
---
apiVersion: v1
kind: Service
metadata:
  name: hi-static-srv
spec:
  selector:
    app: hi-static
  ports:
    - name: hi-static
      protocol: TCP
      port: 80
      targetPort: 80
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: hi-static-ingress-service
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/use-regex: "true"
    nginx.ingress.kubernetes.io/rewrite-target: /$2
spec:
  rules:
    - http:
        paths:
          - path: /hi-static(/|$)(.*)
            pathType: Prefix
            backend:
              service:
                  name: hi-static-srv
                  port:
                    number: 80

