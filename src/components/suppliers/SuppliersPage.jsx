import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Truck, 
  Edit, 
  Trash2,
  Phone,
  Mail,
  MapPin,
  Search,
  Building,
  Package
} from 'lucide-react';
import { formatDate, generateId, formatCurrency } from '../../lib/utils';

export default function SuppliersPage() {
  const { t } = useTranslation();
  const [suppliers, setSuppliers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    category: '',
    notes: ''
  });

  // Load sample suppliers
  useEffect(() => {
    const sampleSuppliers = [
      {
        id: '1',
        name: 'Sarasavi Publishers',
        contactPerson: 'Mr. Bandara',
        phone: '0112345678',
        email: 'orders@sarasavi.lk',
        address: '58 Galle Road',
        city: 'Colombo',
        category: 'Local Publisher',
        notes: 'Primary supplier for Sinhala books',
        createdAt: new Date('2024-01-15').toISOString(),
        totalOrders: 25,
        totalValue: 450000,
        status: 'active'
      },
      {
        id: '2',
        name: 'Vijitha Yapa Publications',
        contactPerson: 'Ms. Perera',
        phone: '0112876543',
        email: 'supply@vijithayapa.com',
        address: '244 Deans Road',
        city: 'Colombo',
        category: 'Local Publisher',
        notes: 'Educational books and novels',
        createdAt: new Date('2024-02-10').toISOString(),
        totalOrders: 18,
        totalValue: 320000,
        status: 'active'
      },
      {
        id: '3',
        name: 'Educational Publications',
        contactPerson: 'Dr. Silva',
        phone: '0115432109',
        email: 'info@edubooks.lk',
        address: '123 Education Lane',
        city: 'Colombo',
        category: 'Educational',
        notes: 'Textbooks and reference materials',
        createdAt: new Date('2024-03-05').toISOString(),
        totalOrders: 32,
        totalValue: 680000,
        status: 'active'
      },
      {
        id: '4',
        name: 'International Book House',
        contactPerson: 'Mr. Fernando',
        phone: '0117654321',
        email: 'orders@intlbooks.lk',
        address: '456 Library Street',
        city: 'Colombo',
        category: 'International',
        notes: 'Foreign books and imports',
        createdAt: new Date('2024-04-01').toISOString(),
        totalOrders: 12,
        totalValue: 280000,
        status: 'active'
      },
      {
        id: '5',
        name: 'Godage Publishers',
        contactPerson: 'Mrs. Jayawardena',
        phone: '0118888999',
        email: 'supply@godage.lk',
        address: '789 Book Street',
        city: 'Colombo',
        category: 'Local Publisher',
        notes: 'Children books and literature',
        createdAt: new Date('2024-05-15').toISOString(),
        totalOrders: 8,
        totalValue: 150000,
        status: 'active'
      }
    ];
    setSuppliers(sampleSuppliers);
  }, []);

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.phone.includes(searchTerm) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      name: '',
      contactPerson: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      category: '',
      notes: ''
    });
    setEditingSupplier(null);
  };

  const openDialog = (supplier = null) => {
    if (supplier) {
      setEditingSupplier(supplier);
      setFormData({
        name: supplier.name,
        contactPerson: supplier.contactPerson,
        phone: supplier.phone,
        email: supplier.email,
        address: supplier.address,
        city: supplier.city,
        category: supplier.category,
        notes: supplier.notes
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.contactPerson || !formData.phone) {
      alert('Name, contact person, and phone are required');
      return;
    }

    if (editingSupplier) {
      // Update existing supplier
      setSuppliers(suppliers.map(supplier =>
        supplier.id === editingSupplier.id
          ? { ...supplier, ...formData }
          : supplier
      ));
    } else {
      // Add new supplier
      const newSupplier = {
        id: generateId(),
        ...formData,
        createdAt: new Date().toISOString(),
        totalOrders: 0,
        totalValue: 0,
        status: 'active'
      };
      setSuppliers([newSupplier, ...suppliers]);
    }

    closeDialog();
  };

  const deleteSupplier = (supplierId) => {
    if (confirm('Are you sure you want to delete this supplier?')) {
      setSuppliers(suppliers.filter(supplier => supplier.id !== supplierId));
    }
  };

  const getSupplierStatus = (supplier) => {
    if (supplier.totalOrders >= 20) return { label: 'Premium', variant: 'default' };
    if (supplier.totalOrders >= 10) return { label: 'Regular', variant: 'secondary' };
    return { label: 'New', variant: 'outline' };
  };

  const getCategoryBadge = (category) => {
    switch (category) {
      case 'Local Publisher': return 'default';
      case 'International': return 'destructive';
      case 'Educational': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Truck className="h-8 w-8" />
            {t('suppliers')}
          </h1>
          <p className="text-muted-foreground">Manage your supplier network</p>
        </div>
        
        <Button onClick={() => openDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Supplier
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suppliers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
            <Badge variant="default" className="h-4 w-4 p-0" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {suppliers.filter(s => s.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {suppliers.reduce((sum, s) => sum + s.totalOrders, 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(suppliers.reduce((sum, s) => sum + s.totalValue, 0))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search suppliers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Suppliers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Supplier Directory ({filteredSuppliers.length} suppliers)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier) => {
                const status = getSupplierStatus(supplier);
                return (
                  <TableRow key={supplier.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{supplier.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Contact: {supplier.contactPerson}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3" />
                          {supplier.phone}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          {supplier.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getCategoryBadge(supplier.category)}>
                        {supplier.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3" />
                        {supplier.city}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell>{supplier.totalOrders}</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(supplier.totalValue)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDialog(supplier)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteSupplier(supplier.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Supplier Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}
            </DialogTitle>
            <DialogDescription>
              {editingSupplier 
                ? 'Update supplier information' 
                : 'Add a new supplier to your network'
              }
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person *</Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                placeholder="e.g., Local Publisher, Educational, International"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="Specialties, terms, notes..."
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {editingSupplier ? 'Update' : 'Add'} Supplier
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

