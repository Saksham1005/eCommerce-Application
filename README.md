
# E-Commerce Application

Built an e-commerce Application with React, Redux, and Node.js which helps users to buy their desired products from different authenticated sellers.

JSON Web Token(JWT) authentication strategy is used to authenticate Users and Sellers in APIs.
Integrated Cloudinary into the backend server to save the image of the product on the Cloudinary platform, and then saved the image URL into the database.

Used Express.js to establish the Web Server and NoSQL to create the database.

Deployed the Frontend React Application on Netlify and Backend Node.js Express server on cyclic.


## API Reference

#### Common APIs for Seller and User- Get Products, Profile, Login, Logout, Sign Up, Update Profile.

```http
  GET /
  GET /profile
  POST /login
  POST /logout
  POST /signup
  POST /updateProfile
```

#### User APIs- Get Cart, Get Orders, Get Saved Products, Add / Remove Product from Cart, Buy Product, Rate Product, Save Product 

```http
  GET /user/cart
  GET /user/orders
  GET /user/savedProducts
  POST /user/product/cart
  POST /user/product/buy
  POST /user/product/rate
  POST /user/product/save
```

#### Seller APIs- Get Products, Add Product 

```http
  GET /seller/products
  POST /seller/addProduct
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**.  |

## Tech Stack

**Client:** React.js, Redux, TailwindCSS

**Server:** Node.js, Express.js


## 🔗 Links
[![Project Link](https://img.shields.io/badge/Project_Link-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ecommerce-prod-application.netlify.app/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/saksham-prajapati-1923421b3/)
[![leetcode](https://img.shields.io/badge/Leetcode-1DA1F2?style=for-the-badge&logo=leetcode&logoColor=white)](https://leetcode.com/Saksham1005/)

## Other Common Github Profile Sections
👩‍💻 I'm currently working on improving my skills in Web Development and Data Structures and Algorithms.

🧠 I'm currently learning React, Redux and Node.js.

👯‍♀️ I'm looking to collaborate on open source projects

💬 Ask me anything about Full Stack Development. 

⚡️ Fun fact- Also worked on Machine Learning Based Projects.

