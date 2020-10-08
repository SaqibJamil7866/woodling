import React, { useState } from 'react';

const useWoodling = [
  {
    key: 0,
    question: 'Find Friends',
    answer: `You can easily find friends by uploading your email address book. The app supports Gmail, yahoo
    mail, Hotmail, outlook and other webmail platforms like KonsoleH. You can do this at any time by
    using the find friends’ option in settings.`,
  },
  {
    key: 1,
    question: 'Privacy and Safety',
    answer: `Protect your posts! Select this option in settings to approve people you wish to view your posts. You
    may also change this setting at any time for post you wish to appear to everyone.`,
  },
  {
    key: 2,
    question: 'Post Location',
    answer: `You may wish to tag a location with your post. The location may also be deleted at any time.`,
  },
  {
    key: 3,
    question: 'Photo tagging',
    answer: `As a default setting, anyone who follows you on Woodlig can tag you on a post. You can also restrict
    people who can tag you on a post in your Woodlig settings. You may also choose to remove tags of
    you on specific posts.`,
  },
  {
    key: 4,
    question: 'Discoverability',
    answer: `This setting lets other users find you by your email address, phone number or location. Once you
    have provided this information, you can choose your privacy setting preferences.`,
  },
  {
    key: 5,
    question: 'Woodlig circles',
    answer: `You can choose anyone you wish to add to a circle. You can also choose which circles you would like
    to be added to. This setting also allows you choose who adds you to a circle.`,
  },
  {
    key: 6,
    question: 'Direct Messages',
    answer: `Anyone can send you a direct message. You can however choose to receive messages from people
    who are connected to you only.`,
  },
  {
    key: 7,
    question: 'Send/Receive read receipts',
    answer: `When someone sends you a message, people in the conversation will know when you have seen it. If
    this setting is turned off, you will not be able to see receipts from other people.`,
  },
  {
    key: 8,
    question: 'block and mute account',
    answer: `Use this to temporarily block or mute unwanted accounts.`,
  },
  {
    key: 9,
    question: 'Unblocked and unmuted accounts',
    answer: `Use this to Unblock and unmute previously blocked accounts`,
  },
  {
    key: 10,
    question: 'Save changes',
    answer: 'Save all changed before exiting settings',
  },
];

const accountSecurity = [
  {
    key: 0,
    question: 'Recomendations',
    answer: `We highly recommend the following best practices to help secure your account;
     Use a unique password that you don’t use on other websites.
     Use login verification.
     Select both your email and phone number as requirements to request a reset password link
    or code.
     Be careful with suspicious links and always make sure you’re on Woodlig.com before you
    enter your login information.
     Do not give your username and password out, especially to unscrupulous individuals
    promising to get you more followers, make you money, or verify you.
     Always ensure that you have up-to-date computer software and internet browsers, with the
    most recent upgrades and anti-virus software.`,
  },
  {
    key: 1,
    question: 'Password strength',
    answer: `Create a strong and unique password for your Woodlig account.
     Create a password at least 8 characters long.
     Use a mix of uppercase, lowercase, numbers, and special characters.
     Personal information in your password such as phone numbers and birthdays should be
    avoided.
     Words such as “password”, “iloveyou” and names of loved ones should be avoided.
     Obvious Series such as “12345678” should be avoided.
    For a more secure account, you can select “require personal information to reset my password” in
    your Account settings. Where you tick this box, you will be prompted to use either your email
    address or phone number or both if they are associated with your account to send a reset password
    link or confirmation code if you ever forget it.`,
  },
  {
    key: 2,
    question: 'Use login verification',
    answer: `For extra security on your account, you can choose to use Login verification on your account. This
    feature involves a second check which ensures that you are the only one that can access your
    Woodlig account. Your password, as well as your mobile phone will be required for this additional
    check.`,
  },
  {
    key: 3,
    question: 'Ensure that you are on Woodlig.com',
    answer: `Phishing websites trick you into logging in and giving up your Woodlig login detail. This is done
    mainly to enable the phishers send out spam from your Woodlig account. You may be tricked with a
    link which directs you to a fake login page.
    Thus we advise that whenever you are prompted to enter your Woodlig password, take a quick look
    at the URL in the address bar of your browser to make sure you&#39;re on woodlig.com. Additionally, if
    you receive a Direct Message (even from a friend) with a URL that looks odd, we recommend you do
    not open the link.
    Phishing websites will often look just like an application or service’s login page, but will actually be a
    fake phishing website. Woodlig domain will always have www.woodlig.com the base domain.
    Where you believe that you have been phished, promptly change your password and report the
    incident.`,
  },
  {
    key: 4,
    question: 'New login email alerts',
    answer:
      'As an extra security measure, Woodlig sends email notification whenever you login to your account from a new device. These emails enable you verify that you actually logged in from a new device. Where said login was not done by you, we advise that you change your password immediately and follow the steps contained in the email notification to secure your account.',
  },
];

const EditAbout = () => {
  const [q1, setQ1] = useState('');

  const openQ1 = (index) => {
    setQ1(index);
  };
  return (
    <div className="container d-flex flex-dir-col align-items-center h100p">
      <div className="row m0 w100p">
        <div className="col-md-12">
          <h4>
            <b>About Woodling</b>
          </h4>
          <p>
            The Woodlig app is a professional social media platform for
            creatives, it’s about talent discovery, it’s about jobs
            opportunities &amp; networking in style. Are you an actor or
            actress, musician or comedian, videographer and photographer, a
            dancer or script writer, a producer or investor, a super model,
            upcoming model or agency, woodlig provides you the tools to forward
            your career.
          </p>
          <div className="bkgrnd-red d-flex justify-content-end align-items-center">
            <h3 className="clr-white mr15">USING WOODLING</h3>
            <h1 className="clr-white mr10">
              <b>1</b>
            </h1>
          </div>
          {useWoodling.map((i, index) => (
            <div
              key={index}
              className="pointer mt10 box-shadow min-h100 d-flex flex-dir-col justify-content-center"
              onClick={() => openQ1(index)}
            >
              <h4>
                <b>{i.question}</b>
              </h4>
              {q1 === i.key ? <p>{i.answer}</p> : null}
            </div>
          ))}
          <div className="bkgrnd-red d-flex justify-content-end align-items-center">
            <h3 className="clr-white mr15">ABOUT ACCOUNT SECURITY</h3>
            <h1 className="clr-white mr10">
              <b>2</b>
            </h1>
          </div>
          {accountSecurity.map((i, index) => (
            <div
              key={index}
              className="pointer mt10 box-shadow min-h100 d-flex flex-dir-col justify-content-center"
              onClick={() => openQ1(index)}
            >
              <h4>
                <b>{i.question}</b>
              </h4>
              {q1 === i.key ? <p>{i.answer}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditAbout;
