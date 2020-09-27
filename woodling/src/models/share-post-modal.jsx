/* eslint-disable no-unneeded-ternary */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {Modal} from 'react-bootstrap';
import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    InstapaperShareButton,
    InstapaperIcon,
    LineShareButton,
    LineIcon,
    LinkedinShareButton,
    LinkedinIcon,
    MailruShareButton,
    MailruIcon,
    PinterestShareButton,
    PinterestIcon,
    RedditShareButton,
    RedditIcon,
    TelegramShareButton,
    TelegramIcon,
    TumblrShareButton,
    TumblrIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    WorkplaceShareButton,
    WorkplaceIcon
  } from "react-share";


const SharePostModal = (props) => {
   
    const { hideShareModel, showModel, sharedUrl, title } = props;

    return ( 
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showModel}
            onHide={hideShareModel}
            className="hide-close-btn"
        >
            <Modal.Header>
                <h3>{title}</h3>
            </Modal.Header>

            <Modal.Body>
                <div className="Demo__container">
                    <div className="Demo__some-network">
                        <FacebookShareButton
                            url={sharedUrl}
                            className="Demo__some-network__share-button"
                        >
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                    </div>

                    <div className="Demo__some-network">
                        <TwitterShareButton
                            url={sharedUrl}
                            title="Twitter"
                            className="Demo__some-network__share-button"
                        >
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>
                    </div>

                    <div className="Demo__some-network">
                        <TelegramShareButton
                            url={sharedUrl}
                            title="Telegram"
                            className="Demo__some-network__share-button"
                        >
                            <TelegramIcon size={32} round />
                        </TelegramShareButton>
                    </div>

                    <div className="Demo__some-network">
                        <WhatsappShareButton
                            url={sharedUrl}
                            title="Whatsapp"
                            separator=":: "
                            className="Demo__some-network__share-button"
                        >
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                    </div>

                    <div className="Demo__some-network">
                        <LinkedinShareButton url={sharedUrl} className="Demo__some-network__share-button">
                            <LinkedinIcon size={32} round />
                        </LinkedinShareButton>
                    </div>

                    <div className="Demo__some-network">
                        <PinterestShareButton
                            url={String(window.location)}
                            className="Demo__some-network__share-button"
                        >
                            <PinterestIcon size={32} round />
                        </PinterestShareButton>
                    </div>

                    <div className="Demo__some-network">
                        <RedditShareButton
                            url={sharedUrl}
                            title="Reddit"
                            windowWidth={660}
                            windowHeight={460}
                            className="Demo__some-network__share-button"
                        >
                            <RedditIcon size={32} round />
                        </RedditShareButton>
                    </div>

                    <div className="Demo__some-network">
                        <TumblrShareButton
                            url={sharedUrl}
                            title="Tumlr"
                            className="Demo__some-network__share-button"
                        >
                            <TumblrIcon size={32} round />
                        </TumblrShareButton>
                    </div>

                    <div className="Demo__some-network">
                        <MailruShareButton
                            url={sharedUrl}
                            title="Mailru"
                            className="Demo__some-network__share-button"
                        >
                            <MailruIcon size={32} round />
                        </MailruShareButton>
                    </div>

                    <div className="Demo__some-network">
                        <EmailShareButton
                            url={sharedUrl}
                            subject="Email"
                            body="body"
                            className="Demo__some-network__share-button"
                        >
                            <EmailIcon size={32} round />
                        </EmailShareButton>
                    </div>

                    <div className="Demo__some-network">
                        <WorkplaceShareButton
                            url={sharedUrl}
                            quote="Workplace"
                            className="Demo__some-network__share-button"
                        >
                            <WorkplaceIcon size={32} round />
                        </WorkplaceShareButton>
                    </div>

                    <div className="Demo__some-network">
                        <LineShareButton
                            url={sharedUrl}
                            title="Line"
                            className="Demo__some-network__share-button"
                        >
                            <LineIcon size={32} round />
                        </LineShareButton>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
     );
}
 
export default SharePostModal;