import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Switch from 'react-switch';
import { Scrollbars } from 'react-scrollbars-custom';
import CloseIcon from '@mui/icons-material/Close';

function ViewSimpleProducts() {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        product_name: '',
        category: '',
        subcategory: '',
        product_id: '',
        length: false,
        width: false,
        height: false,
        neck_girth: false,
        chest_girth: false,
        weight: false,
        image: null,
        status: false,
        _id: ''
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8083/api/admin/addproduct");
            setData(response.data.addproduct);
        } catch (error) {
            console.error("Error fetching products:", error);
            alert("Failed to fetch products.");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setCurrentProduct({
                    ...currentProduct,
                    image: file,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleStatusToggle = async (product) => {
        try {
            const updatedStatus = !product.status;
            const response = await axios.put(`http://localhost:8083/api/admin/addproduct/${product._id}`, { status: updatedStatus });
            
            if (response.data.success) {
                setData(prevData =>
                    prevData.map(item =>
                        item._id === product._id ? { ...item, status: updatedStatus } : item
                    )
                );
            } else {
                alert("Failed to update status.");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status.");
        }
    };

    const handleEditClick = (product) => {
        setCurrentProduct(product);
        setImagePreview(`http://localhost:8083/uploads/${product.image}`);
        setShowModal(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('product_name', currentProduct.product_name);
        formData.append('category', currentProduct.category);
        formData.append('subcategory', currentProduct.subcategory);
        formData.append('product_id', currentProduct.product_id);
        formData.append('length', currentProduct.length);
        formData.append('width', currentProduct.width);
        formData.append('height', currentProduct.height);
        formData.append('neck_girth', currentProduct.neck_girth);
        formData.append('chest_girth', currentProduct.chest_girth);
        formData.append('weight', currentProduct.weight);
        
        if (currentProduct.image instanceof File) {
            formData.append('image', currentProduct.image);
        }
    
        try {
            await axios.put(`http://localhost:8083/api/admin/addproduct/${currentProduct._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Product updated successfully!');
            setShowModal(false);
            fetchProducts();
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Failed to update product.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCurrentProduct({
            ...currentProduct,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleDeleteClick = (product) => {
        setCurrentProduct(product);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8083/api/admin/addproduct/${currentProduct._id}`);
            alert('Product deleted successfully!');
            setShowDeleteModal(false);
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product.");
        }
    };

    const columns = [
        {
            field: 'image',
            headerName: 'Product Image',
            renderCell: (params) => (
                <img
                    src={`http://localhost:8083/uploads/${params.value}`}
                    alt={params.row.product_name}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
            ),
            width: 150,
        },
        { field: 'product_name', headerName: 'Product Name', width: 150 },
        { field: 'category', headerName: 'Category', width: 150 },
        { field: 'subcategory', headerName: 'Subcategory', width: 150 },
        { field: 'product_id', headerName: 'Product ID', width: 150 },
        { field: 'length', headerName: 'Length', width: 100, renderCell: (params) => (params.value ? '✔️' : '❌') },
        { field: 'width', headerName: 'Width', width: 100, renderCell: (params) => (params.value ? '✔️' : '❌') },
        { field: 'height', headerName: 'Height', width: 100, renderCell: (params) => (params.value ? '✔️' : '❌') },
        { field: 'neck_girth', headerName: 'Neck Girth', width: 100, renderCell: (params) => (params.value ? '✔️' : '❌') },
        { field: 'chest_girth', headerName: 'Chest Girth', width: 100, renderCell: (params) => (params.value ? '✔️' : '❌') },
        { field: 'weight', headerName: 'Weight', width: 100, renderCell: (params) => (params.value ? '✔️' : '❌') },
        {
            field: 'status',
            headerName: 'Status',
            renderCell: (params) => (
                <Switch
                    onChange={() => handleStatusToggle(params.row)}
                    checked={params.value}
                    offColor="#888"
                    onColor="#0f0"
                    uncheckedIcon={false}
                    checkedIcon={false}
                />
            ),
            width: 100,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            renderCell: (params) => (
                <>
                    <Button variant="contained" color="warning" onClick={() => handleEditClick(params.row)} title="Edit">
                        <FaEdit />
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleDeleteClick(params.row)} title="Delete">
                        <FaTrash />
                    </Button>
                </>
            ),
            width: 150,
        },
    ];

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
      <div style={{ height: 400, width: '100%', overflow: 'auto' }}>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={(row) => row._id}
                sx={{
                  '& .MuiDataGrid-main': {
                      overflowX: 'auto', // Enable vertical scroll
                  },
              }}
                components={{
                    Footer: () => (
                        <div style={{ padding: '10px', textAlign: 'center' }}>
                            Custom Footer Content
                        </div>
                    ),
                    Pagination: (props) => (
                        <div style={{ overflowX: 'auto' }}>
                            <DataGrid.Pagination {...props} />
                        </div>
                    ),
                }}
              
            />
        </div>
            <Dialog open={showModal} onClose={() => setShowModal(false)}>
                <DialogTitle>
                    Edit Product
                    <IconButton
                        aria-label="close"
                        onClick={() => setShowModal(false)}
                        style={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleUpdate}>
                        <TextField
                            label="Product Name"
                            name="product_name"
                            value={currentProduct.product_name || ''}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            margin="dense"
                        />
                        <TextField
                            label="Category"
                            name="category"
                            value={currentProduct.category || ''}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            margin="dense"
                        />
                        <TextField
                            label="Subcategory"
                            name="subcategory"
                            value={currentProduct.subcategory || ''}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            margin="dense"
                        />
                        <TextField
                            label="Product ID"
                            name="product_id"
                            value={currentProduct.product_id || ''}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            margin="dense"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={currentProduct.length || false} onChange={handleInputChange} name="length" />}
                            label="Length"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={currentProduct.width || false} onChange={handleInputChange} name="width" />}
                            label="Width"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={currentProduct.height || false} onChange={handleInputChange} name="height" />}
                            label="Height"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={currentProduct.neck_girth || false} onChange={handleInputChange} name="neck_girth" />}
                            label="Neck Girth"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={currentProduct.chest_girth || false} onChange={handleInputChange} name="chest_girth" />}
                            label="Chest Girth"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={currentProduct.weight || false} onChange={handleInputChange} name="weight" />}
                            label="Weight"
                        />
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt={currentProduct.product_name}
                                style={{ width: '150px', height: '150px', objectFit: 'cover', marginTop: '10px' }}
                            />
                        )}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowModal(false)} color="secondary">
                        Close
                    </Button>
                    <Button onClick={handleUpdate} color="primary">
                        Update Product
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                <DialogTitle>
                    Confirm Delete
                    <IconButton
                        aria-label="close"
                        onClick={() => setShowDeleteModal(false)}
                        style={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this product?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowDeleteModal(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ViewSimpleProducts;