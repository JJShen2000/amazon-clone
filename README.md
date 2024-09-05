# Amazon Clone

This project is a clone of Amazon.
![1721050030266](image/README/1721050030266.png)

## Teck Stack

- Frontend
  - React.js, Redux
- Backend
  - Express
- Database
  - PostgreSQL
- Containers
  - Docker
- Testing
  - Backend: Jest

## Demo

### Main Page & Searching

![image](https://github.com/JJShen2000/amazon-clone/blob/main/image/README/Main%20Page%20%26%20Searching.gif)

### Log in

![Sign up & Login](https://github.com/JJShen2000/amazon-clone/blob/main/image/README/Sign%20up%20%26%20Login.gif)

## Usage

- Run frontend client, backend server, and PostgreSQL.
  ```
   docker-compose build
   docker-compose up
  ```

- Run Seed Script in another terminal:
  ```
   docker-compose exec backend npm run seed
  ```

- Then you can access website via `http://localhost:3000/`

- Test for backend
  ```
  docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit --exit-code-from backend
  ```

## Goal

### Frontend

* [X] Header
* [X] Home Page

  * [X] Carousel
  * [X] Product Card
  * [X] Product Scrollable Area
* [X] Search Result Page
* [X] Sign in & Registration
  * [X] UI
  * [X] API
* [ ] Cart
* [ ] Product Page
* [ ] Purchase Page

### Backend

- [ ] Authentication
  - [X] JWT
  - [ ] Verify Email
- [X] Products Data
- [X] Search Controller

## Data

This project uses the [Amazon Sales Dataset](https://www.kaggle.com/datasets/karkavelrajaj/amazon-sales-dataset) from Kaggle.

## Disclaimer

This project is an educational exercise and a personal project inspired by Amazon. It is not affiliated with or endorsed by Amazon Inc. or any of its subsidiaries. All trademarks and registered trademarks are the property of their respective owners.

The purpose of this project is solely for non-commercial, educational purposes. The design, layout, and features of this project may resemble or be inspired by Amazon's website, but it is not intended to replicate its functionality for commercial use.

This project does not store any real user data or interact with any real Amazon services. Any products or listings shown are for demonstration purposes only and are not real or available for purchase.
