# PizzaLab

An Angular 6 application developed for my internship project at [Sync Lab S.l.r.](https://www.synclab.it/).

## Abstract

PizzaLab is a web application aimed to help any local take-away pizza shop.

It lets users register new orders, set-up deliveries with Google Maps integration, manage the product inventory and keep tracks of past orders.

## Installation

To run or extend the project there are just a few steps required:

1. Download or clone [this repository](https://github.com/GiacomoDM/PizzaLab.git);

2. Make sure you have a valid `npm` and `Angular` installation. Check out the respectives documentations [here](https://www.npmjs.com/get-npm) and [here](https://angular.io/guide/quickstart).

3. From the root folder, run *(may take some time)*:

    ```
    npm install
    ```

4. **Important**: open the file `/src/index.html` and change `YOUR_API_KEY` in

    ```
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
    ```
    with a valid Google Maps API Key.  Check out the official documentation [here](https://developers.google.com/maps/documentation/javascript/get-api-key) form more information on how to get one.

The application is supposed to work with a fully functional RESTful back-end. For development purpose, PizzaLab can (almost entirely) work with a local fake REST API thanks to *json-server* (check out the official documentation [here](https://github.com/typicode/json-server)).

A populated test database is already provided (see the file `/db.json`). To start *json-server*, run:

```
json-server --watch db.json
```

## Development server

For a dev server, run:

```
ng serve
```

 Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.



## Build

To build the project, run:

```
ng build
```

The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
