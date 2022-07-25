import React, { useContext, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Form } from "react-bootstrap";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { LoginContext } from "./contexts/LoginContext";
import { Button } from "@material-ui/core";
import { Modal } from "react-bootstrap";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function CategoryDetail() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [category, setCategory] = useState("");
  const [categoryDetail, setCategoryDetail] = useState("");
  const { listCategory, listCategoryDetail, OnloadCategoryDetail } =
    useContext(LoginContext);
  const classes = useStyles();

  const createdataCategoryDetail = () => {
    let data = {
      Category_id: category,
      DetailType: categoryDetail,
    };
    axios
      .post("/createdataCategoryDetail", data)
      .then((data) => {
        handleClose(false);
        OnloadCategoryDetail();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletecategorydetail = (id) => {

    axios
      .delete(`/deletedCategoryDetail/${id}`)
      .then((data) => {
        handleClose(false);
        OnloadCategoryDetail();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} style={{ paddingTop: 50 }}>
        <Modal.Header closeButton>
          <Modal.Title>ສ້າງລາຍລະອຽດຂອງປະເພດ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontSize: 20 }}>ໃຫ້ເລືອກປະເພດ</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option>ໃຫ້ເລືອກປະເພດ</option>
                {listCategory &&
                  listCategory.map((data, index) => {
                    return (
                      <option key={index} value={data.Category_id}>
                        {data?.Category_name}
                      </option>
                    );
                  })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontSize: 20 }}>ລາຍລະອຽດຂອງປະເພດ</Form.Label>
              <Form.Control
                onChange={(e) => setCategoryDetail(e.target.value)}
                value={categoryDetail}
                type="text"
                placeholder="ລາຍລະອຽດຂອງປະເພດ"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createdataCategoryDetail}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Breadcrumbs aria-label="breadcrumb">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <p
            style={{
              fontSize: 20,
              color: "black",
              fontFamily: "Phetsarath OT",
              alignItems: "center",
              paddingTop: 10,
            }}
          >
            <ArrowBackIcon style={{ color: "#3f51b5" }} />
            ປະເພດບັນຊີ
          </p>
          <button
            style={{
              backgroundColor: "#3f51b5",
              border: "none",
              height: 35,
              borderRadius: 2,
              flexDirection: "row",
              marginLeft: 10,
              paddingLeft: 10,
              paddingRight: 10,
              color: "white",
              fontFamily: "Phetsarath OT",
            }}
            onClick={handleShow}
          >
            <AddIcon />
            ເພີ່ມປະເພດບັນຊີ
          </button>
        </div>
      </Breadcrumbs>
      <div
        style={{
          height: 10,
        }}
      ></div>
      <div
        style={{
          height: 5,
          backgroundColor: "#3f51b5",
        }}
      ></div>
      <div
        style={{
          height: 10,
        }}
      ></div>

      <div
        style={{
          display: "flex",
          height: 40,
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 5,
        }}
      >
        <select
          style={{
            width: 198,
            outline: "none",
            border: "1px solid #DBDBDB",
            height: 35,
            paddingLeft: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <option>ຊະນິດທັງໝົດ</option>
          <option>ຊັບສີນ</option>
          <option>ໜີ່ສີນ</option>
          <option>ທືນ</option>
          <option>ລາຍຈ່າຍ</option>
          <option>ລາຍຮັບ</option>
        </select>

        <input
          type={"text"}
          style={{
            width: 250,
            outline: "none",
            border: "1px solid #DBDBDB",
            height: 35,
            marginLeft: 5,
            paddingLeft: 20,
            display: "flex",
            justifyContent: "center",
          }}
          placeholder="ຊື່ບັນຊີ"
        />
        <button
          style={{
            backgroundColor: "#3f51b5",
            border: "none",
            height: 35,
            borderRadius: 2,
            flexDirection: "row",
            color: "white",
          }}
        >
          <CloseIcon />
        </button>

        <input
          type={"text"}
          style={{
            width: 300,
            outline: "none",
            border: "1px solid #DBDBDB",
            marginLeft: 10,
            height: 35,
            display: "flex",
            justifyContent: "center",
          }}
          placeholder="ລະຫັດບັນຊີ"
        />
        <button
          style={{
            backgroundColor: "#3f51b5",
            border: "none",
            height: 35,
            borderRadius: 2,
            flexDirection: "row",
            paddingLeft: 10,
            paddingRight: 10,
            color: "white",
          }}
        >
          <CloseIcon />
        </button>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <button
            style={{
              backgroundColor: "#3f51b5",
              border: "none",
              height: 35,
              borderRadius: 2,
              paddingLeft: 10,
              paddingRight: 10,
              color: "white",
              alignItems: "center",
            }}
          >
            <SearchIcon />
            ຊອກຫາ
          </button>
        </div>
      </div>

      <div style={{ paddingTop: 20 }}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listCategoryDetail &&
                listCategoryDetail.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell align="left" style={{ width: 400 }}>
                      {data?.DetailType}
                    </TableCell>
                    <TableCell align="left">{data?.Category_name}</TableCell>

                    <TableCell align="right">
                      <DeleteIcon style={{ cursor: "pointer" }} onClick={()=>deletecategorydetail(data?.Detail_id)} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
