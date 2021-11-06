<p  align="center">
    <a  href="http://gpplanet.ru"  target="blank">
        <img  src="https://i.postimg.cc/zvh4Lgvf/fulllogo.png"  height="48"  alt="Nest Logo" />
    </a>
</p>

# Frontend

## Technologies

![](https://img.shields.io/badge/TypeScript-404D59?style=flat&logo=typescript)
![](https://img.shields.io/badge/React-404D59?style=flat&logo=react)
![](https://img.shields.io/badge/GraphQL-404D59?style=flat&logo=graphql&logoColor=e10098)
![](https://img.shields.io/badge/Docker-404D59?style=flat&logo=docker)
![](https://img.shields.io/badge/Redux-404D59?style=flat&logo=redux&logoColor=e10098)

## Environment variables

| Variable name               | Variable description          | Default |
|-----------------------------|-------------------------------|---------|
| PORT                        | Port of frontend server       | 3000    |
| REACT_APP_LITE_COLOR        | Color of Lite subscription    | -       |
| REACT_APP_PREMIUM_COLOR     | Color of Premium subscription | -       |


## Commands to help

### Get frontend docker image

```bash
echo PASS_OR_TOKEN | docker login ghcr.io -u USERNAME --password-stdin
docker pull ghcr.io/jakera3/gpp-muiv2/gpp-frontend-v2:latest
```

### Run frontend docker container

```bash
docker stop gpp-frontend-v2 && docker rm gpp-frontend-v2 && docker run --name gpp-frontend-v2 -d --restart unless-stopped -p 4200:4200 ghcr.io/jakera3/gpp-muiv2/gpp-frontend-v2:latest
```
