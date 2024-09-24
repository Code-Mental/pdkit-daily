import React, { useState, useEffect } from 'react';
import { Table, Pagination, FormControl, Button, Modal, Form, Toast } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Btable = () => {
  const initialData = [
    { id: 1, name: 'Jane Doe', age: 32, price: 3300 },
    { id: 12, name: 'Jane Doe', age: 32, price: 3300 },
    { id: 3, name: 'John Doe', age: 28 },
    { id: 4, name: 'Jane Doe', age: 32 },
    { id: 5, name: 'John Doe', age: 28 },
    { id: 6, name: 'Jane Doe', age: 32 },
    { id: 7, name: 'John Doe', age: 28 },
    { id: 8, name: 'Jane Doe', age: 32, price: 3300 },
    { id: 9, name: 'Jane Doe', age: 32, price: 3300 },
    { id: 10, name: 'Jane Doe', age: 32, price: 3300 },
    // Other initial data items...
  ];

  const [data, setData] = useState(initialData);
  const [selectedRows, setSelectedRows] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedAge, setEditedAge] = useState('');
  const [selectAll, setSelectAll] = useState(false); // State for select all checkbox
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State for delete confirmation modal
  const [deleteItemId, setDeleteItemId] = useState(null); // State to track the item to delete
  const [showDeleteSuccessNotification, setShowDeleteSuccessNotification] = useState(false);
  const [deleteNotificationMessage, setDeleteNotificationMessage] = useState('');

  // Reset selectAll state when selectedRows change
  useEffect(() => {
    setSelectAll(Object.keys(selectedRows).length === data.length);
  }, [selectedRows, data]);

  // Function to show delete success message
  const showDeleteSuccessMessage = (message) => {
    setDeleteNotificationMessage(message);
    setShowDeleteSuccessNotification(true);
    setTimeout(() => {
      setShowDeleteSuccessNotification(false);
    }, 3000); // Hide the notification after 3 seconds
  };

  const handleCheckboxChange = (rowId) => {
    setSelectedRows((prevSelectedRows) => ({
      ...prevSelectedRows,
      [rowId]: !prevSelectedRows[rowId],
    }));
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows({});
    } else {
      const newSelectedRows = {};
      data.forEach(item => {
        newSelectedRows[item.id] = true;
      });
      setSelectedRows(newSelectedRows);
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteClick = (id) => {
    setDeleteItemId(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    const deletedItem = data.find(item => item.id === deleteItemId);
    const updatedData = data.filter(item => item.id !== deleteItemId);
    setData(updatedData);
    setSelectedRows(prevSelectedRows => {
      const updatedSelectedRows = { ...prevSelectedRows };
      delete updatedSelectedRows[deleteItemId];
      return updatedSelectedRows;
    });
    setShowDeleteConfirmation(false);
    showDeleteSuccessMessage(`Deleted item with ID ${deleteItemId} successfully.`);
  };

  const cancelDelete = () => {
    setDeleteItemId(null);
    setShowDeleteConfirmation(false);
  };

  const handleDeleteAllConfirmed = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteAll = () => {
    const deletedItems = data.filter(item => selectedRows[item.id]);
    const updatedData = data.filter(item => !selectedRows[item.id]);
    setData(updatedData);
    setSelectedRows({});
    setSelectAll(false);
    setShowDeleteConfirmation(false);
    const count = deletedItems.length;
    const message = `Deleted ${count} ${count === 1 ? 'item' : 'items'} successfully.`;
    showDeleteSuccessMessage(message);
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setEditedName(item.name);
    setEditedAge(item.age);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    const updatedData = data.map(item =>
      item.id === editItem.id ? { ...item, name: editedName, age: editedAge } : item
    );
    setData(updatedData);
    setShowEditModal(false);
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset page number to 1 when search term changes
  };

  const itemsPerPage = 5;
  const filteredData = data.filter(
    item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.age.toString().includes(searchTerm)
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleEditNameChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleEditAgeChange = (event) => {
    setEditedAge(event.target.value);
  };

  return (
    <div className="container mt-5">
      <h3>Paginated Table with Search</h3>
      <Button
        variant="danger"
        onClick={handleDeleteAllConfirmed}
        disabled={Object.keys(selectedRows).length === 0}
        className="mb-3"
      >
        Delete All Selected
      </Button>
      <FormControl
        type="text"
        placeholder="Search by name or age"
        className="mb-3"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Table responsive>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>ID</th>
            <th>Product</th>
            <th>Category</th>
            <th>SubCat</th>
            
            <th>Color</th>
            <th>Size</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(item => (
            <tr key={item.id} className={selectedRows[item.id] ? 'table-success' : ''}>
              <td>
                <input
                  type="checkbox"
                  checked={!!selectedRows[item.id]}
                  onChange={() => handleCheckboxChange(item.id)}
                />
              </td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.price}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.price}</td>
              
              <td>
                <Button onClick={() => handleEditClick(item)}>Edit</Button>
                <Button onClick={() => handleDeleteClick(item.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination className="justify-content-center">
        <Pagination.Prev onClick={handlePreviousPage} disabled={currentPage === 1} />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages} />
      </Pagination>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={editedName}
                onChange={handleEditNameChange}
              />
            </Form.Group>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter age"
                value={editedAge}
                onChange={handleEditAgeChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirmation} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deleteItemId
            ? `Are you sure you want to delete item with ID ${deleteItemId}?`
            : 'Are you sure you want to delete all selected items?'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          {deleteItemId ? (
            <Button variant="danger" onClick={confirmDelete}>
              Delete Item
            </Button>
          ) : (
            <Button variant="danger" onClick={handleDeleteAll}>
              Delete All
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Delete Success Notification */}
      <Toast
        show={showDeleteSuccessNotification}
        onClose={() => setShowDeleteSuccessNotification(false)}
        delay={3000}
        autohide
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          minWidth: 300,
        }}
      >
        <Toast.Header>
          <strong className="mr-auto">Delete Notification</strong>
        </Toast.Header>
        <Toast.Body>{deleteNotificationMessage}</Toast.Body>
      </Toast>

    </div>
  );
};

export default Btable;
