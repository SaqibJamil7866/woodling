import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const question = [
  {
    key: 0,
    question: 'What is Woodling?',
    answer: `Woodlig is a professional social media platform for creatives,
        it’s about talent discovery, it’s about job opportunities and
        networking in style.`,
  },
  {
    key: 1,
    question: 'Getting started with Woodlig',
    answer: `Once you download the woodlig app or log on to www.woodlig.com, you can create an
    account and start using woodlig.`,
  },
  {
    key: 2,
    question: 'How to download the woodlig app',
    answer: `You can download the woodlig app on an ios device in the appstore here or on an android
    device on the playstore here.`,
  },
  {
    key: 3,
    question: 'What is the difference between a basic and a premium account?',
    answer: `The basic account offers users most of woodlig’s features. A user will be able to post and
    view posts on the activity stream, check casting calls, appear on and check find talent, post
    on and browse through marketplace, message users and create circles. The premium
    account offers a lot of extra features and tools. With the premium account you can message
    premium members on the app, get more exposure and move your business or career
    quicker/`,
  },
  {
    key: 4,
    question: 'Problem Displaying content',
    answer: `When you are having a problem displaying content on the app, make sure that you have the
    latest version of woodlig (support for old versions of some applications may be disabled) and
    also make sure that it is compatible or supports your OS. You can always update your OS
    from your phone as long as your device supports a newer version.`,
  },
  {
    key: 5,
    question: 'Updating Woodlig',
    answer: `It is advisable to always use an updated version of any app you are using. If you are having
    problems updating the woodlig app, you may consider looking at the version of your OS and
    if it is supported, if it is not, you may need to upgrade your OS from your phone settings. You
    can also check your phone storage to make sure there is enough space to download and
    install the app.`,
  },
  {
    key: 6,
    question: 'Changing the Language',
    answer: `Woodlig currently supports French and English languages and you can also select your
    language if it is not already on default from the website footer, or from the sign up page of
    the app.`,
  },
  {
    key: 7,
    question: 'Using the web version',
    answer: `You can always use woodlig on a web browser by logging on to www.woodlig.com`,
  },
  {
    key: 8,
    question: 'Is woodlig safe to use at work?',
    answer: `Woodlig has community guidelines that all users must adhere to. The content posted and
    shared on woodlig mustn’t be not safe for work (NSFW) content, despite the rules and
    guidelines, we encourage members of our community to report any content deemed NSFW
    for our administrators to take down.`,
  },
  {
    key: 9,
    question: 'Can I use my woodlig account on different devices at once?',
    answer: `A user can be able to log on to their woodlig account and also be logged in on the web
    simultaneously. If woodlig notices any abnormal login behavior to a user’s account, an email
    or sms will be sent to alert the user of this behavior.`,
  },
  {
    key: 10,
    question: 'Can I use two woodlig accounts on my device?',
    answer: `Unfortunately, woodlig doesn’t allow for double account usage on the app at the same time,
    but users will be informed once this feature is available.`,
  },
];

const security = [
  {
    key: 0,
    question: 'Login Problem',
    answer: `You can retrieve your password via your registered email or phone number. Make sure you
    use a secure password that you will also remember.`,
  },
  {
    key: 1,
    question: 'Resetting Password',
    answer: `The way to reset your password is by clicking on reset password on the sign up page and
    entering your email address or phone number. A link will be sent to your email address or a
    code will be sent to your phone. If you receive this messages without actually requesting
    password reset, you should immediately secure your account by reseting your current
    password and reporting the incident to woodlig.`,
  },
  {
    key: 2,
    question: 'How do I verify that I am using the right download link?',
    answer: `The official woodlig app listed as woodlig with all of woodlig’s trademarks listed on the
    appstore, playstore and at www.woodlig.com on the web are the only official channels
    woodlig publishes its app and website. Do not download or access woodlig any other way in
    order to secure your account.`,
  },
  {
    key: 3,
    question: 'Do I need to verify my account to use woodlig?',
    answer: `You can use woodlig temporarily without verifying your account. It is recommended that you
    verify your account by clicking on the verify link sent through your email or phone. You can
    always click on the “verify my account” to have a verification link sent.`,
  },
  {
    key: 4,
    question: 'Stolen or lost phone',
    answer: `Woodlig recovery works by sending an email to your registered email address or a code to
    your phone number. When your device with access to these accounts is lost, we advise you
    to report to your mobile network provider immediately so you can recover your accounts
    and email.`,
  },
  {
    key: 5,
    question: 'How can I report a user?',
    answer: `You can report a user or a post through the report option on a post or a user’s profile. You
    can always write to webmaster@woodlig.com for any content you find inappropriate so the
    woodlig team can investigate.`,
  },
  {
    key: 6,
    question: 'Do I need to read the terms of service',
    answer: `To use woodlig or any of woodlig’s products means you have read and agreed with woodlig’s
    terms and conditions of service.`,
  },
];

const privacy = [
  {
    key: 0,
    question: 'Private and public accounts',
    answer: `You can make your account private to limit viewing of certain details of your accounts
    including your connections, projects and personal details to only the users that you have
    accepted to follow you. A public account will display a complete profile to followers and
    non-followers.`,
  },
  {
    key: 1,
    question: 'Is my data safe with woodlig?',
    answer: `You can take a look at our data policy here (link to data policy). We do not sell or share in
    any way, our users’ data. It is our obligation to protect the data and information you share
    with us.`,
  },
  {
    key: 2,
    question: 'What happens to my data when I delete my woodlig account?',
    answer: `It is known to us that when most users delete their accounts, they usually have a change of
    mind shortly after. We allow users to re-activate deleted accounts up to 30 days after
    deletion. To make this possible, their data will be kept for 30 days (except the user indicates
    otherwise) to allow us to retireve their profiles when they reactivate. If there is no
    reactivation after 30 days, the data is deleted permanently.`,
  },
  {
    key: 3,
    question: 'How do I know when someone views my profile?',
    answer: `When a user views your profile, you will be notified that your profile has been viewed. If you
    have a premium account, you should be able to see all profile viewers, if you are not a
    premium user, you can always upgrade to a premium account by clicking the account button
    on your profile.`,
  },
  {
    key: 4,
    question: 'How do I report a user using my photos or works (catfish)?',
    answer: `Using someone else’s copyrighted material is a violation of our terms of use. If any user is
    reported doing such, our team will quickly investigate and remove the content. After
    warnings, an account that doesn’t adhere to copyright policies will be suspended, or when
    an account is evidently a “catfish” (fake account) it will be deleted.`,
  },
  {
    key: 5,
    question: 'Can I report someone for stalking?',
    answer: `You have the option to block a user from the privacy setting or from the user’s profile view.
    If you suspect a user created a separate account to be able to follow you, you are advised to
    block the account and report the account using the account report feature on the user’s
    profile.`,
  },
  {
    key: 6,
    question: 'How can I prevent my location from being shown to other users?',
    answer: `You can always toggle the show location tab in the privacy settings to disable woodlig from
    displaying your location and the tagged location on your posts.`,
  },
  {
    key: 7,
    question: 'Can unregistered users view my profile?',
    answer: `You can always make your account a private account in the privacy settings page. That way,
    only user’s whose connection request you have accepted will be able to view your content
    and profile. You can also decide to either display or not display your email address, phone
    number and so on.`,
  },
  {
    key: 8,
    question: 'Is my profile and content visible on search engines?',
    answer: `If you have a public profile, searches on search engines like Google will bring up your profile
    or content. That is good for discovery. If you wish to not have your profile and content
    appear in search results, you can make your profile private in the privacy settings.`,
  },
];

const legal = [
  {
    key: 0,
    question: 'Information on ads',
    answer: `How woodlig ads work – We want to show you ads that you find interesting and engaging or
    helpful. This will provide an overview of our advertisement system, how it works and privacy
    settings and options.`,
  },
  {
    key: 1,
    question: 'What are woodlig ads?',
    answer: `You may see different types of promoted content including user profiles, posts and marketplace
    items. These are Woodlig promotions that are paid for by some woodlig users or companies.
    Woodlig displays these promotions on your timeline as ads. These ads are clearly marked as
    promotions.`,
  },
  {
    key: 2,
    question: 'Managing Privacy',
    answer: `Privacy and how to stop ads from showing, your profile and activities determine which relevant
    ads a shown to you. This is an automated process and woodlig does not share your data with the
    third parties that display promoted ads on woodlig.`,
  },
];

const EditFAQ = () => {
  const [q1, setQ1] = useState('');

  const openQ1 = (index) => {
    setQ1(index);
  };
  return (
    <div className="h100p">
      <div className="row m0">
        <div className="col-md-2">
          <div className="min-h100 box-shadow d-flex flex-dir-col align-items-center">
            <a
              to="/settings/#general"
              className="clr__red border-red border-radius-50p text-decoration-none mt10"
            >
              <div className="clr__red p10">1</div>
            </a>
            <a
              href="#security"
              className="clr__red border-red border-radius-50p text-decoration-none mt10"
            >
              <div className="clr__red p10">2</div>
            </a>
            <a
              href="#privacy"
              className="clr__red border-red border-radius-50p text-decoration-none mt10"
            >
              <div className="clr__red p10">3</div>
            </a>
            <a
              href="#legal"
              className="clr__red border-red border-radius-50p text-decoration-none mt10"
            >
              <div className="clr__red p10">4</div>
            </a>
          </div>
        </div>
        <div id="general" className="col-md-10">
          <h4>
            <b>Frequently Asked Questions</b>
          </h4>
          <div className="bkgrnd-red d-flex justify-content-end align-items-center">
            <h3 className="clr-white mr15">General</h3>
            <h1 className="clr-white mr10">
              <b>1</b>
            </h1>
          </div>
          {question.map((i, index) => (
            <div
              key={index}
              className="pointer mt10 box-shadow min-h100 d-flex flex-dir-col justify-content-center"
              onClick={() => openQ1(index)}
            >
              <h6>
                <b>{i.question}</b>
              </h6>
              {q1 === i.key ? <p>{i.answer}</p> : null}
            </div>
          ))}
          <div
            id="security"
            className="bkgrnd-red d-flex justify-content-end align-items-center"
          >
            <h3 className="clr-white mr15">Security</h3>
            <h1 className="clr-white mr10">
              <b>2</b>
            </h1>
          </div>
          {security.map((i, index) => (
            <div
              key={index}
              className="pointer mt10 box-shadow min-h100 d-flex flex-dir-col justify-content-center"
              onClick={() => openQ1(index)}
            >
              <h6>
                <b>{i.question}</b>
              </h6>
              {q1 === i.key ? <p>{i.answer}</p> : null}
            </div>
          ))}
          <div
            id="privacy"
            className="bkgrnd-red d-flex justify-content-end align-items-center"
          >
            <h3 className="clr-white mr15">Privacy</h3>
            <h1 className="clr-white mr10">
              <b>3</b>
            </h1>
          </div>
          {privacy.map((i, index) => (
            <div
              key={index}
              className="pointer mt10 box-shadow min-h100 d-flex flex-dir-col justify-content-center"
              onClick={() => openQ1(index)}
            >
              <h6>
                <b>{i.question}</b>
              </h6>
              {q1 === i.key ? <p>{i.answer}</p> : null}
            </div>
          ))}
          <div
            id="legal"
            className="bkgrnd-red d-flex justify-content-end align-items-center"
          >
            <h3 className="clr-white mr15">Legal</h3>
            <h1 className="clr-white mr10">
              <b>4</b>
            </h1>
          </div>
          {legal.map((i, index) => (
            <div
              key={index}
              className="pointer mt10 box-shadow min-h100 d-flex flex-dir-col justify-content-center"
              onClick={() => openQ1(index)}
            >
              <h6>
                <b>{i.question}</b>
              </h6>
              {q1 === i.key ? <p>{i.answer}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditFAQ;
