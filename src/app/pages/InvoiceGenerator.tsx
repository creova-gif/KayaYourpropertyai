import { useState } from "react";
import {
  FileText,
  Download,
  Send,
  Plus,
  X,
  Calendar,
  DollarSign,
  Building2,
  User,
  Hash,
} from "lucide-react";

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export function InvoiceGenerator() {
  const [invoiceNumber, setInvoiceNumber] = useState("INV-2024-001");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState("");
  const [tenant, setTenant] = useState("");
  const [property, setProperty] = useState("");
  const [unit, setUnit] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: "Monthly Rent", quantity: 1, rate: 2300, amount: 2300 },
    { description: "Parking Fee", quantity: 1, rate: 150, amount: 150 },
  ]);
  const [notes, setNotes] = useState("Payment is due by the 1st of each month.");

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, rate: 0, amount: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    if (field === "quantity" || field === "rate") {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }
    setItems(newItems);
  };

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * 0.13; // 13% HST for Ontario
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Invoice Generator</h1>
            <p className="mt-2 text-slate-600">Create professional invoices for tenants</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              <Download className="size-5 text-slate-600" />
              <span className="font-medium text-slate-700">Download PDF</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
              <Send className="size-5" />
              Send to Tenant
            </button>
          </div>
        </div>

        {/* Invoice Form */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
          {/* Company Header */}
          <div className="border-b border-slate-200 pb-6 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">KAYA</h2>
                <p className="text-slate-600">123 Business Street</p>
                <p className="text-slate-600">Toronto, ON M5H 1A1</p>
                <p className="text-slate-600">info@kaya.ca</p>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-lg mb-4">
                  <FileText className="size-5 text-indigo-600" />
                  <span className="text-xl font-bold text-indigo-900">INVOICE</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-slate-600">Invoice #:</span>
                    <input
                      type="text"
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      className="px-2 py-1 border border-slate-300 rounded text-slate-900 font-medium w-32"
                    />
                  </div>
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-slate-600">Issue Date:</span>
                    <input
                      type="date"
                      value={issueDate}
                      onChange={(e) => setIssueDate(e.target.value)}
                      className="px-2 py-1 border border-slate-300 rounded text-slate-900 font-medium"
                    />
                  </div>
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-slate-600">Due Date:</span>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="px-2 py-1 border border-slate-300 rounded text-slate-900 font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Bill To</label>
              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                  <input
                    type="text"
                    value={tenant}
                    onChange={(e) => setTenant(e.target.value)}
                    placeholder="Tenant Name"
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Property Details</label>
              <div className="space-y-3">
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                  <input
                    type="text"
                    value={property}
                    onChange={(e) => setProperty(e.target.value)}
                    placeholder="Property Address"
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="Unit Number"
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-slate-700">Invoice Items</label>
              <button
                onClick={addItem}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg font-medium transition-colors"
              >
                <Plus className="size-4" />
                Add Item
              </button>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase w-24">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase w-32">
                      Rate
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase w-32">
                      Amount
                    </th>
                    <th className="px-4 py-3 w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(index, "description", e.target.value)}
                          placeholder="Item description"
                          className="w-full px-2 py-1 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, "quantity", parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="relative">
                          <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                          <input
                            type="number"
                            value={item.rate}
                            onChange={(e) => updateItem(index, "rate", parseFloat(e.target.value) || 0)}
                            className="w-full pl-7 pr-2 py-1 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-semibold text-slate-900">
                          ${item.amount.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => removeItem(index)}
                          className="p-1 hover:bg-red-50 rounded transition-colors"
                        >
                          <X className="size-5 text-red-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-80 space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-600">HST (13%)</span>
                <span className="font-semibold text-slate-900">${tax.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-t-2 border-slate-300">
                <span className="text-lg font-semibold text-slate-900">Total</span>
                <span className="text-2xl font-bold text-indigo-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Notes / Terms</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Payment terms, thank you note, etc."
            />
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-center text-sm text-slate-600">
            <p>Thank you for your business!</p>
            <p className="mt-1">For questions, contact: info@kaya.ca</p>
          </div>
        </div>

        {/* Preview/Template Options */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all text-left group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
                <FileText className="size-5 text-indigo-600" />
              </div>
              <h4 className="font-semibold text-slate-900">Save as Template</h4>
            </div>
            <p className="text-sm text-slate-600">Reuse this invoice format</p>
          </button>

          <button className="p-4 bg-white rounded-xl border border-slate-200 hover:border-green-300 hover:shadow-lg transition-all text-left group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors">
                <Calendar className="size-5 text-green-600" />
              </div>
              <h4 className="font-semibold text-slate-900">Schedule Recurring</h4>
            </div>
            <p className="text-sm text-slate-600">Auto-generate monthly</p>
          </button>

          <button className="p-4 bg-white rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all text-left group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-50 group-hover:bg-purple-100 transition-colors">
                <Send className="size-5 text-purple-600" />
              </div>
              <h4 className="font-semibold text-slate-900">Email to Tenant</h4>
            </div>
            <p className="text-sm text-slate-600">Send with payment link</p>
          </button>
        </div>
      </div>
    </div>
  );
}