const baseUrl = 'http://3.133.7.18/woodlig_jwt/controllers/mobile/';
const locationUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';

export const siteUrl = 'http://3.133.7.18/woodlig_jwt/';
export const picUrl = 'http://3.133.7.18/'

// auth endpoints
export const loginUrl = `${baseUrl}/login.php`;

// home endpoints
export const activityStreamUrl = `${baseUrl}/view-activity-stream.php`;
export const activityDetailsUrl = `${baseUrl}/view-post-details.php`;
export const getPostTaggedUsersUrl = `${baseUrl}/fetch-post-tagged-users.php`;
export const getTagPeopleUrl = `${baseUrl}/fetch-tags.php`;

// User endpoints
export const getUserProfileUrl = `${baseUrl}/fetch-user-profile.php`;

//User Album endpoints
export const getUserProfileAlbumUrl = `${baseUrl}/fetch-user-profile-album.php`;

// userReview endpoints
export const getUserProfileReviewUrl = `${baseUrl}/fetch-user-review.php`;

//userPost endpoints
export const getUserPostsUrl = `${baseUrl}/fetch-user-posts.php`;

//user Tag Post endpoints
export const getUserTagPostUrl = `${baseUrl}/fetch-user-tagged-posts.php`;

// follow endpoints
export const getUserFollowingUrl = `${baseUrl}/fetch-user-following.php`;
export const getUserFollowersUrl = `${baseUrl}/fetch-user-followers.php`;

//add review endpoints
export const addReviewUrl = `${baseUrl}/add-review.php`

// comments endpoints
export const getCommentsUrl = `${baseUrl}/fetch-post-comments.php`;
export const addCommentsUrl = `${baseUrl}/add-post-comment.php`;
export const addCommentReplyUrl = `${baseUrl}/add-comment-reply.php`;
export const addCommentReactionUrl = `${baseUrl}/add-comment-reaction.php`;

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

// casting calls endpoints
export const getUserAppliedJobsUrl = `${baseUrl}/fetch-user-applied-jobs.php`;
export const getCastingCallApplicationUrl = `${baseUrl}/fetch-casting-call-applicants.php`;
export const getCastingCallRoleDetailsUrl = `${baseUrl}/fetch-casting-call-role-details.php`;
export const getAllCastingCallUrl = `${baseUrl}/fetch-all-casting-call.php`;
export const deleteCastingCallUrl = `${baseUrl}/delete-casting-call.php`;
export const getCastingCallDetailsUrl = `${baseUrl}/view-casting-call-details.php`;
export const applyCastingCallUrl = `${baseUrl}/apply-for-casting-call.php`;
export const cancleCastingCallApplicationUrl = `${baseUrl}/cancel-casting-call-application.php`;
export const getUserPostedJobsUrl = `${baseUrl}/fetch-user-posted-jobs.php`;
export const addCastingCallUrl = `${baseUrl}/add-casting-call.php`;
export const editCastingCallUrl = `${baseUrl}/edit-casting-call.php`;
export const getUserCastingCallsUrl = `${baseUrl}/fetch-user-casting-calls.php`;
export const roleTypeUrl = `${baseUrl}/fetch-role-type.php`;
export const getLocationUrl = `${locationUrl}`

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
