first open docker desktop ,
then run this command after writing Dockerfile
```docker build -t app .```

then add the start line in package.json and add CMD[""] in Dockerfile and again run
```docker build -t app .```

then to run code run command
```docker run -p 4000:4000 app```