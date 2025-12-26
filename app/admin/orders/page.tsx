"use client"
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Eye, Search, Package } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'

interface Order {
  id: number
  customerName: string
  email: string
  phone: string
  items: any[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentMethod: string
  shippingAddress: string
  createdAt: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadOrders()
  }, [])

  useEffect(() => {
    filterOrders()
  }, [orders, searchTerm, statusFilter])

  const loadOrders = () => {
    setIsLoading(true)
    try {
      const stored = localStorage.getItem('admin_orders')
      if (stored) {
        const ordersList = JSON.parse(stored)
        setOrders(ordersList)
      }
    } catch (error) {
      console.error('Error loading orders:', error)
      toast({ title: 'Error loading orders', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  const filterOrders = () => {
    let filtered = orders
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toString().includes(searchTerm)
      )
    }
    if (statusFilter) {
      filtered = filtered.filter(order => order.status === statusFilter)
    }
    setFilteredOrders(filtered)
  }

  const updateOrderStatus = (orderId: number, newStatus: Order['status']) => {
    const updated = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    )
    setOrders(updated)
    localStorage.setItem('admin_orders', JSON.stringify(updated))
    toast({ title: 'Order status updated' })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const calculateOrderTotal = (items: any[]) => {
    return items.reduce((sum, item) => sum + (item.priceNum || 0) * (item.quantity || 1), 0)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Orders</h1>
          <p className="text-muted-foreground">{filteredOrders.length} orders</p>
        </div>
      </div>

      <Card className="p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </Card>

      {isLoading ? (
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-muted-foreground">Loading orders...</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map(order => (
            <Card key={order.id}>
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                    <p className="text-sm text-muted-foreground">{order.customerName}</p>
                    <p className="text-sm text-muted-foreground">{order.email}</p>
                    <p className="text-sm text-muted-foreground">{order.phone}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">KSh{calculateOrderTotal(order.items).toLocaleString()}</p>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <span>{order.items.length} item(s)</span>
                  <span className="mx-2">•</span>
                  <span>{order.paymentMethod}</span>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Order #{selectedOrder?.id} Details</DialogTitle>
                      </DialogHeader>
                      {selectedOrder && (
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Customer Information</h4>
                            <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                            <p><strong>Email:</strong> {selectedOrder.email}</p>
                            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                            <p><strong>Address:</strong> {selectedOrder.shippingAddress}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Order Items</h4>
                            <div className="space-y-2">
                              {selectedOrder.items.map((item, idx) => (
                                <div key={idx} className="flex gap-3 p-2 border rounded">
                                  <div className="relative w-16 h-16 bg-muted rounded">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                  </div>
                                  <p className="font-semibold">KSh{((item.priceNum || 0) * (item.quantity || 1)).toLocaleString()}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="border-t pt-4">
                            <div className="flex justify-between text-lg font-bold">
                              <span>Total:</span>
                              <span>KSh{calculateOrderTotal(selectedOrder.items).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                    className="p-2 text-sm border rounded-md"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </Card>
          ))}

          {filteredOrders.length === 0 && (
            <Card className="p-12 text-center">
              <h3 className="text-lg font-semibold mb-2">No orders found</h3>
              <p className="text-muted-foreground">Orders will appear here when customers make purchases</p>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
