import React, { useState, useEffect } from 'react';
import { Users, Search, ListFilter as Filter, Eye, CreditCard as Edit, Phone, Mail, Calendar, Package, ArrowRight, Plus, X } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  stage: 'new-lead' | 'contacted' | 'quoted' | 'order-placed' | 'processing' | 'shipped' | 'delivered' | 'follow-up' | 'repeat-customer';
  notes: string[];
  tags: string[];
  assignedTo?: string;
  createdDate: string;
  lastActivity: string;
  orders: string[]; // Order IDs
}

interface CRMPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const STAGES = [
  { id: 'new-lead', name: 'New Lead', color: 'bg-gray-100 text-gray-800', count: 0 },
  { id: 'contacted', name: 'Contacted', color: 'bg-blue-100 text-blue-800', count: 0 },
  { id: 'quoted', name: 'Quoted', color: 'bg-yellow-100 text-yellow-800', count: 0 },
  { id: 'order-placed', name: 'Order Placed', color: 'bg-purple-100 text-purple-800', count: 0 },
  { id: 'processing', name: 'Processing', color: 'bg-orange-100 text-orange-800', count: 0 },
  { id: 'shipped', name: 'Shipped', color: 'bg-indigo-100 text-indigo-800', count: 0 },
  { id: 'delivered', name: 'Delivered', color: 'bg-green-100 text-green-800', count: 0 },
  { id: 'follow-up', name: 'Follow-up', color: 'bg-pink-100 text-pink-800', count: 0 },
  { id: 'repeat-customer', name: 'Repeat Customer', color: 'bg-emerald-100 text-emerald-800', count: 0 }
];

const TEAM_MEMBERS = [
  'Sarah Johnson',
  'Mike Chen',
  'Emily Davis',
  'Alex Rodriguez',
  'Jessica Wilson'
];

export const CRMPanel: React.FC<CRMPanelProps> = ({ isOpen, onClose }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [draggedCustomer, setDraggedCustomer] = useState<string | null>(null);

  // Load customers and sync with orders
  useEffect(() => {
    const loadCustomers = () => {
      try {
        // Load existing customers
        const storedCustomers = localStorage.getItem('legacy_peptides_customers');
        let existingCustomers: Customer[] = storedCustomers ? JSON.parse(storedCustomers) : [];

        // Load orders to sync customer data
        const storedOrders = localStorage.getItem('legacy_peptides_orders_db');
        if (storedOrders) {
          const orders = JSON.parse(storedOrders);
          
          // Create or update customers based on orders
          orders.forEach((order: any) => {
            const existingCustomer = existingCustomers.find(c => c.email === order.customerEmail);
            
            if (existingCustomer) {
              // Update existing customer
              if (!existingCustomer.orders.includes(order.id)) {
                existingCustomer.orders.push(order.id);
                existingCustomer.totalOrders += 1;
                existingCustomer.totalSpent += order.total;
                existingCustomer.lastOrderDate = order.orderDate;
                existingCustomer.lastActivity = order.orderDate;
                
                // Auto-advance stage based on order status
                if (order.status === 'pending' && existingCustomer.stage === 'new-lead') {
                  existingCustomer.stage = 'order-placed';
                } else if (order.status === 'processing' && existingCustomer.stage === 'order-placed') {
                  existingCustomer.stage = 'processing';
                } else if (order.status === 'shipped' && existingCustomer.stage === 'processing') {
                  existingCustomer.stage = 'shipped';
                } else if (order.status === 'delivered' && existingCustomer.stage === 'shipped') {
                  existingCustomer.stage = 'delivered';
                }
              }
            } else {
              // Create new customer
              const newCustomer: Customer = {
                id: `customer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                name: order.customerName,
                email: order.customerEmail,
                totalOrders: 1,
                totalSpent: order.total,
                lastOrderDate: order.orderDate,
                stage: order.status === 'pending' ? 'order-placed' : 
                       order.status === 'processing' ? 'processing' :
                       order.status === 'shipped' ? 'shipped' :
                       order.status === 'delivered' ? 'delivered' : 'new-lead',
                notes: [`Order ${order.orderNumber} placed on ${new Date(order.orderDate).toLocaleDateString()}`],
                tags: ['Customer'],
                createdDate: order.orderDate,
                lastActivity: order.orderDate,
                orders: [order.id]
              };
              existingCustomers.push(newCustomer);
            }
          });
        }


        setCustomers(existingCustomers);
        localStorage.setItem('legacy_peptides_customers', JSON.stringify(existingCustomers));
      } catch (error) {
        console.error('Error loading customers:', error);
        setCustomers([]);
      }
    };

    loadCustomers();
    const interval = globalThis.setInterval(loadCustomers, 10000); // Refresh every 10 seconds
    return () => globalThis.clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const updateCustomerStage = (customerId: string, newStage: Customer['stage']) => {
    setCustomers(prev => {
      const updated = prev.map(customer => 
        customer.id === customerId 
          ? { 
              ...customer, 
              stage: newStage, 
              lastActivity: new Date().toISOString(),
              notes: [...customer.notes, `Stage changed to ${STAGES.find(s => s.id === newStage)?.name} on ${new Date().toLocaleDateString()}`]
            }
          : customer
      );
      localStorage.setItem('legacy_peptides_customers', JSON.stringify(updated));
      return updated;
    });
  };

  const addNote = (customerId: string, note: string) => {
    setCustomers(prev => {
      const updated = prev.map(customer => 
        customer.id === customerId 
          ? { 
              ...customer, 
              notes: [...customer.notes, `${new Date().toLocaleDateString()}: ${note}`],
              lastActivity: new Date().toISOString()
            }
          : customer
      );
      localStorage.setItem('legacy_peptides_customers', JSON.stringify(updated));
      return updated;
    });
  };

  const assignCustomer = (customerId: string, assignee: string) => {
    setCustomers(prev => {
      const updated = prev.map(customer => 
        customer.id === customerId 
          ? { 
              ...customer, 
              assignedTo: assignee,
              lastActivity: new Date().toISOString(),
              notes: [...customer.notes, `Assigned to ${assignee} on ${new Date().toLocaleDateString()}`]
            }
          : customer
      );
      localStorage.setItem('legacy_peptides_customers', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDragStart = (e: React.DragEvent, customerId: string) => {
    setDraggedCustomer(customerId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetStage: Customer['stage']) => {
    e.preventDefault();
    if (draggedCustomer) {
      updateCustomerStage(draggedCustomer, targetStage);
      setDraggedCustomer(null);
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'all' || customer.stage === stageFilter;
    const matchesAssignee = assigneeFilter === 'all' || customer.assignedTo === assigneeFilter;
    return matchesSearch && matchesStage && matchesAssignee;
  });

  // Update stage counts
  const stagesWithCounts = STAGES.map(stage => ({
    ...stage,
    count: customers.filter(c => c.stage === stage.id).length
  }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
      <div className="bg-white w-full h-full overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="text-blue-600" size={28} />
              Customer Relationship Management
            </h1>
            <p className="text-gray-600">Track and manage customer journey through sales pipeline</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors p-2"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Filters */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Customers</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Name or email..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stage Filter</label>
                <select
                  value={stageFilter}
                  onChange={(e) => setStageFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Stages</option>
                  {STAGES.map(stage => (
                    <option key={stage.id} value={stage.id}>{stage.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
                <select
                  value={assigneeFilter}
                  onChange={(e) => setAssigneeFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Team Members</option>
                  {TEAM_MEMBERS.map(member => (
                    <option key={member} value={member}>{member}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{customers.length}</div>
                  <div className="text-sm text-gray-600">Total Customers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pipeline Stages */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Sales Pipeline</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-4">
              {stagesWithCounts.map((stage, index) => (
                <div
                  key={stage.id}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, stage.id as Customer['stage'])}
                  className="bg-white rounded-lg border-2 border-dashed border-gray-200 p-4 min-h-[200px] hover:border-blue-400 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-sm">{stage.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${stage.color}`}>
                      {stage.count}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {customers
                      .filter(customer => customer.stage === stage.id)
                      .slice(0, 3)
                      .map(customer => (
                        <div
                          key={customer.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, customer.id)}
                          onClick={() => setSelectedCustomer(customer)}
                          className="bg-gray-50 p-3 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
                        >
                          <div className="font-medium text-sm text-gray-900 truncate">{customer.name}</div>
                          <div className="text-xs text-gray-600 truncate">{customer.email}</div>
                          <div className="text-xs text-green-600 font-medium">${customer.totalSpent.toFixed(2)}</div>
                        </div>
                      ))}
                    {customers.filter(customer => customer.stage === stage.id).length > 3 && (
                      <div className="text-xs text-gray-500 text-center py-2">
                        +{customers.filter(customer => customer.stage === stage.id).length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer List */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">Customer List</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.email}</div>
                          {customer.phone && (
                            <div className="text-sm text-gray-500">{customer.phone}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          STAGES.find(s => s.id === customer.stage)?.color || 'bg-gray-100 text-gray-800'
                        }`}>
                          {STAGES.find(s => s.id === customer.stage)?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {customer.totalOrders}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        ${customer.totalSpent.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {customer.assignedTo || 'Unassigned'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(customer.lastActivity).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedCustomer(customer)}
                          className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                        >
                          <Eye size={16} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Customer Details - {selectedCustomer.name}</h2>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {selectedCustomer.name}</p>
                    <p><span className="font-medium">Email:</span> {selectedCustomer.email}</p>
                    {selectedCustomer.phone && (
                      <p><span className="font-medium">Phone:</span> {selectedCustomer.phone}</p>
                    )}
                    <p><span className="font-medium">Customer Since:</span> {new Date(selectedCustomer.createdDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Total Orders:</span> {selectedCustomer.totalOrders}</p>
                    <p><span className="font-medium">Total Spent:</span> <span className="text-green-600 font-bold">${selectedCustomer.totalSpent.toFixed(2)}</span></p>
                    <p><span className="font-medium">Last Order:</span> {new Date(selectedCustomer.lastOrderDate).toLocaleDateString()}</p>
                    <p><span className="font-medium">Current Stage:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                        STAGES.find(s => s.id === selectedCustomer.stage)?.color
                      }`}>
                        {STAGES.find(s => s.id === selectedCustomer.stage)?.name}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Stage Management */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Stage Management</h3>
                <div className="flex flex-wrap gap-2">
                  {STAGES.map((stage) => (
                    <button
                      key={stage.id}
                      onClick={() => updateCustomerStage(selectedCustomer.id, stage.id as Customer['stage'])}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedCustomer.stage === stage.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {stage.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Assignment */}
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Team Assignment</h3>
                <select
                  value={selectedCustomer.assignedTo || ''}
                  onChange={(e) => assignCustomer(selectedCustomer.id, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Unassigned</option>
                  {TEAM_MEMBERS.map(member => (
                    <option key={member} value={member}>{member}</option>
                  ))}
                </select>
              </div>

              {/* Notes */}
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Notes & Activity</h3>
                  <button
                    onClick={() => setIsAddingNote(true)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center gap-1"
                  >
                    <Plus size={16} />
                    Add Note
                  </button>
                </div>
                
                {isAddingNote && (
                  <div className="mb-4 p-3 bg-white rounded-lg border">
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Add a note about this customer..."
                      className="w-full p-2 border border-gray-300 rounded resize-none"
                      rows={3}
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => {
                          if (newNote.trim()) {
                            addNote(selectedCustomer.id, newNote);
                            setNewNote('');
                            setIsAddingNote(false);
                          }
                        }}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                      >
                        Save Note
                      </button>
                      <button
                        onClick={() => {
                          setIsAddingNote(false);
                          setNewNote('');
                        }}
                        className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {selectedCustomer.notes.map((note, index) => (
                    <div key={index} className="bg-white p-3 rounded border-l-4 border-blue-400">
                      <p className="text-gray-700">{note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Customer Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCustomer.tags.map((tag, index) => (
                    <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};