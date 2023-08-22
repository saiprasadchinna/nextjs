import Image from 'next/image'
import styles from './Home.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import axios from 'axios';
//import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Col, Row } from 'react-bootstrap';

const MyApiCallInNextPage = () => {
        const router = useRouter();
        const [Datas, setDatas] = useState([]);
        useEffect(() => {
            axios.get('https://jsonplaceholder.typicode.com/users').then(function(response) {
                setDatas(response.data);
                console.log(Datas)
            }).catch(function(error) {
                console.log(error);
            });
        }, [Datas])
        console.log('Data:', Datas);
return (
<>
  <main className={styles.main} style={{padding: '0px'}}>
    <div className={styles.grid}>
      <h1>API Data</h1>
        <table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>User Name</th>
              <th>Email Id</th>
              <th>City</th>
              <th>Zip Code</th>
              <th>Suite</th>
            </tr>
          </thead>
          <tbody> {Datas.filter(a => a.id < 6).map((datas, index)=>
              <tr key={index}>
                <td>{datas.name}</td>
                <td>{datas.username}</td>
                <td>{datas.email}</td>
                <td>{datas.address.city}</td>
                <td>{datas.address.zipcode}</td>
                <td>{datas.address.suite}</td>
              </tr> )} </tbody>
        </table>
    </div>
  </main>
 </>
 )
}
export default MyApiCallInNextPage