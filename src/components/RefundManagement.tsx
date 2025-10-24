import React, { useState, useEffect } from 'react';
import { DollarSign, Package, CircleAlert as AlertCircle, CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react';
import { refundService, returnService } from '../services/refunds';
import { orderService } from '../services/orders';
import type { Refund, Return } from '../services/refunds';
import type { Order } from '../types/database';

interface RefundWithOrder extends Refund {
  order?: Order;
}

interface ReturnWithOrder extends Return {
  order?: Order;
}

export const RefundManagement: React.FC = () => {
  const [refunds, setRefunds] = useState<RefundWithOrder[]>([]);
  const [returns, setReturns] = useState<ReturnWithOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'refunds' | 'returns'>('refunds');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [allRefunds, allReturns] = await Promise.all([
        refundService.getAllRefunds(),
        returnService.getAllReturns()
      ]);

      const refundsWithOrders = await Promise.all(
        allRefunds.map(async (refund) => {
          const order = await orderService.getOrder(refund.order_id);
          return { ...refund, order };
        })
      );

      const returnsWithOrders = await Promise.all(
        allReturns.map(async (returnItem) => {
          const order = await orderService.getOrder(returnItem.order_id);
          return { ...returnItem, order };
        })
      );

      setRefunds(refundsWithOrders);
      setReturns(returnsWithOrders);
    } catch (error) {
      console.error('Error loading refunds/returns:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefundStatus = async (refundId: string, status: Refund['status']) => {
    try {
      await refundService.updateRefundStatus(refundId, status);
      await loadData();
    } catch (error) {
      console.error('Error updating refund:', error);
      alert('Failed to update refund status');
    }
  };

  const handleReturnStatus = async (returnId: string, status: Return['status']) => {
    try {
      await returnService.updateReturnStatus(returnId, status);
      await loadData();
    } catch (error) {
      console.error('Error updating return:', error);
      alert('Failed to update return status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
      case 'refunded':
      case 'approved':
        return 'text-green-600 bg-green-100';
      case 'pending':
      case 'requested':
        return 'text-yellow-600 bg-yellow-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setActiveTab('refunds')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeTab === 'refunds'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <DollarSign size={16} className="inline mr-2" />
          Refunds ({refunds.length})
        </button>
        <button
          onClick={() => setActiveTab('returns')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeTab === 'returns'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <Package size={16} className="inline mr-2" />
          Returns ({returns.length})
        </button>
      </div>

      {activeTab === 'refunds' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Requests</h2>

          {refunds.length === 0 ? (
            <div className="text-center py-12">
              <DollarSign className="mx-auto text-gray-300 mb-4" size={64} />
              <p className="text-gray-600 text-lg">No refund requests</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Refund #</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Order</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Reason</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {refunds.map((refund) => (
                    <tr key={refund.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="font-semibold text-blue-600">{refund.refund_number}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium">{refund.order?.order_number}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-green-600">${refund.amount.toFixed(2)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">{refund.reason}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(refund.status)}`}>
                          {refund.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {refund.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleRefundStatus(refund.id, 'approved')}
                              className="text-green-600 hover:text-green-800"
                              title="Approve"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button
                              onClick={() => handleRefundStatus(refund.id, 'rejected')}
                              className="text-red-600 hover:text-red-800"
                              title="Reject"
                            >
                              <XCircle size={18} />
                            </button>
                          </div>
                        )}
                        {refund.status === 'approved' && (
                          <button
                            onClick={() => handleRefundStatus(refund.id, 'processed')}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            Process
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'returns' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Return Requests</h2>

          {returns.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto text-gray-300 mb-4" size={64} />
              <p className="text-gray-600 text-lg">No return requests</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Return #</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Order</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Reason</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Items</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {returns.map((returnItem) => (
                    <tr key={returnItem.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="font-semibold text-blue-600">{returnItem.return_number}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium">{returnItem.order?.order_number}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">{returnItem.reason}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm">{returnItem.return_items.length} items</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(returnItem.status)}`}>
                          {returnItem.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {returnItem.status === 'requested' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleReturnStatus(returnItem.id, 'approved')}
                              className="text-green-600 hover:text-green-800"
                              title="Approve"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button
                              onClick={() => handleReturnStatus(returnItem.id, 'rejected')}
                              className="text-red-600 hover:text-red-800"
                              title="Reject"
                            >
                              <XCircle size={18} />
                            </button>
                          </div>
                        )}
                        {returnItem.status === 'approved' && (
                          <button
                            onClick={() => handleReturnStatus(returnItem.id, 'received')}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            Mark Received
                          </button>
                        )}
                        {returnItem.status === 'received' && (
                          <button
                            onClick={() => handleReturnStatus(returnItem.id, 'refunded')}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                          >
                            Process Refund
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
