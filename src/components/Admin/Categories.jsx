import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import {
    useGetAllProductsQuery,
    useAddProductsMutation,
} from "../../store/productSlice";
import {
    useAddAdminMutation,
    useGetAllAdminsQuery,
    useUpdateAdminMutation,
} from "../../store/userSlice";
import {
    FiEdit3,
    FiPlus,
    FiTrash,
    FiCheck,
    FiX,
    FiSearch,
} from "react-icons/fi";
import Modal from "react-bootstrap/Modal";
import "./Admin.scss";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import {
    useGetAllVendorsQuery,
    useAddVendorsMutation,
    useEditVendorMutation,
    useDeleteVendorMutation,
} from "../../store/vendorSlice";
import { useGetAllCategoriesQuery } from "../../store/categoriesSlice";
import {
    useGetAllBrandsQuery,
    useAddBrandMutation,
    useDeleteBrandMutation,
    useEditBrandMutation,
} from "../../store/brandsSlice";
import { toast } from "react-toastify";

export function Categories() {
    const { data = [], loading, error } = useGetAllCategoriesQuery();
    return (
        <div className="d-flex flex-column w-100 m-3 align-items-center">
            <div className="d-flex justify-content-between align-items-center w-100 mb-3">
                <h5 className="d-flex text-white">All Categories</h5>
                <Button variant="success" size="md">
                    <FiPlus size={20} /> Add New Category
                </Button>
            </div>
            <Table hover bordered className="text-center text-white border-dark">
                <thead className="table-header">
                    <tr>
                        <th> Name </th>
                        <th> Sub_categories </th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>
                                    {item.children?.map((children) => {
                                        return (
                                            <p key={children.id}>
                                                {children.name}
                                            </p>
                                        );
                                    })}
                                </td>
                                <td>
                                    <div className="d-flex justify-content-around align-items-center">
                                        <Button variant="secondary" size="sm">
                                            <FiEdit3 size={15} />
                                        </Button>
                                        <Button variant="danger" size="sm">
                                            <FiTrash size={15} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}
