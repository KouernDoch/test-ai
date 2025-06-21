'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  DollarSign
} from 'lucide-react';

export default function PaymentTrackingPage() {
  const [payments] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      property: "Modern Downtown Loft",
      month: "January 2024",
      electric: 85.50,
      water: 42.30,
      rentFee: 2500.00,
      totalAmount: 2627.80,
      status: "paid",
      dueDate: "2024-01-01",
      paidDate: "2023-12-28"
    },
    {
      id: 2,
      name: "John Doe",
      email: "john.doe@example.com",
      property: "Modern Downtown Loft",
      month: "February 2024",
      electric: 92.75,
      water: 38.90,
      rentFee: 2500.00,
      totalAmount: 2631.65,
      status: "paid",
      dueDate: "2024-02-01",
      paidDate: "2024-01-30"
    },
    {
      id: 3,
      name: "John Doe",
      email: "john.doe@example.com",
      property: "Modern Downtown Loft",
      month: "March 2024",
      electric: 78.25,
      water: 45.60,
      rentFee: 2500.00,
      totalAmount: 2623.85,
      status: "overdue",
      dueDate: "2024-03-01",
      paidDate: null
    },
    {
      id: 4,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      property: "Cozy Brooklyn Brownstone",
      month: "January 2024",
      electric: 65.40,
      water: 52.80,
      rentFee: 1800.00,
      totalAmount: 1918.20,
      status: "paid",
      dueDate: "2024-01-01",
      paidDate: "2024-01-02"
    },
    {
      id: 5,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      property: "Cozy Brooklyn Brownstone",
      month: "February 2024",
      electric: 72.15,
      water: 48.30,
      rentFee: 1800.00,
      totalAmount: 1920.45,
      status: "pending",
      dueDate: "2024-02-01",
      paidDate: null
    },
    {
      id: 6,
      name: "Mike Davis",
      email: "mike.davis@example.com",
      property: "Luxury Upper East Side Penthouse",
      month: "January 2024",
      electric: 145.80,
      water: 68.90,
      rentFee: 4200.00,
      totalAmount: 4414.70,
      status: "paid",
      dueDate: "2024-01-01",
      paidDate: "2023-12-30"
    },
    {
      id: 7,
      name: "Mike Davis",
      email: "mike.davis@example.com",
      property: "Luxury Upper East Side Penthouse",
      month: "February 2024",
      electric: 158.25,
      water: 71.45,
      rentFee: 4200.00,
      totalAmount: 4429.70,
      status: "paid",
      dueDate: "2024-02-01",
      paidDate: "2024-02-01"
    }
  ]);

  const [filteredPayments, setFilteredPayments] = useState(payments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');

  const applyFilters = () => {
    let filtered = payments;

    if (searchTerm) {
      filtered = filtered.filter(payment => 
        payment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.property.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(payment => payment.status === statusFilter);
    }

    if (monthFilter !== 'all') {
      filtered = filtered.filter(payment => payment.month === monthFilter);
    }

    setFilteredPayments(filtered);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
  };

  const handleMonthFilter = (value) => {
    setMonthFilter(value);
  };

  // Apply filters whenever any filter changes
  useState(() => {
    applyFilters();
  }, [searchTerm, statusFilter, monthFilter]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return (
          <Badge className="bg-green-500 hover:bg-green-600 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Paid
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      case 'overdue':
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Overdue
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.totalAmount, 0);
  const paidAmount = filteredPayments.filter(p => p.status === 'paid').reduce((sum, payment) => sum + payment.totalAmount, 0);
  const pendingAmount = filteredPayments.filter(p => p.status === 'pending').reduce((sum, payment) => sum + payment.totalAmount, 0);
  const overdueAmount = filteredPayments.filter(p => p.status === 'overdue').reduce((sum, payment) => sum + payment.totalAmount, 0);

  const uniqueMonths = [...new Set(payments.map(p => p.month))];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <CreditCard className="h-8 w-8" />
                Payment Tracking
              </h1>
              <p className="text-muted-foreground mt-1">
                Monitor rent payments and utility bills
              </p>
            </div>
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="text-2xl font-bold">{formatCurrency(totalAmount)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Paid</p>
                    <p className="text-2xl font-bold">{formatCurrency(paidAmount)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold">{formatCurrency(pendingAmount)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Overdue</p>
                    <p className="text-2xl font-bold">{formatCurrency(overdueAmount)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, or property..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>

                <Select value={statusFilter} onValueChange={handleStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={monthFilter} onValueChange={handleMonthFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Months</SelectItem>
                    {uniqueMonths.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Payment Table */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Month</TableHead>
                      <TableHead className="text-right">Electric</TableHead>
                      <TableHead className="text-right">Water</TableHead>
                      <TableHead className="text-right">Rent Fee</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Paid Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{payment.name}</div>
                            <div className="text-sm text-muted-foreground">{payment.email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[200px]">
                          <div className="truncate" title={payment.property}>
                            {payment.property}
                          </div>
                        </TableCell>
                        <TableCell>{payment.month}</TableCell>
                        <TableCell className="text-right">{formatCurrency(payment.electric)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(payment.water)}</TableCell>
                        <TableCell className="text-right font-medium">{formatCurrency(payment.rentFee)}</TableCell>
                        <TableCell className="text-right font-bold">{formatCurrency(payment.totalAmount)}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell>{formatDate(payment.dueDate)}</TableCell>
                        <TableCell>{formatDate(payment.paidDate)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredPayments.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No payment records match your filters.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}