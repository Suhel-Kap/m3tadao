
// query variables: profHex
export const fetchUserProfile = "query userProfile($profHex: [ProfileId!]) { profiles(request: { profileIds: $profHex }) { items { id ownedBy handle metadata dispatcher { address canUseRelay } followNftAddress stats { totalFollowers totalFollowing totalPosts totalComments totalMirrors totalPublications totalCollects } } } }"

// query variables: accHex
export const fetchOrganisationDetails = "query GetOrg($accHex: String){ account(id: $accHex){ id name metaURI members { id } projects { id } } }"