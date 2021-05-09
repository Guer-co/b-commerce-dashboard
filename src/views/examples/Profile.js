import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  FormText
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { GUER_ABI,GUER_ADDRESS } from '../config';



const Profile = () => {
  const [logo, setLogo] = useState('');
  const [photoloading, setPhotoloading] = useState(false);
  const [web3, setWeb3] = useState('');
  const [modal, setModal] = useState(false);
  const [mynetwork, setMynetwork] = useState('');
  const [myaccount, setMyaccount] = useState('');
  const [guer, setGuer] = useState('');
  const [loading, setLoading] = useState(false);
  const [accountinfo, setAccountinfo] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [product1image, setProduct1image] = useState('');
  const [product1title, setProduct1title] = useState('');
  const [product1description, setProduct1description] = useState('');
  const [product1price, setProduct1price] = useState('');
  const [product1sku, setProduct1sku] = useState('');

  if (web3 === ''){
    setWeb3(new Web3(Web3.givenProvider));
}

  useEffect(() => {
    const loadEthereumData = async () => {
      if (window.ethereum) {
        window.ethereum.autoRefreshOnNetworkChange = false;
        try {
          await window.ethereum.enable()
              await web3.eth.getAccounts((error, accounts) => {
                if (error) {
                  console.error(error);
                }
                setMyaccount(accounts[0]);
                let switchToSKALE = {
                  chainId: "0x8d0ca30434c02",
                  chainName: "SKALE Network Testnet",
                  rpcUrls: ["https://eth-global-12.skalenodes.com:10584"],
                  nativeCurrency: {
                    name: "SKALE ETH",
                    symbol: "skETH",
                    decimals: 18
                  },
                  blockExplorerUrls: [
                    "https://expedition.dev/?rpcUrl=https://eth-global-12.skalenodes.com:10584"
                  ]
                };
                window.ethereum
                .request({
                  method: "wallet_addEthereumChain",
                  params: [switchToSKALE, accounts[0]]
                })
                .then(() => {
                  setModal(!modal);
                })
                .catch((error) => console.log(error.message));
            });
          } catch (error) {
            console.log(error);
        }
      }
        if (myaccount) {
            const network = await web3.eth.getChainId();
            setMynetwork(network);
            if (network === 2481366625373186) {
            const guerABI = await new web3.eth.Contract(GUER_ABI, GUER_ADDRESS);
            setGuer(guerABI);
            const accountArray = await guerABI.methods.getUserNFTs().call({from:myaccount});
            console.log(accountArray.length);
            if (accountArray.length > 0 && Object.keys(accountinfo).length === 0) {
                const accountinfoblock = await guerABI.methods.getaNFTInfo(accountArray[0]).call({from:myaccount});
                console.log(accountinfoblock);
                    setAccountinfo(accountinfoblock);
                    setMyaccount(accountinfoblock[0]);
                    setName(web3.utils.toUtf8(accountinfoblock[1]))
                    setEmail(web3.utils.toUtf8(accountinfoblock[2]))
                    setLogo(web3.utils.toUtf8(accountinfoblock[4]))     
                    setLoading(false);
            }
          }
        }
        }
    loadEthereumData();
    setLoading(false);
  },[myaccount,accountinfo]);

  const uploadFile = async (e) => {
    setPhotoloading(true);
    console.log(photoloading);
    document.getElementById("submit").disabled = true;
    const data = new FormData();
    const file = document.getElementById("user_profile_image").files[0];
    data.append("file", file);
    fetch('/api/archon', {
        body: data,
        method: 'POST'
    })
        //.then(res => res.json())
        .then(res => {console.log(res);setLogo(file.name); setPhotoloading(false)})
        .catch(error => error.message)
}

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My Store</h3>
                  </Col>
                  <Col className="text-right" xs="4">

                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-name"
                          >
                            Company Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-name"
                            placeholder="My Company"
                            type="text"
                            defaultValue ={name}  
                          />
                          <br/>
                          <label
                            className="form-control-label"
                            htmlFor="user_profile_image"
                          >
                           Logo
                          </label>
                          <br/>
                          {logo ? 
                            <img alt="" style={{maxWidth:'60px'}} src={logo ? "https://gateway.ipfs.io/ipfs/" + logo : ''}/>
                          : ''}
                  <br/>
                          <input id="user_profile_image" type="file" onChange={(e) => uploadFile(setLogo,e.target.id)}/>

            <div id="status">{loading ? 'Uploading your file' : ''}</div>    
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                        <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                           Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="cryptostore@b-commerce.co"
                            type="email"
                            defaultValue ={email} 
                          />
                        </FormGroup>
                        <FormGroup>
                        <label
                            className="form-control-label"
                            htmlFor="input-ens"
                          >
                           ENS Domain
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-ens"
                            placeholder="mycryptostore.eth"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">Company Description</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>About</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about you ..."
                        rows="4"
                        defaultValue="We make cups! We make cups with the highest quality materials!"
                        type="textarea"
                      />
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
