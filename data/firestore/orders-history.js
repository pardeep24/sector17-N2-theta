import firebase from '../firebase';
import 'firebase/firestore';

const db = firebase.firestore();

// Get order history from email id
const getOrdersHistory = async ({emailId}) => {
  if (!emailId) {
    return {};
  }

  const docRef = await db
    .collection('orders')
    // .doc()
    .where('email', '==', emailId)
    .get();

    const orders = docRef.docs.map(doc=> doc.data());
  return orders;
};

// Get Order status from Order id
export const getOrderStatus = async ({ orderId }) => {
  if (!orderId) {
    return {};
  }
  console.log('Order id ', orderId);

  const docRef = await db.collection('orders').doc(orderId).get();
  return docRef.data();
};
export default getOrdersHistory;
