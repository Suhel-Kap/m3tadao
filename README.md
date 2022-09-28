Demo link -> https://youtu.be/X_iOaNCVSNo

M3taDao combines Lens Protocol & Valist to create a single contract to interact with, that way we created a space for decentralized profiles and organizations. It is like a decentralized GitHub-Social-Discord application. The idea behind our project is to give the ability to anyone to initiate their organizations/projects, create a team, and manage everything in a decentralized manner as NFTs. Each user can create a Lens profile, that unlocks the actions of ( creating posts, retweet-comment others' posts, getting followed, and following others' profiles ). Additionally, each User can create their portfolio or their organization accounts using Valist. Each account consists of projects. The project can be (Web3Tools, Web3Dapps, Docs, and Web3Games ). Every project has its corresponding releases that contain ( the IPFS Url of the Project(Website-Game_Binary-Docs files and additional metadata ). The cool part comes into place when an Organization wraps its projects as NFTs. That allows them to give access to their Services only to people with the corresponding NFT, which is like Google and App Store but access is handled by NFTs instead of bank payments. Likewise, each organization is formed by its members and a treasury. Users can establish hiring requests into organizations or teams to join them and start Contributing to them, and Organizations can accept them and make programmable Stream Payments using Superfluid and the Gelato Oracle using their treasury!

Besides all that users can communicate with other fellows using XMTP private chats, and each organization consists of an XMTP GroupChat to discuss new features and other project-related stuff!

Tableland is used to store in the tables the basic contract interactions and that makes our Dapp index our user's data in a pretty fast and scalable way. Furthermore writing and updating the tables can be done only by our SmartContract that way we keep the integrity of our Database.

After fetching our user's Data using SQL Queries we are making specific queries to Lens&Valist GraphQL subgraphs to fetch more details about User Profiles, Organizations, and their interactions.

We are also using EPNS to inform our users of meaningful events.

One more use case we are covering is a Sybil-resistant mechanism using WorldCoin to avoid duplications in profiles and bots!

All the Data of our Application are stored in IPFS Using Valist-SDK and Web3.Storage.




This project combines @Valist and @Lens SmartContracts into one. We are also integrating @Tableland for storing contract data & interactions into tables that only our SmartContract has access control for updating and writing into them. We are leveraging @GraphQL for accessing detailed data for our Users and Organizations using Lens and Valist subgraphs. Besides all that we are leveraging @EPNS for notifications, @Worldcoin to add Sybil-resistance, @XMTP for chatting features, and @Superfluid x @Gelato oracle for programmable payments Streams! Our Dapp is hosted using @Spheron and we will add the m3tadao.eth @ENS domain to be easily accessible.






This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.jsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
