import React, { useEffect, useState } from "react";
import "./RegistrationForm.css";
import axios from "axios";
import { Link ,useHistory } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileno: "",
    password: "",
    modelname: "",
    modelbrand: "",
    registrationnumber: "",
    description: "",
    pickuptime: "",
    deliverydate: "",
    deliverytime: "",
    address: "",
    feedback: "",
  });
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [editUserIndex, setEditUserIndex] = useState(-1); // Index of the user in edit mode, -1 means no user is in edit mode.

  // Validation state
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/showDetails");
      setUsers(response.data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validation rules for each field
    if (formData.name.trim() === "") {
      newErrors.name = "Name is required";
    }
    if (formData.mobileno.trim() === "") {
      newErrors.mobileno = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileno)) {
      newErrors.mobileno = "Mobile number must be 10 digits";
    }
    if (formData.password.trim() === "") {
      newErrors.password = "Password is required";
    }
    if (formData.modelname.trim() === "") {
        newErrors.modelname = "Model name is required";
      }
      if (formData.modelbrand.trim() === "") {
        newErrors.modelbrand = "Model brand is required";
      }
      if (formData.registrationnumber.trim() === "") {
        newErrors.registrationnumber = "Registration Number is required";
      }
      if (formData.description.trim() === "") {
        newErrors.description = "Kindly provide the service you require";
      }
      if (formData.pickuptime.trim() === "") {
        newErrors.pickuptime = "Kindly provide the pickup time of the vehicle";
      }
      if (formData.deliverydate.trim() === "") {
        newErrors.deliverydate = "Kindly provide the delivery date of the vehicle";
      }
      if (formData.deliverytime.trim() === "") {
        newErrors.deliverytime = "Kindly provide the delivery time of the vehicle";
      }
      if (formData.address.trim() === "") {
        newErrors.address = "Kindly provide the address for the delivery";
      }
      if (formData.feedback.trim() === "") {
        newErrors.feedback = "Kindly provide the feedback";
      }
      

    // Add more validation rules for other fields

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        // Send the formData object to the server
        const response = await axios.post(
          "http://localhost:8080/addDetails",
          formData
        );
        console.log("Data posted successfully:", response.data);
        loadUsers();
        history.push('/');
      } catch (error) {
        console.error("Error posting data:", error);
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="reg-form-container">
      <h1>Book a Service</h1>
      <form className="reg-form-form" onSubmit={handleSubmit}>
        <div className="reg-form-row">
        <div className='reg-form-div'>
            <label className='reg-form-label'>Name</label>
            <input
              type='text'
              className='reg-form-input'
              placeholder='Enter your Name'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <p className='error-message'>{errors.name}</p>}
          </div>
          <div className='reg-form-div'>
            <label className='reg-form-label'>Mobile Number</label>
            <input
              type='text'
              className='reg-form-input'
              placeholder='Enter your mobile number'
              name='mobileno'
              value={formData.mobileno}
              onChange={handleInputChange}
            />
            {errors.mobileno && <p className='error-message'>{errors.mobileno}</p>}
          </div>
          <div className='reg-form-div'>
            <label className='reg-form-label'>Password</label>
            <input
              type='text'
              className='reg-form-input'
              placeholder='Enter your password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <p className='error-message'>{errors.password}</p>}
          </div>
          <div className="reg-form-div">
            <label className="reg-form-label">Model Name</label>
            <input
              type="text"
              className="reg-form-input"
              placeholder="Enter your model Name"
              name="modelname"
              value={formData.modelname}
              onChange={handleInputChange}
            />
            {errors.modelname && <p className='error-message'>{errors.modelname}</p>}
          </div>
          <div className="reg-form-div">
            <label className="reg-form-label">Model Brand</label>
            <input
              type="text"
              className="reg-form-input"
              placeholder="Enter your brand"
              name="modelbrand"
              value={formData.modelbrand}
              onChange={handleInputChange}
            />
             {errors.modelbrand && <p className='error-message'>{errors.modelbrand}</p>}
          </div>
          <div className="reg-form-div">
            <label className="reg-form-label">Registration Number</label>
            <input
              type="text"
              className="reg-form-input"
              placeholder="Enter your Vehicle Registration number"
              name="registrationnumber"
              value={formData.registrationnumber}
              onChange={handleInputChange}
            />
            {errors.registrationnumber && <p className='error-message'>{errors.registrationnumber}</p>}
          </div>
          <div className="reg-form-div">
            <label className="reg-form-label">Service Description</label>
            <input
              type="text"
              className="reg-form-input"
              placeholder="Brief the Service you require"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
            {errors.description && <p className='error-message'>{errors.description}</p>}
          </div>
          <div className="reg-form-div">
            <label className="reg-form-label">Pickup Time</label>
            <input
              type="datetime-local"
              className="reg-form-input"
              name="pickuptime"
              value={formData.pickuptime}
              onChange={handleInputChange}
            />
            {errors.pickuptime && <p className='error-message'>{errors.pickuptime}</p>}
          </div>
          <div className="reg-form-div">
            <label className="reg-form-label">Delivery date</label>
            <input
              type="datetime-local"
              className="reg-form-input"
              name="deliverydate"
              value={formData.deliverydate}
              onChange={handleInputChange}
            />
            {errors.deliverydate && <p className='error-message'>{errors.deliverydate}</p>}
          </div>
          <div className="reg-form-div">
            <label className="reg-form-label">Delivery time</label>
            <input
              type="datetime-local"
              className="reg-form-input"
              name="deliverytime"
              value={formData.deliverytime}
              onChange={handleInputChange}
            />
             {errors.deliverytime && <p className='error-message'>{errors.deliverytime}</p>}
          </div>
          <div className="reg-form-div">
            <label className="reg-form-label">Delivery Address</label>
            <input
              type="text"
              className="reg-form-input"
              placeholder="Enter the delivery Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            {errors.address && <p className='error-message'>{errors.address}</p>}
          </div>
          <div className="reg-form-div">
            <label className="reg-form-label">Feedback</label>
            <input
              type="text"
              className="reg-form-input"
              placeholder="Enter your feedback here"
              name="feedback"
              value={formData.feedback}
              onChange={handleInputChange}
            />
             {errors.feedback && <p className='error-message'>{errors.feedback}</p>}
          </div>
        </div>

       <button type="submit" className="reg-form-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
