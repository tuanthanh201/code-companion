# virtual-girlfriends

### Launching the Website

Please make sure the Docker engine is running (ie. `docker info`).

To start the website, execute the following commands in the root folder of the project:

`
docker build . -t "cs492-final"
docker run -d -p 49200:49200 cs492-final
`

### Stopping the Website

To stop the website, execute the following command:
`
docker ps
`

Copy the container ID of the cs492-final image. Then, use the following to stop it:
`
docker stop CONTAINER_ID
`
