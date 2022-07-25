import React, { useState, useContext, useEffect } from "react";
import { LoginContext } from "./contexts/LoginContext";
import { BrowserView, MobileView } from "react-device-detect"
import axios from "axios";
const Journal = () => {
  const [data, setData] = useState([
    {},
    {},
    {},
    {},
    

  ]);

  const addMore = () => {
    // let newData = {}
    // if((data.length % 2 != 0)&& data[data.length -1]?.debit){
    //   newData['credit'] = data[data.length -1]?.debit
    // } else if(data.length %2 !=0){
    //   newData['debit'] = data[data.length -1].credit
    // }
    // console.log("leng:", data.length)
    // console.log("dataaaa:", newData)
    setData([...data, {}]);
  };
  const createdata = () => {

    const debit = sumData('debit')
    const credit = sumData('credit')
    if (debit != credit) {
      alert("Something's not quite right")
      return;
    } else {
      axios.post("/CreateJournal", { infodata: data }).then((data) => {
        alert("Journal Entry Saved")
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  const sumData = (key) => {
    let initialValue = 0
    let sum = data?.reduce(function (previousValue, currentValue) {
      // console.log("currentValue:", currentValue[key]?.replaceAll(",",''))
      return parseInt(previousValue) + (currentValue[key] != undefined && currentValue[key] != '' ? parseInt(currentValue[key].replaceAll(',', '')) : 0)
    }, initialValue)

    console.log(sum) // logs 6
    return sum;
  }

  return (
    <div>

      {/* {JSON.stringify(data)} */}
      <BrowserView>
        <div style={{
          display: 'flex',
          flexDirection: 'row'
        }}>
          <div style={{ flex: 1 }}>
            <span>Journal date</span><br />
            <input
              type='date'
              style={{
                border: '1px solid #ccc',
                height: 30,
                borderRadius: 3,
                width: 200,
                paddingLeft: 10,
                outline: 'none'
              }}
            />
          </div>
          <div>
            <span>Journal no</span><br />
            <input
              style={{
                border: '1px solid #ccc',
                height: 30,
                borderRadius: 3,
                width: 400,
                paddingLeft: 10,
                outline: 'none'
              }}
            />
          </div>
        </div>
        <div style={{ height: 20 }}></div>
        {/* {data && data} */}
        {console.log("data:", data)}
        <table width={"100%"} className='table' border="1">
          <tr style={{ border: '1px solid #ccc', height: 30 }}>

            <td align="center">#</td>
            <td>Account</td>
            <td>DEBITS</td>
            <td>CREDIT</td>
            <td>DESCRIPTION</td>
            <td>TAX</td>
            <td>EMPLOYEE</td>
          </tr>
          {data.map((item, index) => {
            return (
              <RowComponent
                key={index}
                index={index}
                data={data}
                setData={setData}
              />
            );
          })}
          <tr style={{ border: '1px solid #ccc', backgroundColor: '#f2f3f5', height: 50 }}>
            <td colSpan={2} align="right" style={{ paddingRight: 25 }}>Total</td>
            <td align="right" style={{ paddingRight: 25 }}>{Intl.NumberFormat().format(sumData('debit'))}</td>
            <td align="right" style={{ paddingRight: 25 }}>{Intl.NumberFormat().format(sumData('credit'))}</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
        <button style={{
          border: '1px solid #ccc',
          borderRadius: 3,
          paddingLeft: 20, paddingRight: 20,
          backgroundColor: 'white'
        }} onClick={addMore}>Add more</button>

        <button style={{
          border: '1px solid #ccc',
          borderRadius: 3,
          paddingLeft: 20, paddingRight: 20,
          marginLeft: 20, backgroundColor: 'white'
        }} onClick={createdata}>add</button>
      </BrowserView>
      <MobileView>
        <div style={{
          display: 'flex',
          flexDirection: 'row'
        }}>
          <div style={{ flex: 1 }}>
            <span>Journal date</span><br />
            <input
              type='date'
              style={{
                border: '1px solid #ccc',
                height: 30,
                borderRadius: 3,
                width: 200,
                paddingLeft: 10,
                outline: 'none'
              }}
            />
          </div>
          <div>
            <span>Journal no</span><br />
            <input
              style={{
                border: '1px solid #ccc',
                height: 30,
                borderRadius: 3,
                width: 400,
                paddingLeft: 10,
                outline: 'none'
              }}
            />
          </div>
        </div>
        <div style={{ height: 20 }}></div>
        {/* {data && data} */}
        {console.log("data:", data)}
        <table width={"100%"} className='table' border="1">
          <tr style={{ border: '1px solid #ccc', height: 30 }}>

            <td align="center">#</td>
            <td>Account</td>
            <td>DEBITS</td>
            <td>CREDIT</td>
            <td>DESCRIPTION</td>
            <td>TAX</td>
            <td>EMPLOYEE</td>
          </tr>
          {data.map((item, index) => {
            return (
              <RowComponent
                key={index}
                index={index}
                data={data}
                setData={setData}
              />
            );
          })}
          <tr style={{ border: '1px solid #ccc', backgroundColor: '#f2f3f5', height: 50 }}>
            <td colSpan={2} align="right" style={{ paddingRight: 25 }}>Total</td>
            <td align="right" style={{ paddingRight: 25 }}>{Intl.NumberFormat().format(sumData('debit'))}</td>
            <td align="right" style={{ paddingRight: 25 }}>{Intl.NumberFormat().format(sumData('credit'))}</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
        <button style={{
          border: '1px solid #ccc',
          borderRadius: 3,
          paddingLeft: 20, paddingRight: 20,
          backgroundColor: 'white'
        }} onClick={addMore}>Add more</button>

        <button style={{
          border: '1px solid #ccc',
          borderRadius: 3,
          paddingLeft: 20, paddingRight: 20,
          marginLeft: 20, backgroundColor: 'white'
        }} onClick={createdata}>add</button>
      </MobileView>
    </div>
  );
};

function RowComponent({ index, data, setData }) {
  const { nameList } = useContext(LoginContext);
  const [prentid, setPrentid] = useState("");
  const [nameShow, setNameShow] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [active, setActive] = useState("");
  const [showBox, setShowBox] = useState(false);

  const getNameList = (name, inputIdex = null) => {
    axios.get(`/Allparents/${name}`).then((respone) => {
      if (respone?.data?.message.length > 0) {
        setPrentid(respone?.data.message[0].Account_id);
        const names = respone?.data?.message.map((item) => {
          return item.ChartAccountName;
        });
        names.reverse();

        if ((index % 2 != 0) && index > 0 && data[index - 1]?.debit) {
          data[index]['credit'] = data[index - 1]?.debit;

        } else if ((index % 2 != 0) && index > 0) {
          data[index]['debit'] = data[index - 1]?.credit
        }
        data[index]['Account_id'] = respone?.data?.message[0].Account_id
        setNameShow(names.join(":"));
        changeText(names.join(":"), "name");
        setShowBox(!showBox);
      }
    });
    if (inputIdex !== null) {
      console.log(inputIdex);
    }
  };
  const _onSearchList = (e) => {
    setNameShow(e);
    let searchName = nameList.filter((el) => el.label.includes(e));
    if (!e) {
      setSearchResult([]);
    } else {
      setSearchResult([...searchName]);
    }
  };
  const changeText = (value, key) => {
    const object = { ...data[index] };
    if (key == 'debit' || key == 'credit') {
      object[key] = value != '' ? Intl.NumberFormat().format(parseInt(value.replaceAll(',', ''))) : '';
    } else {
      object[key] = value;
    }

    const cloneData = [...data];
    cloneData[index] = { ...object };
    setData([...cloneData]);


  };
  return (
    <tr style={{ border: '1px solid #ccc', height: 50 }}>
      {/* <td>{prentid}</td> */}
      <td style={{ width: 30 }} align="center">
        {index + 1}
      </td>
      <td >
        <input
          placeholder="Account Name"
          value={data[index].name}
          onChange={(e) => {
            _onSearchList(e.target.value);
          }}
          onClick={() => setShowBox(true)}
          style={{
            border: '1px solid #ccc',
            outline: 'none',
            paddingLeft: 10,
            borderRadius: 3,
            height: 35
          }}
        />
        {showBox && (
          <div
            style={{
              overflowY: "scroll",
              height: 100,
              paddingTop: 5,
              paddingLeft: 10,
              position: 'absolute',
              backgroundColor: 'white'
            }}
          >
            {searchResult.length > 0 ? (
              <>
                {searchResult.map((data, index1) => {
                  return (
                    <>
                      <span
                        style={{
                          cursor: "pointer",
                          fontWeight: active === data?.label ? "bold" : "",
                        }}
                        onClick={() => getNameList(data?.id, index)}
                        onMouseOver={() => setActive(data?.label)}
                        onMouseLeave={() => setActive(null)}
                      >
                        {data?.label}
                      </span>
                      <br />
                    </>
                  );
                })}
              </>
            ) : (
              <>
                {nameList.map((data, index1) => {
                  return (
                    <>
                      <span
                        style={{
                          cursor: "pointer",
                          fontWeight: active === data?.label ? "bold" : "",
                        }}
                        onClick={() => getNameList(data?.id, index)}
                        onMouseOver={() => setActive(data?.label)}
                        onMouseLeave={() => setActive(null)}
                      >
                        {data?.label}
                      </span>
                      <br />
                    </>
                  );
                })}
              </>
            )}
          </div>
        )}
      </td>
      <td>
        <input
          value={data[index].debit}
          onChange={(e) => changeText(e.target.value, "debit")}
          disabled={data[index]?.credit ? true : false}
          style={{
            border: '1px solid #ccc',
            outline: 'none',
            paddingLeft: 10,
            borderRadius: 3,
            height: 35
          }}
        />
      </td>
      <td>
        <input
          value={data[index].credit}
          onChange={(e) => changeText(e.target.value, "credit")}
          disabled={data[index]?.debit ? true : false}
          style={{
            border: '1px solid #ccc',
            outline: 'none',
            paddingLeft: 10,
            borderRadius: 3,
            height: 35
          }}
        />
      </td>
      <td>
        <input
          value={data[index].description}
          onChange={(e) => changeText(e.target.value, "description")}
          style={{
            border: '1px solid #ccc',
            outline: 'none',
            paddingLeft: 10,
            borderRadius: 3,
            height: 35
          }}
        />
      </td>
      <td>
        <input
          value={data[index].Tax}
          onChange={(e) => changeText(e.target.value, "Tax")}
          style={{
            border: '1px solid #ccc',
            outline: 'none',
            paddingLeft: 10,
            borderRadius: 3,
            height: 35
          }}
        />
      </td>
      <td>
        <input
          value={data[index].Employee}
          onChange={(e) => changeText(e.target.value, "Employee")}
          style={{
            border: '0.1px solid #ccc',
            outline: 'none',
            paddingLeft: 10,
            borderRadius: 3,
            height: 35
          }}
        />
      </td>
    </tr>
  );
}

export default Journal;
