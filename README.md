# IDATA2301 Webtechnology

In this course we are going to make the frontend of this project. It lets the user view or website
and communicate with the backend with our API made in IDATA2306.

## Getting started

To get started localy you need to create a '.env.local' file and add the following lines befoure
running the program.

```
NEXT_PUBLIC_API_BASEURL = 'http://localhost:8080'
NEXT_PUBLIC_BASE_URL='http://localhost:3000'
NEXTAUTH_URL='http://localhost:3000/api/auth'
NEXTAUTH_SECRET=ghjlkdghflkjsdhglkjsdgbdsbgnmsbdgjk

Run command:
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Infrastructure

We use a combanation of docker, kubernetes and GitHub workflos/actions.

### Workflow

We use github workflow to dockerize code that has been pushed or merged to dev / main branch. This
is given an unique id and pushed to our DockerHub repository.

### Docker

Our dockerfile creates a basic container that starts the application with desired port exposed.

### Kubernetes

We have setup kubernetes to run docker containers on our server to keep good uptime and a streamline
ci/cd pipeline. We use ArgoCD to automaticly sync new changes from a config repository and update
the docker image from there. The docker image is pulled from the dockerhub, these are public since
we did not want to pay for more.

### Domain

We have also bought a domain we use flightfinder.space, this is linked to cloudflare to use a proxy
to get a ssl and use https.

## App info

This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The app uses [MUI](https://mui.com/) as styling system with emotion as css-in-js for customization.
