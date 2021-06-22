import GlobalContext from "@/appContext";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import SocialLogin from "shared/Components/SocialLogin";
import Grid from "shared/Styles/Grid";
import ProductCard from "shared/Components/ProductCard";
import ProfileSidebar from "shared/Components/ProfileSidebar";
import OrderHistoryStyle from "./Style";

const Order = () => {
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const { currentUser: user, isLogin } = useContext(GlobalContext);
  const { data, isLoading, isError } = useOrderHistory(userEmail);

  useEffect(() => {
    if (user) {
      setUserId(user.uid);
      setUserEmail(user.email);
    }
  }, [user, data]);

  return (
    <OrderHistoryStyle>
      <div className="row_group my-account-wrapper">
        <ProfileSidebar />
        <div className="dashboard">
          {isLogin ? (
            <div>
            <h2>Order History</h2>
            <table>
                <thead>
                  <tr>
                    <th>Order Id #</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    Object.keys(data).length > 0 &&
                    Object.keys(data).map((order, index) => (
                      <tr key={order}>
                        <td>{data[order].id}</td>
                        <td>{data[order].status}</td>
                      </tr>
                    ))}
                </tbody>
            </table>
            </div>
        ) : (
            <ul>
                <SocialLogin />
            </ul>
        )}
    </div>
</div></OrderHistoryStyle>);
}

export default Order;