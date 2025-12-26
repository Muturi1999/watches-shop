"use client"
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Eye, Search, Mail, Phone, UserCircle, Ban, CheckCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface User {
  id: number
  name: string
  email: string
  phone?: string
  address?: string
  status: 'active' | 'inactive' | 'banned'
  role: 'customer' | 'admin'
  ordersCount: number
  totalSpent: number
  createdAt: string
  lastLogin?: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadUsers()
  }, [])

  useEffect(() => {
    filterUsers()
  }, [users, searchTerm, statusFilter, roleFilter])

  const loadUsers = () => {
    setIsLoading(true)
    try {
      const stored = localStorage.getItem('admin_users')
      if (stored) {
        const usersList = JSON.parse(stored)
        setUsers(usersList)
      }
    } catch (error) {
      console.error('Error loading users:', error)
      toast({ title: 'Error loading users', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  const filterUsers = () => {
    let filtered = users
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (statusFilter) {
      filtered = filtered.filter(user => user.status === statusFilter)
    }
    if (roleFilter) {
      filtered = filtered.filter(user => user.role === roleFilter)
    }
    setFilteredUsers(filtered)
  }

  const updateUserStatus = (userId: number, newStatus: User['status']) => {
    const updated = users.map(user =>
      user.id === userId ? { ...user, status: newStatus } : user
    )
    setUsers(updated)
    localStorage.setItem('admin_users', JSON.stringify(updated))
    toast({ title: 'User status updated' })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'banned': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleColor = (role: string) => {
    return role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Users</h1>
          <p className="text-muted-foreground">{filteredUsers.length} users</p>
        </div>
      </div>

      <Card className="p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, phone..."
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="banned">Banned</option>
          </select>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">All Roles</option>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </Card>

      {isLoading ? (
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-muted-foreground">Loading users...</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredUsers.map(user => (
            <Card key={user.id}>
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <UserCircle className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{user.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span>{user.email}</span>
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          <span>{user.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(user.status)}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Badge>
                    <Badge className={`${getRoleColor(user.role)} ml-2`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-2">
                      Joined: {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                  <span>{user.ordersCount || 0} orders</span>
                  <span className="mx-2">•</span>
                  <span>KSh{(user.totalSpent || 0).toLocaleString()} spent</span>
                  {user.lastLogin && (
                    <>
                      <span className="mx-2">•</span>
                      <span>Last login: {new Date(user.lastLogin).toLocaleDateString()}</span>
                    </>
                  )}
                </div>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>User Details</DialogTitle>
                      </DialogHeader>
                      {selectedUser && (
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Personal Information</h4>
                            <p><strong>Name:</strong> {selectedUser.name}</p>
                            <p><strong>Email:</strong> {selectedUser.email}</p>
                            {selectedUser.phone && <p><strong>Phone:</strong> {selectedUser.phone}</p>}
                            {selectedUser.address && <p><strong>Address:</strong> {selectedUser.address}</p>}
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Account Information</h4>
                            <p><strong>Status:</strong> {selectedUser.status}</p>
                            <p><strong>Role:</strong> {selectedUser.role}</p>
                            <p><strong>Orders:</strong> {selectedUser.ordersCount || 0}</p>
                            <p><strong>Total Spent:</strong> KSh{(selectedUser.totalSpent || 0).toLocaleString()}</p>
                            <p><strong>Joined:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
                            {selectedUser.lastLogin && (
                              <p><strong>Last Login:</strong> {new Date(selectedUser.lastLogin).toLocaleString()}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  {user.status !== 'banned' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateUserStatus(user.id, 'banned')}
                      className="border-red-600 text-red-600"
                    >
                      <Ban className="h-4 w-4 mr-1" />
                      Ban User
                    </Button>
                  )}

                  {user.status === 'banned' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateUserStatus(user.id, 'active')}
                      className="border-green-600 text-green-600"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Unban User
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}

          {filteredUsers.length === 0 && (
            <Card className="p-12 text-center">
              <h3 className="text-lg font-semibold mb-2">No users found</h3>
              <p className="text-muted-foreground">Users will appear here when they create accounts</p>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
