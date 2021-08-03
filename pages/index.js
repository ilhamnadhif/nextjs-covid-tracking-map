import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function Home() {
  const [data, setData] = useState([]);
  const getData = () => {
    fetch("https://corona.lmao.ninja/v3/covid-19/countries")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout title="Home">
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Negara</th>
              <th scope="col">Total Kasus</th>
              <th scope="col">Kasus Aktif</th>
              <th scope="col">Kasus Sembuh</th>
              <th scope="col">Kasus Meninggal</th>
            </tr>
          </thead>
          <tbody>
            {data.map((ctr, index) => {
              const {
                country,
                countryInfo: { flag },
                cases,
                active,
                recovered,
                deaths,
              } = ctr;
              console.log(ctr);
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <span style={{ marginRight: 10 }}>{country}</span>
                    <Image src={flag} width="50" height="30" />
                  </td>
                  <td>{cases}</td>
                  <td>{active}</td>
                  <td>{recovered}</td>
                  <td>{deaths}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
