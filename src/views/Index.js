/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Web3Modal from "web3modal";
import Torus from "@toruslabs/torus-embed";

// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

const providerOptions = {
  torus: {
    package: Torus, 
    options: {
      networkParams: {
        host: "https://localhost:8545", 
        chainId: 1337, 
        networkId: 1337
      },
      config: {
        buildEnv: "development" 
      }
    }
  }
};

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions // required
});

const Index = (props) => {
  const [web3, setWeb3] = useState('');
  const [web3test, setWeb3test] = useState(0);

  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");


  const web3Check = async () => {
    if (window.ethereum) {
        window.ethereum.autoRefreshOnNetworkChange = false;
        try {
            await web3Modal.connect();
            //const provider = await web3Modal.connect();
            //await window.ethereum.enable()
            setWeb3test(1)
        } catch (error) {
            alert("You need to allow access to your metamask to use the app.");
        }
    }
}

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const connect = () => {
    console.log('a');
  }

  return (
    <>
    <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
        <Col className="mb-12 mb-xl-0" xl="12" style={{textAlign:'center',backgroundColor:'white',border:'0px'}}>
            <Card className="bg-gradient-default shadow" style={{backgroundColor:'white',height:'90%',border:'0px'}}>
              <CardBody style={{backgroundColor:'white'}}>
                <div style={{fontSize:'50px',color:'limegreen'}}>NOT THE CLOUD, BETTER</div>
                <div style={{fontSize:'20px',color:'pink'}}>WELCOME TO THE FUTURE OF SELLING ONLINE, WITHOUT THE FLUFF OR MIDDLEMEN</div>
                <div style={{fontSize:'80px',color:'lightblue'}}>B-COMMERCE</div>
                <br/><br/><br/>
                <Button
                color="info"
                href="#pablo"
                onClick={()=>{connect()}}
              >
                Connect
              </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
