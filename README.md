# CodeCompanion

### Setup

Please add the .env file in our submission into the 'client' directory of the project!

### Launching the Website

Please make sure the Docker engine is running (ie. `docker info`).

To start the website, execute the following commands in the 'client' directory of the project:

`
docker build . -t "cs492-final"
`

`
docker run -d -p 49200:49200 cs492-final
`

### Accessing the Website

You can open the website at http://localhost:49200.

### Stopping the Website

To stop the website, execute the following command:

`
docker ps
`

Copy the container ID of the cs492-final image. Then, use the following to stop it:

`
docker stop CONTAINER_ID
`
