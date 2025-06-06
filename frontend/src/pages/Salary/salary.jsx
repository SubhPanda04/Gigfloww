import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Bell, Filter, ChevronRight } from "lucide-react"
import Navbar from "@/components/Navbar/Navbar"
import { useEffect, useState } from 'react';
import { getSalaries } from '@/services/salaryService';

const sampleEmployeeData = [
  {
    id: 1,
    name: "Elizabeth James",
    email: "elizabeth.james@gigfloww.com",
    jobTitle: "UI Lead",
    department: "Design",
    netSalary: 3500,
    status: "Paid"
  },
  {
    id: 2,
    name: "John Smith",
    email: "john.smith@gigfloww.com",
    jobTitle: "Software Engineer",
    department: "Engineering",
    netSalary: 4000,
    status: "Pending"
  },
  {
    id: 3,
    name: "Sarah Wilson",
    email: "sarah.wilson@gigfloww.com",
    jobTitle: "Product Manager",
    department: "Product",
    netSalary: 4500,
    status: "Paid"
  },
  {
    id: 4,
    name: "Alicia Shankur",
    email: "alicia.shankur@gigfloww.com",
    jobTitle: "Software Engineer",
    department: "Engineering",
    netSalary: 2500,
    status: "Pending"
  },
  {
    id: 5,
    name: "James Oyinkan",
    email: "jamesoyinkan@gigfloww.com",
    jobTitle: "Visual Designer",
    department: "Design",
    netSalary: 2000,
    status: "Paid"
  },
  {
    id: 6,
    name: "Diti Shreyas",
    email: "ditishreyas@gigfloww.com",
    jobTitle: "Visual Designer",
    department: "Design",
    netSalary: 2000,
    status: "Pending"
  },
  {
    id: 7,
    name: "Ishita Bhatgnar",
    email: "ishitadg17@gigfloww.com",
    jobTitle: "UI/UX Designer",
    department: "Design",
    netSalary: 1500,
    status: "Paid"
  },
  {
    id: 8,
    name: "Kito Ashuth",
    email: "ashutosh@gigfloww.com",
    jobTitle: "Content Writer",
    department: "Content",
    netSalary: 1000,
    status: "Pending"
  },
  {
    id: 9,
    name: "Dario Berik",
    email: "darioberik@gigfloww.com",
    jobTitle: "Sales Manager",
    department: "Operation",
    netSalary: 4000,
    status: "Paid"
  },
  {
    id: 10,
    name: "Aresen Vlamadir",
    email: "aresen.vlamadir@gigfloww.com",
    jobTitle: "Mobile Developer",
    department: "Engineering",
    netSalary: 3000,
    status: "Pending"
  },
];

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMonth, setSelectedMonth] = useState("May 2025")
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getSalaries();
        
        if (Array.isArray(data) && data.length > 0) {
          setEmployeeData(data);
        } else {
          console.warn('API returned empty or non-array data, using sample data');
          setEmployeeData(sampleEmployeeData);
        }
      } catch (error) {
        console.error('Error fetching salaries:', error);
        setError('Failed to load salary data, showing sample data');
        setEmployeeData(sampleEmployeeData);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSalaries();
  }, []);

  const [selectedEmployee] = useState({
    name: "Elizabeth James",
    position: "UI lead",
    department: "Design",
    status: "Active",
    basicSalary: 3500,
    bonusOvertime: 200,
    deduction: 50,
    nextSalary: 3650,
    bankDetails: "234567890",
    bankName: "Polaris Bank",
    currency: "$USD",
  })

  const filteredEmployees = Array.isArray(employeeData) ? employeeData.filter(
    (employee) =>
      employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department?.toLowerCase().includes(searchTerm.toLowerCase()),
  ) : [];

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 overflow-hidden">
        <Navbar/>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-lg">Loading salary data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 overflow-hidden">
      <Navbar/>
      <main className="p-4 max-w-full">
        <div className="max-w-7xl mx-auto">
          {error && (
            <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 min-w-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <h1 className="text-2xl font-semibold text-gray-900">Salary Activities</h1>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-40 rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="May 2025">May 2025</SelectItem>
                    <SelectItem value="April 2025">April 2025</SelectItem>
                    <SelectItem value="March 2025">March 2025</SelectItem>
                    <SelectItem value="February 2025">February 2025</SelectItem>
                    <SelectItem value="January 2025">January 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 rounded-lg border-gray-200"
                  />
                </div>
                <Button variant="outline" className="rounded-lg">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b">
                        <TableHead className="font-medium text-gray-600 min-w-[150px]">Employee</TableHead>
                        <TableHead className="font-medium text-gray-600 min-w-[120px]">Job Title</TableHead>
                        <TableHead className="font-medium text-gray-600 min-w-[100px]">Department</TableHead>
                        <TableHead className="font-medium text-gray-600 min-w-[100px]">Net Salary</TableHead>
                        <TableHead className="font-medium text-gray-600 min-w-[80px]">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((employee) => (
                          <TableRow key={employee._id || employee.id} className="hover:bg-gray-50">
                            <TableCell className="min-w-[150px]">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="text-blue-600 font-semibold text-sm">
                                    {employee.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                                  </span>
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900 truncate">{employee.name}</div>
                                  <div className="text-sm text-gray-500 truncate">{employee.email}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-700 min-w-[120px] truncate">{employee.jobTitle}</TableCell>
                            <TableCell className="text-gray-700 min-w-[100px] truncate">{employee.department}</TableCell>
                            <TableCell className="text-gray-700 min-w-[100px] font-semibold">
                              ${(employee.netSalary || employee.salary || 0).toLocaleString()}
                            </TableCell>
                            <TableCell className="min-w-[80px]">
                              <Badge
                                variant={employee.status === "Paid" ? "default" : "secondary"}
                                className={
                                  employee.status === "Paid"
                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                    : "bg-orange-100 text-orange-600 hover:bg-orange-100"
                                }
                              >
                                {employee.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8">
                            <p className="text-gray-500">No salary data found</p>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

            <div className="space-y-6 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Monthly Salary -</span>
                <span className="text-xl font-semibold text-gray-900">${selectedEmployee.basicSalary}</span>
              </div>

              <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                      <div className="w-14 h-14 bg-orange-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">EJ</span>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-lg truncate">{selectedEmployee.name}</h3>
                      <p className="text-blue-100">{selectedEmployee.position}</p>
                      <p className="text-blue-200 text-sm">{selectedEmployee.department} Department</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-white rounded-lg shadow-sm border p-6 overflow-hidden">
                <h3 className="font-semibold text-lg mb-4 text-gray-900">Salary Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Position</span>
                    <span className="font-medium text-gray-900 truncate ml-2">{selectedEmployee.position}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Department</span>
                    <span className="font-medium text-gray-900 truncate ml-2">{selectedEmployee.department}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status</span>
                    <span className="font-medium text-gray-900 truncate ml-2">{selectedEmployee.status}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Basic Salary</span>
                      <span className="font-medium text-gray-900">${selectedEmployee.basicSalary}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Bonus & Overtime</span>
                      <span className="font-medium text-green-600">+${selectedEmployee.bonusOvertime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Deduction</span>
                      <span className="font-medium text-red-600">-${selectedEmployee.deduction}</span>
                    </div>
                    <div className="border-t mt-2 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-800 font-semibold">Net Salary</span>
                        <span className="font-bold text-lg text-blue-600">${selectedEmployee.nextSalary}</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Bank Details</span>
                      <div className="text-right min-w-0">
                        <div className="font-medium text-gray-900 truncate">{selectedEmployee.bankDetails}</div>
                        <div className="text-sm text-gray-500 truncate">{selectedEmployee.bankName}</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Currency</span>
                      <span className="font-medium text-gray-900">{selectedEmployee.currency}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t">
                  <Button variant="link" className="text-blue-600 p-0 h-auto flex items-center gap-2">
                    View Payroll History
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
