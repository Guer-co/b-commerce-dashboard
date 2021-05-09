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
import React, { useState } from 'react';

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



const Profile = () => {
  const [logo, setLogo] = useState('');
  const [loading, setLoading] = useState(false);
  const [photoloading, setPhotoloading] = useState(false);

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
                          />
                          <br/>
                          <label
                            className="form-control-label"
                            htmlFor="user_profile_image"
                          >
                           Logo
                          </label>
                          <br/>
                          <img alt="" style={{maxWidth:'60px'}} src={"https://gateway.ipfs.io/ipfs/QmZX5G8oFmDYayMdD92kkR4PhYJRkNX5hTKG8ZatAX685B"} />
<br/>
                          <input id="user_profile_image" type="file" onChange={(e) => uploadFile(setLogo,e.target.id)}/>
            {logo ? 
                    <img alt="" style={{maxWidth:'60px'}} src={logo ? "https://gateway.ipfs.io/ipfs/" + logo : ''}/>
                  : ''}
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
