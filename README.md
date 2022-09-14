# Description

This is a refactorized clone from [this repo](https://github.com/GenaroIBC/fake-api-crud). Here, i implement [_useReducer_](https://reactjs.org/docs/hooks-reference.html#usereducer) React Hook to handle the state in a simuled CRUD using [JSON Server](https://github.com/typicode/json-server).

## Getting Started

### First, you need to run:

```bash
npm install
```

This will install the necesary dependencies to run the fake API CRUD .

### Then, you can run:

```bash
npm run jserver
```

This will init [JSON Server](https://github.com/typicode/json-server). It is running, by default, at port `5555`. If you are using that port, just modify the _`-p`_ parameter with the port of your preference at **_package.json_**.

### Finaly, run:

```bash
npm start
```

Now, you can **open your browser** at [http://localhost:3000](http://localhost:3000) to start using the fake API CRUD.
