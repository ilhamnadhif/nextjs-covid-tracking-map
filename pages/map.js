import { useEffect, useRef } from "react";
import Layout from "../components/Layout";
import mapboxgl from "mapbox-gl";
import styled from "styled-components";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaWxoYW04NzI1IiwiYSI6ImNrcjRkemc4MTJ1OTMycHQ5NHJtc3BzNGMifQ.nZ-jOGq_de03DKuzy4LWlw";

function Map() {
  const mapContainerRef = useRef(null);
  const setMarker = (map) => {
    fetch("https://corona.lmao.ninja/v3/covid-19/countries")
      .then((res) => res.json())
      .then((res) => {
        res.forEach((ctr) => {
          const { country, countryInfo, cases, active, deaths, recovered } =
            ctr;
          new mapboxgl.Marker()
            .setLngLat([countryInfo.long, countryInfo.lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 30 }).setHTML(
                `<p><strong>Negara:</strong> ${country}</p>
                <p><strong>Total Kasus:</strong> ${cases}</p>
                <p><strong>Aktif:</strong> ${active}</p>
                <p><strong>Sembuh:</strong> ${recovered}</p>
                <p><strong>Meninggal:</strong> ${deaths}</p>`
              )
            )
            .addTo(map);
        });
      });
  };
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [0, 20],
      zoom: 1.3,
    });
    setMarker(map);

    return () => map.remove();
  }, []);
  return (
    <Layout title="Map">
      <div ref={mapContainerRef} style={{ width: "100vw", height: "92vh" }} />
    </Layout>
  );
}

export default Map;

// const MapWrapper = styled.div`
//   width: 100vw;
//   height: 100vh;
// `;
