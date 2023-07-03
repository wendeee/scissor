<!-- ABOUT THE PROJECT -->

# A Backend API for a URL Shortner (Snipit)

Snipit is a backend API for a social media platform built by <a href="https://github.com/wendeee">Chinwendu Enyinna</a> using a couple JavaScript-based server side technologies. This API follows the REST architectural design pattern.

---

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Linkedin Badge](https://img.shields.io/badge/-wendeee-blue?style=for-the-badge&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/enyinna-chinwendu-promise/)](https://www.linkedin.com/in/enyinna-chinwendu-promise/)
[![Twitter Badge](https://img.shields.io/badge/-@wendeee-1ca0f1?style=for-the-badge&logo=twitter&logoColor=white&link=https://twitter.com/_ChinwenduE)](https://twitter.com/_ChinwenduE)
[![AltSchool Badge](https://img.shields.io/badge/-Engineering-6773E5?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIcAAACHCAYAAAA850oKAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAcmSURBVHgB7d3/kZtGFAfwbzL5P0oF2VRwlwq8qcBKBUcqsFyBSAW5VGBcgS8ViFRwdgW3qeDcgaM3wBy3egu7sBLY9/3MMD6h5QnBg/0ByAARERERERERERERERERERERERERERERERERERERERERERERERFdwHc4DxtR5uNx+hxRbnOcriOWjS1HC7LH6UvEVETGK5RlzYxyFOl75Fco894r816BVu0cyaHt9Fucnt63aKoCWqncyWFxeir/F03d/483X2sj0IrkTo5CmVd5//bdgFYrd3JoVUrd/qv1HFi1rNgPyEeqCOPNkyrFtX9LYkjV0j9bdFVLjWlk+V3795Xy/g5PCVn11oUuTBqdY91Vq5R5NxK3QLiLahDXbf6CuLEX6slZrQxVKR1WLV+RXMlhoI9OOm9eV7X0sdeyUrmSY6vMex8oWynzpvZaHJpLAH+gScb6OP19nH5p5/enGrSIA+KHruVM8eiVfUS4aikiY/ttnj1ocQanO+9+ZJkK8Q3GAtOvrbAtM0OOasUq896PLFMp86ZWLUOYHDPkGOfQdqqc0t8gjbRb3oKX2FdjbnIY6GeODdKP2rkDYpTZ3GrFIq8taDXmJkfudsI52h000ZxqRaoB681zx+k3xJPu52slZg1a3Jzk0KqAGmkXt/zk6OLWuIyXOHTvcIHte4f5F7dCA2J9BaaPc4xVUw7xF+6+lekdIs1pc7zyXjukZ2ToWotFOq0LXB2nh3bi9ZtEU5NDOx3XmKYKxE9VQ08Q004cEEs0Jzl8Y6OiIdpl/BukkxhvQdlMTQ6/Eekw/cyRs2qpjtPv4B1fWUx94s0o8xym00ZUP7eT9p5DeswuXp/By6NtByIiIiIiIqJvwbl+2ecaT9cyZKxB+tUO/KWdr0rO5LBo7huVf4euY9RohtorXNbBe73EOixBrsKa3mt5frnEhWzaFUi9dPyAy45Q+p9f4mVwWOCSvZDEkGdUCqQz7bK8lL5Sc+8+lzu5jDJf2hWf0LQx0Ja5UspKcn04Tr+CbZFvioFeXUjChNocZWCZEufHaiWxWpmjxLQNXkBvf5wbkyMxOeZUK0aZd4dxFZqbeawXSyY3suw1nveGpCrqnq6fy7bxN72YqVVd92BWF0c4pN947ce0eN42+wj9Jy5WowIm32C8Q7PB+pMZKG+hP8nfP/OMPX4ZOnN07R4t5h5xNm3Zx4F1lPVPaXwbNNt4LKYZieOwQLWyg76yue/V3CNP9ziUHB8w727t6/ZzY9dxj3FbDCdFSkyX+H2ysAjvoAJ5uqh7xG+g/udrCaolRxEZcxdYP4O0ndhNfyFsOyHeUII4LJAc4oDhFZYNJ0embFyLNEUgZo1mx5bt31qZgxJPS477NkbRTjLvIfA9/ITbDJSteuv4gPiEMwMxb9t4twMxrRLTYaHkMEg/ciRZiojY2gYolXI7xG0o//0qEM8EPtu/434P/axllJgl4hKuUsrdQz8Tlog7KBwWSg5hkFbnjm1IUSjlh75UqZS/9cpoSRqiJVzplXlI+D7A+E9xbpC2jcQB4weFw4LJ0ZENOiVJbpRYd0q5oTZM1/10van2yqQkm8FwctjEeN06Pg4so7U1ipGYFuMHhcMKkqNj0SSK7ODYKsd6Me5xegTNNbSzU8trZ5aYBvgB4e9VKjFNREznLXM38n50cpzjv9So0WSvHAk/obluIj8FKZfIXWCZvffa39D/YV20NsBHjPvkvTaBv8VnxA1y+Z97hUzOkRw+WfkKzSlSfh/0T6WMxcu4Opsy4hpbNnUUN9rU4XOD0/qwRtwwdonmyPNHNC3CR9+PWBdth2wwvqOuI+L048X4OSFmkqnJ0Q0X+/NqxJFyb5TlO1KN9L+0wbpoO0B2fI1h/o7sVzNyYNz0XnfXVGoMO1sVPLVaCT0Zn2vo3G9UdRsqRGvp1zifO2XefmQZC/334bW/O68xrMDpNr/DCkij098hHyKWC40s2l4ZC73Pv0mIV3jlcvZWxAFx3fKhdfST5R7jPbmOCcQ0XjmHBbqyBnq3VFbYBpaR+feBZXyHQLnrifFyJ4eF/v33eL6DLPSdqO2kIiKmJNo2IaaLKHMWO+hfRiYZ4zi0KyNnlIeBslsl9jXC4ySPGB5DKZR4uZND3GL4+4fek21hAp97yBzTYaHkECXCKxwz7QZiFxPilYFY50gOUSFt/WQHj4323ifGfEA42RwWTA5RIH3oXMrbiNgmMrZs9O1AnHMlBxB/gNSI73ndZorpMDE5cj7UZPA0dB4apZMejnTfSqT3Jgo0O/8Vnt8mKPGkhV5huI9fea/vMNyyTy1v2nW0eP5Li9K1rNt4NdIYPN3ucOXF7NanHokhSdZvyNeIfJgrZ3L0dfdSbnD6OCQRERERERERERERERERERERERERERERERERERERERERERERERERERERncX/Z96oxRsCt/4AAAAASUVORK5CYII=&logoColor=white&link=https://altschoolafrica.com/schools/engineering)](https://altschoolafrica.com/schools/engineering)

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <p align="center">
    <br />
    <a href="https://github.com/wendeee/scissor#readme"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://snipit.onrender.com">View Demo</a>
  </p>
</div>

# Technologies used

<div align="center">

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

</div>

---

<!-- Project Requirements -->

# Requirements

<details>

<summary>The following are the requirements I implemented in this project 👇:</summary>

- [x] Users should be able to sign up(register) and sign in into their account

- [x] For the URL Shortener functionality, users should be able to:

  - [x] Shorten a long url

  - [x] Customize their short url using a custom name. This is particularly beneficial for small SMEs as it helps promote their brand.

  - [x] Generate QRCodes for their shortened URLS. Users can download the QR code image and use it in their promotional materials or/and on their website.

  - [x] Track their shortened URL's performance

  - [x] See the history of links they’ve created so they can easily find and reuse links they have previously created.

---

</details>

<br>

# Development

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Postgresql](https://www.postgresql.org/download/)

### Clone this repo

```sh
 git clone https://github.com/wendeee/scissor.git
```

### Install project dependencies

```sh
npm install
```

### Update .env with [example.env](https://github.com/wendeee/scissor/blob/main/example.env)

- Sign up on Cloudinary to get API_KEY for free and other details needed in your .env file
- To implement forgot password and reset password functionality, I used Nodemailer and mail trap to send reset token to user's email.<br>

### Run development server

```sh
npm run dev
```

## Models

---

## User

| field            | data_type | constraints       |
| ---------------- | --------- | ----------------- |
| name             | string    | required          |
| email            | string    | required          |
| password         | string    | required          |
| confirmPassword  | string    | required          |
| confirmationCode | string    | added dynamically |
| provider         | string    | added dynamically |

## URLService

| field        | data_type   | constraints         |
| ------------ | ----------- | ------------------- |
| longURL      | string      | required            |
| shortURL     | string      | added dynamically   |
| createdBy    | string      | referenced          |
| UrlCode      | string      | added dynamically   |
| customName   | string      | added dynamically   |
| clicks       | number      | updated dynamically |
| qrcodeurl    | string      | addedynamically     |
| clickHistory | sring Array | required            |

## OTP

| field        | data_type    | constraints |
| ------------ | ------------ | ----------- |
| email        | string       | required    |
| generatedFor | string(uuid) | referenced  |
| otp          | string       | required    |
| createdAt    | Date         | required    |
| expiresAt    | Date         | required    |

## API Endpoints

### Base URL

- https://snipit.onrender.com

### USERS

### Register/Sign up a user

- Route: /api/v1/auth/signup
- method: POST

- 👇: Body

```json
{
  "name": "Jackson",
  "email": "jackson@gmail.com",
  "password": "jackson12345",
  "confirmPassword": "jackson12345"
}
```

👇: Response

```json
{
  "data": {
    "modifiedResponse": {
      "id": "d983edfc-31d7-47f3-971f-bc3ec6fbd1d5",
      "provider": "email",
      "status": "Pending",
      "name": "Jackson",
      "email": "jackson@gmail.com",
      "confirmationCode": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJlbWFpbCI6ImRldmJhYnl3ZW5kZWVlQGdtYWlsLmNvbSJ9LCJpYXQiOjE2ODgxMDQ5MjIsImV4cCI6MTY4ODEwODUyMn0.6Nc_evPpN9eW75PTzfd29CUth3RADHZpo470jkPuCxA",
      "updatedAt": "2023-06-30T06:02:02.019Z",
      "createdAt": "2023-06-30T06:02:02.019Z"
    }
  },
  "status": 200,
  "message": [
    {
      "type": "success",
      "content": "User has been successfully registered. Please confirm your email."
    }
  ]
}
```

#### Login/Sign in a user

Route: /api/auth/login
method: POST

👇: Body

```json
{
  "email": "jackson@gmail.com",
  "password": "jackson12345"
}
```

👇: Response

```json
{
  "data": {
    "modifiedResponse": {
      "id": "d983edfc-31d7-47f3-971f-bc3ec6fbd1d5",
      "name": "Jackson",
      "email": "jackson@gmail.com",
      "provider": "email",
      "status": "Pending",
      "confirmationCode": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJlbWFpbCI6ImRldmJhYnl3ZW5kZWVlQGdtYWlsLmNvbSJ9LCJpYXQiOjE2ODgxMDQ5MjIsImV4cCI6MTY4ODEwODUyMn0.6Nc_evPpN9eW75PTzfd29CUth3RADHZpo470jkPuCxA",
      "createdAt": "2023-06-30T06:02:02.019Z",
      "updatedAt": "2023-06-30T06:02:02.019Z"
    },
    "jwtToken": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5ODNlZGZjLTMxZDctNDdmMy05NzFmLWJjM2VjNmZiZDFkNSIsImlhdCI6MTY4ODEwNTAwOCwiZXhwIjoxNjg4MTA4NjA4fQ.2qrIJhJmm9PtZjrvSTDS0PRzmvzP_O5MlAq0G38ng6k"
    }
  },
  "status": 200,
  "message": []
}
```

#### Forgot Password

- Route: /api/v1/auth/forgotPassword
- Method: POST

👇: Body

```json
{
  "email": "jackson@gmail.com"
}
```

👇: Response

```json
{
  "status": "success",
  "message": "An OTP token has been sent to your email"
}
```

---

### URL

#### Shorten a URL

- Route: api/v1/url
- Method: POST
- Header
- Authorization: Bearer {token}

👇: Body

```json
{
  "longURL": "https://www.amazon.com/Too-Late-Definitive-Colleen-Hoover/dp/1538756595/ref=zg_bs_g_books_sccl_1/139-5024682-0087834?psc=1",
  "customName": "book"
}
```

👇: Response

```json
{
   "data": {
        "customUrl": {
            "id": "94f85561-c46d-457a-8b0d-e5b2654871f3",
            "clicks": 0,
            "longURL": "https://www.amazon.com/Too-Late-Definitive-Colleen-Hoover/dp/1538756595/ref=zg_bs_g_books_sccl_1/139-5024682-0087834?psc=1",
            "shortURL": "https://snipit.onrender.com/book",
            "UrlCode": "book",
            "createdBy": "3dabcdc5-eb77-4198-874e-f597d1153908",
            "clickHistory": [],
            "updatedAt": "2023-07-03T09:13:47.086Z",
            "createdAt": "2023-07-03T09:13:47.086Z",
            "customName": null,
            "qrcodeurl": null
        }
    },
    "status": 200,
    "message": [
        {
            "type": "success",
            "content": "Short URL created!"
        }
    ]
}

//Shortening a URL without a custom name
{
    "data": {
        "customUrl": {
            "id": "80c6cc7e-7080-4e30-afed-7841371db20c",
            "clicks": 0,
            "longURL": "https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299/ref=zg_bs_g_books_sccl_4/139-5024682-0087834?psc=1",
            "shortURL": "https://snipit.onrender.com/_JKNjM",
            "UrlCode": "_JKNjM",
            "createdBy": "3dabcdc5-eb77-4198-874e-f597d1153908",
            "clickHistory": [],
            "updatedAt": "2023-07-03T09:19:44.194Z",
            "createdAt": "2023-07-03T09:19:44.194Z",
            "customName": null,
            "qrcodeurl": null
        }
    },
    "status": 200,
    "message": [
        {
            "type": "success",
            "content": "Short URL created!"
        }
    ]
}

//shortening a URL that has already been cached
{
   "data": {
        "customUrl": "https://snipit.onrender.com/_JKNjM"
    },
    "status": 200,
    "message": [
        {
            "type": "success",
            "content": "ShortUrl generated successfully!!"
        }
    ]
}
```

#### Generate QRCode for short URL

- Route: /api/v1/url/qrcode
- Method: POST
- Header
- Authorization: Bearer {token}

👇: Body

```json
{
  "shortURL": "https://snipit.onrender.com/_JKNjM"
}
```

👇: Response

```json
{
  "data": {
    "url": "https://snipit.onrender.com/_JKNjM",
    "qrCodeImageUrl": "https://res.cloudinary.com/dwsbmjhzd/image/upload/v1688376327/qrcodes/dxtapjl1ptuigkfn0jil.png"
  },
  "status": 200,
  "message": [
    {
      "type": "success",
      "content": "QRCode generated!"
    }
  ]
}
```

#### Get Generated Link History

- Route: /api/v1/url/history
- Method: GET
- Header
- Authorization: Bearer {token}

👇: Response

```json
{
  "data": {
    "generatedShortUrl": [
      {
        "shortURL": "https://snipit.onrender.com/_JKNjM",
        "longURL": "https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299/ref=zg_bs_g_books_sccl_4/139-5024682-0087834?psc=1",
        "numberOfClicksOnShortUrl": 1,
        "clickLocation": [
          {
            "location": "Oregon, United States",
            "timestamp": "2023-07-03T09:29:24.118Z"
          }
        ],
        "id": "80c6cc7e-7080-4e30-afed-7841371db20c",
        "qrcodeurl": "https://res.cloudinary.com/dwsbmjhzd/image/upload/v1688376327/qrcodes/dxtapjl1ptuigkfn0jil.png",
        "clicks": 1,
        "createdat": "2023-07-03T09:19:44.194Z"
      },

      {
        "shortURL": "https://snipit.onrender.com/book",
        "longURL": "https://www.amazon.com/Too-Late-Definitive-Colleen-Hoover/dp/1538756595/ref=zg_bs_g_books_sccl_1/139-5024682-0087834?psc=1",
        "numberOfClicksOnShortUrl": 0,
        "clickLocation": [],
        "id": "94f85561-c46d-457a-8b0d-e5b2654871f3",
        "qrcodeurl": null,
        "clicks": 0,
        "createdat": "2023-07-03T09:13:47.086Z"
      },

      {
        "shortURL": "https://snipit.onrender.com/ZIvwUi",
        "longURL": "https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299/ref=zg_bs_g_books_sccl_4/139-5024682-0087834?psc=1",
        "numberOfClicksOnShortUrl": 0,
        "clickLocation": [],
        "id": "6e6679d5-05a2-430e-8275-a0373039f7ef",
        "qrcodeurl": null,
        "clicks": 0,
        "createdat": "2023-07-03T09:22:02.399Z"
      }
    ],
    "shortUrlCount": 3,
    "QRCodeCount": 1
  },
  "status": 200,
  "message": [
    {
      "type": "success",
      "content": "URL history retrieved!"
    }
  ]
}
```

## Lessons I learned while working on this:

- Writing Nodejs with Typescript
- Working with Postgresql

<!-- CONTACT -->

## Contact

- Twitter - [@\_ChinwenduE](https://twitter.com/_ChinwenduE)

- Email - chinwe.promise2016@gmail.com

Project Link: [https://github.com/wendeee/scissor](https://github.com/wendeee/scissor)

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [AltSchool Africa School of Engineering](https://altschoolafrica.com/schools/engineering)
- [Othneil Drew's README Template](https://github.com/othneildrew/Best-README-Template)
- [Ileriayo's Markdown Badges](https://github.com/Ileriayo/markdown-badges)
- <!-- MARKDOWN LINKS & IMAGES -->
  <!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/wendeee/scissor.svg?style=for-the-badge
[contributors-url]: https://github.com/wendeee/scissor/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/wendeee/scissor.svg?style=for-the-badge
[forks-url]: https://github.com/wendeee/scissor/network/members
[stars-shield]: https://img.shields.io/github/stars/wendeee/scissor.svg?style=for-the-badge
[stars-url]: https://github.com/wendeee/scissor/stargazers
[issues-shield]: https://img.shields.io/github/issues/wendeee/scissor.svg?style=for-the-badge
[issues-url]: https://github.com/wendeee/scissor/issues
[license-shield]: https://img.shields.io/github/license/wendeee/scissor.svg?style=for-the-badge
[license-url]: https://github.com/wendeee/scissor/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/enyinna-chinwendu-promise
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[twitter-url]: https://twitter.com/_ChinwenduE
