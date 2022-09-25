
// query variables: profHex
export const fetchUserProfile = "query userProfile($profHex: [ProfileId!]) { profiles(request: { profileIds: $profHex }) { items { id ownedBy handle metadata dispatcher { address canUseRelay } followNftAddress stats { totalFollowers totalFollowing totalPosts totalComments totalMirrors totalPublications totalCollects } } } }"

// query variables: accHex
export const fetchOrganisationDetails = "query GetOrg($accHex: String){ account(id: $accHex){ id name metaURI members { id } projects { id } } }"

// individual user post
// mutate variables: request
export const createPost = "mutation createPostTypedData($request: CreatePublicPostRequest!) { createPostTypedData(request: $request) { id expiresAt typedData { types { PostWithSig { name type } } domain { name chainId version verifyingContract } value { nonce deadline profileId contentURI collectModule collectModuleInitData referenceModule referenceModuleInitData } } } }"