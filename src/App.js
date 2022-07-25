import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AccountCategory from "./page/AccountCategory";
import ChartAccounts from "./page/ChartAccounts";
import { api } from "./page/contexts/api";
import { LoginContext } from "./page/contexts/LoginContext";
import Currencies from "./page/Currencies";
import CurrencyCode from "./page/CurrencyCode";
import Journal_books from "./page/Journal_books";
import Setting from "./page/setting";
import Home from "./template/home";
import axios from "axios";
import Journal from "./page/Journal";
import Test from "./page/test";
import CategoryDetail from "./page/CategoryDetail";
axios.defaults.baseURL = api;
function App() {
  const [listType, setListType] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [listCategoryDetail,setListCategoryDetail]=useState([]);
  const [listAccount,setListAccount]=useState({});
  const [nameList, setNameList] = useState([]);
  const [detailCategory, setDetailCategory] = useState([]);
  const OnloadType = () => {
    axios
      .get("/getType")
      .then((data) => {
        setListType([...data?.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const OnloadCategoryShow = () => {
    axios
      .get("/detailCategory")
      .then((data) => {
        setDetailCategory([...data.data.message]);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const OnloadCategory = () => {
    axios
      .get("/getCategory")
      .then((data) => {
        setListCategory([...data?.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const OnloadCategoryDetail=()=>{
    axios.get("/getCategoryDetail").then((data)=>{
      setListCategoryDetail([...data?.data])
    }).catch((err)=>{
      console.log(err)
    })
    
  }
  const Onloadaccounts=()=>{
    axios.get("/Allaccounts").then((data)=>{
      setListAccount({...data?.data})

     
    }).catch((err)=>{
      console.log(err)
    })
  }
  const OnloadAccountName=()=>{
    axios.get("/Accountnames").then((data) => {
      setNameList([...data.data.message]);

    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(() => {
    OnloadType();
    OnloadCategory();
    OnloadCategoryDetail();
    Onloadaccounts();
    OnloadAccountName();
    OnloadCategoryShow();
  }, []);
  return (
    <div>
      <LoginContext.Provider
        value={{
          listType,
          OnloadType,
          listCategory,
          OnloadCategory,
          listCategoryDetail,
          OnloadCategoryDetail,
          listAccount,
          Onloadaccounts,
          nameList,
          detailCategory,
          OnloadAccountName
        }}
      >
        <Router>
          <Home>
            <Routes>
              <Route exact path="/ChartAccount" element={<ChartAccounts />} />
              <Route exact path="/setting" element={<Setting />} />
              <Route
                exact
                path="/AccountCategory"
                element={<AccountCategory />}
              />
              <Route exact path="/Currencies" element={<Currencies />} />
              <Route
                exact
                path="/JournalBook"
                element={<Journal_books />}
              ></Route>
              <Route
                exact
                path="/CurrencyCode"
                element={<CurrencyCode />}
              ></Route>
              <Route exact path="/Journal" element={<Journal />}></Route>
              <Route exact path="/Test" element={<Test />}></Route>
              <Route exact path="/CategoryDetail" element={< CategoryDetail />}></Route>
            </Routes>
          </Home>
        </Router>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
