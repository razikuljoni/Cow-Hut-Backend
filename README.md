# [Cow Hut](https://cow-hut-theta.vercel.app/)

## Live Link: https://cow-hut-theta.vercel.app/

## Application Routes:

#### User

-   api/v1/auth/signup (POST)
-   api/v1/users (GET)
-   api/v1/users/648eca5b3c125b692bda7cd0 (Single GET)
-   api/v1/users/648eca5b3c125b692bda7cd0 (PATCH)
-   api/v1/users/648eca2e3c125b692bda7cce (DELETE)

#### Cows

-   api/v1/cows (POST)
-   api/v1/cows (GET)
-   api/v1/cows/648ecb6ae64011cc6c221db3 (Single GET)
-   api/v1/cows/648ecb6ae64011cc6c221db3 (PATCH)
-   api/v1/cows/648ecb6ae64011cc6c221db3 (DELETE) Include an id that is saved in your database

### Pagination and Filtering routes of Cows

-   api/v1/cows?pag=1&limit=10
-   api/v1/cows?sortBy=price&sortOrder=asc
-   api/v1/cows?minPrice=20000&maxPrice=70000
-   api/v1/cows?location=Chattogram
-   api/v1/cows?searchTerm=Cha

#### Orders

-   api/v1/orders (POST)
-   api/v1/orders (GET)

<hr>

## Application Routes with examples

## User

-   api/v1/auth/signup (POST)

example req.body data for buyer

```json
{
    "password": "joni1256",
    "role": "buyer",
    "name": {
        "firstName": "joni",
        "lastName": "fourkan"
    },
    "phoneNumber": "0184361111",
    "address": "Dhaka",
    "budget": 70000
}
```

example req.body data for seller

```json
{
    "password": "joni1256",
    "role": "seller",
    "name": {
        "firstName": "joni",
        "lastName": "fourkan"
    },
    "phoneNumber": "0184361111",
    "address": "Dhaka"
}
```

-   api/v1/users (GET)

example response data for all users

```json
{
    "success": true,
    "statusCode": 200,
    "message": "Users retrieved successfully",
    "data": [{}, {}]
}
```

-   api/v1/users/648ec8f33c125b692bda7cc1 (get a single user)

example response data for get a single user

```json
{
    "success": true,
    "statusCode": 200,
    "message": "User retrieved successfully",
    "data": {}
}
```

-   api/v1/users/648ec8f33c125b692bda7cc1 (PATCH)

example req.body data for PATCH

```json
{
    "phoneNumber": "01623111111",
    "address": "Rangpur"
}
```

example response data for PATCH

```json
{
    "success": true,
    "statusCode": 200,
    "message": "🆗 Users data updated successfully",
    "data": {
        "name": {
            "firstName": "maruf",
            "lastName": "shahid"
        },
        "_id": "648e8e5daeb40c83824fbfbd",
        "password": "test1256",
        "role": "buyer",
        "phoneNumber": "01623111111",
        "address": "Rangpur",
        "budget": 50000,
        "income": 0,
        "createdAt": "2023-06-18T04:55:57.155Z",
        "updatedAt": "2023-06-18T06:15:50.779Z",
        "__v": 0,
        "id": "648e8e5daeb40c83824fbfbd"
    }
}
```

-   api/v1/users/648ec8f33c125b692bda7cc1 (DELETE)

example response for user deleteing

```json
{
    "success": true,
    "statusCode": 200,
    "message": "🆗 Users deleted successfully!",
    "data": {
        "name": {
            "firstName": "maruf",
            "lastName": "shahid"
        },
        "_id": "648e8e5daeb40c83824fbfbd",
        "password": "test1256",
        "role": "buyer",
        "phoneNumber": "01623111111",
        "address": "Rangpur",
        "budget": 50000,
        "income": 0,
        "createdAt": "2023-06-18T04:55:57.155Z",
        "updatedAt": "2023-06-18T06:15:50.779Z",
        "__v": 0,
        "id": "648e8e5daeb40c83824fbfbd"
    }
}
```

### Cows

-   api/v1/cows (POST)

example cow req.body cow data

```json
{
    "name": "king",
    "age": 6,
    "price": 50000,
    "location": "Dhaka",
    "breed": "Nellore",
    "weight": 50,
    "category": "DualPurpose",
    "seller": "648e8e87aeb40c83824fbfbf"
}
```

-   api/v1/cows (GET)

example response data

```json
  {
      "success": true,
      "statusCode":200,
      "message": "Cows retrieved successfully",
      "meta": {
        "page": 3,
        "limit": 10,
        "count":100
        }
      "data": [{},{}] ,
  }
```

-   api/v1/cows/648ecb6ae64011cc6c221db3 (get a single cow)

example response data

```json
{
    "success": true,
    "statusCode": 200,
    "message": "🆗Single Cow data retrived successfully!",
    "data": {
        "_id": "648ea236be69e3b3da279379",
        "name": "john chena",
        "age": 6,
        "price": 50000,
        "location": "Dhaka",
        "breed": "Nellore",
        "weight": 50,
        "label": "for sale",
        "category": "DualPurpose",
        "seller": "648e8e87aeb40c83824fbfbf",
        "createdAt": "2023-06-18T06:20:38.927Z",
        "updatedAt": "2023-06-18T06:20:38.927Z",
        "__v": 0,
        "id": "648ea236be69e3b3da279379"
    }
}
```

-   api/v1/cows/648ecb6ae64011cc6c221db3 (update a cow)
    example req.body data

```json
{
    "name": "Raja",
    "age": 5,
    "price": 60000
}
```

example response data

```json
{
    "success": true,
    "statusCode": 200,
    "message": "🆗 Cow data updated successfully!",
    "data": {
        "_id": "648ea224be69e3b3da279374",
        "name": "Raja",
        "age": 5,
        "price": 60000,
        "location": "Dhaka",
        "breed": "Nellore",
        "weight": 50,
        "label": "for sale",
        "category": "DualPurpose",
        "seller": "648e8e87aeb40c83824fbfbf",
        "createdAt": "2023-06-18T06:20:20.220Z",
        "updatedAt": "2023-06-18T08:07:29.804Z",
        "__v": 0,
        "id": "648ea224be69e3b3da279374"
    }
}
```

-   api/v1/cows/648ecb6ae64011cc6c221db3 (DELETE a cow)

example response data

```json
{
    "success": true,
    "statusCode": 200,
    "message": "🆗 Cow deleted successfully!",
    "data": {
        "_id": "648ea236be69e3b3da279379",
        "name": "Raja",
        "age": 6,
        "price": 50000,
        "location": "Dhaka",
        "breed": "Nellore",
        "weight": 50,
        "label": "for sale",
        "category": "DualPurpose",
        "seller": "648e8e87aeb40c83824fbfbf",
        "createdAt": "2023-06-18T06:20:38.927Z",
        "updatedAt": "2023-06-18T06:21:58.599Z",
        "__v": 0,
        "id": "648ea236be69e3b3da279379"
    }
}
```

## Pagination and Filtering routes of Cows

-   api/v1/cows?pag=1&limit=2
    example response data

```json
{
    "success": true,
    "statusCode": 200,
    "message": "🆗 Cows data retrived successfully!",
    "meta": {
        "page": "1",
        "limit": "2",
        "total": 7
    },
    "data": [
        {
            "_id": "648eb9f54f1ea1724732d625",
            "name": "john chena",
            "age": 6,
            "price": 50000,
            "location": "Dhaka",
            "breed": "Nellore",
            "weight": 50,
            "label": "for sale",
            "category": "DualPurpose",
            "seller": "648e8e87aeb40c83824fbfbf",
            "createdAt": "2023-06-18T08:01:57.075Z",
            "updatedAt": "2023-06-18T08:01:57.075Z",
            "__v": 0,
            "id": "648eb9f54f1ea1724732d625"
        },
        {
            "_id": "648ea224be69e3b3da279374",
            "name": "Raja",
            "age": 5,
            "price": 60000,
            "location": "Dhaka",
            "breed": "Nellore",
            "weight": 50,
            "label": "for sale",
            "category": "DualPurpose",
            "seller": "648e8e87aeb40c83824fbfbf",
            "createdAt": "2023-06-18T06:20:20.220Z",
            "updatedAt": "2023-06-18T08:07:29.804Z",
            "__v": 0,
            "id": "648ea224be69e3b3da279374"
        }
    ]
}
```

-   api/v1/cows?sortBy=price&sortOrder=asc

example response data

```json
{
    "success": true,
    "statusCode": 200,
    "message": "🆗 Cows data retrived successfully!",
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 4
    },
    "data": [
        {
            "_id": "648e8f84aeb40c83824fbfcc",
            "name": "ronaldo",
            "age": 4,
            "price": 3000,
            "location": "Dhaka",
            "breed": "Nellore",
            "weight": 80,
            "label": "for sale",
            "category": "Dairy",
            "seller": "648e8e87aeb40c83824fbfbf",
            "createdAt": "2023-06-18T05:00:52.870Z",
            "updatedAt": "2023-06-18T05:00:52.870Z",
            "__v": 0,
            "id": "648e8f84aeb40c83824fbfcc"
        },
        {
            "_id": "648e8f9aaeb40c83824fbfd0",
            "name": "neymar",
            "age": 6,
            "price": 4000,
            "location": "Dhaka",
            "breed": "Nellore",
            "weight": 50,
            "label": "for sale",
            "category": "Dairy",
            "seller": "648e8e87aeb40c83824fbfbf",
            "createdAt": "2023-06-18T05:01:14.691Z",
            "updatedAt": "2023-06-18T05:01:14.691Z",
            "__v": 0,
            "id": "648e8f9aaeb40c83824fbfd0"
        },
        {
            "_id": "648ea1ec2de967f7c085a0a9",
            "name": "john chena",
            "age": 6,
            "price": 50000,
            "location": "Dhaka",
            "breed": "Nellore",
            "weight": 50,
            "label": "sold out",
            "category": "Dairy",
            "seller": "648e8e87aeb40c83824fbfbf",
            "createdAt": "2023-06-18T06:19:24.847Z",
            "updatedAt": "2023-06-18T06:28:23.401Z",
            "__v": 0,
            "id": "648ea1ec2de967f7c085a0a9"
        }
    ]
}
```

-   api/v1/cows?minPrice=20000&maxPrice=70000

example response data

```json
{
    "success": true,
    "statusCode": 200,
    "message": "🆗 Cows data retrived successfully!",
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 7
    },
    "data": [
        {
            "_id": "648eb9f54f1ea1724732d625",
            "name": "john chena",
            "age": 6,
            "price": 50000,
            "location": "Dhaka",
            "breed": "Nellore",
            "weight": 50,
            "label": "for sale",
            "category": "DualPurpose",
            "seller": "648e8e87aeb40c83824fbfbf",
            "createdAt": "2023-06-18T08:01:57.075Z",
            "updatedAt": "2023-06-18T08:01:57.075Z",
            "__v": 0,
            "id": "648eb9f54f1ea1724732d625"
        },
        {
            "_id": "648ea224be69e3b3da279374",
            "name": "Raja",
            "age": 5,
            "price": 60000,
            "location": "Dhaka",
            "breed": "Nellore",
            "weight": 50,
            "label": "for sale",
            "category": "DualPurpose",
            "seller": "648e8e87aeb40c83824fbfbf",
            "createdAt": "2023-06-18T06:20:20.220Z",
            "updatedAt": "2023-06-18T08:07:29.804Z",
            "__v": 0,
            "id": "648ea224be69e3b3da279374"
        }
    ]
}
```

-   api/v1/cows?location=Dhaka

example response data

```json
{
    "success": true,
    "statusCode": 200,
    "message": "🆗 Cows data retrived successfully!",
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 7
    },
    "data": [
        {
            "_id": "648e8f46aeb40c83824fbfc8",
            "name": "Messi",
            "age": 4,
            "price": 3000,
            "location": "Rangpur",
            "breed": "Brahman",
            "weight": 80,
            "label": "sold out",
            "category": "Beef",
            "seller": "648e8e87aeb40c83824fbfbf",
            "createdAt": "2023-06-18T04:59:50.705Z",
            "updatedAt": "2023-06-18T05:05:40.911Z",
            "__v": 0,
            "id": "648e8f46aeb40c83824fbfc8"
        }
    ]
}
```

-   api/v1/cows?searchTerm=ran

example response data

```json
{
    "success": true,
    "statusCode": 200,
    "message": "🆗 Cows data retrived successfully!",
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 7
    },
    "data": [
        {
            "_id": "648e8f46aeb40c83824fbfc8",
            "name": "Messi",
            "age": 4,
            "price": 3000,
            "location": "Rangpur",
            "breed": "Brahman",
            "weight": 80,
            "label": "sold out",
            "category": "Beef",
            "seller": "648e8e87aeb40c83824fbfbf",
            "createdAt": "2023-06-18T04:59:50.705Z",
            "updatedAt": "2023-06-18T05:05:40.911Z",
            "__v": 0,
            "id": "648e8f46aeb40c83824fbfc8"
        }
    ]
}
```

### Orders

-   api/v1/orders (POST)

example req.body data

```json
{
    "cow": "648eb9f54f1ea1724732d625",
    "buyer": "648e8eecaeb40c83824fbfc3"
}
```

example response for successfull order

```json
{
    "success": true,
    "statusCode": 200,
    "message": "🆗 Order created successfully",
    "data": {
        "cow": "648eb9f54f1ea1724732d625",
        "buyer": "648e8eecaeb40c83824fbfc3",
        "_id": "648ebe5a4f1ea1724732d64b",
        "createdAt": "2023-06-18T08:20:42.366Z",
        "updatedAt": "2023-06-18T08:20:42.366Z",
        "__v": 0,
        "id": "648ebe5a4f1ea1724732d64b"
    }
}
```

example response if cow is sold out

```json
{
    "success": false,
    "message": "🚫 The cow is already sold out!",
    "errorMessages": [
        {
            "path": "",
            "message": "🚫 The cow is already sold out!"
        }
    ],
    "stack": "Error: 🚫 The cow is already sold out!\n    at E:\\Next Level Web Development\\Assignment-03\\src\\app\\modules\\order\\order.service.ts:60:15\n    at Generator.next (<anonymous>)\n    at fulfilled (E:\\Next Level Web Development\\Assignment-03\\src\\app\\modules\\order\\order.service.ts:5:58)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)"
}
```

-   api/v1/orders (GET)

example response for get all orders

```json
{
    "success": true,
    "statusCode": 200,
    "message": "🆗 Orders data retrived successfully",
    "data": [
        {
            "_id": "648e9022aeb40c83824fbfd8",
            "cow": "648e8f46aeb40c83824fbfc8",
            "buyer": "648e8e5daeb40c83824fbfbd",
            "createdAt": "2023-06-18T05:03:30.733Z",
            "updatedAt": "2023-06-18T05:03:30.733Z",
            "__v": 0,
            "id": "648e9022aeb40c83824fbfd8"
        },
        {
            "_id": "648e90a4c25bea6967206a67",
            "cow": "648e8f46aeb40c83824fbfc8",
            "buyer": "648e8e5daeb40c83824fbfbd",
            "createdAt": "2023-06-18T05:05:40.995Z",
            "updatedAt": "2023-06-18T05:05:40.995Z",
            "__v": 0,
            "id": "648e90a4c25bea6967206a67"
        }
    ]
}
```
