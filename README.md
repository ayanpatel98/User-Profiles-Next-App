This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Project Setup

1. First Install the dependencies by using:
- npm install

2. For running on the development server execute:
- npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Assumptions:
In terms of high level view of this application, it basically fetches data from the mock api which contains the users data and displays each users data on the homepage and a particular user can like/dislike a fetched user profile using a button and can see more details of a user by clicking on the user profile tile from a grid of tiles.

## Operation Instructions:
1. This Application has a proper usage of Tailwind CSS, Typscript, Nextjs 14.1.0.

2. Upon starting you will be landed on the home page of the User Profiles Page and as per the requirements, it displays a list of user profiles each with name, email, likes, etc. which would appear in a grid like format aka a card. Each card also has a like button within it so that a user can like a profile of a person and can also dislike it. The details would appear in a grid layout which is responsive. This home page is defined in the index.tsx file located at /page/home/index.tsx. The hompage also has a child component which representes a card having a user profile. It is located at /app/components/user-data.tsx.

3. The User profile data is fetched from a mock API "https://jsonplaceholder.typicode.com/users". The mock api does not have the number of likes for any user profile data, so after fetching the user profiles , I have manually added random likes for each user profile using random function which generates likes in 0-1000 range of a profile.

4. Each card/tile for a user profile has a like button which would increment the number of likes for that particular user by 1. After liking a user, the button would turn into dislike button and would decrement the number of likes by 1. This functionality is a simulation of liking and disliking posts on instagram or facebook .

5. I have used server action or API route functionality to fetch the user profile details from the server and implemented the liking operation for a user profile on it. This is the Implementation of a server action or API route with proper functionality. The server actions are defined in the server-api.ts file which is located at /pages/api/server-action.ts

6. To know more details of a particular user, you just simply click on the user profile card/tile on the homepage and you will be redirected to the user-details page. You will be dynamically be routed on this page based on the userID of the user profile you clicked,  this is the Implementation of a dynamic route with statically generated detail pages. This page also has a go to the home page button which will redirect you back to the home page. This file is located at /pages/user-details/[id].tsx. Also if there is no more detail for a particular user or if you try to access the dynamic path of the user-detail page directly (for e.g., localhost:3000/user-detail/20), then it would show "User Data Not available" text and a button to go back to home.

7. I have made this application mobile responsive using tailwind CSS classes and applied basic styling of the application for a clean and user-friendly interface.

8. I have also implemented type checking in all the components, server action files and components and created interfaces as required in the /app/models folder.


NOTE: I have tried deploying this next.js app on github pages but as per the next.js documentation: Features that require a Node.js server, or dynamic logic that cannot be computed during the build process, are not supported (Ref: https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)