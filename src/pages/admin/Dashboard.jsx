import React from "react";
import Spinner from "react-bootstrap/Spinner";

import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { useGetDashboardQuery } from "../../store/dashboardSlice";

const Dashboard = () => {
    const {
        data: dashboardData = [],
        isLoading,
        isError,
        error,
    } = useGetDashboardQuery();

    console.log(dashboardData.data);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="d-flex flex-column w-100 align-items-center m-3 text-white">
            <div className="d-flex justify-content-between align-items-center w-100 mb-3 text-white">
                <h5>Admin Dashboard</h5>
            </div>

            <div className="d-flex justify-content-between align-items-top flex-wrap w-100">
                <Card className="bg-light me-2 text-dark w-25 ">
                    {/* <Card.Header></Card.Header> */}
                    <Card.Body>
                        <h5>Total Products </h5>
                        <h5>{dashboardData?.data.product_count}</h5>
                    </Card.Body>
                </Card>
                <Card className="bg-light me-2 text-dark w-25">
                    {/* <Card.Header></Card.Header> */}
                    <Card.Body>
                        <h5>Total Brands </h5>
                        <h5>{dashboardData?.data.brand_count}</h5>
                    </Card.Body>
                </Card>
                <Card className="bg-light me-2 text-dark w-25">
                    {/* <Card.Header></Card.Header> */}
                    <Card.Body>
                        <h5>Total Sales </h5>
                        <h5>{dashboardData?.data.total_sales} </h5>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
