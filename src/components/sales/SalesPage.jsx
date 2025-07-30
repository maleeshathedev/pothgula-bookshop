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
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
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
  ShoppingCart, 
  Receipt, 
  Trash2,
  Calendar,
  User
} from 'lucide-react';
import { formatCurrency, formatDate, generateId } from '../../lib/utils';

export default function SalesPage() {
  const { t } = useTranslation();
  const [sales, setSales] = useState([]);
  const [books, setBooks] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isNewSaleDialogOpen, setIsNewSaleDialogOpen] = useState(false);
  const [saleItems, setSaleItems] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Load sample data
  useEffect(() => {
    const sampleBooks = [
      { id: '1', title: 'Madol Doova', author: 'Martin Wickramasinghe', price: 850, stock: 25 },
      { id: '2', title: 'Viragaya', author: 'W.A. Silva', price: 750, stock: 15 },
      { id: '3', title: 'Mathematics Grade 10', author: 'Department of Education', price: 450, stock: 50 },
      { id: '4', title: 'Sri Lankan History', author: 'K.M. de Silva', price: 1200, stock: 8 },
      { id: '5', title: 'The Alchemist', author: 'Paulo Coelho', price: 950, stock: 30 }
    ];
    setBooks(sampleBooks);

    const sampleCustomers = [
      { id: '1', name: 'Nimal Perera', phone: '0771234567', email: 'nimal@email.com' },
      { id: '2', name: 'Kamala Silva', phone: '0779876543', email: 'kamala@email.com' },
      { id: '3', name: 'Sunil Fernando', phone: '0765432109', email: 'sunil@email.com' },
      { id: '4', name: 'Priya Jayawardena', phone: '0712345678', email: 'priya@email.com' }
    ];
    setCustomers(sampleCustomers);

    const sampleSales = [
      {
        id: '1',
        date: new Date('2025-07-27').toISOString(),
        customer: { id: '1', name: 'Nimal Perera' },
        items: [
          { book: { id: '1', title: 'Madol Doova', price: 850 }, quantity: 2, subtotal: 1700 }
        ],
        total: 1700,
        status: 'completed'
      },
      {
        id: '2',
        date: new Date('2025-07-26').toISOString(),
        customer: { id: '2', name: 'Kamala Silva' },
        items: [
          { book: { id: '3', title: 'Mathematics Grade 10', price: 450 }, quantity: 1, subtotal: 450 },
          { book: { id: '2', title: 'Viragaya', price: 750 }, quantity: 1, subtotal: 750 }
        ],
        total: 1200,
        status: 'completed'
      },
      {
        id: '3',
        date: new Date('2025-07-25').toISOString(),
        customer: { id: '3', name: 'Sunil Fernando' },
        items: [
          { book: { id: '4', title: 'Sri Lankan History', price: 1200 }, quantity: 1, subtotal: 1200 }
        ],
        total: 1200,
        status: 'completed'
      }
    ];
    setSales(sampleSales);
  }, []);

  const addItemToSale = () => {
    if (!selectedBook || quantity <= 0) return;
    
    const book = books.find(b => b.id === selectedBook);
    if (!book || book.stock < quantity) {
      alert('Insufficient stock');
      return;
    }

    const existingItemIndex = saleItems.findIndex(item => item.book.id === selectedBook);
    
    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedItems = [...saleItems];
      updatedItems[existingItemIndex].quantity += quantity;
      updatedItems[existingItemIndex].subtotal = updatedItems[existingItemIndex].quantity * book.price;
      setSaleItems(updatedItems);
    } else {
      // Add new item
      const newItem = {
        book: { id: book.id, title: book.title, price: book.price },
        quantity: quantity,
        subtotal: quantity * book.price
      };
      setSaleItems([...saleItems, newItem]);
    }
    
    setSelectedBook('');
    setQuantity(1);
  };

  const removeItemFromSale = (bookId) => {
    setSaleItems(saleItems.filter(item => item.book.id !== bookId));
  };

  const calculateTotal = () => {
    return saleItems.reduce((total, item) => total + item.subtotal, 0);
  };

  const completeSale = () => {
    if (saleItems.length === 0 || !selectedCustomer) {
      alert('Please add items and select a customer');
      return;
    }

    const customer = customers.find(c => c.id === selectedCustomer);
    const newSale = {
      id: generateId(),
      date: new Date().toISOString(),
      customer: { id: customer.id, name: customer.name },
      items: [...saleItems],
      total: calculateTotal(),
      status: 'completed'
    };

    setSales([newSale, ...sales]);
    
    // Update book stock
    const updatedBooks = books.map(book => {
      const saleItem = saleItems.find(item => item.book.id === book.id);
      if (saleItem) {
        return { ...book, stock: book.stock - saleItem.quantity };
      }
      return book;
    });
    setBooks(updatedBooks);

    // Close dialog
    setIsNewSaleDialogOpen(false);
  };

  const resetSaleForm = () => {
    setSaleItems([]);
    setSelectedCustomer('');
    setSelectedBook('');
    setQuantity(1);
  };

  const handleSaleDialogClose = (isOpen) => {
    if (!isOpen) {
      resetSaleForm();
    }
  };

  const NewSaleDialog = () => (
    <Dialog open={isNewSaleDialogOpen} onOpenChange={(isOpen) => {
      setIsNewSaleDialogOpen(isOpen);
      handleSaleDialogClose(isOpen);
    }}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{t('newSale')}</DialogTitle>
          <DialogDescription>
            Create a new sale transaction
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Customer Selection */}
          <div className="space-y-2">
            <Label>{t('customer')}</Label>
            <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
              <SelectTrigger>
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                {customers.map(customer => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name} - {customer.phone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Add Items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Book</Label>
              <Select value={selectedBook} onValueChange={setSelectedBook}>
                <SelectTrigger>
                  <SelectValue placeholder="Select book" />
                </SelectTrigger>
                <SelectContent>
                  {books.filter(book => book.stock > 0).map(book => (
                    <SelectItem key={book.id} value={book.id}>
                      {book.title} - {formatCurrency(book.price)} (Stock: {book.stock})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>{t('quantity')}</Label>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />
            </div>
            
            <div className="flex items-end">
              <Button onClick={addItemToSale} disabled={!selectedBook}>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </div>
          </div>

          {/* Sale Items */}
          {saleItems.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Sale Items</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Subtotal</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {saleItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.book.title}</TableCell>
                      <TableCell>{formatCurrency(item.book.price)}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{formatCurrency(item.subtotal)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItemFromSale(item.book.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-lg font-semibold">Total: {formatCurrency(calculateTotal())}</span>
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => setIsNewSaleDialogOpen(false)}>
                    {t('cancel')}
                  </Button>
                  <Button onClick={completeSale}>
                    Complete Sale
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ShoppingCart className="h-8 w-8" />
            {t('sales')}
          </h1>
          <p className="text-muted-foreground">Manage sales transactions and invoices</p>
        </div>
        
        <Button onClick={() => setIsNewSaleDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t('newSale')}
        </Button>
      </div>

      {/* Sales Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                sales
                  .filter(sale => new Date(sale.date).toDateString() === new Date().toDateString())
                  .reduce((total, sale) => total + sale.total, 0)
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sales.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Sale</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                sales.length > 0 
                  ? sales.reduce((total, sale) => total + sale.total, 0) / sales.length 
                  : 0
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales History */}
      <Card>
        <CardHeader>
          <CardTitle>Sales History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{formatDate(sale.date)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {sale.customer.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {sale.items.map((item, index) => (
                        <div key={index} className="text-sm">
                          {item.book.title} × {item.quantity}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(sale.total)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={sale.status === 'completed' ? 'default' : 'secondary'}>
                      {sale.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <NewSaleDialog />
    </div>
  );
}

