# MyReads Project

## Starting the project

To start the server follow these steps:

- install all project dependencies with `npm install`
- start the development server with `npm start`

<hr/>

## Components Layout

```bash
<App>
├──<Shelf> #Route "/"
│   └──<BookCard> # BookCards Component for each book on shelf
│      └─<DropMenu> # DropMenu in each BookCard
│
└──<SearchBar> #Route "/search"
    └──<BookCard> # BookCards Component for each book in search
        └─<DropMenu> # DropMenu in each BookCard
```

<hr/>

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebook/create-react-app/blob/main/packages/cra-template/template/README.md).

<hr/>

## Important

This project starter files are provided by udacity on this [starter repo](https://github.com/udacity/reactnd-project-myreads-starter)
