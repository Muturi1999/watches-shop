"use client"
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Eye, Search, Mail, MessageSquare, Trash2, CheckCircle, Clock } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Message {
  id: number
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied' | 'archived'
  priority: 'low' | 'medium' | 'high'
  reply?: string
  createdAt: string
  repliedAt?: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [replyText, setReplyText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadMessages()
  }, [])

  useEffect(() => {
    filterMessages()
  }, [messages, searchTerm, statusFilter, priorityFilter])

  const loadMessages = () => {
    setIsLoading(true)
    try {
      const stored = localStorage.getItem('admin_messages')
      if (stored) {
        const messagesList = JSON.parse(stored)
        setMessages(messagesList)
      }
    } catch (error) {
      console.error('Error loading messages:', error)
      toast({ title: 'Error loading messages', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  const filterMessages = () => {
    let filtered = messages
    if (searchTerm) {
      filtered = filtered.filter(msg =>
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (statusFilter) {
      filtered = filtered.filter(msg => msg.status === statusFilter)
    }
    if (priorityFilter) {
      filtered = filtered.filter(msg => msg.priority === priorityFilter)
    }
    setFilteredMessages(filtered)
  }

  const updateMessageStatus = (messageId: number, newStatus: Message['status']) => {
    const updated = messages.map(msg =>
      msg.id === messageId ? { ...msg, status: newStatus } : msg
    )
    setMessages(updated)
    localStorage.setItem('admin_messages', JSON.stringify(updated))
    toast({ title: 'Message status updated' })
  }

  const updateMessagePriority = (messageId: number, newPriority: Message['priority']) => {
    const updated = messages.map(msg =>
      msg.id === messageId ? { ...msg, priority: newPriority } : msg
    )
    setMessages(updated)
    localStorage.setItem('admin_messages', JSON.stringify(updated))
    toast({ title: 'Priority updated' })
  }

  const handleReply = (messageId: number) => {
    if (!replyText.trim()) {
      toast({ title: 'Please enter a reply', variant: 'destructive' })
      return
    }

    const updated = messages.map(msg =>
      msg.id === messageId
        ? { ...msg, reply: replyText, status: 'replied' as const, repliedAt: new Date().toISOString() }
        : msg
    )
    setMessages(updated)
    localStorage.setItem('admin_messages', JSON.stringify(updated))
    setReplyText('')
    toast({ title: 'Reply saved successfully' })
  }

  const deleteMessage = (messageId: number) => {
    if (confirm('Are you sure you want to delete this message?')) {
      const updated = messages.filter(msg => msg.id !== messageId)
      setMessages(updated)
      localStorage.setItem('admin_messages', JSON.stringify(updated))
      toast({ title: 'Message deleted' })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'read': return 'bg-yellow-100 text-yellow-800'
      case 'replied': return 'bg-green-100 text-green-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-orange-100 text-orange-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Messages & Contact</h1>
          <p className="text-muted-foreground">{filteredMessages.length} messages</p>
        </div>
      </div>

      <Card className="p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
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
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </Card>

      {isLoading ? (
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-muted-foreground">Loading messages...</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredMessages.map(message => (
            <Card key={message.id}>
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{message.subject}</h3>
                    <p className="text-sm text-muted-foreground">{message.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      <span>{message.email}</span>
                      {message.phone && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{message.phone}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(message.status)}>
                      {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                    </Badge>
                    <Badge className={`${getPriorityColor(message.priority)} ml-2`}>
                      {message.priority.charAt(0).toUpperCase() + message.priority.slice(1)}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(message.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <p className="text-sm mb-3 line-clamp-2">{message.message}</p>

                <div className="flex gap-2 flex-wrap">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedMessage(message)
                          if (message.status === 'new') {
                            updateMessageStatus(message.id, 'read')
                          }
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View & Reply
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Message Details</DialogTitle>
                      </DialogHeader>
                      {selectedMessage && (
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">From</h4>
                            <p><strong>Name:</strong> {selectedMessage.name}</p>
                            <p><strong>Email:</strong> {selectedMessage.email}</p>
                            {selectedMessage.phone && <p><strong>Phone:</strong> {selectedMessage.phone}</p>}
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Subject</h4>
                            <p>{selectedMessage.subject}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Message</h4>
                            <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                          </div>
                          {selectedMessage.reply && (
                            <div className="bg-green-50 p-4 rounded">
                              <h4 className="font-semibold mb-2 text-green-800">Your Reply</h4>
                              <p className="whitespace-pre-wrap text-sm">{selectedMessage.reply}</p>
                              <p className="text-xs text-muted-foreground mt-2">
                                Replied at: {selectedMessage.repliedAt && new Date(selectedMessage.repliedAt).toLocaleString()}
                              </p>
                            </div>
                          )}
                          <div>
                            <h4 className="font-semibold mb-2">Reply to Message</h4>
                            <Textarea
                              placeholder="Type your reply here..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              rows={5}
                            />
                            <Button
                              className="mt-2"
                              onClick={() => handleReply(selectedMessage.id)}
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Send Reply
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <select
                    value={message.status}
                    onChange={(e) => updateMessageStatus(message.id, e.target.value as Message['status'])}
                    className="p-2 text-sm border rounded-md"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>

                  <select
                    value={message.priority}
                    onChange={(e) => updateMessagePriority(message.id, e.target.value as Message['priority'])}
                    className="p-2 text-sm border rounded-md"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteMessage(message.id)}
                    className="border-red-600 text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {filteredMessages.length === 0 && (
            <Card className="p-12 text-center">
              <h3 className="text-lg font-semibold mb-2">No messages found</h3>
              <p className="text-muted-foreground">Messages from the contact form will appear here</p>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
