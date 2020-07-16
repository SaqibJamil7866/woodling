const baseUrl = 'http://3.133.7.18/woodlig_jwt/controllers/mobile/';

export const siteUrl = 'http://3.133.7.18/woodlig_jwt/';

// auth endpoints
export const loginUrl = `${baseUrl}/login.php`;

// home endpoints
export const activityStreamUrl = `${baseUrl}/view-activity-stream.php`;
export const activityDetailsUrl = `${baseUrl}/view-post-details.php`;
export const getPostTaggedUsersUrl = `${baseUrl}/fetch-post-tagged-users.php`;

// follow endpoints
export const getUserFollowingUrl = `${baseUrl}/fetch-user-following.php`;
export const getUserFollowersUrl = `${baseUrl}/fetch-user-followers.php`;

// comments endpoints
export const getCommentsUrl = `${baseUrl}/fetch-post-comments.php`;
export const addCommentsUrl = `${baseUrl}/add-post-comment.php`;

// talent endpoints
export const getFeaturedTalentUrl = `${baseUrl}/fetch-featured-talents.php`;
export const getAllTalentsUrl = `${baseUrl}/fetch-all-talents.php`;
export const searchTalentUrl = `${baseUrl}/search-talents.php`;
export const getTalentDetailsUrl = `${baseUrl}/fetch-talent-details.php`;
export const getStarredTalentsUrl = `${baseUrl}/fetch-starred-talents.php`;
export const starTalentUrl = `${baseUrl}/star-talent.php`;
export const unstartTalentUrl = `${baseUrl}/unstar-talent.php`;
export const getStarredNotesUrl = `${baseUrl}/fetch-starred-notes.php`;
export const addStarredNotesUrl = `${baseUrl}/add-starred-notes.php`;

// skills endpoints
export const getIndividualSkillsUrl = `${baseUrl}/fetch-individual-skills.php`;
export const addBusinessSkillsNoUrl = `${baseUrl}/fetch-business-skills.php`;

// REGISTER :"register.php",
// FEATCH_USER_PROFILE :"fetch-user-profile.php",
// UPDATE_USER_SETUP_DETAILS :"update-user-setup-details.php",
// ADD_POST_COMMENTS :"",
// FETCH_USER_BALANCE :"fetch-user-balance.php",
// FETCH_WALLET_HISTORY :"fetch-wallet-payment-history.php",
// ADD_AMOUNT_WALLET:"add-amount-in-wallet.php",
// PROMOTION_INSIGHTS:"fetch-promotion-insights.php",
// PROMOTION_STATUS_UPDATE:"update-promotion-status.php", 
// ADD_POST:"add-post.php", 
// SEARCH_PEOPLE:"search-people.php", 
