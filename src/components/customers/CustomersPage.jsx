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
  Users, 
  Edit, 
  Trash2,
  Phone,
  Mail,
  MapPin,
  Search
} from 'lucide-react';
import { formatDate, generateId } from '../../lib/utils';

export default function CustomersPage() {
  const { t } = useTranslation();
  const [customers, setCustomers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    notes: ''
  });

  // Load sample customers
  useEffect(() => {
    const sampleCustomers = [
      {
        id: '1',
        name: 'Nimal Perera',
        phone: '0771234567',
        email: 'nimal@email.com',
        address: '123 Main Street',
        city: 'Matara',
        notes: 'Regular customer, prefers fiction books',
        createdAt: new Date('2025-01-15').toISOString(),
        totalPurchases: 5,
        totalSpent: 4250
      },
      {
        id: '2',
        name: 'Kamala Silva',
        phone: '0779876543',
        email: 'kamala@email.com',
        address: '456 Beach Road',
        city: 'Matara',
        notes: 'Teacher, buys educational materials',
        createdAt: new Date('2025-02-10').toISOString(),
        totalPurchases: 3,
        totalSpent: 2100
      },
      {
        id: '3',
        name: 'Sunil Fernando',
        phone: '0765432109',
        email: 'sunil@email.com',
        address: '789 Temple Lane',
        city: 'Matara',
        notes: 'History enthusiast',
        createdAt: new Date('2025-03-05').toISOString(),
        totalPurchases: 2,
        totalSpent: 1800
      },
      {
        id: '4',
        name: 'Priya Jayawardena',
        phone: '0712345678',
        email: 'priya@email.com',
        address: '321 School Road',
        city: 'Matara',
        notes: 'Student, likes contemporary literature',
        createdAt: new Date('2025-03-20').toISOString(),
        totalPurchases: 1,
        totalSpent: 11400
      },
      {
        id: '5',
        name: 'Ravi Wickramasinghe',
        phone: '0778888999',
        email: 'ravi@email.com',
        address: '654 Market Street',
        city: 'Matara',
        notes: 'Business owner, bulk purchases',
        createdAt: new Date('2025-04-01').toISOString(),
        totalPurchases: 8,
        totalSpent: 6500
      }
    ];
    setCustomers(sampleCustomers);
  }, []);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      notes: ''
    });
    setEditingCustomer(null);
  };

  const openDialog = (customer = null) => {
    if (customer) {
      setEditingCustomer(customer);
      setFormData({
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        address: customer.address,
        city: customer.city,
        notes: customer.notes
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
    
    if (!formData.name || !formData.phone) {
      alert('Name and phone are required');
      return;
    }

    if (editingCustomer) {
      // Update existing customer
      setCustomers(customers.map(customer =>
        customer.id === editingCustomer.id
          ? { ...customer, ...formData }
          : customer
      ));
    } else {
      // Add new customer
      const newCustomer = {
        id: generateId(),
        ...formData,
        createdAt: new Date().toISOString(),
        totalPurchases: 0,
        totalSpent: 0
      };
      setCustomers([newCustomer, ...customers]);
    }

    closeDialog();
  };

  const deleteCustomer = (customerId) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(customer => customer.id !== customerId));
    }
  };

  const getCustomerStatus = (customer) => {
    if (customer.totalPurchases >= 5) return { label: 'VIP', variant: 'default' };
    if (customer.totalPurchases >= 2) return { label: 'Regular', variant: 'secondary' };
    return { label: 'New', variant: 'outline' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Users className="h-8 w-8" />
            {t('customers')}
          </h1>
          <p className="text-muted-foreground">Manage your customer database</p>
        </div>
        
        <Button onClick={() => openDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VIP Customers</CardTitle>
            <Badge variant="default" className="h-4 w-4 p-0" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter(c => c.totalPurchases >= 5).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New This Month</CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter(c => {
                const createdDate = new Date(c.createdAt);
                const now = new Date();
                return createdDate.getMonth() === now.getMonth() && 
                       createdDate.getFullYear() === now.getFullYear();
              }).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Spent</CardTitle>
            <Badge variant="secondary" className="h-4 w-4 p-0" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              LKR {customers.length > 0 
                ? Math.round(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length)
                : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Directory ({filteredCustomers.length} customers)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Purchases</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => {
                const status = getCustomerStatus(customer);
                return (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Joined {formatDate(customer.createdAt)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3" />
                          {customer.phone}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          {customer.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3" />
                        {customer.city}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell>{customer.totalPurchases}</TableCell>
                    <TableCell className="font-medium">
                      LKR {customer.totalSpent.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDialog(customer)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteCustomer(customer.id)}
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

      {/* Customer Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
            </DialogTitle>
            <DialogDescription>
              {editingCustomer 
                ? 'Update customer information' 
                : 'Add a new customer to your database'
              }
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
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
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="Customer preferences, notes..."
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {editingCustomer ? 'Update' : 'Add'} Customer
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

