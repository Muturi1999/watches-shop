"use client"
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { User, Mail, Phone, MapPin, Lock, Camera } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function AccountPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: 'Admin User',
    email: 'admin@watchshop.com',
    phone: '+254 700 000 000',
    address: 'Nairobi, Kenya',
    bio: 'Administrator of Watch Shop',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const { toast } = useToast()

  const handleSaveProfile = () => {
    // Here you would typically save to localStorage or backend
    toast({ title: 'Profile updated successfully' })
    setIsEditing(false)
  }

  const handleChangePassword = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast({ title: 'Passwords do not match', variant: 'destructive' })
      return
    }
    if (formData.newPassword.length < 6) {
      toast({ title: 'Password must be at least 6 characters', variant: 'destructive' })
      return
    }
    toast({ title: 'Password changed successfully' })
    setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

      <div className="grid gap-6">
        {/* Profile Information */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Profile Information</h2>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
            </div>

            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-slate-900 flex items-center justify-center text-white text-3xl font-semibold">
                  <User className="h-12 w-12" />
                </div>
                <button className="absolute bottom-0 right-0 h-8 w-8 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{formData.name}</h3>
                <p className="text-sm text-muted-foreground">{formData.email}</p>
                <p className="text-xs text-muted-foreground mt-1">Administrator</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <div className="flex items-center gap-2 mt-1">
                  <User className="h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  ) : (
                    <span>{formData.name}</span>
                  )}
                </div>
              </div>

              <div>
                <Label>Email</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  ) : (
                    <span>{formData.email}</span>
                  )}
                </div>
              </div>

              <div>
                <Label>Phone</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  ) : (
                    <span>{formData.phone}</span>
                  )}
                </div>
              </div>

              <div>
                <Label>Address</Label>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  ) : (
                    <span>{formData.address}</span>
                  )}
                </div>
              </div>

              <div className="col-span-2">
                <Label>Bio</Label>
                <div className="mt-1">
                  {isEditing ? (
                    <Textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm">{formData.bio}</p>
                  )}
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-2 mt-6 pt-6 border-t">
                <Button onClick={handleSaveProfile}>Save Changes</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              </div>
            )}
          </div>
        </Card>

        {/* Change Password */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Change Password
            </h2>

            <div className="space-y-4 max-w-md">
              <div>
                <Label>Current Password</Label>
                <Input
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <Label>New Password</Label>
                <Input
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <Label>Confirm New Password</Label>
                <Input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirm new password"
                />
              </div>

              <Button onClick={handleChangePassword}>Update Password</Button>
            </div>
          </div>
        </Card>

        {/* Account Stats */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Account Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <p className="text-2xl font-bold">45</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-muted-foreground">New Messages</p>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <p className="text-2xl font-bold">89</p>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
