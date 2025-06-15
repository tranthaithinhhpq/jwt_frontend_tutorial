import { useEffect, useState } from "react";
import './Users.scss';
import { fetchAllUser, deleteUser } from "../../services/userService"
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDetele";
import ModalUser from "./ModalUser";
const Users = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPage, setTotalPage] = useState(0);

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataModal, setDataModal] = useState({});


    useEffect(async () => {
        fetchUsers();
    }, [currentPage])
    const fetchUsers = async () => {
        let response = await fetchAllUser(currentPage, currentLimit);
        if (response && response.data && response.data.EC === 0) {
            setTotalPage(response.data.DT.totalPages);
            setListUsers(response.data.DT.users);
            //  console.log(response.data.DT);
        }
    }

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
        let response = await deleteUser(dataModal);
        if (response && response.data.EC === 0) {
            toast.success(response.data.EM);
            await fetchUsers();
            setIsShowModalDelete(false);
        } else {
            toast.error(response.data.EM);
        }
    }

    return (
        <>
            <div className="container">
                <div className="user-header">
                    <div className="title">
                        <h3>Table Users</h3>
                    </div>
                    <div className="actions">
                        <button className="btn btn-success">Refesh</button>
                        <button className="btn btn-primary">Add new user</button>
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
                                                <td>{index + 1}</td>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>{item.Group ? item.Group.name : ""}</td>
                                                <td>
                                                    <button className="btn btn-warning">Edit</button>
                                                    <button className="btn btn-danger"
                                                        onClick={() => handleDeleteUser(item)}
                                                    >Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>
                                :
                                <>
                                    <tr><td>Not found users </td></tr>
                                </>}
                        </tbody>
                    </table>
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
                title={"Create new user"}
            />
        </>

    )


}

export default Users;