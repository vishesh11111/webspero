import React, { useState } from 'react';
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import { Badge } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import api_wrapper, { BaseImageUrl } from '../../api/Api_Wrapper';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { RefreshAction } from '../Redux/action';



export const EditUser = ({ open, handleClose, refresh }) => {
    const userDetails = useSelector((e) => e?.userDetails)
    const [editedDetails, setEditedDetails] = useState({});
    const [imageSrc, setImageSrc] = useState(null)
    const [error, setError] = React.useState({ errorCode: 0, msg: "" });
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch();



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name == "file") {
            const file = e.target.files[0];
            setEditedDetails({ ...editedDetails, [name]: file });
        } else {
            setEditedDetails({ ...editedDetails, [name]: value });
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const formData = new FormData();

            // Convert each key-value pair to FormData
            console.log(editedDetails)
            Object.entries(editedDetails).forEach(([key, value]) => {
                formData.append(key, value);
            });

            // Perform submission or API call to update user details with editedDetails
            const updateData = await api_wrapper.put("/users/details/update", formData)
            console.log('Edited Details:--->', updateData?.data);
            if (updateData?.data?.status) {
                setLoading(false)
                // refresh();
                dispatch(RefreshAction(1))
                handleClose();
                setError({ errorCode: 1, msg: updateData?.data?.message });
                setTimeout(() => {
                    setError({ errorCode: 0, msg: "" })
                }, 1000);
            } else {
                setLoading(false)
                setError({ errorCode: 2, msg: updateData?.data?.message });
                dispatch(RefreshAction(1))
                setTimeout(() => {
                    setError({ errorCode: 0, msg: "" })
                }, 2000);
            }
        } catch (error) {
            setLoading(false)
            setError({ errorCode: 2, msg: error?.response?.data?.message });
            setTimeout(() => {
                setError({ errorCode: 0, msg: "" })
            }, 2000);
            // setError({ errorCode: 2, msg: error });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageSrc(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit User Details</DialogTitle>
            <DialogContent>
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    sx={{ marginBottom: "20px" }}
                    badgeContent={
                        // <SmallAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <TextField
                            required
                            size='small'
                            type={"file"}
                            id="file"
                            // label="choose file"
                            sx={{ width: "10px", height: "10px" }}
                            name="file"
                            onChange={(e) => {
                                handleImageChange(e)
                                handleInputChange(e)
                            }}
                        />
                        // <input type={"file"} onChange={(e) => handleImageChange(e)} />
                    }
                >
                    <Avatar alt="Travis Howard" src={imageSrc ? imageSrc : `${BaseImageUrl}/${userDetails?.file}`} />
                </Badge>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    name="name"
                    defaultValue={userDetails?.name}
                    value={editedDetails.name}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    name="email"
                    defaultValue={userDetails?.email}
                    value={editedDetails.email}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    label="Phone"
                    type="text"
                    fullWidth
                    name="phone"
                    defaultValue={userDetails?.phone}
                    value={editedDetails.phone}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    label="Zip Code"
                    type="text"
                    fullWidth
                    name="zipCode"
                    defaultValue={userDetails?.zipCode}
                    value={editedDetails.zipCode}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    label="Password"
                    type="password"
                    fullWidth
                    name="password"
                    value={editedDetails.password}
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    {loading ? <CircularProgress /> : "Submit"}
                </Button>
            </DialogActions>
            {error.errorCode == 1 && <Alert severity="success">{error?.msg}</Alert>}
            {error?.errorCode == 2 && <Alert severity="error">{error?.msg}</Alert>}
        </Dialog>
    );
};