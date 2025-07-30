import React, { useState, useEffect, useRef } from 'react';
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
  Search, 
  Edit, 
  Trash2, 
  BookOpen,
  Filter
} from 'lucide-react';
import { formatCurrency, generateId } from '../../lib/utils';

// Stable form component outside the main component to prevent re-renders
const BookForm = React.memo(({ onSubmit, initialData = {}, categories = [], t }) => {
  const formRef = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      title: formData.get('title'),
      author: formData.get('author'),
      isbn: formData.get('isbn'),
      category: formData.get('category'),
      price: formData.get('price'),
      stock: formData.get('stock'),
      description: formData.get('description')
    };
    onSubmit(data);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">{t('title')}</Label>
          <Input
            id="title"
            name="title"
            defaultValue={initialData.title || ''}
            placeholder="Enter book title"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="author">{t('author')}</Label>
          <Input
            id="author"
            name="author"
            defaultValue={initialData.author || ''}
            placeholder="Enter author name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="isbn">ISBN</Label>
          <Input
            id="isbn"
            name="isbn"
            defaultValue={initialData.isbn || ''}
            placeholder="Enter ISBN"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">{t('category')}</Label>
          <select
            id="category"
            name="category"
            defaultValue={initialData.category || ''}
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="price">{t('price')} (LKR)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            defaultValue={initialData.price || ''}
            placeholder="Enter price"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="stock">{t('stock')}</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            defaultValue={initialData.stock || ''}
            placeholder="Enter stock quantity"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">{t('description')}</Label>
        <Input
          id="description"
          name="description"
          defaultValue={initialData.description || ''}
          placeholder="Enter description"
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="submit">
          {t('save')}
        </Button>
      </div>
    </form>
  );
});

BookForm.displayName = 'BookForm';

export default function BooksPage() {
  const { t } = useTranslation();
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const categories = [
    'Fiction',
    'Non-Fiction',
    'Educational',
    'Children',
    'Biography',
    'History',
    'Science',
    'Technology',
    'Religion',
    'Poetry'
  ];

  // Load sample books on component mount
  useEffect(() => {
    const sampleBooks = [
      {
        id: '1',
        title: 'Madol Doova',
        author: 'Martin Wickramasinghe',
        isbn: '978-955-1234-01-0',
        category: 'Fiction',
        price: 850,
        stock: 25,
        description: 'A classic Sinhala novel about childhood adventures',
        dateAdded: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Viragaya',
        author: 'W.A. Silva',
        isbn: '978-955-1234-02-7',
        category: 'Fiction',
        price: 750,
        stock: 15,
        description: 'A profound novel about human relationships',
        dateAdded: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Mathematics Grade 10',
        author: 'Department of Education',
        isbn: '978-955-1234-03-4',
        category: 'Educational',
        price: 450,
        stock: 50,
        description: 'Official textbook for Grade 10 mathematics',
        dateAdded: new Date().toISOString()
      },
      {
        id: '4',
        title: 'Sri Lankan History',
        author: 'K.M. de Silva',
        isbn: '978-955-1234-04-1',
        category: 'History',
        price: 1200,
        stock: 8,
        description: 'Comprehensive history of Sri Lanka',
        dateAdded: new Date().toISOString()
      }
    ];
    setBooks(sampleBooks);
  }, []);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFormSubmit = (formData) => {
    if (editingBook) {
      // Update existing book
      setBooks(prev => prev.map(book => 
        book.id === editingBook.id 
          ? { ...book, ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) }
          : book
      ));
      setIsEditDialogOpen(false);
      setEditingBook(null);
    } else {
      // Add new book
      const newBook = {
        id: generateId(),
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        dateAdded: new Date().toISOString()
      };
      setBooks(prev => [...prev, newBook]);
      setIsAddDialogOpen(false);
    }
  };

  const handleAddDialogToggle = (isOpen) => {
    setIsAddDialogOpen(isOpen);
    // Don't reset form on close - let user data persist
  };

  const handleEditDialogToggle = (isOpen) => {
    setIsEditDialogOpen(isOpen);
    // Don't reset form on close - let user data persist
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks(prev => prev.filter(book => book.id !== bookId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-8 w-8" />
            {t('books')}
          </h1>
          <p className="text-muted-foreground">Manage your book inventory</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={handleAddDialogToggle}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t('addBook')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{t('addBook')}</DialogTitle>
              <DialogDescription>
                Add a new book to your inventory
              </DialogDescription>
            </DialogHeader>
            <BookForm 
              onSubmit={handleFormSubmit}
              categories={categories}
              t={t}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={`${t('search')} books, authors, ISBN...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Books Table */}
      <Card>
        <CardHeader>
          <CardTitle>Book Inventory ({filteredBooks.length} books)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('bookTitle')}</TableHead>
                <TableHead>{t('author')}</TableHead>
                <TableHead>{t('category')}</TableHead>
                <TableHead>{t('price')}</TableHead>
                <TableHead>{t('stock')}</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{book.title}</div>
                      <div className="text-sm text-muted-foreground">{book.isbn}</div>
                    </div>
                  </TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{book.category}</Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(book.price)}</TableCell>
                  <TableCell>
                    <Badge variant={book.stock < 10 ? "destructive" : "default"}>
                      {book.stock}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(book)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(book.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={handleEditDialogToggle}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t('editBook')}</DialogTitle>
            <DialogDescription>
              Update book information
            </DialogDescription>
          </DialogHeader>
          <BookForm 
            onSubmit={handleFormSubmit}
            initialData={editingBook || {}}
            categories={categories}
            t={t}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

