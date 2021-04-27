import React from "react";
import { Container } from "react-bootstrap";
import "../../styles/Providers.css";

const Providers = ({ providers }) => {
  const Mapper = () =>
    providers.flatrate.map((flatRate) => (
      <div className="providersContainer">
        <img
          src={`https://www.themoviedb.org/t/p/original${flatRate.logo_path}`}
          className="providersImage"
          alt="provider stream platform Icon"
        />
      </div>
    ));
  return (
    <>
      <Container>
        <h5 className="providerText">Streaming here</h5>
        <div className="streamContainer">
          <Mapper />
        </div>
      </Container>
    </>
  );
};

const ProvidersBuy = ({ providers }) => {
  const Mapper = () =>
    providers.buy.map((buyer) => (
      <div className="providersContainer">
        <img
          src={`https://www.themoviedb.org/t/p/original${buyer.logo_path}`}
          className="providersImage"
          alt="provider stream platform Icon"
        />
      </div>
    ));
  return (
    <>
      <Container>
        <h5 className="providerText">Buy or Rent</h5>
        <div className="buyContainer">
          <Mapper />
        </div>
      </Container>
    </>
  );
};

const ProvidersRent = ({ providers }) => {
  const Mapper = () =>
    providers.rent.map((renter) => (
      <div className="providersContainer">
        <img
          src={`https://www.themoviedb.org/t/p/original${renter.logo_path}`}
          className="providersImage"
          alt="provider stream platform Icon"
        />
      
      </div>
    ));
  return (
    <>
      <Mapper />
    </>
  );
};

export { Providers, ProvidersRent, ProvidersBuy };
