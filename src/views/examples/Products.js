import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Modal,
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Button,
  Input,
  FormText
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const Products = () => {
  const [copiedText, setCopiedText] = useState();
  const [web3, setWeb3] = useState('');
  const [web3test, setWeb3test] = useState(0);
  const [modal, setModal] = useState(false);
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [photoloading, setPhotoloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [mynetwork, setMynetwork] = useState('');
  const [myaccount, setMyaccount] = useState('');
  const [guer, setGuer] = useState('');
  const [loading, setLoading] = useState(false);
  //const [myprofile, setMyprofile] = useState('');
  const [accountinfo, setAccountinfo] = useState({});
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const toggle = () => setModal(!modal);

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
        .then(res => {console.log(res);setImage(file.name); setPhotoloading(false)})
        .catch(error => error.message)
}

  return (
        <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Products</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" style={{color:'#67D0DD',fontWeight:'bold',fontSize:'12px'}}>Product Name</th>
                    <th scope="col" style={{color:'#67D0DD',fontWeight:'bold',fontSize:'12px'}}>Status</th>
                    <th scope="col" style={{color:'#67D0DD',fontWeight:'bold',fontSize:'12px'}}>Price</th>
                    <th scope="col" style={{color:'#67D0DD',fontWeight:'bold',fontSize:'12px'}}>SKU</th>
                    <th scope="col" style={{color:'#67D0DD',fontWeight:'bold',fontSize:'12px'}}>Type</th>
                    <th scope="col" style={{color:'#67D0DD',fontWeight:'bold',fontSize:'12px'}}>Created Date</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <div onClick={toggle}>
                          <img
                            alt="..."
                            src={"https://cloudflare-ipfs.com/ipfs/QmYMJ2NNRzeiqKRoF2Z5fCEoxTFGasnDZHReZQd5TqmyDf"}
                          />
                          </div >
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">
                            Coozie
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>Active</td>
                    <td>$5 / ⧫.00029</td>
                    <td>
                      <div>
                        <strong>PM-A46-2222-0234</strong>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                          Physical
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                      4/28/2021
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <div onClick={toggle}>
                          <img
                            alt="..."
                            src={"https://cloudflare-ipfs.com/ipfs/QmejU4MYdfGLitNEVwGSuBD2zesKa7G9sFhpqUUcGpd5B9"}
                          />
                          </div >
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">
                            Mask
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>Active</td>
                    <td>$10 / ⧫.00029</td>
                    <td>
                      <div>
                        <strong>AG-A46-2222-1656</strong>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                          Physical
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                      3/21/2021
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <div onClick={toggle}>
                          <img
                            alt="..."
                            src={"https://cloudflare-ipfs.com/ipfs/QmR5sYByCjZeJ57DpRxgUQYeT1asxAknZGuDR63iW9AbwY"}
                          />
                          </div >
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">
                            Tote
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>Active</td>
                    <td>$15 / ⧫.00029</td>
                    <td>
                      <div>
                        <strong>TG-A46-zxcv-fghj</strong>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                          Physical
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                      1/15/2021
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <div onClick={toggle}>
                          <img
                            alt="..."
                            src={"https://cloudflare-ipfs.com/ipfs/QmXAti2JQo1ZUfTBvotZr2E7YX4Jpyz92pxEmEsNG6bJMF"}
                          />
                          </div >
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">
                            Onezie
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>Active</td>
                    <td>$20 / ⧫.0007</td>
                    <td>
                      <div>
                        <strong>BA-BZA-6666-5555</strong>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                          Physical
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                      2/14/2021
                      </div>
                    </td>
                  </tr>
                
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
      <Modal isOpen={modal} toggle={toggle} style={{background: 'linear-gradient(87deg, #5e72e4 0, #825ee4 100%) !important' }} className="custom-modal">
        <ModalHeader toggle={toggle}>Product Edit</ModalHeader>
        <ModalBody>
        <div style={{paddingBottom:'10px',fontSize:'24px'}}>Coozie<br/>{myaccount}</div><br/>
            <label className="form-control-label" > Product Name </label>
            <Input style={{paddingBottom:'10px'}} label="Name" variant="outlined" value={"Coozie"} onChange={(e) => console.log(e)} placeholder="Product Name" />
            <br/>
            <label className="form-control-label" > Product Description</label>
            <Input style={{paddingBottom:'10px'}} label="Description" variant="outlined" value={"Keeps delicious beverages cool!"} onChange={(e) => console.log(e)} placeholder="Product Description" />
            <br/>
            <label className="form-control-label" > Price </label>
            <Input style={{paddingBottom:'10px'}} label="Price" variant="outlined" value={'$5'} onChange={(e) => console.log(e)} placeholder="Product Price" />
            <br/>
            <label className="form-control-label" > SKU </label>
            <Input style={{paddingBottom:'10px'}} label="SKU" variant="outlined" value={'PM-A46-2222-0234'} onChange={(e) => console.log(e)} placeholder="Product SKU (for APIs)" />
            <br/>
            <div className="text-center">Tags</div>            
            <Badge color="primary">Physical Good</Badge> <Badge color="info">Party</Badge>
            <br/><br/>
            <div className="text-center"><div>Image</div>     
            <br/>     
            <img alt="" style={{maxWidth:'60px'}} src={"https://gateway.ipfs.io/ipfs/QmYMJ2NNRzeiqKRoF2Z5fCEoxTFGasnDZHReZQd5TqmyDf"} />
            <br/><br/>
            <input id="user_profile_image" type="file" onChange={(e) => uploadFile(setImage,e.target.id)}/>
            <FormText color="muted">
              Update Product Image
            </FormText>
            </div>  



            <div id="status">{loading ? 'Uploading your file' : ''}</div>        
        </ModalBody>
        <ModalFooter>
        <Button onClick={toggle} color="dark">
            Cancel
        </Button>
        <Button id="submit" onClick={() => console.log('update product json')} color="white" disabled={photoloading}>
            {photoloading ? "Saving..." : "Update Product"}
        </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Products;
