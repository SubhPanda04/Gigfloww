import { Calendar, Users, Briefcase, FolderOpen, Filter, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar/Navbar";
import { useEffect, useState } from 'react';
import { getDashboardMetrics, getEmployeeCount } from '@/services/dashboardService';
import { getEmployees } from '@/services/peopleService';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    employees: { total: 0, active: 0, recentHires: 0 },
    jobs: { total: 0, active: 0, totalApplications: 0 },
    projects: 1
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        try {
          const dashboardData = await getDashboardMetrics();
          setMetrics(dashboardData);
        } catch (dashboardError) {
          console.warn('Dashboard API failed, fetching employee count directly:', dashboardError);
          
          try {
            const employees = await getEmployees();
            const employeeCount = Array.isArray(employees) ? employees.length : 0;
            const activeEmployees = Array.isArray(employees) ? 
              employees.filter(emp => emp.status === 'Active').length : 0;
            
            setMetrics({
              employees: {
                total: employeeCount,
                active: activeEmployees,
                recentHires: Math.floor(employeeCount * 0.1)
              },
              jobs: {
                total: 5,
                active: 3,
                totalApplications: 15
              },
              projects: 1
            });
          } catch (employeeError) {
            console.error('Failed to fetch employee data:', employeeError);
            // Use default values
            setMetrics({
              employees: { total: 24, active: 22, recentHires: 3 },
              jobs: { total: 5, active: 3, totalApplications: 15 },
              projects: 1
            });
          }
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-lg">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="px-10 pb-10 max-w-[1400px] mx-auto pt-4">
        {/* Top notification bar */}
        <div className="mb-6 bg-white border border-gray-200/15 rounded-2xl p-5 flex items-center gap-3 shadow-sm">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            G
          </div>
          <p className="text-gray-700 text-lg">
            Optimize your experience on Gigfloww~ track your job post, manage teams and streamline hr operations effortlessly today!
          </p>
        </div>
        {error && (
          <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome Back, Nuraj group</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Wed 23, May 2025</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-white border border-gray-200/15 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Employees</p>
                      <p className="text-3xl font-bold text-gray-900">{metrics.employees.total}</p>
                      <button className="text-blue-600 text-sm mt-2 flex items-center gap-1 hover:underline">
                        View Details <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200/15 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Hiring</p>
                      <p className="text-3xl font-bold text-gray-900">{metrics.jobs.active}</p>
                      <button className="text-blue-600 text-sm mt-2 flex items-center gap-1 hover:underline">
                        View Details <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200/15 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Projects</p>
                      <p className="text-3xl font-bold text-gray-900">{metrics.projects}</p>
                      <button className="text-blue-600 text-sm mt-2 flex items-center gap-1 hover:underline">
                        View Details <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <FolderOpen className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white border border-gray-200/15 shadow-sm mb-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">Performance Report</CardTitle>
                <Select defaultValue="weekly">
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="h-64 relative">
                  <svg className="w-full h-full" viewBox="0 0 700 200">
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 50 150 Q 150 120 200 100 T 350 80 T 500 90 T 650 70"
                      stroke="#3B82F6"
                      strokeWidth="3"
                      fill="none"
                    />
                    <path
                      d="M 50 150 Q 150 120 200 100 T 350 80 T 500 90 T 650 70 L 650 180 L 50 180 Z"
                      fill="url(#gradient)"
                    />
                  </svg>
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-4">
                    <span>80</span>
                    <span>70</span>
                    <span>60</span>
                    <span>50</span>
                    <span>40</span>
                    <span>30</span>
                    <span>20</span>
                    <span>10</span>
                  </div>
                  <div className="absolute bottom-0 left-12 right-0 flex justify-between text-xs text-gray-500">
                    <span>Monday</span>
                    <span>Tuesday</span>
                    <span>Wednesday</span>
                    <span>Thursday</span>
                    <span>Friday</span>
                    <span>Saturday</span>
                    <span>Sunday</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200/15 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Incoming Application</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Manage application for your job posting ({metrics.jobs.totalApplications} total applications)
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-[#2784B8] to-[#113B52] hover:from-[#1f6b94] hover:to-[#0d2e40] text-white border-0"
                  >
                    See all
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-800 font-bold">
                        EF
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-base">Elizabeth Filode</h4>
                        <p className="text-sm text-gray-600 mb-3">3 years in Software Development</p>

                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-800 mb-1">Latest Experience</p>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#640538] rounded flex items-center justify-center text-white text-xs font-bold">
                              T
                            </div>
                            <div>
                              <p className="text-sm font-medium">Twider Inc</p>
                              <p className="text-xs text-gray-500">10 Nov 2004 - 10 May 2023</p>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-3">
                          <button className="text-[#21729F] text-sm font-medium hover:underline flex items-center gap-1">
                            View Resume
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-800 font-bold">
                        AS
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-base">Andre Suores</h4>
                        <p className="text-sm text-gray-600 mb-3">3 years in Software Development</p>

                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-800 mb-1">Latest Experience</p>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#FF8877] rounded flex items-center justify-center text-white text-xs font-bold">
                              T
                            </div>
                            <div>
                              <p className="text-sm font-medium">Twider Inc</p>
                              <p className="text-xs text-gray-500">10 Nov 2004 - 10 May 2023</p>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-3">
                          <button className="text-[#21729F] text-sm font-medium hover:underline flex items-center gap-1">
                            View Resume
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-800 font-bold">
                        IA
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-base">Ishita Ashuth</h4>
                        <p className="text-sm text-gray-600 mb-3">3 years in Software Development</p>

                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-800 mb-1">Latest Experience</p>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#2D0564] rounded flex items-center justify-center text-white text-xs font-bold">
                              T
                            </div>
                            <div>
                              <p className="text-sm font-medium">Twider Inc</p>
                              <p className="text-xs text-gray-500">10 Nov 2004 - 10 May 2023</p>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-3">
                          <button className="text-[#21729F] text-sm font-medium hover:underline flex items-center gap-1">
                            View Resume
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-800 font-bold">
                        IA
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-base">Ishita Ashuth</h4>
                        <p className="text-sm text-gray-600 mb-3">3 years in Software Development</p>

                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-800 mb-1">Latest Experience</p>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#2D0564] rounded flex items-center justify-center text-white text-xs font-bold">
                              T
                            </div>
                            <div>
                              <p className="text-sm font-medium">Twider Inc</p>
                              <p className="text-xs text-gray-500">10 Nov 2004 - 10 May 2023</p>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-3">
                          <button className="text-[#21729F] text-sm font-medium hover:underline flex items-center gap-1">
                            View Resume
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="w-full lg:w-80 flex-shrink-0">
            <Card className="bg-white border border-gray-200/15 shadow-sm sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Meeting 1 */}
                <div className="flex gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium">03:30 pm</p>
                    <p className="text-xs text-gray-500">04:30 pm</p>
                  </div>
                  <div className="flex-1">
                    <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-1 inline-block">
                      Internal Meeting
                    </div>
                    <p className="text-sm font-medium">Internal Meeting with Jade Sapphire- UI designer</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium">05:00 pm</p>
                    <p className="text-xs text-gray-500">05:30 pm</p>
                  </div>
                  <div className="flex-1">
                    <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-1 inline-block">
                      Internal Meeting
                    </div>
                    <p className="text-sm font-medium">Internal Meeting with Content team</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium">07:00 pm</p>
                    <p className="text-xs text-gray-500">08:30 pm</p>
                  </div>
                  <div className="flex-1">
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded mb-1 inline-block">
                      Interview
                    </div>
                    <p className="text-sm font-medium">Interview with Achyut - UI intern</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium">05:00 pm</p>
                    <p className="text-xs text-gray-500">05:30 pm</p>
                  </div>
                  <div className="flex-1">
                    <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-1 inline-block">
                      Internal Meeting
                    </div>
                    <p className="text-sm font-medium">Internal Meeting with Content team</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium">05:00 pm</p>
                    <p className="text-xs text-gray-500">05:30 pm</p>
                  </div>
                  <div className="flex-1">
                    <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-1 inline-block">
                      Internal Meeting
                    </div>
                    <p className="text-sm font-medium">Internal Meeting with Content team</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}