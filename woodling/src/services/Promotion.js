import axios from 'axios';
import { addPromotion, getAllSkills, getInsight } from '../public/endpoins';

export function postPromotion(params) {
  return new Promise((resolve, reject) => {
    axios
      .post(addPromotion, params)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function getSkills() {
  return new Promise((resolve, reject) => {
    axios
      .get(getAllSkills)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function getInsights(promotion_id, user_id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${getInsight}?user_id=${promotion_id}&promotion_id=${user_id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
}
