import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Web3Modal from "web3modal";
import Torus from "@toruslabs/torus-embed";
import classnames from "classnames";
import Chart from "chart.js";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import "@fontsource/questrial"

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
  Modal,
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Input,
  FormText
} from "reactstrap";
import { GUER_ABI,GUER_ADDRESS } from '../config';

import Header from "components/Headers/Header.js";
import "../styles.css"

const IPFS = require('ipfs-http-client');

const Index = (props) => {
  const [web3, setWeb3] = useState('');
  const [web3test, setWeb3test] = useState(0);
  const [modal, setModal] = useState(false);
  const [importmodal, setImportmodal] = useState(false);
  const [choicemodal, setChoicemodal] = useState(false);
  const [createmodal, setCreatemodal] = useState(false);
  const [myaddress, setMyaddress] = useState('');
  const [photoloading, setPhotoloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [mynetwork, setMynetwork] = useState('');
  const [myaccount, setMyaccount] = useState('');
  const [guer, setGuer] = useState('');
  const [loading, setLoading] = useState(false);
  //const [myprofile, setMyprofile] = useState('');
  const [accountinfo, setAccountinfo] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [logo, setLogo] = useState('');
  const [product1image, setProduct1image] = useState('');
  const [product1title, setProduct1title] = useState('');
  const [product1description, setProduct1description] = useState('');
  const [product1price, setProduct1price] = useState('');
  const [product1sku, setProduct1sku] = useState('');

  const toggle = () => setModal(!modal);
  const toggleimport = () => setImportmodal(!importmodal);
  const togglechoice = () => setChoicemodal(!choicemodal);
  const togglecreate = () => setCreatemodal(!createmodal);


  if (web3 === ''){
    setWeb3(new Web3(Web3.givenProvider));
}

const providerOptions = {
  torus: {
    package: Torus, 
  }
};

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions // required
});

  const web3Check = async () => {
    if (window.ethereum) {
      window.ethereum.autoRefreshOnNetworkChange = false;
      try {
          await window.ethereum.enable()
          if (myaccount)
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
          })

          ;
        } catch (error) {
          alert("You need to allow access to your metamask to use the app.");
      }
    }
}

  useEffect(() => {
    const loadEthereumData = async () => {
        if (myaccount) {
            setLoading(true);
            const network = await web3.eth.getChainId();
            setMynetwork(network);
            if (network === 2481366625373186) {
            const guerABI = await new web3.eth.Contract(GUER_ABI, GUER_ADDRESS);
            console.log(guerABI);
            setGuer(guerABI);
            console.log(guerABI);
            const accountArray = await guerABI.methods.getUserNFTs().call({from:myaccount});
            console.log(accountArray);
            if (accountArray.length > 0) {
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
},[web3,myaccount, accountinfo]);


  const registerAccount = async () =>{   
       setPhotoloading(true);
       let _name = web3.utils.fromAscii(name)
       let _email = web3.utils.fromAscii(email)
       let _logo = web3.utils.fromAscii(logo)
       let _mobile = web3.utils.fromAscii(1)

       console.log(_name + " " + _email + " " +  _logo);
       console.log(guer);
       guer.methods.createNFT(_name, _email, _mobile, _logo).send({
           from: myaccount
       })
       .then(function(result){
           console.log(result);
           window.location.reload(false);
       }).catch(function(error){
           console.log(error);
   });
   setLoading(false);
  };

  const uploadFile = async () => {
        const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
        const file = document.getElementById("product1image").files[0];
        const upload = await ipfs.add(file);
        console.log(upload.path);
        setLogo(upload.path);
    }

    const uploadStoredata = async () => {

      const data = {
        "product1pic": product1image,
        "product1title": product1title,
        "product1description": product1description,
        "product1price": product1price,
        "product1sku": product1sku,

    };  
    const readydata = JSON.stringify(data);
    console.log(readydata);

          const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
          const upload = await ipfs.add(readydata);
          guer.methods.doUpdateMarketplaceJson(myaccount, upload.path).send({
                  from: myaccount
              })
              .then(function(result){
                  console.log(result);
              }).catch(function(error){
                  console.log(error);
          });
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
                <div style={{fontSize:'80px',color:'lightblue'}}>WELCOME</div>
                <div style={{fontSize:'20px',color:'#FAAFA5', fontWeight:'bold'}}>WE'LL HAVE YOU UP AND RUNNING IN NO TIME<br/>BETTER AND MORE BLOCKCHAIN-Y THAN EVERY BEFORE. READY?</div>
                <br/><br/><br/>
                <div>
                  <div style={{border:' 5px solid lightblue',borderRadius:'25px',maxWidth:'60%',display:'table',width:'60%',margin:'0 auto',padding:'10px 20px'}}>
                    <div style={{display: 'table-row'}}>
                    <div onClick={() => {web3Check(); }} style={{cursor: 'pointer',display: 'table-cell', padding:'5px',color:'#67D0DD',fontSize:'70px', fontWeight:'bold',verticalAlign: 'middle'}}>1.</div>
                    <div onClick={() => {web3Check(); }}  style={{cursor: 'pointer',display: 'table-cell', padding:'5px',color:'#FAAFA5',fontSize:'50px', fontWeight:'bold',verticalAlign: 'middle'}}>Register</div>
                    <div style={{display: 'table-cell', padding:'5px',fontSize:'16px',verticalAlign: 'middle',textAlign:'left'}}>LET THE WORLD KNOW WHO YOU ARE, WITHOUT GIVING UP CONTROL OF WHO YOU ARE</div>
                    </div>
                  </div>
                </div>
                <br/><br/><br/>
                <div>
                  <div style={{border:' 5px solid lightblue',borderRadius:'25px',maxWidth:'60%',display:'table',width:'60%',margin:'0 auto',padding:'10px 20px'}}>
                    <div style={{display: 'table-row'}}>
                    <div onClick={() => {setChoicemodal(!choicemodal);}}style={{cursor: 'pointer',display: 'table-cell', padding:'5px',color:'#67D0DD',fontSize:'70px', fontWeight:'bold',verticalAlign: 'middle'}}>2.</div>
                    <div onClick={() => {setChoicemodal(!choicemodal);}}style={{cursor: 'pointer',display: 'table-cell', padding:'5px',color:'#FAAFA5',fontSize:'50px', fontWeight:'bold',verticalAlign: 'middle'}}>Create</div>
                    <div style={{display: 'table-cell', padding:'5px',fontSize:'16px',verticalAlign: 'middle',textAlign:'left'}}>IMPORT AN EXISTING INVENTORY FROM SHOPIFY, OR START ADDING YOUR OWN PRODUCTS FROM SCRATCH</div>
                    </div>
                  </div>
                </div>
                <br/><br/><br/>
                <div>
                  <div style={{border:' 5px solid lightblue',borderRadius:'25px',maxWidth:'60%',display:'table',width:'60%',margin:'0 auto',padding:'10px 20px'}}>
                    <div style={{display: 'table-row'}}>
                    <div style={{display: 'table-cell', padding:'5px',color:'#67D0DD',fontSize:'70px', fontWeight:'bold',verticalAlign: 'middle'}}><Link to={'user-profile'} style={{color:'#67D0DD'}}>3.</Link></div>

                    <div style={{display: 'table-cell', padding:'5px',color:'#FAAFA5',fontSize:'50px', fontWeight:'bold',verticalAlign: 'middle'}}><Link to={'user-profile'} style={{color:'#FAAFA5'}}>Customize</Link></div>
                    <div style={{display: 'table-cell', padding:'5px',fontSize:'16px',verticalAlign: 'middle',textAlign:'left'}}>MAKE YOUR SHOP YOUR OWN BY SELECTING COLORS, LOGOS, SHOP INFORMATION, AND MORE!</div>
                    </div>
                  </div>
                </div>
                <div>
      <Modal isOpen={modal} toggle={toggle} className="purplemodal" cssModule={{'modal-title': 'w-100 text-center', 'font-size':'20px','background-color':'purple','color':'white'}}>
        <ModalHeader toggle={toggle} cssModule={{'modal-title': 'w-100 text-center', 'font-size':'20px'}}>REGISTER</ModalHeader>
        <ModalBody>
        <div style={{paddingBottom:'10px',color:"white"}}>Your Ethereum Address:<br/>{myaccount}</div><br/>
        <label
                            className="form-control-label"
                            htmlFor="input-name"
                          >
                            Store Name
                          </label>
            <Input style={{paddingBottom:'10px'}} id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} placeholder="Store Name" />
            <br/>
            <label
                            className="form-control-label"
                            htmlFor="input-name"
                          >
                            Store Email
                          </label>
            <Input style={{paddingBottom:'10px'}} id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Store Email" />
            <br/><br/>
            
            <input id="data_file" type="file" onChange={(e) => uploadFile(setLogo,e.target.id)}/>
            <FormText color="white">
              Upload your company logo
            </FormText>
            {logo ? 
                    <img alt="" style={{maxWidth:'60px'}} src={logo ? "https://gateway.ipfs.io/ipfs/" + logo : ''}/>
                  : ''}
            <div id="status">{loading ? 'Uploading your file' : ''}</div>        
        </ModalBody>
        <ModalFooter>
        <Button onClick={toggle} color="white">
            Cancel
        </Button>
        <Button id="submit" onClick={() => registerAccount()} color="white" disabled={photoloading}>
            {photoloading ? "Uploading..." : "Create!"}
        </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={choicemodal} toggle={togglechoice} className="pinkmodal">
        <ModalHeader toggle={togglechoice} cssModule={{'modal-title': 'w-100 text-center'}}>CREATE</ModalHeader>
        <ModalBody>

        <div style={{display: 'table-row'}}>
                    <div style={{display: 'table-cell', padding:'10px',fontSize:'18px', verticalAlign: 'middle',lineHeight:'2',color:'white'}}>
                    Already have a shopify store? Take back control and reduce fees in just a few clicks. Get started!
                    <br/>
                    <Button onClick={() => {togglechoice();toggleimport()}} color="white">
                        IMPORT
                    </Button>
                    </div>

                    <div style={{display: 'table-cell', padding:'10px',fontSize:'18px',verticalAlign: 'middle', textAlign:'left',lineHeight:'2',color:'white'}}>All the opportunities await you! Take a quick second to create your first product for your blockchain commerce store!
                    <br/>
                    <Button onClick={() => {togglecreate();togglecreate()}} color="white">
                        START FROM SCRATCH
                    </Button>
                    </div>
                    </div>     
        </ModalBody>
        <ModalFooter>
        <Button onClick={togglechoice} color="white">
            Cancel
        </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={createmodal} toggle={togglecreate} className="pinkmodal" >
        <ModalHeader toggle={togglecreate} cssModule={{'modal-title': 'w-100 text-center', 'font-size':'20px'}}>CREATE</ModalHeader>
        <ModalBody>
        <div style={{paddingBottom:'10px',color:'white'}}>Let's take a quick moment to walk you through creating a new product for your inventory. You can always update this later if needed!</div>
                <hr/>
                <label
                            className="form-control-label"
                            htmlFor="input-name"
                          >
                            Product Name
                          </label>
                <Input  value={product1title} onChange={(e) => setProduct1title(e.target.value)}/>
                <br/>
                <label
                            className="form-control-label"
                            htmlFor="input-name"
                          >
                            Product Description
                          </label>
                <Input value={product1description} onChange={(e) => setProduct1description(e.target.value)}/>
                <br/>
                <label
                            className="form-control-label"
                            htmlFor="input-name"
                          >
                            Product Price
                          </label>
                <Input value={product1price} onChange={(e) => setProduct1price(e.target.value)}/>
                <br/>
                <label
                            className="form-control-label"
                            htmlFor="input-name"
                          >
                            Product SKU
                          </label>
                <Input value={product1sku} onChange={(e) => setProduct1sku(e.target.value)}/>
                <br/>
                <div className="file-field input-field">
                    <input
                        accept="image/*"
                        id="product1image"
                        type="file"
                    onChange={(e) => {uploadFile(setProduct1image,e.target.id)}}
                    />
                    <label htmlFor="product1image">
                    </label>
                    <img alt="" style={{maxWidth:'60px'}} src={product1image ? "https://gateway.ipfs.io/ipfs/" + product1image : ''}/>
                </div>
        </ModalBody>
        <ModalFooter>
        <Button onClick={togglecreate} color="white">
            Cancel
        </Button>
        <Button id="submit" onClick={() => uploadStoredata()} color="white" disabled={photoloading}>
            {photoloading ? "Uploading..." : "Create product!"}
        </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={importmodal} toggle={toggleimport} className="pinkmodal">
        <ModalHeader toggle={toggleimport} cssModule={{'modal-title': 'w-100 text-center', 'font-size':'20px'}}>IMPORT</ModalHeader>
        <ModalBody>
        <div style={{paddingBottom:'10px',color:'white'}}>It's easy to import your existing Shopify inventory to your own B-commerce Shop! Ditch the fees and embrace the blockchain in a few clicks! 
        <br/><br/>1. Log-in to your Shopify Dashboard, and select "Products"
        <br/><br/>2. At the top right, click "Export", Select "All Products" and "Plain CSV file", and click "Export Products"
        <br/><br/>3. When you receive the file in your e-mail, upload it here!
        <br/><br/>
            <input id="storedata" type="file" onChange={(e) => uploadStoredata(setLogo,e.target.id)}/>
            <FormText color="muted">
              Upload your company logo
            </FormText>
            {logo ? 
                    <img alt="" style={{maxWidth:'60px'}} src={logo ? "https://gateway.ipfs.io/ipfs/" + logo : ''}/>
                  : ''}
            <div id="status">{loading ? 'Uploading your file' : ''}</div>        
        </div>
        </ModalBody>
        <ModalFooter>
        <Button onClick={toggleimport} color="white">
            Cancel
        </Button>
        <Button id="submit" onClick={() => console.log('a')} color="white" disabled={true}>
            {photoloading ? "Uploading..." : "Upload list! (disabled)"}
        </Button>
        </ModalFooter>
      </Modal>
    </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
