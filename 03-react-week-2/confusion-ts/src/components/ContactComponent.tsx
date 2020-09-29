import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Col, Form, FormGroup, Input, Label, FormFeedback, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import { type } from 'os';
import { IValidationResponse, ValidationTypes, ValidatorFunction, Validators } from '../functions/validate-field';
import { access } from 'fs';



interface IContactForm {
    firstName: string;
    lastName: string;
    telNum: string;
    email: string;
    agree: boolean;
    contactType: string;
    message: string;
}

interface IContactState extends IContactForm {
    touched: any;
}

interface IErrors {
    minLenght?: string;
    maxLenght?: string;
    required?: string;
}


class Contact extends Component<{}, IContactState> {

    errors: Record<keyof IContactForm, IErrors> = {
        firstName: {
            minLenght: 'First Name should be >>= 3 characters',
        },
        lastName: {
            minLenght: 'Last Name should be >>= 3 characters',
        },
        contactType: {
            required: '',
        },
        email: {
            required: 'The email is mandatory',
        },
        agree: {
            required: '',
        },
        message: {
            required: '',
        },
        telNum: {
            required: '',
            maxLenght: 'Tel. Num should be <= 10 characters',
            minLenght: 'Tel. Num should be >>= 3 characters',
        }
    }

    errorMessages: Record<keyof IContactForm, string[]> = {
        firstName: [],
        lastName: [],
        telNum: [],
        email: [],
        agree: [],
        contactType: [],
        message: [],
    }


    constructor(props: any) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            telNum: '',
            email: '',
            agree: false,
            contactType: 'Tel.',
            message: '',
            touched: {
                firstName: false,
                lastName: false,
                telNum: false,
                email: false,
                agree: false,
                contactType: false,
                message: false,
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleBlur(field: string) {
        return (event: any) => {
            this.setState(
                {
                    touched: {
                        ...this.state.touched,
                        [field]: true,
                    },
                },
            );
        };
    }


    validate(fieldName: keyof IContactForm, value: string, validatorFunctions: ValidatorFunction[]): string[] | undefined {
        console.log(this.state.touched[fieldName]);
        if (this.state.touched[fieldName]) {
            const fieldErrros: Partial<Record<ValidationTypes, string>> = this.errors[fieldName];
            return validatorFunctions.reduce(
                (acc: string[], func: ValidatorFunction) => {
                    const validaationResponse = func(value);
                    console.log(validaationResponse);
                    if (validaationResponse) {
                        const errorName = Object.keys(validaationResponse)[0] as ValidationTypes;
                        acc.push(fieldErrros[errorName] as string);
                    }
                    return acc;
                }, []
            );
        }
    }

    handleInputChange(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name as keyof IContactState;
        const partialState: any = {
            [name]: value,
        };
        this.setState(
            partialState,
        );
    }

    handleSubmit(event: any) {
        console.log('Current state is ', JSON.stringify(this.state));
        alert('Current state is ' + JSON.stringify(this.state));
    }

    renderErrors(errors: string[] | undefined) {
        if (errors && errors.length > 0) {
            return (
                <Alert color="danger">
                    {errors.map((err, index) => <span key={index+err}>{err}</span>)}
                </Alert>
            )
        } else {
            return (<div></div>)
        }
    }

    render() {
        const errors: Partial<Record<keyof IContactForm, string[] | undefined>> = {
            firstName: this.validate('firstName', this.state.firstName, [Validators.minLength(3)]),
            lastName: this.validate('lastName', this.state.lastName, [Validators.minLength(3)]),
            email: this.validate('email', this.state.email, [Validators.required]),
            telNum: this.validate('telNum', this.state.telNum, [Validators.maxLength(10), Validators.minLength(3)]),
        };
        console.log('errors', errors);
        return (
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/home">Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        Contact us
            </BreadcrumbItem>
                </Breadcrumb>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br />
                        Clear Water Bay, Kowloon<br />
                        HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={this.state.firstName}
                                        onBlur={this.handleBlur('firstName')}
                                        onChange={this.handleInputChange}
                                        valid={errors.firstName && errors.firstName.length === 0}
                                    />
                                    {this.renderErrors(errors.firstName)}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={this.state.lastName}
                                        onBlur={this.handleBlur('lastName')}
                                        onChange={this.handleInputChange}
                                        valid={errors.lastName && errors.lastName.length === 0}
                                    />
                                    {this.renderErrors(errors.lastName)}
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label htmlFor="telNum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Input
                                        type="tel"
                                        id="telNum"
                                        name="telNum"
                                        placeholder="Telephone Number"
                                        value={this.state.telNum}
                                        onBlur={this.handleBlur('telNum')}
                                        onChange={this.handleInputChange}
                                        valid={errors.telNum && errors.telNum.length === 0}
                                    />
                                    {this.renderErrors(errors.telNum)}

                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                        onBlur={this.handleBlur('email')}
                                        valid={errors.email && errors.email.length === 0}
                                    />
                                    {this.renderErrors(errors.email)}
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md={{ size: 6, offset: 2 }}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type="checkbox"
                                                name="agree"
                                                checked={this.state.agree}
                                                onChange={this.handleInputChange}
                                            />
                                            {' '} <strong>May we contact you?</strong>


                                        </Label>

                                    </FormGroup>
                                </Col>
                                <Col md={{ size: 3, offset: 1 }}>
                                    <Input
                                        type="select"
                                        name="contactType"
                                        value={this.state.contactType}
                                        onChange={this.handleInputChange}
                                    >
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label htmlFor="feedback" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Input
                                        type="textarea"
                                        id="message"
                                        name="message"
                                        value={this.state.message}
                                        onChange={this.handleInputChange}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>

                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;