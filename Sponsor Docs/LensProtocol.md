M3tadao integrates Lens Protocol for each user

We first interacting with the createProfileProxy from our m3taUser.sol contract here : https://github.com/Suhel-Kap/m3tadao/blob/mantine/contracts/contracts/m3taUser.sol
we have done that bc we wanted to add the profile data into tableland. That way we are establishing faster indexing for the profileID(HEX) to fetch profile Data
(Posts-Followers-Following) from graphQL Lens subgraph

We are also interacting with the LensHub(Proxy) from the backend of our application to create posts - follow others - making mirrors and comments to other profiles

The hook for that actions is located here : https://github.com/Suhel-Kap/m3tadao/blob/main/hooks/useLens.js
