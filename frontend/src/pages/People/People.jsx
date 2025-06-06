"use client"
import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Bell, Download, ChevronLeft, ChevronRight } from "lucide-react"
import Navbar from "@/components/Navbar/Navbar"
import { getEmployees, deleteEmployee } from '@/services/peopleService';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { createEmployee } from '@/services/peopleService';

const initialEmployees = [
  {
    id: 1,
    name: "Alicia Shankur",
    email: "alicia.shankur@gmail.com",
    jobTitle: "Software Engineer",
    department: "Engineering",
    salary: 2500,
    startDate: "Mar 16, 2023",
    lifeCycle: "Hired",
    status: "Active",
  },
  {
    id: 2,
    name: "James Oyinkan",
    email: "jamesoyinkan@gmail.com",
    jobTitle: "Visual Designer",
    department: "Design",
    salary: 2000,
    startDate: "Jan 16, 2023",
    lifeCycle: "Hired",
    status: "Active",
  },
  {
    id: 3,
    name: "Diti Shreyas",
    email: "ditishreyas@gmail.com",
    jobTitle: "Visual Designer",
    department: "Design",
    salary: 2000,
    startDate: "Dec 09, 2024",
    lifeCycle: "Employed",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Ishita Bhatgnar",
    email: "ishitadg17@gmail.com",
    jobTitle: "UI/UX Designer",
    department: "Design",
    salary: 1500,
    startDate: "Jan 09, 2024",
    lifeCycle: "Employed",
    status: "Active",
  },
  {
    id: 5,
    name: "Kito Ashuth",
    email: "ashutosh@gmail.com",
    jobTitle: "Content Writer",
    department: "Content",
    salary: 1000,
    startDate: "Jan 09, 2024",
    lifeCycle: "Hired",
    status: "Active",
  },
  {
    id: 6,
    name: "Dario Berik",
    email: "darioberik@yahoo.com",
    jobTitle: "Sales Manager",
    department: "Operation",
    salary: 4000,
    startDate: "Feb 21, 2022",
    lifeCycle: "Hired",
    status: "Active",
  },
  {
    id: 7,
    name: "Aresen Vlamadir",
    email: "darioberik@yahoo.com",
    jobTitle: "Mobile Assistant",
    department: "Product",
    salary: 3000,
    startDate: "Aug 07, 2022",
    lifeCycle: "Employed",
    status: "Inactive",
  },
  {
    id: 8,
    name: "Debby Philade",
    email: "debbythegreat@gmail.com",
    jobTitle: "Product Manager",
    department: "Product",
    salary: 4500,
    startDate: "Apr 02, 2022",
    lifeCycle: "Hired",
    status: "Active",
  },
]

export default function Component() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [selectedEmployees, setSelectedEmployees] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [showAddMemberModal, setShowAddMemberModal] = useState(false)
  const itemsPerPage = 8

  const filteredEmployees = useMemo(() => {
    if (!Array.isArray(employees)) {
      return [];
    }

    return employees.filter((employee) => {
      const matchesSearch =
        employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesType = typeFilter === "all" || employee.lifeCycle?.toLowerCase() === typeFilter.toLowerCase()
      const matchesRole = roleFilter === "all" || employee.department?.toLowerCase() === roleFilter.toLowerCase()

      return matchesSearch && matchesType && matchesRole
    })
  }, [employees, searchTerm, typeFilter, roleFilter])

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage)

  const handleSelectEmployee = (employeeId) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId) ? prev.filter((id) => id !== employeeId) : [...prev, employeeId]
    )
  }

  const handleSelectAll = () => {
    if (selectedEmployees.length === paginatedEmployees.length) {
      setSelectedEmployees([])
    } else {
      setSelectedEmployees(paginatedEmployees.map((emp) => emp.id || emp._id))
    }
  }

  const handleExport = () => {
    console.log("Exporting employee data...")
  }

  const handleAddNewMember = () => {
    setShowAddMemberModal(true)
    console.log("Opening add new member modal...")
  }

  const [newMemberData, setNewMemberData] = useState({
    name: '',
    email: '',
    jobTitle: '',
    department: '',
    salary: ''
  });

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        setLoading(true);
        const data = await getEmployees();
        if (Array.isArray(data)) {
          setEmployees(data);
        } else {
          console.warn('API returned non-array data, using fallback data');
          setEmployees(initialEmployees);
        }
      } catch (error) {
        console.error('Error loading employees:', error);
        setEmployees(initialEmployees);
      } finally {
        setLoading(false);
      }
    };
    loadEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter(emp => (emp._id || emp.id) !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleAddMember = async () => {
    try {
      const created = await createEmployee(newMemberData);
      setEmployees([...employees, created]);
      setShowAddMemberModal(false);
      setNewMemberData({ name: '', email: '', jobTitle: '', department: '', salary: '' });
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 overflow-hidden">
        <Navbar />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-lg">Loading employees...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 overflow-hidden">
      <Navbar />
      <main className="p-4 max-w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl font-semibold text-gray-900">List of people</h1>
            <Button onClick={handleAddNewMember} className="bg-blue-600 hover:bg-blue-700 rounded-lg">
              Add new member
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between mb-6 gap-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-lg border-gray-200"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-32 rounded-lg">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="hired">Hired</SelectItem>
                    <SelectItem value="employed">Employed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-full sm:w-32 rounded-lg">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="content">Content</SelectItem>
                    <SelectItem value="operation">Operation</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="rounded-lg">
                  Advanced Filter
                </Button>
              </div>
            </div>

            <Button onClick={handleExport} variant="outline" className="rounded-lg">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b">
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedEmployees.length === paginatedEmployees.length && paginatedEmployees.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="font-medium text-gray-600 min-w-[120px]">Name</TableHead>
                    <TableHead className="font-medium text-gray-600 min-w-[180px]">Email</TableHead>
                    <TableHead className="font-medium text-gray-600 min-w-[120px]">Job Title</TableHead>
                    <TableHead className="font-medium text-gray-600 min-w-[100px]">Department</TableHead>
                    <TableHead className="font-medium text-gray-600 min-w-[80px]">Salary</TableHead>
                    <TableHead className="font-medium text-gray-600 min-w-[80px]">Status</TableHead>
                    <TableHead className="font-medium text-gray-600 min-w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedEmployees.map((employee) => (
                    <TableRow key={employee._id || employee.id} className="hover:bg-gray-50">
                      <TableCell>
                        <Checkbox
                          checked={selectedEmployees.includes(employee._id || employee.id)}
                          onCheckedChange={() => handleSelectEmployee(employee._id || employee.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium min-w-[120px] truncate">{employee.name}</TableCell>
                      <TableCell className="min-w-[180px] truncate">{employee.email}</TableCell>
                      <TableCell className="min-w-[120px] truncate">{employee.jobTitle}</TableCell>
                      <TableCell className="min-w-[100px] truncate">{employee.department}</TableCell>
                      <TableCell className="min-w-[80px]">${employee.salary}</TableCell>
                      <TableCell className="min-w-[80px]">
                        <Badge variant={employee.status === 'Active' ? 'default' : 'secondary'}>
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right min-w-[80px]">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(employee._id || employee.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {paginatedEmployees.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No employees found</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-6 overflow-x-auto pb-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="rounded-lg flex-shrink-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg flex-shrink-0 ${
                      currentPage === page 
                        ? "bg-blue-600 text-white hover:bg-blue-700" 
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg flex-shrink-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </main>

      <Dialog open={showAddMemberModal} onOpenChange={setShowAddMemberModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Team Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Full Name"
              value={newMemberData.name}
              onChange={(e) => setNewMemberData({ ...newMemberData, name: e.target.value })}
            />
            <Input
              placeholder="Email"
              value={newMemberData.email}
              onChange={(e) => setNewMemberData({ ...newMemberData, email: e.target.value })}
            />
            <Input
              placeholder="Job Title"
              value={newMemberData.jobTitle}
              onChange={(e) => setNewMemberData({ ...newMemberData, jobTitle: e.target.value })}
            />
            <Input
              placeholder="Department"
              value={newMemberData.department}
              onChange={(e) => setNewMemberData({ ...newMemberData, department: e.target.value })}
            />
            <Input
              placeholder="Salary"
              type="number"
              value={newMemberData.salary}
              onChange={(e) => setNewMemberData({ ...newMemberData, salary: e.target.value })}
            />
            <Button onClick={handleAddMember} className="w-full">
              Add Member
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}