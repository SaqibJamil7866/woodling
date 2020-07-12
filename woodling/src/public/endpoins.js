const baseUrl = 'http://3.133.7.18/woodlig_jwt/controllers/mobile/';

export const imgBaseUrl = 'http://3.133.7.18/woodlig_jwt';

// auth endpoints
export const loginUrl = `${baseUrl}/login.php`;

// home endpoints
export const activityStreamUrl = `${baseUrl}/view-activity-stream.php`;
export const activityDetailsUrl = `${baseUrl}/view-post-details.php`;
export const getPostTaggedUsersUrl = `${baseUrl}/fetch-post-tagged-users.php`;

// follow endpoints
export const getUserFollowingUrl = `${baseUrl}/fetch-user-following.php`;
export const getUserFollowersUrl = `${baseUrl}/fetch-user-followers.php`;


// REGISTER :"register.php",
// FEATCH_USER_PROFILE :"fetch-user-profile.php",
// UPDATE_USER_SETUP_DETAILS :"update-user-setup-details.php",
// FETCH_INDIVIDUAL_SKILLS :"fetch-individual-skills.php",
// FETCH_BUSINESS_SKILLS :"fetch-business-skills.php",
// FETCH_POST_COMMENTS :"fetch-post-comments.php",
// ADD_POST_COMMENTS :"add-post-comment.php",
// FETCH_USER_BALANCE :"fetch-user-balance.php",
// FETCH_WALLET_HISTORY :"fetch-wallet-payment-history.php",
// ADD_AMOUNT_WALLET:"add-amount-in-wallet.php",
// PROMOTION_INSIGHTS:"fetch-promotion-insights.php",
// PROMOTION_STATUS_UPDATE:"update-promotion-status.php", 
// ADD_POST:"add-post.php", 
// SEARCH_PEOPLE:"search-people.php", 

// items endpoints
export const getItemsUrl = `${baseUrl}/item/getitems`;
export const addItemUrl = `${baseUrl}/item/additem`;
export const updateItemUrl = `${baseUrl}/item/updateitem`;
export const deleteItemUrl = `${baseUrl}/item/deleteitem`;
export const getSearchedItemUrl = `${baseUrl}/item/getsearcheditems`;
