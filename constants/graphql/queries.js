// query variables: profHex
export const fetchUserProfile = "query userProfile($profHex: [ProfileId!]) { profiles(request: { profileIds: $profHex }) { items { id ownedBy handle metadata dispatcher { address canUseRelay } followNftAddress stats { totalFollowers totalFollowing totalPosts totalComments totalMirrors totalPublications totalCollects } } } }"

// query variables: accHex
export const fetchOrganisationDetails = "query GetOrg($accHex: String){ account(id: $accHex){ id name metaURI members { id } projects { id name releases { id name metaURI } } } }"

export const fetchProjectDetails = "query GetProj ($projId: String){ project(id: $projId){ id name metaURI members{ id } releases {id name metaURI }}}"

export const ACCOUNTS_SEARCH__QUERY = "\n query AccountSearch($search: String){\n accounts(where:{name_contains: $search}){\n id\n name\n metaURI\n }\n }\n"