import React from 'react';
import { Modal } from 'react-bootstrap';
import { siteUrl, picUrl } from '../public/endpoins';

const AlertModal = (props) => {
  const { showModal, closeAlertModal, notificationData, onCrash } = props;
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showModal}
      onHide={closeAlertModal}
    >
      <Modal.Body>
        <div className="d-flex justify-content-center">
          <div
            onClick={closeAlertModal}
            className="modal-content close-btn w5 mt-30"
          >
            <button type="button" className="close">
              <i aria-hidden="true" className="fa fa-times fs30"></i>
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-center border-bottom p10">
          <h4>
            <b>Notifications</b>
          </h4>
        </div>
        <div>
          {notificationData.map((i, index) => {
            return (
              <div key={index} className="p10 border-bottom d-flex">
                <div className="d-flex flex-dir-col align-item w20">
                  <img
                    onError={onCrash}
                    className={
                      i.premium_user === '1'
                        ? 'premium-border following-img'
                        : 'following-img'
                    }
                    src={
                      i.profile_picture !== ''
                        ? picUrl + '' + i.profile_picture
                        : 'https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png'
                    }
                  />
                </div>
                <div>
                  <p className="mb0 fs25">{i.full_name}</p>
                  <p className="mb0 gray">{i.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AlertModal;
