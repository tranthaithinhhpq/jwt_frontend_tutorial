import React, { useCallback, useEffect, useState } from "react";
import './Users.scss';
import { fetchAllUser, deleteUser } from "../../services/userService"
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
const Users = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(10);
    const [totalPage, setTotalPage] = useState(0);


    //modal delete
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataModal, setDataModal] = useState({});

    //modal update/create user
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [actionModalUser, setActionModalUser] = useState("CREATE");
    const [dataModalUser, setDataModalUser] = useState({});


    const fetchUsers = useCallback(async () => {
        try {
            const response = await fetchAllUser(currentPage, currentLimit);
            if (response && response && response.EC === 0) {
                setTotalPage(response.DT.totalPages);
                setListUsers(response.DT.users);
            } else {
                toast.error("Failed to fetch users.");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("An error occurred while fetching users.");
        }
    }, [currentPage, currentLimit]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const handleDeleteUser = async (user) => {
        setDataModal(user);
        setIsShowModalDelete(true);
    }
    const handleClose = () => {
        setIsShowModalDelete(false);
        setDataModal({});
    }
    const confirmDeleteUser = async () => {
        try {
            let response = await deleteUser(dataModal);
            if (response && response.EC === 0) {
                toast.success(response.EM);
                await fetchUsers();
                setIsShowModalDelete(false);
            } else {
                toast.error(response.EM);
            }
        } catch (error) {
            console.error("Error deleting user: ", error);
            toast.error("An error occurred while deleting user.");
        }
    }

    const onHideModalUser = async () => {
        try {
            setIsShowModalUser(false);
            setDataModalUser({});
            await fetchUsers();
        } catch (error) {
            console.error("Error while closing modal and refreshing: ", error);
            toast.error("An error occurred while updating users.");
        }
    }

    const handleEditUser = (user) => {
        setActionModalUser("UPDATE");
        setDataModalUser(user);
        setIsShowModalUser(true);

    }

    const handleRefresh = async () => {
        try {
            await fetchUsers();
        } catch (error) {
            console.error("Error refreshing users: ", error);
            toast.error("An error occurred while refreshing users.");
        }
    }


    return (
        <>
            <div className="container">
                <div className="manage-users-container">
                    <div className="user-header">
                        <div className="title mt-3">
                            <h3>Manage Users</h3>
                        </div>
                        <div className="actions my-3">
                            <button className="btn btn-success refresh me-2"
                                onClick={() => handleRefresh()}
                            >
                                <i className="fa fa-refresh"></i>Refresh
                            </button>
                            <button className="btn btn-primary"
                                onClick={() => {
                                    setIsShowModalUser(true);
                                    setActionModalUser("CREATE");
                                }}
                            >
                                <i className="fa fa-plus-circle"></i>
                                Add new user
                            </button>
                        </div>
                    </div>

                    <div className="user-body">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Id</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Group</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUsers && listUsers.length > 0 ?
                                    <>
                                        {listUsers.map((item, index) => {
                                            return (
                                                <tr key={`row-${index}`}>
                                                    <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.Group ? item.Group.name : ""}</td>
                                                    <td>
                                                        {/* <span
                                                        title="Edit"
                                                        className="edit"
                                                        onClick={() => handleEditUser(item)}
                                                    >
                                                        <i className="fa fa-pencil"></i>
                                                    </span>
                                                    <span
                                                        title="Delete"
                                                        className="delete"
                                                        onClick={() => handleDeleteUser(item)}
                                                    ><i className="fa fa-trash-o"></i></span> */}

                                                        <i className="fa fa-pencil edit" onClick={() => handleEditUser(item)}></i>
                                                        <i className="fa fa-trash-o delete" onClick={() => handleDeleteUser(item)}></i>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                    :
                                    <>
                                        <tr><td colSpan="6" className="text-center">Not found users</td></tr>
                                    </>}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="user-footer">
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={4}
                        pageCount={totalPage}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>
            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModal={dataModal}
            />
            <ModalUser
                onHide={onHideModalUser}
                show={isShowModalUser}
                action={actionModalUser}
                dataModalUser={dataModalUser}
            />
        </>

    )


}

export default Users;