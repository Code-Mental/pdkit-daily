import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CSVLink } from 'react-csv';
import axios from 'axios';
import { Circle } from '@mui/icons-material'; // Using Circle icon for color display
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

// Fetch data from API
const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:8083/api/admin/product1'); // Replace with your actual API URL
        return response.data.products || [];
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

// Get dynamic field headers as table headers
const getFieldHeaders = (dynamicFields) => {
    if (dynamicFields.length > 0) {
        const firstField = dynamicFields[0];
        return Object.keys(firstField).filter(key => key !== '_id' && key !== 'colors' && key !== 'selectedColors');
    }
    return [];
};

// Flatten object to array of key-value pairs
const flattenObject = (obj, prefix = '') => {
    let items = [];
    let totalQuantity = 0;

    for (const [key, value] of Object.entries(obj)) {
        if (key === '_id' || value === null || value === true || key === 'colors' || key === 'selectedColors') {
            continue;
        }

        if (key.toLowerCase().includes('color') && typeof value === 'object') {
            for (const [colorKey, colorValue] of Object.entries(value)) {
                if (colorKey.toLowerCase().includes('quantity') && !isNaN(Number(colorValue))) {
                    totalQuantity += Number(colorValue);
                    items.push({
                        key: `${prefix}${colorKey}`,
                        value: colorValue
                    });
                }
            }
        }

        if (value && typeof value === 'object' && !Array.isArray(value)) {
            const { items: nestedItems, totalQuantity: nestedQuantity } = flattenObject(value, `${prefix}${key}_`);
            items = items.concat(nestedItems);
            totalQuantity += nestedQuantity;
        } else if (Array.isArray(value)) {
            items.push({
                key: `${prefix}${key}`,
                value: value.map(item => typeof item === 'object' ? JSON.stringify(item) : item).join(', ')
            });
        } else {
            items.push({
                key: `${prefix}${key}`,
                value: typeof value === 'object' ? JSON.stringify(value) : value
            });
        }
    }

    return { items, totalQuantity };
};

// Flatten row data to include all dynamic fields
const flattenRowData = (row) => {
    const dynamicFields = [
        row.dynamicFields1 || [],
        row.dynamicFields2 || [],
        row.dynamicFields3 || [],
        row.dynamicFields4 || []
    ];

    const dynamicData = dynamicFields.flat().reduce((acc, field) => {
        const { items, totalQuantity } = flattenObject(field);
        items.forEach(({ key, value }) => {
            acc[key] = value;
        });
        if (totalQuantity > 0) {
            acc['totalQuantity'] = (acc['totalQuantity'] || 0) + totalQuantity;
        }
        return acc;
    }, {});

    return {
        firstName: row.firstName,
        product_id: row.product_id,
        category: row.category || 'N/A',
        subcategory: row.subcategory || 'N/A',
        ...dynamicData
    };
};

// Flatten collapsible section data for CSV
const flattenCollapsibleData = (row) => {
    const sections = [
        { name: 'Dynamic Fields 1', fieldSet: row.dynamicFields1 || [] },
        { name: 'Dynamic Fields 2', fieldSet: row.dynamicFields2 || [] },
        { name: 'Dynamic Fields 3', fieldSet: row.dynamicFields3 || [] },
        { name: 'Dynamic Fields 4', fieldSet: row.dynamicFields4 || [] },
    ];

    return sections.flatMap(section => section.fieldSet.flatMap(field => {
        const { items, totalQuantity } = flattenObject(field);
        return items.reduce((acc, item) => {
            acc[item.key] = item.value;
            return acc;
        }, {
            'totalQuantity': totalQuantity
        });
    }));
};

// Filter colors to exclude those with zero or falsy values
const filterColors = (colors) => {
    return Object.fromEntries(
        Object.entries(colors).filter(([color, quantity]) => quantity > 0)
    );
};

const DisplayData = () => {
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [currentField, setCurrentField] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchData();
            setRows(data);
        };
        getData();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
        setPage(0);
    };

    const handleUpdateClick = (field) => {
        setCurrentField(field);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setCurrentField(null);
    };

    const handleCheckboxChange = (color) => {
        setCurrentField({
            ...currentField,
            selectedColors: {
                ...currentField.selectedColors,
                [color]: !currentField.selectedColors[color]
            }
        });
    };

    const handleColorQuantityChange = (color, quantity) => {
        setCurrentField({
            ...currentField,
            colors: {
                ...currentField.colors,
                [color]: quantity
            }
        });
    };

    // Filter rows based on search term
    const filteredRows = rows.filter(row =>
        row.firstName.toLowerCase().includes(searchTerm) ||
        row.product_id.toLowerCase().includes(searchTerm) ||
        (row.category || '').toLowerCase().includes(searchTerm) ||
        (row.subcategory || '').toLowerCase().includes(searchTerm)
    );

    // Get paginated rows
    const paginatedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    // Prepare data for CSV
    const csvData = filteredRows.flatMap(row => {
        const mainData = flattenRowData(row);
        const collapsibleData = flattenCollapsibleData(row);
        return collapsibleData.map(data => ({
            ...mainData,
            ...data
        }));
    });

    // Get headers for CSV, including dynamic fields
    const headers = [
        { label: 'First Name', key: 'firstName' },
        { label: 'Product Id', key: 'product_id' },
        { label: 'Category', key: 'category' },
        { label: 'Subcategory', key: 'subcategory' },
        ...Object.keys(flattenRowData(filteredRows[0] || {}))
            .filter(key => !['firstName','product_id', 'category', 'subcategory'].includes(key) && !key.includes('_id') && key !== 'colors' && key !== 'selectedColors')
            .map(key => ({
                label: key.replace(/_/g, ' ').toUpperCase(),
                key
            })),
        { label: 'Quantity', key: 'totalQuantity' }, // Adding Quantity header
        ...Object.keys(filteredRows.flatMap(row => flattenCollapsibleData(row)).reduce((acc, item) => {
            Object.keys(item).forEach(key => acc[key] = true);
            return acc;
        }, {})).map(key => ({
            label: key.replace(/_/g, ' ').toUpperCase(),
            key
        }))
    ];

    const Row = ({ row }) => {
        const [open, setOpen] = useState(false);

        // Sections to be rendered
        const dynamicFieldsSections = [
            { name: 'Dynamic Fields 1', fieldSet: row.dynamicFields1 || [] },
            { name: 'Dynamic Fields 2', fieldSet: row.dynamicFields2 || [] },
            { name: 'Dynamic Fields 3', fieldSet: row.dynamicFields3 || [] },
            { name: 'Dynamic Fields 4', fieldSet: row.dynamicFields4 || [] },
        ];

        return (
            <>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.firstName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.product_id}
                    </TableCell>
                    <TableCell align="right">{row.category || 'N/A'}</TableCell>
                    <TableCell align="right">{row.subcategory || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                {dynamicFieldsSections.map((section, sectionIndex) => {
                                    return (
                                        section.fieldSet.length > 0 && (
                                            <Box key={sectionIndex} sx={{ marginBottom: 2 }}>
                                                <Typography variant="h6" gutterBottom>
                                                    {section.name}
                                                </Typography>
                                                <Table size="small">
                                                    <TableHead>
                                                        <TableRow>
                                                            {getFieldHeaders(section.fieldSet).map((header, idx) => (
                                                                <TableCell key={idx}>
                                                                    {header.charAt(0).toUpperCase() + header.slice(1)}
                                                                </TableCell>
                                                            ))}
                                                            <TableCell>Color</TableCell>
                                                            <TableCell>Quantity</TableCell>
                                                            <TableCell>Actions</TableCell> {/* New TableCell for Actions */}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {section.fieldSet.map((field, index) => {
                                                            const items = flattenObject(field).items;
                                                            const filteredColors = filterColors(field.colors || {});
                                                            const totalColorQuantity = Object.values(filteredColors).reduce((sum, qty) => sum + (isNaN(qty) ? 0 : qty), 0);

                                                            return (
                                                                <TableRow key={index}>
                                                                    {getFieldHeaders(section.fieldSet).map((header, idx) => (
                                                                        <TableCell key={idx}>
                                                                            {typeof field[header] === 'object' ? (
                                                                                Object.entries(field[header]).map(([k, v], i) => (
                                                                                    <div key={i}>{k}: {v || 'N/A'}</div>
                                                                                ))
                                                                            ) : (
                                                                                field[header] || 'N/A'
                                                                            )}
                                                                        </TableCell>
                                                                    ))}
                                                                    <TableCell>
                                                                        {Object.entries(filteredColors).map(([color, quantity]) => (
                                                                            <div key={color} style={{ display: 'flex', alignItems: 'center' }}>
                                                                                <Circle sx={{ color: color, marginRight: 1 }} />
                                                                                {color}: {quantity}
                                                                            </div>
                                                                        ))}
                                                                    </TableCell>
                                                                    <TableCell>{totalColorQuantity}</TableCell>
                                                                    <TableCell>
                                                                        <Button variant="contained" color="primary" onClick={() => handleUpdateClick(field)}>
                                                                            Update
                                                                        </Button>
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        })}
                                                    </TableBody>
                                                </Table>
                                            </Box>
                                        )
                                    );
                                })}
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
        );
    };

    Row.propTypes = {
        row: PropTypes.object.isRequired,
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        sx={{ mb: 2 }}
                    />
                    <CSVLink
                        data={csvData}
                        headers={headers}
                        filename={"exported_data.csv"}
                        className="btn btn-primary"
                    >
                        <Button variant="contained" color="primary">
                            Export CSV
                        </Button>
                    </CSVLink>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>First Name</TableCell>
                                <TableCell>Product Id</TableCell>
                                <TableCell align="right">Category</TableCell>
                                <TableCell align="right">Subcategory</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedRows.map((row, index) => (
                                <Row key={index} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            {/* Modal for Update */}
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Update Field</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Update the values for the selected field.
                    </DialogContentText>
                    {currentField && Object.entries(currentField).map(([key, value], index) => (
                        key === 'selectedColors' ? (
                            Object.entries(value).map(([color, isSelected], idx) => (
                                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={() => handleCheckboxChange(color)}
                                            />
                                        }
                                        label={color}
                                    />
                                    {isSelected && (
                                        <TextField
                                            label="Quantity"
                                            type="number"
                                            value={currentField.colors[color] || 0}
                                            onChange={(e) => handleColorQuantityChange(color, e.target.value)}
                                            sx={{ ml: 2 }}
                                        />
                                    )}
                                </Box>
                            ))
                        ) : key !== '_id' && key !== 'colors' ? (
                            <TextField
                                key={index}
                                margin="dense"
                                label={key}
                                type="text"
                                fullWidth
                                value={typeof value === 'object' ? JSON.stringify(value) : value}
                                onChange={(e) => setCurrentField({ ...currentField, [key]: e.target.value })}
                            />
                        ) : null
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => { /* Implement your update logic here */ handleCloseModal(); }} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DisplayData;