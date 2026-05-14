docker build -t topics-web:1.0 .

docker run -d -p 3000:3000 --name mi-frontend-topics topics-web:1.0    

PS C:\Users\frang\Documents\bootcamp-devops\frontend> docker inspect --format='{{range .Config.Env}}{{println .}}{{end}}' mi-frontend-topics
>> 
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
NODE_VERSION=20.20.2
YARN_VERSION=1.22.22