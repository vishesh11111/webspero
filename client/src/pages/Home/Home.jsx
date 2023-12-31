import React, { useEffect, useState } from 'react'
import api_wrapper, { BaseImageUrl } from '../../api/Api_Wrapper'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import { EditUser } from '../../components/users/EditUser';
import { Avatar } from '@mui/material';
import { Navbar } from '../../components/Navbar/Navbar';
import { useSelector } from 'react-redux';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const header = ["Image", "Name", "Email", "Phone", "Zipcode", "Created Data",]

export const Home = () => {
    const [state, setState] = useState({
        data: [],
        userDetails: {},
    })
    const [open, setOpen] = useState(false);
    const refreshdata = useSelector((e)=>e?.refresh)
    console.log("---++++LL", refreshdata);

    const handleclose = () => {
        setOpen(false);
    }

    const getAPiData = async () => {
        try {
            const responce = await api_wrapper.get("/users/get/list")
            // console.log(responce?.data?.data);
            setState(pre => ({ ...pre, data: responce?.data?.data }))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAPiData();
    }, [refreshdata])

    const hanldeOpenPopUp = (details, index) => {
        setState(pre => ({ ...pre, userDetails: details }));
        setOpen(true)
    }

    return (
        <div>
            <Navbar refresh={getAPiData}/>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {
                                header?.map((item, index) => (
                                    <StyledTableCell align="right" key={index}>{item}</StyledTableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state?.data?.map((row, index) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row">
                                    <Avatar src={`${BaseImageUrl}/${row?.file}`} />
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.email}</StyledTableCell>
                                <StyledTableCell align="right">{row.phone}</StyledTableCell>
                                <StyledTableCell align="right">{row.zipCode}</StyledTableCell>
                                <StyledTableCell align="right">{Date(row?.createdAt)}</StyledTableCell>
                                {/* <StyledTableCell align="right" ><BrowserUpdatedIcon onClick={() => hanldeOpenPopUp(row, index)} /></StyledTableCell> */}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <EditUser open={open} handleClose={handleclose} userDetails={state.userDetails} />
        </div>
    )
}
